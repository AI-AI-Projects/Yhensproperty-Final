require('dotenv').config({ path: '../.env' });
const express = require('express');
const http = require('http');
const path = require('path');
const { WebSocketServer } = require('ws');
const { GoogleGenAI } = require('@google/genai');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 3000;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

async function searchProperties({ bedrooms, listing_type, location, min_price, max_price, property_type }) {
    let query = supabase
        .from('properties')
        .select('title, slug, price, beds, baths, sqft, city, barangay, condo_name, type, listing_type, status')
        .eq('status', 'active');

    if (bedrooms) query = query.eq('beds', Number(bedrooms));
    if (listing_type) {
        // DB stores 'sale' not 'buy'
        const dbListingType = listing_type === 'buy' ? 'sale' : listing_type;
        query = query.eq('listing_type', dbListingType);
    }
    if (property_type) query = query.ilike('type', property_type);
    if (min_price) query = query.gte('price', min_price);
    if (max_price) query = query.lte('price', max_price);
    if (location) {
        const loc = location.toLowerCase();
        // BGC is in Taguig; also search city and barangay
        if (loc.includes('bgc') || loc.includes('bonifacio')) {
            query = query.or('city.ilike.%taguig%,barangay.ilike.%bonifacio%,address.ilike.%bgc%');
        } else {
            query = query.or(`city.ilike.%${location}%,barangay.ilike.%${location}%,condo_name.ilike.%${location}%`);
        }
    }

    query = query.order('price', { ascending: true }).limit(5);

    const { data, error } = await query;
    if (error) return { error: error.message };
    if (!data || data.length === 0) return { results: [], message: 'No properties found matching those criteria.' };

    const results = data.map(p => ({
        title: p.title,
        url: `https://yhensproperty.com/property/${p.slug}`,
        price: `₱${Number(p.price).toLocaleString()}`,
        beds: p.beds ?? 'N/A',
        baths: p.baths ?? 'N/A',
        sqft: p.sqft ? `${p.sqft} sqm` : 'N/A',
        location: [p.condo_name, p.barangay, p.city].filter(Boolean).join(', '),
        type: p.type,
        listing_type: p.listing_type,
    }));

    return { results };
}

const tools = [{
    functionDeclarations: [{
        name: 'show_listings',
        description: 'Display the property listing links on screen. Call this ONLY when the user confirms they want to see the links — e.g. they say "yes", "show me", "send the link". Do not call this automatically.',
        parameters: { type: 'OBJECT', properties: {}, required: [] }
    }, {
        name: 'search_properties',
        description: 'Search available property listings. Use this whenever a user asks to find, show, or browse properties — e.g. "show me 2-bedroom condos in BGC" or "what do you have for rent in Makati".',
        parameters: {
            type: 'OBJECT',
            properties: {
                bedrooms: {
                    type: 'NUMBER',
                    description: 'Number of bedrooms. Use null if not specified.'
                },
                listing_type: {
                    type: 'STRING',
                    description: '"buy" for sale properties, "rent" for rental properties. Use null if not specified.',
                    enum: ['buy', 'rent']
                },
                location: {
                    type: 'STRING',
                    description: 'Area or neighbourhood, e.g. BGC, Makati, Taguig. Use null if not specified.'
                },
                min_price: {
                    type: 'NUMBER',
                    description: 'Minimum price in Philippine Peso. Use null if not specified.'
                },
                max_price: {
                    type: 'NUMBER',
                    description: 'Maximum price in Philippine Peso. Use null if not specified.'
                },
                property_type: {
                    type: 'STRING',
                    description: 'Type of property: condo, house, land, or commercial. Use null if not specified.',
                    enum: ['condo', 'house', 'land', 'commercial']
                }
            },
            required: []
        }
    }]
}];

