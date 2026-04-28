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

### `insights` table (Tier 3 data — derived intelligence)
| Column | Type | Description |
|---|---|---|
| session_id | text | Links to sessions table |
| buyer_type | text | "investor" or "residential" (null if not determined) |
| max_phase_reached | integer | 1, 2, or 3 — how deep the conversation went |
| intent_score | integer | Number of searches run in the session |

---

## Google Sheet — Columns (Tier 2 only)
A = Session ID | B = Start Time | C = End Time | D = Search Count | E = Properties Shown | F = WhatsApp Opened | G = Name | H = Phone | I = Email | J = Duration | K = Consent | L = Consent Timestamp | M = Properties Clicked (URLs) | N = Properties Clicked Count

---

## Phase System

The conversation has three phases. The AI self-governs based on these rules in its system prompt. The server also monitors signals and sends silent context updates.

### Phase 1 — Pure assistant
Default state. Only answers what is asked. No qualifying questions, no viewing suggestions, no contact prompts.

### Phase 2 — Depth question asked
**Trigger:** User asks a depth question (parking, schools, taxes, payment terms, HOA fees, specific listing details).
**What happens:** Gemini weaves in ONE natural qualifying question: *"I'm looking that up for you — are you thinking of this for yourself, or more as an investment? I want to make sure I highlight the right features."*
**If ignored:** Drops it immediately, never asks again.
**Server action:** If user answers, Gemini calls `update_lead_state` tool silently → `buyer_type` saved to `insights` table + `maxPhaseReached` updated to 2.

### Phase 3 — High intent
**Triggers (any one of these):**
- `intentScore >= 3` (3 or more searches run in the session)
- Same listing clicked twice by the user
- User asks about viewings, payment plans, or next steps

**What happens:** Gemini suggests once: *"This one keeps coming up — would you like me to arrange a viewing with Yhen?"* Never repeats if ignored.
**Server action:** Sends silent context update to Gemini, sets `maxPhaseReached` to 3.

---

## Tools Available to Gemini

| Tool | What it does |
|---|---|
| `search_properties` | Queries Supabase listings DB with filters (beds, baths, type, location, price, listing_type) |
| `show_listings` | Sends property cards to the browser widget — never narrated, called silently |
| `open_whatsapp` | Opens WhatsApp with pre-filled message. Follows 7-step contact capture flow. |
| `navigate_to` | Navigates browser to an informational page (Contact, About, Sell, Guides, Inventory). Never used for listing pages. |
| `update_lead_state` | Silent tool — called when user reveals buyer type. Writes to insights table. No audio response. |

---

## WhatsApp Contact Capture Flow (7 steps)
Before calling `open_whatsapp`, Gemini always follows these steps:
0. Confirm which property (best guess from conversation — never ask blankly)
1. Ask what they'd like to say to Yhen
2. Ask for their name
3. Ask for their number
4. Ask for their email
5. Read back the full draft message for confirmation
6. Call `open_whatsapp` with formatted message including property title + URL on its own line

---

## Session Limits
- Max session: 15 minutes (then ends with audio notification)
- Inactivity timeout: 3 minutes of silence
- Warning: 1 minute before max session, 30 seconds before inactivity cutoff

---

## Tier Model (Business)
- **Tier 1** — AI widget only. No reporting. No Google Sheet needed.
- **Tier 2** — Weekly email report. Pulls from `sessions` table + Google Sheet. Basic engagement metrics. Does NOT get transcript or insights data.
- **Tier 3** — AI analysis. Pulls from `sessions` + `transcripts` + `insights`. Full buyer profiling, conversation analysis. Raw transcript data stays with Yhen — clients get AI-generated insights only.

---

## Key Architecture Decisions
- **Two separate Supabase projects** — listings DB (client-visible) vs logging DB (Yhen-only). Never mix them.
- **Audio-only mode** — Gemini outputs audio only (`responseModalities: ["AUDIO"]`). No parseable text stream. Any hidden JSON or [[STATE]] block ideas won't work without changing the response modality.
- **Context caching not available** — Gemini Live API does not support `cachedContent` as of April 2026. System prompt is sent fresh on every `ai.live.connect()` call.
- **Google Sheets runs alongside Supabase** — Sheets is Tier 2 session data only. Supabase captures everything including transcripts and insights.
- **Railway deployment** — always deploy from the `voice-test` directory: `cd voice-test && railway up --service cooperative-vibrancy --detach`
- **Both GitHub remotes** — always push to both: `git push origin main && git push yhensproperty main` (Netlify watches the `yhensproperty` remote)
- **Transcript buffering** — `outputTranscription` fires per token. Chunks are buffered in `currentAiTurn` and flushed as a full sentence on `turnComplete`. System messages are filtered before logging.
