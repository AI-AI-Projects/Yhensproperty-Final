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

const GUIDE_META: Record<string, { title: string; description: string; canonical: string }> = {
  "foreigner-property-ownership": {
    title: "Can Foreigners Legally Buy & Own Property in the Philippines? 2026 Rules | Yhen's Property",
    description: "Is it safe for Americans, Canadians, Australians, and Europeans to buy property in the Philippines? Understand the 40% condo cap, CCT vs TCT ownership, and how to invest safely in 2026.",
    canonical: "https://yhensproperty.com/guides/foreigner-property-ownership",
  },
  "ra-12252-99-year-lease": {
    title: "RA 12252 Explained: The New 99-Year Lease for Foreign Investors in the Philippines | 2026 Update",
    description: "99 year lease Philippines foreign ownership 2026 update. Learn how RA 12252 replaced the old 25+25 lease structure, giving foreigners near-permanent land rights to build homes and businesses.",
    canonical: "https://yhensproperty.com/guides/ra-12252-99-year-lease",
  },
  "bgc-makati-batangas-rental-yields": {
    title: "BGC vs. Makati vs. Batangas: Best Places to Buy & Rent Out Property in Manila | 2026 Guide",
    description: "Best places for foreigners to buy and rent out property in Manila. Data-driven 2026 comparison of BGC, Makati, and Batangas rental yields, capital appreciation, and investment strategy.",
    canonical: "https://yhensproperty.com/guides/bgc-makati-batangas-rental-yields",
  },
  "retiring-philippines-srrv": {
    title: "Retiring in the Philippines: Buy a Home with an SRRV or Dual Citizenship | 2026 Guide",
    description: "Can I buy a house in the Philippines with a retirement visa? Complete 2026 guide for retirees on SRRV visas, Balikbayan rights, and how Dual Citizens can own land and houses without restrictions.",
    canonical: "https://yhensproperty.com/guides/retiring-philippines-srrv",
  },
  "selling-guide-non-resident": {
    title: "Selling Real Estate in Philippines as a Non-Resident: The Foreigner's Guide 2026 | Yhen's Property",
    description: "Selling real estate in Philippines as a non-resident. Complete guide on Capital Gains Tax, finding buyers, remitting proceeds abroad, and the legal exit strategy for foreign property investors.",
    canonical: "https://yhensproperty.com/guides/selling-guide-non-resident",
  },
  "philippines-property-buyers-guide": {
    title: "Philippines Property Buyer's Guide 2026: All Fees, Taxes & Steps | Yhen's Property",
    description: "The complete guide to buying property in the Philippines. Every fee, every tax, every legal step — from reservation to title transfer. Clear, honest, and updated for 2026.",
    canonical: "https://yhensproperty.com/guides/philippines-property-buyers-guide",
  },
  "union-village-quezon-city": {
    title: "Union Village Quezon City: Neighbourhood Guide for Families, OFW Investors & Professionals | 2026",
    description: "Is Union Village QC good for families, investment, or young professionals? Complete 2026 guide: landmarks, schools, transport, property prices, and rental demand near UP Diliman and Ateneo.",
    canonical: "https://yhensproperty.com/guides/union-village-quezon-city",
  },
  "bgc-taguig-neighbourhood-guide": {
    title: "BGC Taguig Neighbourhood Guide 2026: Things To Do, Restaurants, Property & Investment | Yhens Property",
    description: "Complete guide to Bonifacio Global City — things to do, best restaurants, hospitals, international schools, condo prices, rental yields, and why BGC is Metro Manila's top address for expats, OFW investors, and professionals.",
    canonical: "https://yhensproperty.com/guides/bgc-taguig-neighbourhood-guide",
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
      /<\/head>/,
      `<meta property="og:url" content="${meta.canonical}">
<meta property="og:type" content="article">
<meta property="og:image" content="${ogImage}">
<link rel="canonical" href="${meta.canonical}">
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
