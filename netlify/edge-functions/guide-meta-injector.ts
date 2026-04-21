import type { Context } from "https://edge.netlify.com";

const BOT_UA_FRAGMENTS = [
  "facebookexternalhit", "facebot", "twitterbot", "linkedinbot",
  "whatsapp", "telegrambot", "slackbot", "discordbot",
  "googlebot", "bingbot", "applebot", "embedly",
  "vkshare", "ia_archiver", "rogerbot", "showyoubot",
  "bufferbot", "pinterest", "outbrain",
  "grok", "xai", "perplexitybot", "claudebot", "anthropic-ai",
  "chatgpt-user", "gptbot", "cohere-ai", "semrushbot",
  "ahrefsbot", "mj12bot", "dotbot",
];

interface GuideMeta {
  title: string;
  description: string;
  canonical: string;
  articleSchema: object;
  faqSchema?: object;
}

const GUIDE_META: Record<string, GuideMeta> = {
  "foreigner-property-ownership": {
    title: "Can Foreigners Legally Buy & Own Property in the Philippines? 2026 Rules | Yhen's Property",
    description: "Is it safe for Americans, Canadians, Australians, and Europeans to buy property in the Philippines? Understand the 40% condo cap, CCT vs TCT ownership, and how to invest safely in 2026.",
    canonical: "https://yhensproperty.com/guides/foreigner-property-ownership",
    articleSchema: {
      "@context": "https://schema.org", "@type": "Article",
      "headline": "Can Foreigners Legally Buy & Own Property in the Philippines? 2026 Rules",
      "description": "Is it safe for Americans, Canadians, Australians, and Europeans to buy property in the Philippines? Understand the 40% condo cap, CCT vs TCT ownership, and how to invest safely in 2026.",
      "author": { "@type": "Person", "name": "Yhen", "jobTitle": "Licensed Real Estate Broker" },
      "publisher": { "@type": "Organization", "name": "Yhens Property" },
      "datePublished": "2025-01-01", "dateModified": "2026-04-22",
      "url": "https://yhensproperty.com/guides/foreigner-property-ownership",
    },
  },
  "ra-12252-99-year-lease": {
    title: "RA 12252 Explained: The New 99-Year Lease for Foreign Investors in the Philippines | 2026 Update",
    description: "99 year lease Philippines foreign ownership 2026 update. Learn how RA 12252 replaced the old 25+25 lease structure, giving foreigners near-permanent land rights to build homes and businesses.",
    canonical: "https://yhensproperty.com/guides/ra-12252-99-year-lease",
    articleSchema: {
      "@context": "https://schema.org", "@type": "Article",
      "headline": "RA 12252 Explained: The New 99-Year Lease for Foreign Investors in the Philippines",
      "description": "99 year lease Philippines foreign ownership 2026 update. Learn how RA 12252 replaced the old 25+25 lease structure, giving foreigners near-permanent land rights to build homes and businesses.",
      "author": { "@type": "Person", "name": "Yhen", "jobTitle": "Licensed Real Estate Broker" },
      "publisher": { "@type": "Organization", "name": "Yhens Property" },
      "datePublished": "2025-01-01", "dateModified": "2026-04-22",
      "url": "https://yhensproperty.com/guides/ra-12252-99-year-lease",
    },
  },
  "bgc-makati-batangas-rental-yields": {
    title: "BGC vs. Makati vs. Batangas: Best Places to Buy & Rent Out Property in Manila | 2026 Guide",
    description: "Best places for foreigners to buy and rent out property in Manila. Data-driven 2026 comparison of BGC, Makati, and Batangas rental yields, capital appreciation, and investment strategy.",
    canonical: "https://yhensproperty.com/guides/bgc-makati-batangas-rental-yields",
    articleSchema: {
      "@context": "https://schema.org", "@type": "Article",
      "headline": "BGC vs. Makati vs. Batangas: Where to Buy for the Best Rental Yields (2026)",
      "description": "Data-driven 2026 comparison of BGC, Makati, and Batangas rental yields, capital appreciation, and investment strategy.",
      "author": { "@type": "Person", "name": "Yhen", "jobTitle": "Licensed Real Estate Broker" },
      "publisher": { "@type": "Organization", "name": "Yhens Property" },
      "datePublished": "2025-01-01", "dateModified": "2026-04-22",
      "url": "https://yhensproperty.com/guides/bgc-makati-batangas-rental-yields",
    },
  },
  "retiring-philippines-srrv": {
    title: "Retiring in the Philippines: Buy a Home with an SRRV or Dual Citizenship | 2026 Guide",
    description: "Can I buy a house in the Philippines with a retirement visa? Complete 2026 guide for retirees on SRRV visas, Balikbayan rights, and how Dual Citizens can own land and houses without restrictions.",
    canonical: "https://yhensproperty.com/guides/retiring-philippines-srrv",
    articleSchema: {
      "@context": "https://schema.org", "@type": "Article",
      "headline": "Retiring in the Philippines: How to Buy a Home with an SRRV or Dual Citizenship",
      "description": "Complete 2026 guide for retirees on SRRV visas, Balikbayan rights, and how Dual Citizens can own land and houses without restrictions.",
      "author": { "@type": "Person", "name": "Yhen", "jobTitle": "Licensed Real Estate Broker" },
      "publisher": { "@type": "Organization", "name": "Yhens Property" },
      "datePublished": "2025-01-01", "dateModified": "2026-04-22",
      "url": "https://yhensproperty.com/guides/retiring-philippines-srrv",
    },
  },
  "selling-guide-non-resident": {
    title: "Selling Real Estate in Philippines as a Non-Resident: The Foreigner's Guide 2026 | Yhen's Property",
    description: "Selling real estate in Philippines as a non-resident. Complete guide on Capital Gains Tax, finding buyers, remitting proceeds abroad, and the legal exit strategy for foreign property investors.",
    canonical: "https://yhensproperty.com/guides/selling-guide-non-resident",
    articleSchema: {
      "@context": "https://schema.org", "@type": "Article",
      "headline": "Selling Real Estate in the Philippines as a Non-Resident: The Complete Guide",
      "description": "Complete guide on Capital Gains Tax, finding buyers, remitting proceeds abroad, and the legal exit strategy for foreign property investors.",
      "author": { "@type": "Person", "name": "Yhen", "jobTitle": "Licensed Real Estate Broker" },
      "publisher": { "@type": "Organization", "name": "Yhens Property" },
      "datePublished": "2025-01-01", "dateModified": "2026-04-22",
      "url": "https://yhensproperty.com/guides/selling-guide-non-resident",
    },
  },
  "philippines-property-buyers-guide": {
    title: "Philippines Property Buyer's Guide 2026: All Fees, Taxes & Steps | Yhen's Property",
    description: "The complete guide to buying property in the Philippines. Every fee, every tax, every legal step — from reservation to title transfer. Clear, honest, and updated for 2026.",
    canonical: "https://yhensproperty.com/guides/philippines-property-buyers-guide",
    articleSchema: {
      "@context": "https://schema.org", "@type": "Article",
      "headline": "Philippines Property Buyer's Guide 2026: Every Fee, Tax & Step Explained",
      "description": "The complete guide to buying property in the Philippines. Every fee, every tax, every legal step — from reservation to title transfer.",
      "author": { "@type": "Person", "name": "Yhen", "jobTitle": "Licensed Real Estate Broker" },
      "publisher": { "@type": "Organization", "name": "Yhens Property" },
      "datePublished": "2025-01-01", "dateModified": "2026-04-22",
      "url": "https://yhensproperty.com/guides/philippines-property-buyers-guide",
    },
  },
  "union-village-quezon-city": {
    title: "Union Village Quezon City: Neighbourhood Guide for Families, OFW Investors & Professionals | 2026",
    description: "Is Union Village QC good for families, investment, or young professionals? Complete 2026 guide: landmarks, schools, transport, property prices, and rental demand near UP Diliman and Ateneo.",
    canonical: "https://yhensproperty.com/guides/union-village-quezon-city",
    articleSchema: {
      "@context": "https://schema.org", "@type": "Article",
      "headline": "Union Village, Quezon City: The Complete Neighbourhood Guide (2026)",
      "description": "Is Union Village QC good for families, investment, or young professionals? Complete 2026 guide covering landmarks, schools, transport, property prices, and rental demand.",
      "author": { "@type": "Person", "name": "Yhen", "jobTitle": "Licensed Real Estate Broker" },
      "publisher": { "@type": "Organization", "name": "Yhens Property" },
      "datePublished": "2026-04-10", "dateModified": "2026-04-22",
      "url": "https://yhensproperty.com/guides/union-village-quezon-city",
    },
  },
  "bgc-taguig-neighbourhood-guide": {
    title: "BGC Taguig Neighbourhood Guide 2026: Things To Do, Restaurants, Property & Investment | Yhens Property",
    description: "BGC Taguig 2026: condo prices \u20b16.8M\u2013\u20b1250M+, rental yields 4\u20136%, flood-free, walkable, St. Luke\u2019s hospital on-site, international schools nearby. Metro Manila\u2019s top address for expats & OFW investors.",
    canonical: "https://yhensproperty.com/guides/bgc-taguig-neighbourhood-guide",
    articleSchema: {
      "@context": "https://schema.org", "@type": "Article",
      "headline": "BGC Taguig Neighbourhood Guide 2026: Living, Investing & Things To Do in Bonifacio Global City",
      "description": "The complete guide to Bonifacio Global City — restaurants, things to do, hospitals, international schools, property prices, rental yields, and why BGC is the top choice for expats, OFW investors, and high-income professionals.",
      "author": { "@type": "Person", "name": "Yhen", "jobTitle": "Licensed Real Estate Broker" },
      "publisher": { "@type": "Organization", "name": "Yhens Property" },
      "datePublished": "2026-04-21", "dateModified": "2026-04-22",
      "url": "https://yhensproperty.com/guides/bgc-taguig-neighbourhood-guide",
    },
    faqSchema: {
      "@context": "https://schema.org", "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is there to do in BGC?", "acceptedAnswer": { "@type": "Answer", "text": "BGC offers the Mind Museum, BGC Arts Center, Track 30th urban park, a 70+ mural street art trail, Bonifacio High Street dining and retail, The Grid Food Market, Serendra, and some of Metro Manila's best restaurants and fitness studios — all within walking distance of each other." } },
        { "@type": "Question", "name": "Is BGC walkable?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. BGC is the most walkable neighbourhood in Metro Manila. Wide, clean pavements, pedestrian crossings, and a compact grid layout mean residents can walk between their condo, office, restaurant, gym, and mall without needing a car or Grab." } },
        { "@type": "Question", "name": "Is BGC good for families?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, particularly for expat families. International School Manila and British School Manila are both within 10\u201315 minutes. St. Luke's Medical Center BGC is on-site. The walkable, flood-free environment and the Mind Museum make it one of Metro Manila's most family-friendly urban addresses." } },
        { "@type": "Question", "name": "Can foreigners buy property in BGC?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. BGC condominium units are CCT-eligible, allowing foreign nationals to hold freehold title directly. The 40% foreign ownership quota applies per building. BGC is one of the most legally straightforward places for foreigners to buy property in the Philippines." } },
        { "@type": "Question", "name": "What is the rental yield in BGC?", "acceptedAnswer": { "@type": "Answer", "text": "BGC rental yields typically range from 4% to 6% per annum gross. Studios and 1-bedroom units in well-managed buildings generally perform strongest. The expat and multinational tenant pool provides high payment reliability and low vacancy rates." } },
        { "@type": "Question", "name": "Is BGC better than Makati for investment?", "acceptedAnswer": { "@type": "Answer", "text": "BGC offers newer buildings, a more international tenant profile, and slightly higher rental yields. Makati offers a lower entry price with stable income. For investors targeting expat tenants and premium yields, BGC is the stronger choice." } },
        { "@type": "Question", "name": "Is BGC flood-free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. BGC was purpose-built on elevated land with a modern underground drainage system. It does not flood during typhoon season \u2014 a significant advantage over most of Metro Manila." } },
        { "@type": "Question", "name": "How far is BGC from NAIA airport?", "acceptedAnswer": { "@type": "Answer", "text": "Approximately 20\u201335 minutes via the Skyway or C5, depending on traffic. BGC is one of the closest major residential and business districts to NAIA in Metro Manila." } },
        { "@type": "Question", "name": "Are there hospitals in BGC?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. St. Luke's Medical Center BGC is located within Bonifacio Global City itself \u2014 one of the Philippines' top-ranked private hospitals. The Medical City in Pasig is approximately 15 minutes away via C5." } },
        { "@type": "Question", "name": "What are the best restaurants in BGC?", "acceptedAnswer": { "@type": "Answer", "text": "BGC has one of the highest concentrations of quality restaurants in the Philippines. The Grid Food Market is a curated food hall with multiple restaurant concepts. Bonifacio High Street and Serendra offer al fresco international dining. Burgos Circle is the go-to for nightlife and cocktails." } },
        { "@type": "Question", "name": "Is BGC a good place to live in 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Yes \u2014 BGC consistently ranks as the most liveable neighbourhood in Metro Manila. Flood-free streets, walkable access to restaurants, offices, gyms, and hospitals, a genuine international community, and continued development in Uptown Bonifacio and McKinley West make 2026 one of the strongest years for BGC quality of life." } },
        { "@type": "Question", "name": "How much does it cost to live in BGC per month?", "acceptedAnswer": { "@type": "Answer", "text": "Budget roughly \u20b160,000\u2013\u20b1100,000/month for a comfortable lifestyle in a 1-bedroom condo \u2014 covering rent (\u20b135,000\u2013\u20b160,000), daily meals, utilities, gym, and transport. Ultra-premium living in a 3BR can exceed \u20b1250,000/month." } },
        { "@type": "Question", "name": "How safe is BGC at night?", "acceptedAnswer": { "@type": "Answer", "text": "BGC is one of the safest areas in Metro Manila at night. The area is well-lit with visible security presence, CCTV coverage, and a compact layout that keeps foot traffic high into the late evening." } },
        { "@type": "Question", "name": "How is commuting from BGC to Makati or Ortigas?", "acceptedAnswer": { "@type": "Answer", "text": "BGC to Makati CBD takes 10\u201325 minutes by car or Grab off-peak; Ortigas is 20\u201340 minutes via C5. The BGC Bus (\u20b113\u2013\u20b115) runs frequent routes to Ayala MRT station." } },
        { "@type": "Question", "name": "What areas or clusters within BGC are best for buying or renting?", "acceptedAnswer": { "@type": "Answer", "text": "Bonifacio High Street and Serendra are popular for lifestyle access. Uptown Bonifacio near SM Aura is the newest cluster with premium new builds. Burgos Circle appeals to young professionals for nightlife proximity." } },
        { "@type": "Question", "name": "BGC vs McKinley Hill vs Arca South \u2014 which is better?", "acceptedAnswer": { "@type": "Answer", "text": "BGC is the most established and liquid \u2014 best for rental income and foreign buyers. McKinley Hill is quieter and slightly cheaper. Arca South is the newest Taguig development with lower entry prices but still maturing in amenities. For maximum tenant demand and resale value, BGC leads." } },
      ],
    },
  },
};

