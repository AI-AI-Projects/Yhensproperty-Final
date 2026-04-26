import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

const PAGE_LABELS: Record<string, string> = {
  '/': 'Home page',
  '/contact': 'Contact page',
  '/about': 'About Yhen page — Yhen Oria, licensed agent, 6 years experience, expat specialist',
  '/sell': 'Sell / List Your Property page',
  '/guides': 'Investor Guides index page',
  '/guides/foreigner-property-ownership': 'Guide: Foreigner Property Ownership in the Philippines',
  '/guides/bgc-taguig-neighbourhood-guide': 'Guide: BGC & Taguig Neighbourhood Guide',
  '/guides/philippines-property-buyers-guide': 'Guide: Philippines Property Buyers Guide',
  '/guides/bgc-makati-batangas-rental-yields': 'Guide: BGC, Makati & Batangas Rental Yields',
  '/guides/retiring-philippines-srrv': 'Guide: Retiring in the Philippines (SRRV)',
  '/guides/selling-guide-non-resident': 'Guide: Selling Guide for Non-Residents',
  '/guides/ra-12252-99-year-lease': 'Guide: RA 12252 — 99-Year Lease Law',
  '/inventory': 'Property Inventory page (full master listing of all properties)',
  '/category/buy-condos': 'Buy Condos listings page',
  '/category/buy-houses': 'Buy Houses listings page',
  '/category/buy-land': 'Buy Land listings page',
  '/category/buy-commercial': 'Buy Commercial listings page',
  '/category/rent-condos': 'Rent Condos listings page',
  '/category/rent-houses': 'Rent Houses listings page',
  '/category/rent-land': 'Rent Land listings page',
  '/category/rent-commercial': 'Rent Commercial listings page',
};

type Status = 'idle' | 'connecting' | 'listening' | 'speaking';

interface Property {
  title: string;
  url: string;
  price: string;
  beds: number | string;
  location: string;
  image?: string | null;
}

function convertFloat32ToInt16(buffer: Float32Array): Int16Array {
  const out = new Int16Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    out[i] = Math.max(-1, Math.min(1, buffer[i])) * 0x7fff;
  }
  return out;
}

function base64ToInt16Array(b64: string): Int16Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Int16Array(bytes.buffer);
}

async function buildPageContext(pathname: string): Promise<string> {
  const propertyMatch = pathname.match(/^\/property\/(.+)$/);
  if (propertyMatch) {
    const slug = propertyMatch[1];
    const { data } = await supabase
      .from('properties')
      .select('title, price, beds, baths, sqft, floor, type, listing_type, city, barangay, condo_name, address, description, amenities, lot_area, status')
      .eq('slug', slug)
      .single();
    if (data) {
      const parts = [
        `Title: ${data.title}`,
        `Type: ${data.type} for ${data.listing_type === 'sale' ? 'sale' : 'rent'}`,
        `Price: ₱${Number(data.price).toLocaleString()}`,
        data.beds != null ? `Bedrooms: ${data.beds === 0 ? 'Studio' : data.beds}` : null,
        data.baths != null ? `Bathrooms: ${data.baths}` : null,
        data.sqft ? `Floor area: ${data.sqft} sqm` : null,
        data.lot_area ? `Lot area: ${data.lot_area} sqm` : null,
        data.floor != null ? `Floor: ${data.floor}` : null,
        [data.condo_name, data.barangay, data.city].filter(Boolean).length
          ? `Location: ${[data.condo_name, data.barangay, data.city].filter(Boolean).join(', ')}` : null,
        data.address ? `Address: ${data.address}` : null,
        data.amenities?.length ? `Amenities: ${(data.amenities as string[]).join(', ')}` : null,
        `Status: ${data.status}`,
        data.description ? `Description: ${data.description}` : null,
      ].filter(Boolean).join('\n');
      return `[SYSTEM CONTEXT UPDATE — DO NOT SPEAK OR ACKNOWLEDGE — INTERNAL ONLY: user is viewing a property listing page]\n[PROPERTY DETAILS — use to answer questions, do not read aloud:\n${parts}]`;
    }
    return '[SYSTEM CONTEXT UPDATE — DO NOT SPEAK OR ACKNOWLEDGE — INTERNAL ONLY: user is viewing a property listing page]';
  }
  const label = PAGE_LABELS[pathname] ?? `Page: ${pathname}`;
  return `[SYSTEM CONTEXT UPDATE — DO NOT SPEAK OR ACKNOWLEDGE — INTERNAL ONLY: user is now viewing ${label}]`;
}

