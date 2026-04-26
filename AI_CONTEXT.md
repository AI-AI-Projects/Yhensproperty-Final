# AI Context: Yhen's Property

## 1. Project Overview
Yhen's Property is a boutique freelance Philippine real estate agency platform built and run by Yhen Oria — a licensed agent with 6 years experience specialising in helping expats and foreigners buy property legally in the Philippines. The platform serves as a property listing directory (buy/rent), an SEO/AEO-focused investor guide hub, and an admin portal for managing inventory and commissions.

The site also features a live voice AI assistant ("Yhen") powered by Gemini Live API — the first major feature of an AI property assistant product being developed for sale to other real estate agencies.

## 2. Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (container-queries, forms plugins)
- **Routing**: React Router v6
- **Deployment**: Netlify (auto-deploys from GitHub `main` branch)

### Backend / Data
- **Database**: Supabase (PostgreSQL, Storage, Auth)
- **Auth**: Supabase Auth with MFA (`MFAEnroll`, `MFAVerify`) behind `ProtectedRoute`

### Voice AI Server
- **Runtime**: Node.js (Express + ws WebSocket server)
- **AI Model**: Gemini 3.1 Flash Live (`gemini-3.1-flash-live-preview`) via `@google/genai`
- **Hosting**: Railway (deployed from `voice-test/` subdirectory of this repo)
- **Local dev**: `ws://localhost:3001` — switch to `wss://[railway-url]` for production

## 3. Key Architectural Patterns
- **Lazy Loading**: Routes lazy-loaded in `src/App.tsx` via `React.lazy` + `Suspense`
- **Component Structure**:
  - `src/pages/` — major route components (`Home`, `PropertyDetails`, `AdminDashboard`, `CategoryListings`, guides, etc.)
  - `src/pages/guides/` — SEO-optimised investor guide articles
  - `src/components/` — reusable UI (`Navbar`, `VoiceWidget`, `FloatingContactButtons`, `SEO`, etc.)
- **Data**: Supabase interactions via `src/services/supabaseClient.ts` and `PropertyService.ts`

## 4. Voice AI — VoiceWidget (`src/components/VoiceWidget.tsx`)

The widget is a floating bottom-left panel that connects to the voice server via WebSocket.

### Key behaviours
- `if (!import.meta.env.DEV) return null` — guards the widget to dev only until Railway is live; remove this line to enable on the live site
- WebSocket URL: `ws://localhost:3001` (dev) → `wss://[railway-url]` (production)
- Sends page context silently on every route change so Yhen knows what page the user is on
- On individual property pages, fetches full listing details from Supabase and sends them as context
- Session kept alive when minimised — session only ends when the user clicks X

### UI states
- **idle** — floating mic button only (small footprint)
- **connected** — panel expands automatically as content appears (dynamic height, max 580px desktop / full-screen mobile)
- **minimised** — panel hidden, mic button remains with pulsing green ring animation
- **muted** — mic button pulses red

### Panel features
- Status bar with live indicator dot, mute button, minimise button, end-session (X) button
- Speech transcript area (Yhen's responses + user text)
- Text input field (type instead of speak)
- Property cards (80×80px thumbnail + title/price/beds/location/link) — scrollable when multiple results

### Mobile
- Full-screen panel (`position: fixed; inset: 0`) on `≤768px`
- Floating mic button hidden while panel is open on mobile

## 5. Voice AI — Server (`voice-test/server.js`)

### Tools available to Gemini
- `search_properties` — queries Supabase with filters (beds, baths, price, location, type, listing_type)
- `show_listings` — sends property cards to the widget (always ask user first before calling)
- `navigate_to` — navigates the React app to any page path (uses React Router on the frontend)
- `open_whatsapp` — opens WhatsApp with a pre-filled message to Yhen

### Navigation with pre-filtered URLs
When navigating to a category page after a filtered search, the server appends URL params so the page loads pre-filtered. CategoryListings reads these on mount.

Supported params: `minPrice`, `maxPrice`, `bedrooms`, `bathrooms`, `location`, `type`

Example: `/category/buy-houses?bedrooms=2&maxPrice=10000000&location=BGC`

### Session management
- **Inactivity timeout**: 3 minutes (warns at 30 seconds before)
- **Max session length**: 15 minutes (warns at 1 minute before)
- Warnings spoken by Yhen and displayed as notifications in the widget
- IP rate limiting: discussed, not yet built

### Property search quirks
- House search uses `.or('type.ilike.%house%,type.ilike.%villa%').not('type','ilike','%warehouse%')` to avoid warehouse matching
- Houses and villas are treated as the same category for search purposes

## 6. CategoryListings (`src/pages/CategoryListings.tsx`)
- Reads URL params on mount and applies them as filters immediately
- Supports: `minPrice`, `maxPrice`, `beds`/`bedrooms`, `baths`/`bathrooms`, `location`, `type`, `property_type=studio`
- House type filter includes Villa: `['House', 'Villa'].includes(p.type)`
- Advanced filters panel: sqft range, lot size, date listed, sort, amenities (from `custom_amenities` Supabase table)

## 7. Design & Styling Guidelines
- **Theme**: Light and Dark mode via Tailwind `dark:` classes
- **Brand colour**: Lime Green (`#0df259` in widget, `#3DFF00` Tailwind primary) for highlights, logos, hover states
- **Logos**: `public/Image/LimeLogo2.svg`, `public/Image/LimeLogo_YP_1200.png`
- **Contact**: Floating WhatsApp buttons are critical for conversion

## 8. SEO / AEO
- All pages use `src/components/SEO.tsx` wrapper for meta tags
- Guide pages include JSON-LD structured data (`Article`, `FAQPage`) injected server-side via Netlify edge function for bot visibility
- Automated sitemap via `generate-sitemap.ts` for Google Search Console
- Image uploads use `browser-image-compression` to optimise mobile bandwidth

## 9. Development Rules for AI Agents
1. **Verify paths** before assuming — use Read/Glob tools, files live in `src/`
2. **Tailwind only** — use existing utility classes, avoid custom CSS unless necessary, always handle light and dark mode
3. **Preserve SEO** — any new or modified page must have `SEO.tsx` updated with correct meta tags and JSON-LD
4. **TypeScript** — define interfaces in `src/types.ts`, avoid `any`
5. **No page navigation in template widget** — the `navigate_to` tool and React Router `useNavigate` are Yhen-specific; strip them from the standalone `widget.js` template
6. **Widget guard** — `if (!import.meta.env.DEV) return null` must be removed before going live; do not remove it until the Railway URL is confirmed and set
