require('dotenv').config({ path: '../.env' });
const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const { GoogleGenAI } = require('@google/genai');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 3001;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);


function applyFilters(q, { bedrooms, bathrooms, listing_type, location, min_price, max_price, property_type }) {
    q = q.eq('status', 'active');
    if (bedrooms !== null && bedrooms !== undefined) q = q.eq('beds', Number(bedrooms));
    if (bathrooms !== null && bathrooms !== undefined) q = q.eq('baths', Number(bathrooms));
    if (listing_type) {
        const dbListingType = listing_type === 'buy' ? 'sale' : listing_type;
        q = q.eq('listing_type', dbListingType);
    }
    if (property_type) {
        if (property_type === 'studio') {
            q = q.eq('beds', 0).ilike('type', '%condo%');
        } else if (property_type === 'condotel') {
            q = q.ilike('type', 'condotel');
        } else if (property_type === 'house') {
            q = q.or('type.ilike.%house%,type.ilike.%villa%').not('type', 'ilike', '%warehouse%');
        } else if (property_type === 'villa') {
            q = q.ilike('type', 'villa');
        } else {
            q = q.ilike('type', property_type);
        }
    }
    if (min_price) q = q.gte('price', min_price);
    if (max_price) q = q.lte('price', max_price);
    if (location) {
        const loc = location.toLowerCase();
        if (loc.includes('bgc') || loc.includes('bonifacio')) {
            q = q.or('city.ilike.%taguig%,barangay.ilike.%bonifacio%,address.ilike.%bgc%');
        } else {
            q = q.or(`city.ilike.%${location}%,barangay.ilike.%${location}%,condo_name.ilike.%${location}%`);
        }
    }
    return q;
}

async function searchProperties(params) {
    // Real count — split by sale/rent if no listing_type specified
    let totalForSale = null, totalForRent = null, total = 0;
    if (!params.listing_type) {
        const saleParams = { ...params, listing_type: 'buy' };
        const rentParams = { ...params, listing_type: 'rent' };
        const [{ count: saleCount }, { count: rentCount }] = await Promise.all([
            applyFilters(supabase.from('properties').select('*', { count: 'exact', head: true }), saleParams),
            applyFilters(supabase.from('properties').select('*', { count: 'exact', head: true }), rentParams),
        ]);
        totalForSale = saleCount || 0;
        totalForRent = rentCount || 0;
        total = totalForSale + totalForRent;
    } else {
        const { count } = await applyFilters(
            supabase.from('properties').select('*', { count: 'exact', head: true }),
            params
        );
        total = count || 0;
    }

    if (total === 0) return { results: [], total: 0, totalForSale, totalForRent, message: 'No properties found matching those criteria.' };

    // Results for links (up to 10)
    const { data, error } = await applyFilters(
        supabase.from('properties').select('title, slug, price, beds, baths, sqft, city, barangay, condo_name, type, listing_type, status, images, featured_image_index'),
        params
    ).order('price', { ascending: true }).limit(10);

    if (error) return { error: error.message };

    const results = (data || []).map(p => {
        const imgs = Array.isArray(p.images) ? p.images : [];
        const featuredIdx = p.featured_image_index ?? 0;
        const image = imgs[featuredIdx] ?? imgs[0] ?? null;
        return {
            title: p.title,
            url: `https://yhensproperty.com/property/${p.slug}`,
            price: `₱${Number(p.price).toLocaleString()}`,
            beds: p.beds ?? 'N/A',
            baths: p.baths ?? 'N/A',
            sqft: p.sqft ? `${p.sqft} sqm` : 'N/A',
            location: [p.condo_name, p.barangay, p.city].filter(Boolean).join(', '),
            type: p.type,
            listing_type: p.listing_type,
            image,
        };
    });

    return { results, total, totalForSale, totalForRent };
}