export const VoiceWidget: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [speaker, setSpeaker] = useState<'yhen' | 'user' | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [textInput, setTextInput] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const wsRef = useRef<WebSocket | null>(null);
  const pathnameRef = useRef(location.pathname);
  pathnameRef.current = location.pathname;
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const playbackContextRef = useRef<AudioContext | null>(null);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const activeCountRef = useRef(0);
  const nextPlayTimeRef = useRef(0);
  const pendingTurnCompleteRef = useRef(false);
  const isAISpeakingRef = useRef(false);
  const yhenBufferRef = useRef('');
  const isMutedRef = useRef(false);

  isMutedRef.current = isMuted;

  const stopAllAudio = useCallback(() => {
    activeSourcesRef.current.forEach(s => { try { s.stop(); } catch (_) {} });
    activeSourcesRef.current = [];
    activeCountRef.current = 0;
    pendingTurnCompleteRef.current = false;
    isAISpeakingRef.current = false;
    nextPlayTimeRef.current = 0;
  }, []);

  const playAudio = useCallback((b64: string) => {
    if (!playbackContextRef.current) {
      playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
    }
    const ctx = playbackContextRef.current;
    const int16 = base64ToInt16Array(b64);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 0x7fff;
    const buf = ctx.createBuffer(1, float32.length, 24000);
    buf.getChannelData(0).set(float32);
    const source = ctx.createBufferSource();
    source.buffer = buf;
    source.connect(ctx.destination);
    if (nextPlayTimeRef.current < ctx.currentTime) nextPlayTimeRef.current = ctx.currentTime;
    activeCountRef.current++;
    activeSourcesRef.current.push(source);
    source.onended = () => {
      activeCountRef.current--;
      activeSourcesRef.current = activeSourcesRef.current.filter(s => s !== source);
      if (pendingTurnCompleteRef.current && activeCountRef.current === 0) {
        pendingTurnCompleteRef.current = false;
        isAISpeakingRef.current = false;
        setStatus('listening');
      }
    };
    source.start(nextPlayTimeRef.current);
    nextPlayTimeRef.current += buf.duration;
  }, []);

  const handleMessage = useCallback((msg: Record<string, unknown>) => {
    if (msg.type === 'interrupted') {
      stopAllAudio();
      yhenBufferRef.current = '';
      setStatus('listening');
    } else if (msg.type === 'aiSpeaking') {
      isAISpeakingRef.current = true;
      pendingTurnCompleteRef.current = false;
      yhenBufferRef.current = '';
      setStatus('speaking');
    } else if (msg.type === 'audio') {
      playAudio(msg.data as string);
    } else if (msg.type === 'turnComplete') {
      yhenBufferRef.current = '';
      if (activeCountRef.current === 0) {
        isAISpeakingRef.current = false;
        setStatus('listening');
      } else {
        pendingTurnCompleteRef.current = true;
      }
    } else if (msg.type === 'text') {
      yhenBufferRef.current += msg.data as string;
      setSpeaker('yhen');
      setSpeechText(yhenBufferRef.current);
    } else if (msg.type === 'userText') {
      setSpeaker('user');
      setSpeechText(msg.data as string);
    } else if (msg.type === 'notification') {
      setSpeaker('yhen');
      setSpeechText(msg.data as string);
    } else if (msg.type === 'properties') {
      setProperties(msg.data as Property[]);
    } else if (msg.type === 'navigate') {
      navigate(msg.path as string);
    } else if (msg.type === 'whatsapp') {
      const text = encodeURIComponent(msg.message as string);
      window.open(`https://wa.me/639467543767?text=${text}`, '_blank');
    }
  }, [stopAllAudio, playAudio]);

  const disconnect = useCallback(() => {
    stopAllAudio();
    if (playbackContextRef.current) { playbackContextRef.current.close(); playbackContextRef.current = null; }
    if (wsRef.current) wsRef.current.close();
    if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach(t => t.stop());
    if (audioContextRef.current) audioContextRef.current.close();
    if (scriptProcessorRef.current) scriptProcessorRef.current.disconnect();
    wsRef.current = null;
    mediaStreamRef.current = null;
    audioContextRef.current = null;
    scriptProcessorRef.current = null;
    setStatus('idle');
    setIsMuted(false);
    setSpeechText('');
    setSpeaker(null);
    setProperties([]);
    setOpen(false);
    setMinimized(false);
  }, [stopAllAudio]);

  const connect = useCallback(async () => {
    if (wsRef.current) return;
    setStatus('connecting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true }
      });
      mediaStreamRef.current = stream;
      const ws = new WebSocket('wss://cooperative-vibrancy-production-6e56.up.railway.app');
      wsRef.current = ws;

      ws.onopen = () => {
        setStatus('listening');
        buildPageContext(pathnameRef.current).then(ctx => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'pageContext', data: ctx }));
          }
        });
        const ctx = new AudioContext({ sampleRate: 16000 });
        audioContextRef.current = ctx;
        const src = ctx.createMediaStreamSource(stream);
        const processor = ctx.createScriptProcessor(4096, 1, 1);
        scriptProcessorRef.current = processor;
        src.connect(processor);
        processor.connect(ctx.destination);
        processor.onaudioprocess = (e) => {
          if (ws.readyState !== WebSocket.OPEN || isMutedRef.current) return;
          const pcm16 = convertFloat32ToInt16(e.inputBuffer.getChannelData(0));
          const b64 = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)));
          ws.send(JSON.stringify({ type: 'realtimeInput', data: b64 }));
        };
      };

      ws.onmessage = (e) => handleMessage(JSON.parse(e.data));
      ws.onclose = () => disconnect();
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert('Could not access microphone or connect to voice server.');
    }
  }, [handleMessage, disconnect]);

  useEffect(() => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    buildPageContext(location.pathname).then(ctx => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'pageContext', data: ctx }));
      }
    });
  }, [location.pathname]);

  const handleMicClick = () => {
    if (status === 'idle') {
      setOpen(true);
      setMinimized(false);
      connect();
    } else if (minimized) {
      setMinimized(false);
    }
  };

  const toggleMute = () => setIsMuted(m => !m);

  const sendTextMessage = () => {
    const msg = textInput.trim();
    if (!msg || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ type: 'text', data: msg }));
    setSpeaker('user');
    setSpeechText(msg);
    setTextInput('');
  };

  const dismissProperty = (index: number) => {
    setProperties(prev => prev.filter((_, i) => i !== index));
  };

  const statusLabel = status === 'connecting' ? 'Connecting...'
    : status === 'listening' ? 'Listening...'
    : status === 'speaking' ? 'Yhen is speaking'
    : 'Tap to start';

  const isConnected = status !== 'idle' && status !== 'connecting';
  const panelOpen = open && !minimized;

  return (
    <>
      <style>{`
        @keyframes yhen-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(13,242,89,0.55); }
          70%  { box-shadow: 0 0 0 14px rgba(13,242,89,0);   }
          100% { box-shadow: 0 0 0 0   rgba(13,242,89,0);    }
        }
        @keyframes yhen-pulse-muted {
          0%   { box-shadow: 0 0 0 0   rgba(239,68,68,0.5); }
          70%  { box-shadow: 0 0 0 14px rgba(239,68,68,0);  }
          100% { box-shadow: 0 0 0 0   rgba(239,68,68,0);   }
        }
      `}</style>

      <div style={{
        position: 'fixed',
        ...(isMobile ? { inset: 0, alignItems: 'stretch' } : { bottom: '24px', left: '24px', alignItems: 'flex-start' }),
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 9999,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        pointerEvents: 'auto',
      }}>

        {/* Expanded panel */}
        {panelOpen && (
          <div style={{
            background: 'rgba(15,15,17,0.96)',
            backdropFilter: 'blur(16px)',
            border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.08)',
            borderRadius: isMobile ? '0px' : '18px',
            width: isMobile ? '100%' : '560px',
            height: isMobile ? '100%' : 'auto',
            maxHeight: isMobile ? '100%' : '580px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            flex: isMobile ? 1 : undefined,
          }}>
            {/* Status bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
                  background: status === 'listening' ? '#0df259' : status === 'speaking' ? '#22c55e' : '#52525b',
                  boxShadow: status === 'listening' ? '0 0 6px #0df259' : status === 'speaking' ? '0 0 6px #22c55e' : 'none',
                }} />
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: status === 'listening' ? '#0df259' : status === 'speaking' ? '#22c55e' : '#71717a',
                }}>{statusLabel}</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {/* Mute */}
                <button onClick={toggleMute} title={isMuted ? 'Unmute' : 'Mute'} style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: isMuted ? '#ef4444' : 'rgba(255,255,255,0.07)',
                  border: 'none', cursor: 'pointer', color: isMuted ? '#fff' : '#a1a1aa',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isMuted ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V20H9v2h6v-2h-2v-2.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/>
                    </svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.93V20H9v2h6v-2h-2v-2.07A7 7 0 0 0 19 11h-2z"/>
                    </svg>
                  )}
                </button>
                {/* Minimize */}
                <button onClick={() => setMinimized(true)} title="Minimise" style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.07)',
                  border: 'none', cursor: 'pointer', color: '#a1a1aa',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13H5v-2h14v2z"/>
                  </svg>
                </button>
                {/* Disconnect */}
                <button onClick={disconnect} title="End session" style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.07)',
                  border: 'none', cursor: 'pointer', color: '#ef4444',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Speech text */}
            <div style={{
              padding: '14px 16px',
              minHeight: '64px',
              maxHeight: '180px',
              overflowY: 'auto',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              color: speechText ? '#f4f4f5' : '#52525b',
              fontStyle: speechText ? 'normal' : 'italic',
            }}>
              {speechText ? (
                <>
                  <div style={{
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: speaker === 'yhen' ? '#0df259' : '#71717a',
                    marginBottom: '4px',
                  }}>{speaker === 'yhen' ? 'Yhen' : 'You'}</div>
                  <div>{speechText}</div>
                </>
              ) : (
                'Ask me anything about our services...'
              )}
            </div>

            {/* Text input */}
            {isConnected && (
              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '8px 10px',
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
              }}>
                <input
                  type="text"
                  value={textInput}
                  onChange={e => setTextInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendTextMessage()}
                  placeholder="Type a message..."
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    padding: '7px 12px',
                    fontSize: '0.8rem',
                    color: '#f4f4f5',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={sendTextMessage}
                  disabled={!textInput.trim()}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: textInput.trim() ? '#0df259' : 'rgba(255,255,255,0.07)',
                    border: 'none', cursor: textInput.trim() ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'background 0.2s',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={textInput.trim() ? '#09090b' : '#52525b'}>
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
            )}

            {/* Property cards */}
            {properties.length > 0 && (
              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                overflowY: 'auto',
                flexShrink: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '10px',
              }}>
                <div style={{ fontSize: '0.65rem', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: '2px', marginBottom: '2px' }}>
                  {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
                </div>
                {properties.map((p, i) => (
                  <a
                    key={i}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                      padding: '8px',
                      flexShrink: 0,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#0df259')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                  >
                    {p.image ? (
                      <img src={p.image} alt={p.title} style={{
                        width: '80px', height: '80px', objectFit: 'cover',
                        borderRadius: '8px', flexShrink: 0,
                      }} />
                    ) : (
                      <div style={{
                        width: '80px', height: '80px', borderRadius: '8px', flexShrink: 0,
                        background: 'rgba(255,255,255,0.06)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="#52525b"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f4f4f5', lineHeight: 1.3, marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                      <div style={{ fontSize: '0.78rem', color: '#0df259', fontWeight: 600, marginBottom: '2px' }}>{p.price}</div>
                      <div style={{ fontSize: '0.7rem', color: '#71717a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {[p.beds && Number(p.beds) > 0 ? `${p.beds} bed` : null, p.location].filter(Boolean).join(' · ')}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#0df259', marginTop: '4px', fontWeight: 500 }}>View listing →</div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mic button — hidden on mobile when panel is fully open */}
        {!(isMobile && panelOpen) && (
          <button
            onClick={handleMicClick}
            disabled={status === 'connecting'}
            title={minimized ? 'Tap to expand' : isConnected ? undefined : 'Talk to Yhen'}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: 'none',
              cursor: status === 'connecting' ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s ease, box-shadow 0.3s ease',
              background: status === 'listening' ? '#0df259'
                : status === 'speaking' ? '#22c55e'
                : 'rgba(20,20,22,0.9)',
              color: status === 'listening' || status === 'speaking' ? '#09090b' : '#a1a1aa',
              backdropFilter: 'blur(8px)',
              animation: isConnected
                ? isMuted
                  ? 'yhen-pulse-muted 1.8s ease-out infinite'
                  : 'yhen-pulse 1.8s ease-out infinite'
                : 'none',
            } as React.CSSProperties}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.93V20H9v2h6v-2h-2v-2.07A7 7 0 0 0 19 11h-2z"/>
            </svg>
          </button>
        )}
      </div>
    </>
  );
};
