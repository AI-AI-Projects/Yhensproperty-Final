require('dotenv').config({ path: '../.env' });
const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const { GoogleGenAI } = require('@google/genai');
const { createClient } = require('@supabase/supabase-js');
const { google } = require('googleapis');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 3001;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
const loggingDb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const SHEET_ID = '1EfFJMm1cOkyUI9jr-83W1UStrMCYdgzrAAeKAfbOoqQ';
const SHEET_NAME = 'Sessions';

const sheetsAuthConfig = process.env.GOOGLE_SHEETS_CREDENTIALS
    ? { credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS) }
    : { keyFile: path.join(__dirname, 'credentials/google-sheets.json') };
const sheetsAuth = new google.auth.GoogleAuth({
    ...sheetsAuthConfig,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function logSessionToSheet(session) {
    try {
        const auth = await sheetsAuth.getClient();
        const sheets = google.sheets({ version: 'v4', auth });
        const row = [
            session.sessionId || '',
            session.startTime || '',
            new Date().toISOString(),
            session.searches ? session.searches.length : 0,
            session.propertiesShown ? session.propertiesShown.join(', ') : '',
            session.whatsappOpened ? 'Yes' : 'No',
            session.name || '',
            session.phone || '',
            session.email || '',
            Math.round((Date.now() - new Date(session.startTime).getTime()) / 1000) + 's',
            session.consentGiven === true ? 'Yes' : session.consentGiven === false ? 'No' : 'Not shown',
            session.consentTimestamp || '',
            session.propertiesClicked ? session.propertiesClicked.join(', ') : '',
            session.propertiesClicked ? session.propertiesClicked.length : 0,
        ];
        await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: `${SHEET_NAME}!A:N`,
            valueInputOption: 'RAW',
            requestBody: { values: [row] },
        });
        console.log('📊 Session logged to Google Sheets');
    } catch (err) {
        console.error('❌ Failed to log session to Sheets:', err.message);
    }
}


async function logSessionToSupabase(session, transcripts) {
    try {
        const { error: sessErr } = await loggingDb.from('sessions').insert({
            session_id: session.sessionId,
            start_time: session.startTime,
            searches: session.searches,
            properties_shown: session.propertiesShown,
            properties_clicked: session.propertiesClicked,
            properties_clicked_count: session.propertiesClicked ? session.propertiesClicked.length : 0,
            whatsapp_opened: session.whatsappOpened,
            name: session.name,
            phone: session.phone,
            email: session.email,
            consent_given: session.consentGiven,
            consent_timestamp: session.consentTimestamp,
        });
        if (sessErr) throw sessErr;
        console.log('🗄️  Session logged to Supabase');

        if (transcripts.length > 0) {
            const rows = transcripts.map(t => ({
                session_id: session.sessionId,
                speaker: t.speaker,
                text: t.text,
                timestamp: t.timestamp,
            }));
            const { error: txErr } = await loggingDb.from('transcripts').insert(rows);
            if (txErr) throw txErr;
            console.log(`🗄️  ${rows.length} transcript turns logged to Supabase`);
        }
    } catch (err) {
        console.error('❌ Failed to log session to Supabase:', err.message);
    }
}