const tools = [{
    functionDeclarations: [{
        name: 'show_listings',
        description: 'Display the property listing links on screen. IMPORTANT: You must ALWAYS ask the user first — e.g. "Would you like to see the link?" — before calling this. Only call this function after the user explicitly says yes, show me, send it, or similar confirmation. Never call it automatically. If the conversation has narrowed to a specific property, pass its URL in the urls array to show only that one. If showing all results, omit urls.',
        parameters: {
            type: 'OBJECT',
            properties: {
                urls: {
                    type: 'ARRAY',
                    description: 'Optional. One or more property URLs to show. If provided, only these will be displayed from the search results. If omitted, all results are shown.',
                    items: { type: 'STRING' }
                }
            },
            required: []
        }
    }, {
        name: 'open_whatsapp',
        description: 'Opens WhatsApp with a pre-filled message to Yhen. Use this when a user wants to get in touch — ask them what they\'d like to say first, then call this with a natural pre-written message on their behalf. Always confirm the message with them before sending.',
        parameters: {
            type: 'OBJECT',
            properties: {
                message: {
                    type: 'STRING',
                    description: 'The pre-filled message to send, written as if from the customer. E.g. "Hi Yhen! I\'m interested in the 2-bedroom condo in BGC. Can I arrange a viewing?"'
                }
            },
            required: ['message']
        }
    }, {
        name: 'navigate_to',
        description: 'Navigate the user to a specific page on the website. Ask the user first — e.g. "Would you like me to take you to the contact page?" — then call this if they say yes. Use for: contact page, about page, sell page, guides, rental listings, and individual property pages. For individual property pages, extract the path from the property URL (e.g. if URL is https://yhensproperty.com/property/some-slug, use /property/some-slug).',
        parameters: {
            type: 'OBJECT',
            properties: {
                path: {
                    type: 'STRING',
                    description: 'The page path to navigate to. Category pages: /, /contact, /about, /sell, /guides, /guides/foreigner-property-ownership, /guides/bgc-taguig-neighbourhood-guide, /guides/philippines-property-buyers-guide, /guides/bgc-makati-batangas-rental-yields, /guides/retiring-philippines-srrv, /guides/selling-guide-non-resident, /guides/ra-12252-99-year-lease, /inventory, /category/buy-condos, /category/buy-houses, /category/buy-land, /category/buy-commercial, /category/rent-condos, /category/rent-houses, /category/rent-land, /category/rent-commercial. Individual listings: /property/[slug] extracted from the property URL.'
                }
            },
            required: ['path']
        }
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
                bathrooms: {
                    type: 'NUMBER',
                    description: 'Number of bathrooms. Use null if not specified.'
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
                    description: 'Type of property. Use "studio" for studios, "condo" for condos/apartments, "condotel" for condotels, "house" for houses AND villas combined (use this when user just says "houses"), "villa" for villas only (use when user specifically asks for villas), "land" for land, "commercial" for commercial, "warehouse" for warehouses. Use null if not specified.',
                    enum: ['studio', 'condo', 'condotel', 'apartment', 'house', 'villa', 'land', 'commercial', 'warehouse']
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
                    parts: [{ text: `You are Yhen, an AI property assistant for Yhen's Property — a boutique freelance real estate agency in the Philippines. Speak like a cheerful 28-year-old Filipina from Quezon City — bright, warm, natural Filipino English accent. Keep all responses concise and conversational.

WEBSITE KNOWLEDGE:
- Contact: WhatsApp +63 946 754 3767, or the /contact page on the website. Yhen works directly with every client from start to finish.
- About Yhen: Full name Yhen Oria. Licensed local real estate agent with 6 years experience (since 2019). Specialises in helping expats and foreigners buy property legally in the Philippines. CEO and Founder of Yhen Airbnb Manila. Boutique agency — every client works directly with Yhen personally from start to finish, not a big corporate agency.
- Sell / Rent out your property: Owners who want to list can go to the /sell page or message Yhen on WhatsApp.
- Rentals: Browse all rentals at /category/rent
- Resources menu contains two sections: Investor Guides (/guides) and Property Inventory (/inventory).
- Property Inventory (/inventory): a full master list of all available properties in one place.
- Investor Guides (/guides): Foreigner property ownership, BGC neighbourhood guide, Philippines buyers guide, rental yields (BGC/Makati/Batangas), retiring in the Philippines (SRRV), selling guide for non-residents, RA 12252 99-year lease law.
- Buy dropdown: Buy Condos (/category/buy-condos), Buy Houses (/category/buy-houses), Buy Land (/category/buy-land), Buy Commercial (/category/buy-commercial)
- Rent dropdown: Rent Condos (/category/rent-condos), Rent Houses (/category/rent-houses), Rent Land (/category/rent-land), Rent Commercial (/category/rent-commercial)
- Properties: Condos, houses, land, commercial — for sale and for rent — across BGC, Makati, Taguig, Paranaque, Pasay, Batangas, and more.

NAVIGATION RULE: If the user DIRECTLY asks to go somewhere ("take me to contact", "go to the guides page", "open the inventory") — call navigate_to immediately, no confirmation needed. If YOU are the one suggesting navigation because it might help them (e.g. they asked for the contact number and you think the page might help) — then ask first: "Would you like me to take you there?" After navigating, say something very short — "Done!", "There you go!", or "Got it!" — never describe where you're going because the page changes instantly.

PROPERTY NAVIGATION: When a user asks to browse a single property type (e.g. "show me all condos" / "what houses do you have"), after searching offer them a choice: "I can send you the links, or take you to the condos page — which do you prefer?" If they want the page, call navigate_to with the matching category path. If the search had any filters (price, beds, bathrooms, location), append them as URL query parameters so the page loads pre-filtered. Parameters: minPrice, maxPrice, bedrooms, bathrooms, location, type. Example: if they searched for 3-bed 2-bath houses under ₱8M in Makati, navigate to /category/buy-houses?bedrooms=3&bathrooms=2&maxPrice=8000000&location=Makati. For condotels, navigate to /category/buy-condos?type=Condotel (or rent-condos for rentals). For studios, navigate to /category/buy-condos?bedrooms=0 — do NOT use property_type=studio in the URL. If no filters were used, just use the plain path. If they want links, call show_listings. For mixed types or specific searches that span multiple categories, just offer links as usual.

REFINING ON CATEGORY PAGE: If the user is already on a category page and asks to refine or change the search — including switching property type (e.g. "show me condos instead", "what about houses?") — do NOT run search_properties and do NOT ask "links or page?". Just call navigate_to immediately. If they switch type, navigate to the correct category path (e.g. user on buy-houses asks for condos → navigate to /category/buy-condos). If they refine price, beds or bathrooms on the current page, navigate to the same category with updated URL params. Always say something brief like "Done!" after.

PROPERTY SEARCH RULE (follow this exactly, every time):
Step 1 — When a user asks about properties, call search_properties immediately.
Step 2 — Use the count fields from the search response. If "totalForSale" and "totalForRent" are both present, break it down: e.g. "We have 15 condos for sale and 7 for rent — 22 in total." If only one listing type was searched, just state the total. Always offer both options: links OR navigate to the page. For navigation, if sale and rent both exist and the user hasn't specified, ask which page they want — "the condos for sale page or the condos for rent page?" — before calling navigate_to. Use "link" or "links" to match the count.
Step 2b — SINGLE RESULT RULE: If the search returns exactly 1 result, do not offer the category page. Instead offer to go directly to that listing — extract the path from its URL (e.g. https://yhensproperty.com/property/some-slug → /property/some-slug) and call navigate_to with that path. Both "go to the page" and "see the link" lead to the same place in this case, so let the user choose how they want it.
Step 3 — End with ONE short question offering both options, e.g. "Would you like the links, or shall I take you to the page?" — say it once only, never repeat it.
Step 4 — Wait for the user to say yes or no.
Step 5 — ONLY if they say yes, call show_listings.

FORBIDDEN PHRASES — never say these:
- "I will show you the link"
- "I'll send the link"
- "I'll show you"
- "Let me show you"
- "Here is the link"
You must ALWAYS ask first. The link appears on screen automatically when show_listings is called — do not mention it until the user says yes.

You can also answer questions about living in the Philippines (neighbourhoods, lifestyle, weather, cost of living). If someone wants to get in touch with Yhen directly — whether to ask about a listing, arrange a viewing, or anything else — offer to open WhatsApp. Ask what they'd like to say, write a natural message on their behalf, read it back to confirm, then call open_whatsapp. WhatsApp will open with the message pre-filled so they just hit send.

LANGUAGE: If the user speaks to you in any language other than English, reply in that same language for the rest of the conversation. Keep the same warm Yhen personality regardless of language.

PAGE CONTEXT: You will receive messages marked [SYSTEM CONTEXT UPDATE — DO NOT SPEAK OR ACKNOWLEDGE — INTERNAL ONLY]. These are silent background updates about which page the user is on or what property they are viewing. Treat them as invisible — zero words spoken, no acknowledgement whatsoever. Do not say "Done", "Got it", "I see you're on...", "The user is on...", or anything else. Just silently absorb the context and use it when answering future questions. Only say "Done!" or similar when YOU called navigate_to in direct response to a voice request.

RESPONSE LENGTH: Keep answers conversational and concise. For property searches, two sentences max before asking if they want the link. For general questions (fees, neighbourhoods, lifestyle etc.) answer fully but don't pad — stop when you've answered it.` }]
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
                                    const filterUrls = call.args?.urls;
                                    const toShow = filterUrls?.length
                                        ? pendingProperties.filter(p => filterUrls.includes(p.url))
                                        : pendingProperties;
                                    ws.send(JSON.stringify({ type: 'properties', data: toShow }));
                                }
                                responses.push({ id: call.id, name: call.name, response: { shown: true } });
                            } else if (call.name === 'open_whatsapp') {
                                const message = call.args?.message || 'Hi Yhen!';
                                console.log('💬 Opening WhatsApp:', message);
                                ws.send(JSON.stringify({ type: 'whatsapp', message }));
                                responses.push({ id: call.id, name: call.name, response: { opened: true } });
                            } else if (call.name === 'navigate_to') {
                                const path = call.args?.path || '/';
                                console.log(`🧭 Navigating to: ${path}`);
                                ws.send(JSON.stringify({ type: 'navigate', path }));
                                responses.push({ id: call.id, name: call.name, response: { navigated: true, path } });
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

        // Session limits
        const MAX_SESSION_MS = 15 * 60 * 1000;   // 15 minutes total
        const INACTIVITY_MS = 3 * 60 * 1000;      // 3 minutes silence
        const WARNING_BEFORE_MS = 60 * 1000;       // warn 1 min before max session ends
        const INACTIVITY_WARNING_MS = 30 * 1000;   // warn 30s before inactivity cutoff

        let inactivityTimer = null;
        let inactivityWarningTimer = null;
        let sessionTimer = null;
        let sessionWarningTimer = null;
        let sessionClosed = false;

        const closeSession = (reason) => {
            if (sessionClosed) return;
            sessionClosed = true;
            clearTimeout(inactivityTimer);
            clearTimeout(inactivityWarningTimer);
            clearTimeout(sessionTimer);
            clearTimeout(sessionWarningTimer);
            console.log(`🔴 Session closed: ${reason}`);
            if (session) session.close();
            if (ws.readyState === ws.OPEN) ws.close();
        };

        const sendNotification = (text) => {
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify({ type: 'notification', data: text }));
            }
            session.sendRealtimeInput({ text: `Say this out loud to the user, word for word: "${text}"` });
        };

        const resetInactivityTimer = () => {
            clearTimeout(inactivityTimer);
            clearTimeout(inactivityWarningTimer);
            inactivityWarningTimer = setTimeout(() => {
                sendNotification("Just checking — are you still there? I'll close in 30 seconds if not.");
            }, INACTIVITY_MS - INACTIVITY_WARNING_MS);
            inactivityTimer = setTimeout(() => {
                sendNotification("Session ended due to inactivity. Click the mic to start a new conversation.");
                setTimeout(() => closeSession('inactivity'), 3000);
            }, INACTIVITY_MS);
        };

        // Session max length warning and cutoff
        sessionWarningTimer = setTimeout(() => {
            sendNotification("Just to let you know, we're approaching the session limit. I'll be closing in about one minute.");
        }, MAX_SESSION_MS - WARNING_BEFORE_MS);

        sessionTimer = setTimeout(() => {
            sendNotification("We've reached the maximum session length. Thank you for chatting — click the mic anytime to start a new session.");
            setTimeout(() => closeSession('max session length'), 3000);
        }, MAX_SESSION_MS);

        resetInactivityTimer();

        session.sendRealtimeInput({ text: 'Greet the user with exactly this, word for word: "Hi, I\'m Yhen. I can help you find listings, navigate the website, and answer questions about Philippines real estate and general Philippines information. You can also speak to me in any language. How can I help?"' });

        ws.on('message', (data) => {
            const msg = JSON.parse(data.toString());
            if (msg.type === 'realtimeInput' && msg.data) {
                resetInactivityTimer();
                session.sendRealtimeInput({
                    audio: { data: msg.data, mimeType: "audio/pcm;rate=16000" }
                });
            } else if (msg.type === 'text') {
                resetInactivityTimer();
                session.sendRealtimeInput({ text: msg.data });
            } else if (msg.type === 'pageContext') {
                session.sendRealtimeInput({ text: msg.data });
            }
        });

        ws.on('close', () => {
            console.log('🔴 Browser disconnected');
            closeSession('browser disconnected');
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
