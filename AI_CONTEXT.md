# Yhen's Property — AI Voice Agent: System Context

This document describes the full architecture of the Yhen's Property AI voice agent. Read this first before making any changes to the system.

---

## Stack Overview

| Layer | What it is |
|---|---|
| **Frontend** | React app (Vite + TypeScript). Voice widget lives in `src/components/VoiceWidget.tsx` |
| **Server** | Node.js (`voice-test/server.js`) deployed on Railway, service name: `cooperative-vibrancy` |
| **AI** | Gemini Live API — model `gemini-3.1-flash-live-preview` via `@google/genai` SDK |
| **Listings DB** | Supabase project (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) — `properties` table |
| **Logging DB** | Supabase project (SUPABASE_URL / SUPABASE_SERVICE_KEY) — transcript logging project |
| **Session Logging** | Google Sheets — one row per session, Tier 2 data only |

---

## How a Session Works

1. User opens the widget → browser opens WebSocket to Railway server
2. Railway server opens a Gemini Live session (`ai.live.connect()`) — audio-only mode (`responseModalities: ["AUDIO"]`)
3. Browser streams mic audio → Railway → Gemini. Gemini streams audio back → Railway → browser
4. On session close: server logs to Google Sheets + Supabase (sessions + transcripts + insights tables)

---

## Supabase Logging Project — Tables

### `sessions` table (Tier 2 data — basic engagement metrics)
| Column | Type | Description |
|---|---|---|
| session_id | text | Unique session ID |
| start_time | timestamptz | Session start |
| searches | jsonb | Array of search parameter objects |
| properties_shown | text[] | URLs of properties shown in widget |
| properties_clicked | text[] | URLs of properties the user clicked on |
| properties_clicked_count | integer | Count of distinct properties clicked |
| whatsapp_opened | boolean | Whether WhatsApp was opened via AI |
| name | text | Captured name (from WhatsApp flow) |
| phone | text | Captured phone |
| email | text | Captured email |
| consent_given | boolean | Cookie consent |
| consent_timestamp | timestamptz | When consent was given |

### `transcripts` table (Tier 3 data — raw conversation)
| Column | Type | Description |
|---|---|---|
| session_id | text | Links to sessions table |
| speaker | text | "ai" or "user" |
| text | text | Full sentence (buffered — not word fragments) |
| timestamp | timestamptz | Turn timestamp |

### `insights` table (Tier 3 data — derived intelligence, calculated at session close)
| Column | Type | Description |
|---|---|---|
| session_id | text | Links to sessions table |
| buyer_type | text | "investor" or "residential" — captured via update_lead_state tool when user answers Phase 2 question |
| conversation_depth | integer | 1–4 scale of how serious the conversation was (see below) |
| lead_intent_score | integer | 0–100 weighted heat score (see below) |
| strongest_signals | text[] | Array of key signals detected e.g. ["whatsapp_opened", "budget_given"] |
| languages | text[] | Language codes spoken e.g. ["en", "tl"] — starts as ["en"], adds codes on switch |
| budget_mentioned | text | Free text exactly as said — e.g. "around 5 million", "under 8M" |
| timeline_mentioned | text | Free text exactly as said — e.g. "before end of year", "not in a rush" |

---

## Conversation Depth Scale (1–4)
Calculated server-side at session close from behavioural signals — not search counts.

| Depth | Label | What happened |
|---|---|---|
| 1 | Discovery | Basic browsing. Searched and looked at listings. No depth signals detected. |
| 2 | Investigation | User answered the buyer type question (investor vs residential). They're genuinely evaluating. |
| 3 | Commitment | User returned to the same listing twice. Showed clear preference and intent. |
| 4 | Conversion | User opened WhatsApp OR gave contact details (name/phone/email). Actively engaged with Yhen. |

**Why this matters for reporting:** "60% of sessions stayed at depth 1, 25% reached depth 2, 10% reached depth 3, 5% converted to depth 4" tells you exactly where the funnel is leaking — and whether the AI's scripts at each stage need improvement.

---

## Lead Intent Score (0–100)
A weighted heat score calculated at session close from multiple signals. Higher = hotter lead.

| Signal | Points |
|---|---|
| WhatsApp opened | +40 |
| Same listing clicked twice | +20 |
| Budget mentioned | +15 |
| Timeline mentioned | +10 |
| Buyer type captured | +10 |
| Searches run (1pt each, max 5) | +5 |
| **Maximum possible** | **100** |

**Why this matters:** Lets you sort leads by heat without reading transcripts. A score of 80 means WhatsApp + budget + buyer type — that's a hot lead. A score of 5 means they ran a few searches and left.

---

## Strongest Signals Array
Tags automatically applied at session close based on what happened. Used for quick scanning in reports.

Possible values: `whatsapp_opened`, `same_listing_twice`, `budget_given`, `timeline_given`, `buyer_type_given`, `multiple_searches` (3+), `multiple_properties_clicked` (3+)

---

## Google Sheet — Columns (Tier 2 only)
A = Session ID | B = Start Time | C = End Time | D = Search Count | E = Properties Shown | F = WhatsApp Opened | G = Name | H = Phone | I = Email | J = Duration | K = Consent | L = Consent Timestamp | M = Properties Clicked (URLs) | N = Properties Clicked Count