wss.on('connection', async (ws) => {
    console.log('🟢 Browser connected to local server.');
    let session;

    try {
        session = await ai.live.connect({
            model: 'gemini-3.1-flash-live-preview',
            config: {
                systemInstruction: {
                    parts: [{ text: "Speak like a cheerful 28-year-old Filipina from Quezon City. Natural Filipino English accent, bright and excited tone. You are Yhen, an AI property assistant for Yhen's Property — a real estate agency with listings across the Philippines including condos, houses, land, and commercial properties in areas like BGC, Makati, Paranaque, Pasay, and more. You can search real listings using the search_properties tool — always use it when a user asks to find or see properties. After finding results, briefly describe the property (beds, price, location) and say something like 'I will show you the link' — do NOT read out the URL, it will appear on screen automatically. You can also answer questions about living in the Philippines (neighbourhoods, lifestyle, weather, cost of living) and offer to arrange a WhatsApp message to book a viewing. If a user asks something specific straight away, just do it first — then offer further help. Keep responses short and conversational — two or three sentences max." }]
                },
                responseModalities: ["AUDIO"],
                outputAudioTranscription: {},
                inputAudioTranscription: {},
                realtimeInputConfig: {
                    automaticActivityDetection: {
                        disabled: false,
                        startOfSpeechSensitivity: "START_SENSITIVITY_HIGH",
                        endOfSpeechSensitivity: "END_SENSITIVITY_HIGH"
                    }
                },
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: "Aoede" }
                    }
                },
                tools: tools
            },
            callbacks: {
                onmessage: async (message) => {
                    if (message.serverContent) {
                        if (message.serverContent.modelTurn) {
                            const parts = message.serverContent.modelTurn.parts;
                            for (const part of parts) {
                                if (part.inlineData && part.inlineData.data) {
                                    if (!isSpeakingThisTurn) {
                                        ws.send(JSON.stringify({ type: 'aiSpeaking', value: true }));
                                        isSpeakingThisTurn = true;
                                    }
                                    ws.send(JSON.stringify({ type: 'audio', data: part.inlineData.data }));
                                }
                            }
                        }
                        if (message.serverContent.outputTranscription && message.serverContent.outputTranscription.text) {
                            ws.send(JSON.stringify({ type: 'text', data: message.serverContent.outputTranscription.text }));
                        }
                        if (message.serverContent.inputTranscription && message.serverContent.inputTranscription.text) {
                            ws.send(JSON.stringify({ type: 'userText', data: message.serverContent.inputTranscription.text }));
                        }
                        if (message.serverContent.interrupted) {
                            console.log('⚡ Interrupted by user');
                            isSpeakingThisTurn = false;
                            ws.send(JSON.stringify({ type: 'interrupted' }));
                        }
                        if (message.serverContent.turnComplete) {
                            isSpeakingThisTurn = false;
                            ws.send(JSON.stringify({ type: 'turnComplete' }));
                        }
                    }

                    // Handle tool calls from Gemini
                    if (message.toolCall && message.toolCall.functionCalls) {
                        const responses = [];
                        for (const call of message.toolCall.functionCalls) {
                            if (call.name === 'search_properties') {
                                console.log('🔍 Searching properties:', call.args);
                                const result = await searchProperties(call.args || {});
                                console.log(`📦 Found ${result.results?.length ?? 0} properties`);
                                if (result.results && result.results.length > 0) {
                                    pendingProperties = result.results;
                                }
                                responses.push({ id: call.id, name: call.name, response: result });
                            } else if (call.name === 'show_listings') {
                                console.log('🔗 Showing listings to user');
                                if (pendingProperties) {
                                    ws.send(JSON.stringify({ type: 'properties', data: pendingProperties }));
                                }
                                responses.push({ id: call.id, name: call.name, response: { shown: true } });
                            }
                        }
                        if (responses.length > 0) {
                            session.sendToolResponse({ functionResponses: responses });
                        }
                    }
                },
                onerror: (e) => console.error("Gemini WebSocket Error:", e),
                onclose: () => console.log('🔴 Gemini session closed')
            }
        });

        console.log('🚀 Connected to Gemini Live API!');
        let isSpeakingThisTurn = false;
        let pendingProperties = null;
        session.sendRealtimeInput({ text: 'Greet the user warmly in one or two short sentences. Tell them your name is Yhen, that you can help them find properties in BGC and Makati, answer questions about living in the Philippines, and arrange a viewing via WhatsApp. Then ask what they would like to know.' });

        ws.on('message', (data) => {
            const msg = JSON.parse(data.toString());
            if (msg.type === 'realtimeInput' && msg.data) {
                session.sendRealtimeInput({
                    audio: { data: msg.data, mimeType: "audio/pcm;rate=16000" }
                });
            } else if (msg.type === 'text') {
                session.sendRealtimeInput({ text: msg.data });
            }
        });

        ws.on('close', () => {
            console.log('🔴 Browser disconnected');
            if (session) session.close();
        });

    } catch (error) {
        console.error("Gemini Connection Error:", error);
    }
});

server.listen(PORT, () => {
    console.log(`\n======================================`);
    console.log(`✅ Voice Test Server is running!`);
    console.log(`🌍 Open your browser to: http://localhost:${PORT}`);
    console.log(`======================================\n`);
});