function isSocialBot(ua: string): boolean {
  const lower = ua.toLowerCase();
  return BOT_UA_FRAGMENTS.some((f) => lower.includes(f));
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default async function handler(req: Request, ctx: Context): Promise<Response> {
  const { pathname } = new URL(req.url);
  const ua = req.headers.get("user-agent") ?? "";

  const match = pathname.match(/^\/guides\/([^/]+)\/?$/);
  if (!match || !isSocialBot(ua)) {
    return ctx.next();
  }

  const slug = match[1];
  const meta = GUIDE_META[slug];
  if (!meta) {
    return ctx.next();
  }

  const res = await ctx.next();
  const html = await res.text();

  const ogImage = "https://yhensproperty.com/Image/Hero_Villa_2.webp";
  const schemaTag = `<script type="application/ld+json">${JSON.stringify(meta.articleSchema)}</script>`
    + (meta.faqSchema ? `<script type="application/ld+json">${JSON.stringify(meta.faqSchema)}</script>` : "");

  const injected = html
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${escapeHtml(meta.description)}">`
    )
    .replace(
      /<meta property="og:title"[^>]*>/,
      `<meta property="og:title" content="${escapeHtml(meta.title)}">`
    )
    .replace(
      /<meta property="og:description"[^>]*>/,
      `<meta property="og:description" content="${escapeHtml(meta.description)}">`
    )
    .replace(
      /<meta property="og:type"[^>]*>/,
      `<meta property="og:type" content="article">`
    )
    .replace(
      /<\/head>/,
      `<meta property="og:url" content="${meta.canonical}">
<meta property="og:image" content="${ogImage}">
<link rel="canonical" href="${meta.canonical}">
${schemaTag}
</head>`
    );

  return new Response(injected, {
    status: res.status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
      vary: "user-agent",
    },
  });
}