---

## Phase System

The conversation has three phases. The AI self-governs based on system prompt rules. The server monitors behavioural signals and sends silent context updates where needed.

### Phase 1 — Discovery
Default state. Only answers what is asked. No qualifying questions, no viewing suggestions, no contact prompts. Build trust first.

### Phase 2 — Investigation
**Trigger:** User asks a depth question — parking, schools, taxes, payment terms, HOA fees, specific listing details.
**What happens:** Gemini weaves in ONE natural qualifying question while answering: *"I'm looking that up for you — are you thinking of this for yourself, or more as an investment? I want to make sure I highlight the right things."*
**If ignored:** Drops it immediately, never asks again.
**Data capture:** If answered, Gemini silently calls `update_lead_state` with `buyer_type`.
**Then:** After buyer type is confirmed and the user goes deeper (compares listings, asks more detail), Gemini asks the timeline question once: *"Just so I can help you better — are you looking to move on something in the next few months, or still in the research phase?"*

### Phase 3 — Commitment
**Server trigger:** Same listing clicked twice — server sends silent Phase 3 context update to Gemini.
**AI trigger (system prompt):** User asks about viewings, reservation fees, payment process, or next steps.
**What happens:** Gemini suggests once: *"This one keeps coming up — would you like me to arrange a viewing with Yhen?"* Never repeats if ignored.

### Phase 4 (implicit — tracked in data, not a prompt state)
WhatsApp opened or contact details given. This is the conversion event. Tracked in `sessions` (whatsapp_opened) and reflected in `conversation_depth = 4` in insights.

---

## Tools Available to Gemini

| Tool | What it does |
|---|---|
| `search_properties` | Queries Supabase listings DB with filters (beds, baths, type, location, price, listing_type) |
| `show_listings` | Sends property cards to the browser widget — called silently, never narrated |
| `open_whatsapp` | Opens WhatsApp with pre-filled message. Follows 7-step contact capture flow. |
| `navigate_to` | Navigates browser to informational pages only (Contact, About, Sell, Guides, Inventory). Never listing pages. |
| `update_lead_state` | Silent background tool. Called when Gemini learns: buyer_type, language switch, budget, or timeline. No audio response. All fields optional — only pass what was actually learned. |

---

## update_lead_state — When Gemini Calls It
- **buyer_type** — when user answers the Phase 2 qualifying question
- **language** — immediately when user speaks a non-English language (ISO 639-1 code e.g. "tl", "zh", "ko")
- **budget_mentioned** — whenever user mentions a price range or reacts to a price ("that's too expensive", "under 5 million")
- **timeline_mentioned** — when user answers the timeline question

---

## WhatsApp Contact Capture Flow
Before calling `open_whatsapp`, Gemini always follows these steps:
0. Confirm which property (best guess from conversation — never ask blankly)
1. Ask what they'd like to say to Yhen
2. Ask for their name
3. Ask for their number
4. Ask for their email (optional — don't push)
5. Read back the full draft message for confirmation
6. Call `open_whatsapp` with formatted message including property title + full URL on its own line

---

## Session Limits
- Max session: 15 minutes (ends with audio notification)
- Inactivity timeout: 3 minutes of silence
- Warning: 1 minute before max session, 30 seconds before inactivity cutoff

---

## Tier Model (Business)
- **Tier 1** — AI widget only. No reporting. No Google Sheet needed.
- **Tier 2** — Weekly email report. Sessions data only. Basic engagement metrics: visitor count, searches, clicks, WhatsApp opens, duration. No transcript or insights data.
- **Tier 3** — Weekly AI-generated intelligence report. Sessions + transcripts + insights. Buyer type breakdown, heat scores, language distribution, budget ranges, funnel depth analysis. Raw data stays with Yhen — clients receive AI-written insights only.
- **Custom Lead Qualification** — Separate charge on top of Tier 3. Bespoke phase logic built to the client's specific criteria (e.g. only flag a lead if they mention a specific area AND budget over X AND buying within 3 months). One-time setup fee.

---

## Key Architecture Decisions
- **Two separate Supabase projects** — listings DB (client-visible, VITE_ env vars) vs logging DB (Yhen-only, SUPABASE_ env vars). Never mix them.
- **Audio-only mode** — `responseModalities: ["AUDIO"]`. Gemini outputs audio only — no parseable text stream. Hidden JSON blocks or [[STATE]] ideas won't work without changing this.
- **Context caching not available** — Gemini Live API does not support `cachedContent` as of April 2026. System prompt sent fresh on every `ai.live.connect()` call.
- **All scoring calculated at session close** — conversation_depth, lead_intent_score, strongest_signals are all derived from serverSession data at disconnect. No real-time scoring calls needed during the conversation.
- **Transcript buffering** — `outputTranscription` fires per token. Buffered in `currentAiTurn`, flushed as full sentence on `turnComplete`. System messages filtered before logging.
- **Google Sheets runs alongside Supabase** — not replaced. Sheets = Tier 2 session data. Supabase = full logging.
- **Railway deployment** — always deploy from `voice-test` directory: `cd voice-test && railway up --service cooperative-vibrancy --detach`
- **Both GitHub remotes** — always push to both: `git push origin main && git push yhensproperty main` (Netlify watches `yhensproperty` remote)