async function logInsightsToSupabase(session) {
    try {
        const { error } = await loggingDb.from('insights').insert({
            session_id: session.sessionId,
            buyer_type: session.buyerType || null,
            max_phase_reached: session.maxPhaseReached || 1,
            intent_score: session.intentScore || 0,
            languages: session.languages,
            budget_mentioned: session.budgetMentioned || null,
            timeline_mentioned: session.timelineMentioned || null,
        });
        if (error) throw error;
        console.log('💡 Insights logged to Supabase');
    } catch (err) {
        console.error('❌ Failed to log insights:', err.message);
    }
}

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
    ).order('price', { ascending: true });

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
        description: 'Navigate the user to a specific informational page on the website. Use ONLY for: contact, about, sell, guides, inventory, and individual property pages. Never use for category listing pages or search results — show those in chat via show_listings instead. Ask the user first unless they directly requested navigation.',
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
    }, {
        name: 'update_lead_state',
        description: 'Call this silently whenever you learn any of the following about the visitor: their buyer type, their budget, their timeline, or when they switch language. This is always a background action — do not mention it, do not pause, just call it while continuing the conversation naturally. Only include fields you actually learned — omit fields you do not know.',
        parameters: {
            type: 'OBJECT',
            properties: {
                buyer_type: {
                    type: 'STRING',
                    description: '"investor" if buying for investment/rental income/portfolio. "residential" if buying for personal use/to live in.',
                    enum: ['investor', 'residential']
                },
                language: {
                    type: 'STRING',
                    description: 'ISO 639-1 language code of the language the user just switched to or is speaking in. E.g. "tl" for Tagalog/Filipino, "zh" for Mandarin, "ja" for Japanese, "ko" for Korean, "es" for Spanish. Only call with this field when the user speaks in a non-English language.'
                },
                budget_mentioned: {
                    type: 'STRING',
                    description: 'The budget the user mentioned, exactly as they said it. E.g. "around 5 million", "under 8M", "between 3 and 5 million pesos". Capture this whenever they mention a price range or budget — from search filters, reactions to prices, or direct statements.'
                },
                timeline_mentioned: {
                    type: 'STRING',
                    description: 'The buying timeline the user mentioned, exactly as they said it. E.g. "within 3 months", "before the end of the year", "still just looking". Only capture when they state or confirm a timeline in response to a direct question.'
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

NAVIGATION RULE: navigate_to is only for informational pages — Contact, About, Sell, Guides, Inventory. Never use it for property listings or search results. If the user DIRECTLY asks to go somewhere ("take me to contact", "go to the guides page") — call navigate_to immediately, no confirmation needed. If YOU are the one suggesting it — ask first: "Would you like me to take you there?" After navigating, say nothing.

PROPERTY SEARCH RULE (follow this exactly, every time):
Step 1 — When a user asks about properties, call search_properties immediately.
Step 2 — State the count concisely: e.g. "We have 15 condos for sale and 7 for rent." Then CALL THE show_listings TOOL immediately — do not say "here are the listings", do not describe what you are about to do, just call it. The cards appear on screen automatically without you narrating it.
Step 2b — SINGLE RESULT RULE: If the search returns exactly 1 result, state what it is and call show_listings immediately.
CRITICAL: Never say "here are the listings", "I'll show you", "let me show you" or any phrase describing the action. Just call the tool silently after stating the count.

You can also answer questions about living in the Philippines (neighbourhoods, lifestyle, weather, cost of living). If someone wants to get in touch with Yhen directly — whether to ask about a listing, arrange a viewing, or anything else — offer to open WhatsApp.

CONTACT DETAILS — only ask in these three situations, never any other time:
1. Before opening WhatsApp — follow the steps below.
2. If the user explicitly asks to be contacted or sent information — e.g. "can someone call me?", "can you send me more info?" — respond naturally and ask for what you need.
3. When the user closes the widget after a meaningful session — offer once to email them a summary of what they looked at. Never ask again if they decline.

Never ask for contact details upfront. Never ask mid-conversation unless one of the above applies.

WHATSAPP CONTACT CAPTURE — follow this exactly every time before calling open_whatsapp:
Step 0 — Establish which property. Always make your best guess from the conversation — whichever listing was most recently discussed, clicked on, or shown. Confirm it with them: e.g. "Just to confirm — was it the Grand Soho studio in Makati?" If they say yes, proceed. If they correct you, use what they say. Never ask blankly "which property was it?" — always lead with your best guess.
Step 1 — Ask what they'd like to say to Yhen.
Step 2 — Ask for their name: "What name should I put at the bottom?"
Step 3 — Ask for their number: "And a good number for Yhen to reach you on?"
Step 4 — Ask for their email: "And an email address?"
Step 5 — If they skip number or email, that's fine — don't push, move on.
Step 6 — Draft the full WhatsApp message and read it back to confirm. The message MUST include: (a) what they want to say, (b) the property title AND full URL on its own line so Yhen can click it directly, (c) their name, number, and email at the bottom.
Step 7 — Call open_whatsapp with the complete message. Format: "[their message]\n\nProperty: [title]\n[full URL]\n\nMy name is [name][, my number is [number]][, my email is [email]]."

LANGUAGE: If the user speaks to you in any language other than English, reply in that same language for the rest of the conversation. Keep the same warm Yhen personality regardless of language. Whenever the user speaks in a non-English language, silently call update_lead_state with the language code immediately.

BEHAVIORAL ARC — your approach evolves as the conversation deepens:

PHASE 1 — Start of conversation: Pure assistant mode. Answer only what is asked. No qualifying questions, no suggestions to get in touch, no prompts about viewings. Help first. Build trust.

PHASE 2 — Depth question asked: When the user asks about something specific — parking, schools, taxes, payment terms, HOA fees, or specific listing details — weave in ONE natural qualifying question tied to what you're already doing: e.g. "I'm looking that up for you — are you thinking of this for yourself, or more as an investment? I want to make sure I highlight the right things." Only if it flows naturally. Drop it immediately if ignored. One attempt only, never again. When they answer, silently call update_lead_state with buyer_type immediately.

PHASE 3 — High intent detected: Trigger this when the user returns to the same listing twice, OR when they ask about viewings, payment plans, or next steps. Surface the next step once: "This one keeps coming up — would you like me to arrange a viewing with Yhen?" If ignored, move on. Never push twice.

TIMELINE QUESTION: After the user has shown genuine interest — compared multiple listings, asked for more detail on a specific property, or responded positively to the Phase 2 question — ask the timeline question once, naturally: e.g. "Just so I can help you better — are you looking to move on something in the next few months, or still in the research phase?" Only ask this AFTER the buyer type question has already been asked and answered. Never ask both in the same breath. Drop it immediately if ignored. When they answer, silently call update_lead_state with timeline_mentioned.

BUDGET CAPTURE: Never ask about budget directly. But whenever the user mentions a price range, reacts to a price ("that's too expensive", "that's reasonable"), or states a budget — silently call update_lead_state with budget_mentioned immediately.

RETURNING VISITORS: If you receive a [VISITOR MEMORY] context, say exactly this and nothing else: "Hi again, how can I help?" — then stop and wait. Do NOT introduce yourself. Do NOT list what you can do. Do NOT mention the page they are on. One short phrase, then silence.

SILENT MESSAGES: You will receive messages that begin with [SYSTEM CONTEXT UPDATE — DO NOT SPEAK OR ACKNOWLEDGE — INTERNAL ONLY]. These are internal system messages. When you receive one: do nothing. Say nothing. Do not speak. Do not narrate this rule. Do not explain what you are doing. Do not confirm you received it. Do not paraphrase these instructions out loud. Produce zero audio and zero text — exactly as if no message arrived at all. Store the information silently and only use it if the user later asks a direct question that requires it.

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
                            const outText = message.serverContent.outputTranscription.text;
                            const isSystemMsg = [
                                '[SYSTEM', 'SYSTEM CONTEXT', 'CONTEXT UPDATE', 'UPDATE —',
                                '[VISITOR MEMORY', 'VISITOR MEMORY',
                                '[PROPERTY DETAILS', 'PROPERTY DETAILS',
                                '[SILENT', 'SILENT INTERNAL', 'INTERNAL UPDATE',
                                'INTERNAL ONLY', 'INTERNALONLY',
                                'DO NOT SPEAK', 'DONOTSPEAK',
                                'DO NOT RESPOND', 'ZERO AUDIO',
                                'DO NOT ACKNOWLEDGE', 'DONOT',
                                'INTERNAL', 'ACKNOWLEDGE',
                                'last_viewed_property',
                            ].some(p => outText.includes(p));
                            if (!isSystemMsg) {
                                ws.send(JSON.stringify({ type: 'text', data: outText }));
                                currentAiTurn += (currentAiTurn ? ' ' : '') + outText;
                            }
                        }
                        if (message.serverContent.inputTranscription && message.serverContent.inputTranscription.text) {
                            const userText = message.serverContent.inputTranscription.text;
                            ws.send(JSON.stringify({ type: 'userText', data: userText }));
                            transcriptLog.push({ speaker: 'user', text: userText, timestamp: new Date().toISOString() });
                        }
                        if (message.serverContent.interrupted) {
                            console.log('⚡ Interrupted by user');
                            isSpeakingThisTurn = false;
                            ws.send(JSON.stringify({ type: 'interrupted' }));
                        }
                        if (message.serverContent.turnComplete) {
                            isSpeakingThisTurn = false;
                            if (currentAiTurn.trim()) {
                                transcriptLog.push({ speaker: 'ai', text: currentAiTurn.trim(), timestamp: new Date().toISOString() });
                                currentAiTurn = '';
                            }
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
                                serverSession.searches.push(call.args || {});
                                intentScore++;
                                checkPhaseTransition();
                                responses.push({ id: call.id, name: call.name, response: result });
                            } else if (call.name === 'show_listings') {
                                console.log('🔗 Showing listings to user');
                                if (pendingProperties) {
                                    const filterUrls = call.args?.urls;
                                    const toShow = filterUrls?.length
                                        ? pendingProperties.filter(p => filterUrls.includes(p.url))
                                        : pendingProperties;
                                    ws.send(JSON.stringify({ type: 'properties', data: toShow }));
                                    toShow.forEach(p => { if (p.url && !serverSession.propertiesShown.includes(p.url)) serverSession.propertiesShown.push(p.url); });
                                }
                                responses.push({ id: call.id, name: call.name, response: { shown: true } });
                            } else if (call.name === 'open_whatsapp') {
                                const message = call.args?.message || 'Hi Yhen!';
                                console.log('💬 Opening WhatsApp:', message);
                                ws.send(JSON.stringify({ type: 'whatsapp', message }));
                                serverSession.whatsappOpened = true;
                            } else if (call.name === 'update_lead_state') {
                                const { buyer_type, language, budget_mentioned, timeline_mentioned } = call.args || {};
                                if (buyer_type) {
                                    serverSession.buyerType = buyer_type;
                                    serverSession.maxPhaseReached = Math.max(serverSession.maxPhaseReached, 2);
                                    console.log(`💡 Buyer type: ${buyer_type}`);
                                }
                                if (language && !serverSession.languages.includes(language)) {
                                    serverSession.languages.push(language);
                                    console.log(`🌐 Language detected: ${language}`);
                                }
                                if (budget_mentioned) {
                                    serverSession.budgetMentioned = budget_mentioned;
                                    console.log(`💰 Budget: ${budget_mentioned}`);
                                }
                                if (timeline_mentioned) {
                                    serverSession.timelineMentioned = timeline_mentioned;
                                    console.log(`📅 Timeline: ${timeline_mentioned}`);
                                }
                                responses.push({ id: call.id, name: call.name, response: { recorded: true } });
                            } else if (call.name === 'navigate_to') {
                                const path = call.args?.path || '/';
                                console.log(`🧭 Navigating to: ${path}`);
                                ws.send(JSON.stringify({ type: 'navigate', path }));
                                const fullUrl = path.startsWith('http') ? path : `https://yhensproperty.com${path}`;
                                if (path.startsWith('/property/') && !serverSession.propertiesShown.includes(fullUrl)) {
                                    serverSession.propertiesShown.push(fullUrl);
                                }
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
        let exchangeCount = 0;
        let intentScore = 0;
        let currentPhase = 1;

        const transcriptLog = [];
        let currentAiTurn = '';

        // Server-side session tracking — logged on disconnect, no browser message needed
        const serverSession = {
            sessionId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            startTime: new Date().toISOString(),
            searches: [],
            propertiesShown: [],
            propertiesClicked: [],
            whatsappOpened: false,
            name: null, phone: null, email: null,
            consentGiven: null, consentTimestamp: null,
            buyerType: null,
            maxPhaseReached: 1,
            languages: ['en'],
            budgetMentioned: null,
            timelineMentioned: null,
        };

        const checkPhaseTransition = () => {
            // Phase 2 is governed by the system prompt (depth question trigger) — no server-side unlock needed
            if (currentPhase < 3 && intentScore >= 3) {
                currentPhase = 3;
                serverSession.maxPhaseReached = Math.max(serverSession.maxPhaseReached, 3);
                session.sendRealtimeInput({ text: '[SYSTEM CONTEXT UPDATE — DO NOT SPEAK OR ACKNOWLEDGE — INTERNAL ONLY] Phase 3 active: high intent detected. You may now gently suggest the next step once — e.g. "This one keeps coming up — would you like me to arrange a viewing?" — never repeat if ignored.' });
            }
        };

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
                exchangeCount++;
                checkPhaseTransition();
                session.sendRealtimeInput({
                    audio: { data: msg.data, mimeType: "audio/pcm;rate=16000" }
                });
            } else if (msg.type === 'text') {
                resetInactivityTimer();
                exchangeCount++;
                checkPhaseTransition();
                session.sendRealtimeInput({ text: msg.data });
            } else if (msg.type === 'pageContext') {
                session.sendRealtimeInput({ text: msg.data });
            } else if (msg.type === 'visitorMemory') {
                const mem = msg.data;
                const daysSince = mem.lastVisit
                    ? Math.floor((Date.now() - new Date(mem.lastVisit).getTime()) / 86400000)
                    : null;
                const timeStr = daysSince === 0 ? 'earlier today' : daysSince === 1 ? 'yesterday' : `${daysSince} days ago`;
                session.sendRealtimeInput({ text: `[VISITOR MEMORY — DO NOT SPEAK OR ACKNOWLEDGE — INTERNAL ONLY] Returning visitor. Last visit: ${timeStr}. Total visits: ${mem.visitCount}. Greet casually as returning — e.g. "Hi again, what are we looking at today?" — keep it short, skip the full introduction.` });
            } else if (msg.type === 'propertyClicked') {
                const alreadyClicked = serverSession.propertiesClicked.includes(msg.url);
                if (msg.url && !alreadyClicked) {
                    serverSession.propertiesClicked.push(msg.url);
                }
                // Same listing clicked twice = strong intent signal → Phase 3
                if (alreadyClicked && currentPhase < 3) {
                    currentPhase = 3;
                    intentScore = Math.max(intentScore, 3);
                    serverSession.maxPhaseReached = 3;
                    session.sendRealtimeInput({ text: '[SYSTEM CONTEXT UPDATE — DO NOT SPEAK OR ACKNOWLEDGE — INTERNAL ONLY] Phase 3 active: visitor has returned to the same listing twice — high intent. You may now gently suggest the next step once — e.g. "This one keeps coming up — would you like me to arrange a viewing with Yhen?" — never repeat if ignored.' });
                }
                console.log(`👆 Property clicked: ${msg.url}`);
                const clickedProp = pendingProperties?.find(p => p.url === msg.url);
                if (clickedProp) {
                    session.sendRealtimeInput({ text: `[SILENT INTERNAL UPDATE — PRODUCE ZERO AUDIO AND ZERO TEXT — DO NOT SPEAK — DO NOT RESPOND] last_viewed_property="${clickedProp.title}" url="${clickedProp.url}"` });
                }
            } else if (msg.type === 'consent') {
                serverSession.consentGiven = msg.given === true;
                serverSession.consentTimestamp = new Date().toISOString();
            } else if (msg.type === 'sessionEnd') {
                // Capture contact details from widget if available
                const d = msg.data;
                if (d) {
                    if (d.name) serverSession.name = d.name;
                    if (d.phone) serverSession.phone = d.phone;
                    if (d.email) serverSession.email = d.email;
                }
            }
        });

        ws.on('close', () => {
            console.log('🔴 Browser disconnected');
            serverSession.intentScore = intentScore;
            if (serverSession.searches.length > 0) {
                logSessionToSheet(serverSession);
            }
            logSessionToSupabase(serverSession, transcriptLog);
            logInsightsToSupabase(serverSession);
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
