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

interface PropertyDetail {
  title: string;
  slug: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number | null;
  lot_area: number | null;
  floor: number | null;
  city: string;
  barangay: string | null;
  condo_name: string | null;
  address: string | null;
  type: string;
  listing_type: string;
  description: string | null;
  amenities: string[] | null;
  images: string[];
  featured_image_index: number | null;
  url: string;
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
  const [showConsent, setShowConsent] = useState(false);
  const [modalProperty, setModalProperty] = useState<PropertyDetail | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalPhotoIndex, setModalPhotoIndex] = useState(0);
  const [isModalExpanded, setIsModalExpanded] = useState(false);
  const [whatsappDraft, setWhatsappDraft] = useState<string | null>(null);
  const [showIntroCard, setShowIntroCard] = useState(false);
  const [vpTop, setVpTop] = useState(0);
  const [vpHeight, setVpHeight] = useState(window.innerHeight);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      setVpTop(vv.offsetTop);
      setVpHeight(vv.height);
      const kbOpen = vv.height < window.screen.height * 0.75;
      setKeyboardOpen(kbOpen);
      if (kbOpen && chatRef.current) {
        chatRef.current.scrollTop = 0;
      }
    };
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    update();
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
    };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [speechText]);

  useEffect(() => {
    const onBeforeUnload = () => {
      if (wsRef.current) wsRef.current.close();
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('reset') === '1') {
      localStorage.removeItem('yhen_visitor');
      localStorage.removeItem('yhen_session');
      localStorage.removeItem('yhen_summary_offered');
    }
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
  const suppressNextPageContextRef = useRef(false);
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
      const txt = msg.data as string;
      const isSystemMsg = ['[SYSTEM', 'SYSTEM CONTEXT', 'CONTEXT UPDATE', 'VISITOR MEMORY',
        'PROPERTY DETAILS', 'INTERNAL ONLY', 'INTERNALONLY', 'DO NOT SPEAK', 'DONOTSPEAK', 'DONOT'].some(p => txt.includes(p));
      if (isSystemMsg) return;
      setShowIntroCard(false);
      yhenBufferRef.current += txt;
      setSpeaker('yhen');
      setSpeechText(yhenBufferRef.current);
    } else if (msg.type === 'userText') {
      setShowIntroCard(false);
      setSpeaker('user');
      setSpeechText(msg.data as string);
    } else if (msg.type === 'notification') {
      setSpeaker('yhen');
      setSpeechText(msg.data as string);
    } else if (msg.type === 'properties') {
      const incoming = msg.data as Property[];
      setProperties(incoming);
      // Log properties shown to session
      const raw = localStorage.getItem('yhen_session');
      if (raw) {
        const session = JSON.parse(raw);
        const newUrls = incoming.map(p => p.url).filter(url => !session.propertiesShown.includes(url));
        session.propertiesShown = [...session.propertiesShown, ...newUrls];
        session.searches.push({ time: new Date().toISOString(), count: incoming.length });
        session.lastActivity = new Date().toISOString();
        localStorage.setItem('yhen_session', JSON.stringify(session));
      }
    } else if (msg.type === 'navigate') {
      suppressNextPageContextRef.current = true;
      navigate(msg.path as string);
      if (window.innerWidth <= 768) setMinimized(true);
    } else if (msg.type === 'whatsapp') {
      setWhatsappDraft(msg.message as string);
    }
  }, [stopAllAudio, playAudio]);

  const disconnect = useCallback(() => {
    stopAllAudio();
    if (playbackContextRef.current) { playbackContextRef.current.close(); playbackContextRef.current = null; }
    // Send session to server on disconnect if there were any searches
    const raw = localStorage.getItem('yhen_session');
    if (raw && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const session = JSON.parse(raw);
      if (session.searches && session.searches.length > 0) {
        wsRef.current.send(JSON.stringify({ type: 'sessionEnd', data: session }));
      }
    }
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
        setShowIntroCard(true);
        // Send consent status to server
        const rawConsent = localStorage.getItem('yhen_consent');
        if (rawConsent) {
          const consent = JSON.parse(rawConsent);
          ws.send(JSON.stringify({ type: 'consent', given: consent.given }));
        }
        // Send returning visitor memory if exists
        const rawMemory = localStorage.getItem('yhen_visitor');
        if (rawMemory) {
          ws.send(JSON.stringify({ type: 'visitorMemory', data: JSON.parse(rawMemory) }));
        }
        // Update visit record
        const parsed = rawMemory ? JSON.parse(rawMemory) : {};
        localStorage.setItem('yhen_visitor', JSON.stringify({
          lastVisit: new Date().toISOString(),
          visitCount: (parsed.visitCount || 0) + 1,
        }));
        // Start a new session log
        const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        localStorage.setItem('yhen_session', JSON.stringify({
          sessionId,
          startTime: new Date().toISOString(),
          searches: [],
          propertiesShown: [],
          whatsappOpened: false,
          name: null,
          phone: null,
          email: null,
        }));
        // Intercept any static WhatsApp links on the page
        document.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"], a[href*="api.whatsapp.com"]').forEach(link => {
          link.addEventListener('click', () => {
            const raw = localStorage.getItem('yhen_session');
            if (!raw) return;
            const session = JSON.parse(raw);
            if (session.searches.length === 0) return; // no AI interaction, nothing to log
            session.whatsappOpened = true;
            session.lastActivity = new Date().toISOString();
            localStorage.setItem('yhen_session', JSON.stringify(session));
          });
        });
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
          if (ws.readyState !== WebSocket.OPEN || isMutedRef.current || document.hidden) return;
          const float32 = e.inputBuffer.getChannelData(0);
          const pcm16 = convertFloat32ToInt16(float32);
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
    suppressNextPageContextRef.current = false;
  }, [location.pathname]);

  const openPropertyModal = useCallback(async (property: Property) => {
    const slug = property.url.split('/property/')[1];
    if (!slug) return;
    setModalLoading(true);
    setModalProperty(null);
    setModalPhotoIndex(0);
    // Track click on server
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'propertyClicked', url: property.url }));
    }
    const { data } = await supabase
      .from('properties')
      .select('title, slug, price, beds, baths, sqft, lot_area, floor, city, barangay, condo_name, address, type, listing_type, description, amenities, images, featured_image_index')
      .eq('slug', slug)
      .single();
    if (data) {
      setModalProperty({ ...data, url: property.url });
      setModalPhotoIndex(data.featured_image_index ?? 0);
    }
    setModalLoading(false);
  }, []);

  const handleMicClick = () => {
    if (status === 'idle') {
      setOpen(true);
      setMinimized(false);
      if (!localStorage.getItem('yhen_consent')) {
        setShowConsent(true);
      } else {
        connect();
      }
    } else if (minimized) {
      setMinimized(false);
    }
  };

  const handleConsent = useCallback((given: boolean) => {
    const consentData = { given, timestamp: new Date().toISOString() };
    localStorage.setItem('yhen_consent', JSON.stringify(consentData));
    setShowConsent(false);
    connect();
  }, [connect]);

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
        .yhen-props-scroll::-webkit-scrollbar { width: 4px; }
        .yhen-props-scroll::-webkit-scrollbar-track { background: transparent; }
        .yhen-props-scroll::-webkit-scrollbar-thumb { background: #0df259; border-radius: 2px; }
        .yhen-props-scroll { scrollbar-width: thin; scrollbar-color: #0df259 transparent; }
      `}</style>

      {isMobile && panelOpen && (
        <div style={{ position: 'fixed', inset: 0, background: '#0f0f11', zIndex: 9998, pointerEvents: 'none' }} />
      )}

      <div style={{
        position: 'fixed',
        ...(isMobile && panelOpen
          ? { top: `${vpTop}px`, left: 0, right: 0, height: `${vpHeight}px`, alignItems: 'stretch', background: '#0f0f11', overflow: 'hidden' }
          : isMobile
            ? { bottom: '160px', right: '20px', alignItems: 'flex-end' }
            : { bottom: '24px', left: '24px', alignItems: 'flex-start' }),
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
            background: isMobile ? '#0f0f11' : 'rgba(15,15,17,0.96)',
            backdropFilter: isMobile ? 'none' : 'blur(16px)',
            border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.08)',
            borderRadius: isMobile ? '0px' : '18px',
            width: isMobile ? '100%' : '560px',
            height: isMobile ? '100%' : 'auto',
            maxHeight: isMobile ? '100%' : 'calc(100vh - 150px)',
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

            {/* Consent card */}
            {showConsent ? (
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '0.82rem', lineHeight: 1.6, color: '#d4d4d8' }}>
                  Before we start — do you mind if I remember this conversation to give you better suggestions?
                </div>
                <div style={{ fontSize: '0.72rem', color: '#71717a', lineHeight: 1.5 }}>
                  Either way, I can still help you find properties.
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleConsent(true)} style={{
                    flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid rgba(13,242,89,0.3)',
                    background: 'rgba(13,242,89,0.08)', color: '#0df259', fontSize: '0.78rem',
                    fontWeight: 600, cursor: 'pointer',
                  }}>Yes, that's fine</button>
                  <button onClick={() => handleConsent(false)} style={{
                    flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)', color: '#a1a1aa', fontSize: '0.78rem',
                    fontWeight: 600, cursor: 'pointer',
                  }}>No thanks</button>
                </div>
              </div>
            ) : (
            /* Speech text / intro card */
            <div ref={chatRef} style={{
              padding: '14px 16px',
              flex: 1,
              minHeight: '80px',
              overflowY: 'auto',
              fontSize: '0.875rem',
              lineHeight: 1.6,
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
                  <div style={{ color: '#f4f4f5' }}>{speechText}</div>
                </>
              ) : showIntroCard ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '0.82rem', color: '#f4f4f5', fontWeight: 600, lineHeight: 1.4 }}>
                    Hi, I'm Yhen — just start talking, I'm listening.
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {[
                      'Search properties by budget, location, bedrooms — or go deeper: "near an international school", "sea view under ₱10M"',
                      'Show you listings with photos, stats and pricing right here in the chat',
                      'Answer questions about buying or renting in the Philippines',
                      'Help you write a WhatsApp message to enquire about any listing',
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: '#0df259', fontWeight: 700, flexShrink: 0, fontSize: '0.75rem', marginTop: '2px' }}>→</span>
                        <span style={{ fontSize: '0.78rem', color: '#a1a1aa', lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#52525b', marginTop: '2px' }}>
                    Tap the mic icon to mute anytime you need a break.
                  </div>
                </div>
              ) : (
                <span style={{ color: '#52525b', fontStyle: 'italic', fontSize: '0.875rem' }}>Ask me anything about our services...</span>
              )}
            </div>
            )}

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
                  placeholder="Speak to me — or type here"
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    padding: '7px 12px',
                    fontSize: '16px',
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

            {/* WhatsApp draft card */}
            {whatsappDraft !== null && (
              <div style={{
                borderTop: '1px solid rgba(37,211,102,0.2)',
                background: 'rgba(37,211,102,0.05)',
                padding: '12px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.124 1.527 5.855L0 24l6.337-1.493A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.369l-.358-.214-3.762.887.935-3.667-.233-.376A9.818 9.818 0 1 1 12 21.818z"/></svg>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#25D366' }}>Message draft</span>
                  </div>
                  <button
                    onClick={() => setWhatsappDraft(null)}
                    style={{ background: 'none', border: 'none', color: '#52525b', cursor: 'pointer', fontSize: '0.9rem', lineHeight: 1, padding: '2px 4px' }}
                    title="Dismiss"
                  >✕</button>
                </div>
                <textarea
                  value={whatsappDraft}
                  onChange={e => setWhatsappDraft(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(37,211,102,0.2)',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    fontSize: '0.78rem',
                    color: '#f4f4f5',
                    lineHeight: 1.5,
                    resize: 'none',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  onClick={() => {
                    const url = `https://wa.me/639467543767?text=${encodeURIComponent(whatsappDraft)}`;
                    window.open(url, '_blank');
                    const raw = localStorage.getItem('yhen_session');
                    if (raw) {
                      const session = JSON.parse(raw);
                      session.whatsappOpened = true;
                      session.lastActivity = new Date().toISOString();
                      localStorage.setItem('yhen_session', JSON.stringify(session));
                      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                        wsRef.current.send(JSON.stringify({ type: 'sessionEnd', data: session }));
                      }
                    }
                    setWhatsappDraft(null);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: '#25D366',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.124 1.527 5.855L0 24l6.337-1.493A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.369l-.358-.214-3.762.887.935-3.667-.233-.376A9.818 9.818 0 1 1 12 21.818z"/></svg>
                  Send on WhatsApp
                </button>
              </div>
            )}

            {/* Property cards — hidden while keyboard is open */}
            {properties.length > 0 && !keyboardOpen && (
              <div style={{ position: 'relative', flexShrink: 0 }}>
              {properties.length > 2 && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '48px', zIndex: 2, pointerEvents: 'none',
                  background: 'linear-gradient(to bottom, transparent, rgba(15,15,17,0.95))',
                  borderRadius: '0 0 4px 4px',
                }} />
              )}
              <div className="yhen-props-scroll" style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                overflowY: 'auto',
                maxHeight: '360px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '10px',
              }}>
                <div style={{ fontSize: '0.65rem', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: '2px', marginBottom: '2px' }}>
                  {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
                </div>
                {properties.map((p, i) => (
                  <div key={i} style={{ position: 'relative', flexShrink: 0 }}>
                    <div
                      onClick={() => openPropertyModal(p)}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s',
                        padding: '8px',
                        paddingRight: '28px',
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
                        <div style={{ fontSize: '0.68rem', color: '#0df259', marginTop: '4px', fontWeight: 500 }}>View details →</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setProperties(prev => prev.filter((_, idx) => idx !== i))}
                      style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: 'none',
                        background: 'rgba(255,255,255,0.1)',
                        color: '#71717a',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        lineHeight: 1,
                        padding: 0,
                        transition: 'background 0.15s, color 0.15s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLButtonElement).style.color = '#f4f4f5'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLButtonElement).style.color = '#71717a'; }}
                      title="Dismiss"
                    >✕</button>
                  </div>
                ))}
              </div>
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

      {/* Property detail modal */}
      {(modalLoading || modalProperty) && (
        <div style={{
          position: 'fixed',
          ...(isMobile
            ? { inset: 0 }
            : isModalExpanded
              ? { top: '72px', bottom: 0, left: '606px', right: 0 }
              : { top: '84px', bottom: '24px', right: '60px', width: 'min(640px, calc(100vw - 660px))' }),
          background: '#0f0f10',
          borderRadius: isMobile ? 0 : '16px',
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: isMobile ? 10000 : 9998,
          overflow: 'hidden',
          boxShadow: '0 8px 48px rgba(0,0,0,0.7)',
        }}>
          {/* Modal header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0,
          }}>
            <span style={{ fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Property Details</span>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {!isMobile && (
                <button onClick={() => setIsModalExpanded(e => !e)} title={isModalExpanded ? 'Collapse' : 'Expand'} style={{
                  background: 'rgba(255,255,255,0.07)', border: 'none', color: '#a1a1aa', cursor: 'pointer',
                  borderRadius: '6px', width: '28px', height: '28px', fontSize: '0.85rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isModalExpanded
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                  }
                </button>
              )}
              <button onClick={() => { setModalProperty(null); setModalLoading(false); setIsModalExpanded(false); }} style={{
                background: 'rgba(255,255,255,0.07)', border: 'none', color: '#a1a1aa', cursor: 'pointer',
                borderRadius: '50%', width: '28px', height: '28px', fontSize: '1rem', lineHeight: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>✕</button>
            </div>
          </div>

          {modalLoading ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52525b', fontSize: '0.85rem' }}>
              Loading...
            </div>
          ) : modalProperty && (
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0' }}>

              {/* Photo carousel */}
              {modalProperty.images && modalProperty.images.length > 0 && (
                <div style={{ position: 'relative', background: '#111', flexShrink: 0, height: isModalExpanded ? '420px' : '240px' }}>
                  <img
                    src={modalProperty.images[modalPhotoIndex]}
                    alt={modalProperty.title}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                  {modalProperty.images.length > 1 && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); setModalPhotoIndex(i => Math.max(0, i - 1)); }} style={{
                        position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.65)', border: 'none', color: '#fff', borderRadius: '50%',
                        width: '34px', height: '34px', cursor: 'pointer', fontSize: '1.2rem',
                        display: modalPhotoIndex === 0 ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>‹</button>
                      <button onClick={(e) => { e.stopPropagation(); setModalPhotoIndex(i => Math.min(modalProperty.images.length - 1, i + 1)); }} style={{
                        position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.65)', border: 'none', color: '#fff', borderRadius: '50%',
                        width: '34px', height: '34px', cursor: 'pointer', fontSize: '1.2rem',
                        display: modalPhotoIndex === modalProperty.images.length - 1 ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>›</button>
                      <div style={{ position: 'absolute', bottom: '8px', right: '10px', background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '99px' }}>
                        {modalPhotoIndex + 1} / {modalProperty.images.length}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Thumbnail strip */}
              {modalProperty.images && modalProperty.images.length > 1 && (
                <div style={{ display: 'flex', gap: '4px', padding: '8px 16px', overflowX: 'auto', background: '#111', flexShrink: 0 }}>
                  {modalProperty.images.slice(0, 10).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      onClick={(e) => { e.stopPropagation(); setModalPhotoIndex(idx); }}
                      style={{
                        width: isModalExpanded ? '72px' : '52px',
                        height: isModalExpanded ? '54px' : '40px',
                        objectFit: 'cover', borderRadius: '4px',
                        cursor: 'pointer', flexShrink: 0,
                        opacity: modalPhotoIndex === idx ? 1 : 0.45,
                        border: modalPhotoIndex === idx ? '2px solid #0df259' : '2px solid transparent',
                        transition: 'opacity 0.15s, border-color 0.15s',
                      }}
                    />
                  ))}
                </div>
              )}

              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: isModalExpanded ? '720px' : '100%', margin: isModalExpanded ? '0 auto' : undefined, width: '100%', boxSizing: 'border-box' }}>

                {/* Title + listing badge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f4f4f5', lineHeight: 1.3, flex: 1 }}>{modalProperty.title}</div>
                  <span style={{
                    flexShrink: 0, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', padding: '3px 8px', borderRadius: '99px',
                    background: modalProperty.listing_type === 'sale' ? 'rgba(13,242,89,0.1)' : 'rgba(96,165,250,0.1)',
                    color: modalProperty.listing_type === 'sale' ? '#0df259' : '#60a5fa',
                    border: `1px solid ${modalProperty.listing_type === 'sale' ? 'rgba(13,242,89,0.25)' : 'rgba(96,165,250,0.25)'}`,
                  }}>
                    {modalProperty.listing_type === 'sale' ? 'For Sale' : 'For Rent'}
                  </span>
                </div>

                {/* Price + stats on same row */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0',
                  background: 'rgba(255,255,255,0.03)', borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.07)', padding: '12px 16px',
                }}>
                  {/* Price */}
                  <div style={{ flexShrink: 0, paddingRight: '16px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#52525b', marginBottom: '4px' }}>Listing Price</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0df259', whiteSpace: 'nowrap' }}>₱{Number(modalProperty.price).toLocaleString()}</div>
                  </div>
                  {/* Stats */}
                  <div style={{ display: 'flex', gap: '0', flex: 1, justifyContent: 'space-around', paddingLeft: '8px', flexWrap: 'wrap' }}>
                    {modalProperty.beds > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '4px 8px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0df259" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9V6a2 2 0 012-2h16a2 2 0 012 2v3"/><path d="M2 11v5a2 2 0 002 2h16a2 2 0 002-2v-5"/><path d="M2 11h20"/><path d="M6 11V9a2 2 0 012-2h8a2 2 0 012 2v2"/></svg>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f4f4f5' }}>{modalProperty.beds}</span>
                        <span style={{ fontSize: '0.6rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Beds</span>
                      </div>
                    )}
                    {modalProperty.baths > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '4px 8px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0df259" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 000-1v0a1.5 1.5 0 00-1.5 1.5v3"/><path d="M4 10v10"/><path d="M20 10v10"/><path d="M4 19a2 2 0 002 2h12a2 2 0 002-2v-1H4v1z"/><path d="M3 10h18"/></svg>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f4f4f5' }}>{modalProperty.baths}</span>
                        <span style={{ fontSize: '0.6rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Baths</span>
                      </div>
                    )}
                    {modalProperty.sqft != null && modalProperty.sqft > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '4px 8px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0df259" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f4f4f5' }}>{modalProperty.sqft}</span>
                        <span style={{ fontSize: '0.6rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sqm</span>
                      </div>
                    )}
                    {modalProperty.lot_area != null && modalProperty.lot_area > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '4px 8px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0df259" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l9-9 9 9"/><path d="M3 21V11l9-9 9 9v10"/></svg>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f4f4f5' }}>{modalProperty.lot_area}</span>
                        <span style={{ fontSize: '0.6rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lot sqm</span>
                      </div>
                    )}
                    {modalProperty.floor != null && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '4px 8px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0df259" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M3 7l9-4 9 4"/><path d="M3 14l9-4 9 4"/><path d="M3 21V7"/><path d="M21 21V7"/></svg>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f4f4f5' }}>{modalProperty.floor}</span>
                        <span style={{ fontSize: '0.6rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Floor</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '4px 8px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0df259" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f4f4f5', textTransform: 'capitalize' }}>{modalProperty.type}</span>
                      <span style={{ fontSize: '0.6rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const wsOpen = wsRef.current?.readyState === WebSocket.OPEN;
                      if (wsOpen) {
                        wsRef.current!.send(JSON.stringify({ type: 'whatsappEnquiry', title: modalProperty.title, url: modalProperty.url }));
                      } else {
                        window.open(`https://wa.me/639467543767?text=${encodeURIComponent(`Hi Yhen, I'm interested in this property: ${modalProperty.title} — ${modalProperty.url}`)}`, '_blank');
                      }
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      background: '#25D366', color: '#fff', borderRadius: '12px', padding: '12px',
                      border: 'none', cursor: 'pointer', width: '100%',
                      fontWeight: 700, fontSize: '0.9rem',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp with Yhen's help
                  </button>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a
                      href={`https://wa.me/639467543767?text=${encodeURIComponent(`Hi Yhen, I'm interested in this property: ${modalProperty.title} — ${modalProperty.url}`)}`}
                      target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        background: 'transparent', border: '1px solid rgba(37,211,102,0.3)',
                        color: '#25D366', borderRadius: '12px', padding: '10px',
                        textDecoration: 'none', fontWeight: 600, fontSize: '0.82rem',
                      }}
                    >I'll write my own →</a>
                    <a
                      href={modalProperty.url}
                      target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        color: '#a1a1aa', borderRadius: '12px', padding: '10px',
                        textDecoration: 'none', fontWeight: 600, fontSize: '0.82rem',
                      }}
                    >View full listing ↗</a>
                  </div>
                </div>

                {/* Location */}
                <div style={{ fontSize: '0.8rem', color: '#71717a' }}>
                  📍 {[modalProperty.condo_name, modalProperty.barangay, modalProperty.city].filter(Boolean).join(', ')}
                  {modalProperty.address && <div style={{ marginTop: '2px', fontSize: '0.75rem' }}>{modalProperty.address}</div>}
                </div>

                {/* Description */}
                {modalProperty.description && (
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#52525b', marginBottom: '6px' }}>About this property</div>
                    <div style={{ fontSize: '0.82rem', color: '#a1a1aa', lineHeight: 1.75 }}>
                      {modalProperty.description}
                    </div>
                  </div>
                )}

                {/* Amenities */}
                {modalProperty.amenities && modalProperty.amenities.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#52525b', marginBottom: '8px' }}>Features & Amenities</div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {modalProperty.amenities.map((a, idx) => (
                        <span key={idx} style={{
                          background: 'rgba(13,242,89,0.06)', border: '1px solid rgba(13,242,89,0.15)',
                          color: '#a1a1aa', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem',
                        }}>{a}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Google Maps embed */}
                {(() => {
                  const mapQuery = [modalProperty.address, modalProperty.barangay, modalProperty.city].filter(Boolean).join(', ');
                  return mapQuery ? (
                    <div>
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#52525b', marginBottom: '8px' }}>Location</div>
                      <iframe
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed&z=15`}
                        width="100%"
                        height={isModalExpanded ? "300" : "180"}
                        style={{ border: 0, borderRadius: '10px', display: 'block' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Property location"
                      />
                    </div>
                  ) : null;
                })()}


              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
