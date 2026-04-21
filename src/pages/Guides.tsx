import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { siteConfig } from '../config/site';

export const guides = [
  {
    slug: 'foreigner-property-ownership',
    icon: 'home',
    badge: 'Ownership Law',
    title: 'Can Foreigners Legally Buy & Own Property in the Philippines?',
    seoPhrase: 'Is it safe for Americans and international expats to buy property in the Philippines?',
    description: 'The 40% Condo Cap, CCT vs. TCT title explained, and the safest legal structures for Americans, Canadians, Australians, and Europeans in 2026.',
    readTime: '8 min',
    highlight: false,
  },
  {
    slug: 'ra-12252-99-year-lease',
    icon: 'gavel',
    badge: 'New Law 2026',
    title: 'RA 12252 Explained: The New 99-Year Lease for Foreign Investors',
    seoPhrase: '99 year lease Philippines foreign ownership 2026 update',
    description: 'How the landmark new law replaced the old 25+25 structure and now gives foreigners near-permanent land rights to build homes, resorts, and businesses on Philippine soil.',
    readTime: '7 min',
    highlight: true,
  },
  {
    slug: 'bgc-makati-batangas-rental-yields',
    icon: 'bar_chart',
    badge: 'Market Data',
    title: 'BGC vs. Makati vs. Batangas: Where to Invest for the Best Rental Yields',
    seoPhrase: 'Best places for foreigners to buy and rent out property in Manila',
    description: 'A data-driven 2026 comparison of city condo yields vs. provincial land growth across the three most popular investment corridors for international buyers.',
    readTime: '10 min',
    highlight: false,
  },
  {
    slug: 'retiring-philippines-srrv',
    icon: 'beach_access',
    badge: 'Retirement',
    title: 'Retiring in the Philippines: Buying a Home with an SRRV or Dual Citizenship',
    seoPhrase: 'Can I buy a house in Philippines with a retirement visa?',
    description: 'The specific property rights for SRRV visa holders, Balikbayans, and RA 9225 Dual Citizens — including the full land ownership rights most people do not know they have.',
    readTime: '8 min',
    highlight: false,
  },
  {
    slug: 'selling-guide-non-resident',
    icon: 'sell',
    badge: 'Selling',
    title: "The Foreigner's Selling Guide: How to Flip or Resell Your Philippine Property",
    seoPhrase: 'Selling real estate in Philippines as a non-resident',
    description: 'Capital Gains Tax (6%), Documentary Stamp Tax, finding a buyer from abroad, the Special Power of Attorney process, and how to legally repatriate your proceeds.',
    readTime: '9 min',
    highlight: false,
  },
  {
    slug: 'philippines-property-buyers-guide',
    icon: 'real_estate_agent',
    badge: "Buyer's Guide",
    title: "Philippines Property Buyer's Guide: Every Fee, Tax & Step Explained",
    seoPhrase: 'How much does it cost to buy property in the Philippines? All fees and taxes explained.',
    description: "A complete breakdown of every cost you'll pay when buying Philippine property — CGT, DST, Transfer Tax, Registration Fees — plus a step-by-step walkthrough of the full buying process from reservation to title transfer.",
    readTime: '12 min',
    highlight: true,
  },
  {
    slug: 'union-village-quezon-city',
    icon: 'location_city',
    badge: 'Neighbourhood Guide',
    title: 'Union Village, Quezon City: Complete Guide for Families, OFW Investors & Professionals',
    seoPhrase: 'Is Union Village QC good for families or investment? Townhouse near UP Diliman 2026.',
    description: 'Everything you need to know about living and investing in Union Village, QC — landmarks, schools, transport links, property prices, and rental demand near UP Diliman, Ateneo, and Katipunan.',
    readTime: '11 min',
    highlight: false,
  },
  {
    slug: 'bgc-taguig-neighbourhood-guide',
    icon: 'location_city',
    badge: 'Neighbourhood Guide',
    title: 'BGC, Taguig: Complete Neighbourhood Guide — Things To Do, Restaurants, Property & Investment',
    seoPhrase: 'Things to do in BGC Manila, best restaurants, condo for sale BGC 2026.',
    description: "The complete guide to Bonifacio Global City — things to do, best restaurants, hospitals, international schools, condo prices, rental yields, and why BGC is Metro Manila's top address for expats, OFW investors, and professionals.",
    readTime: '12 min',
    highlight: false,
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Investor Guides — Philippine Real Estate for International & Foreign Investors 2026",
  "description": "A knowledge hub of 8 expert guides covering the buyer's guide with all fees and taxes, property ownership law, the 99-year lease, rental yield comparisons, retirement visas, selling strategies, and neighbourhood guides for BGC and Quezon City.",
  "publisher": { "@type": "Organization", "name": siteConfig.officialName, "url": "https://yhensproperty.com" },
  "hasPart": guides.map(g => ({
    "@type": "Article",
    "name": g.title,
    "url": `https://yhensproperty.com/guides/${g.slug}`,
  })),
};

const Guides: React.FC = () => {
  return (
    <>
      <SEO
        title="Philippine Real Estate Investor Guides 2026 — Buy, Sell, Rent & Invest | Yhen's Property"
        description="Expert guides for international investors: foreigner ownership law, RA 12252 99-year lease, BGC vs Makati rental yields, SRRV retirement visas, and selling as a non-resident. Updated 2026."
        canonical="https://yhensproperty.com/guides"
        ogType="website"
        ogUrl="https://yhensproperty.com/guides"
        structuredData={structuredData}
        breadcrumbs={[
          { name: "Home", url: "https://yhensproperty.com" },
          { name: "Guides", url: "https://yhensproperty.com/guides" }
        ]}
      />

      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <div className="bg-zinc-950 py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #84cc16 0%, transparent 50%), radial-gradient(circle at 80% 20%, #84cc16 0%, transparent 40%)' }} />
          <div className="max-w-7xl mx-auto relative">
            <div className="flex items-center gap-2 text-sm mb-8">
              <Link to="/" className="text-zinc-400 hover:text-primary transition-colors font-medium">Home</Link>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-300 font-medium">Investor Guides</span>
            </div>

            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">Knowledge Hub</span>
                <span className="text-zinc-500 text-sm">6 Guides — Updated 2026</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight mb-6">
                Philippine Real Estate Guide for International Investors
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                Expert-written guides for <strong className="text-zinc-200">Americans, Canadians, Australians, and Europeans</strong> looking to buy, sell, rent, or invest in Philippine property. Updated for 2026 — including the new RA 12252 law.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
              {[
                { value: '6', label: 'Expert Guides' },
                { value: '2026', label: 'Updated' },
                { value: '100%', label: 'Free Access' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-black text-primary">{stat.value}</p>
                  <p className="text-sm text-zinc-400 mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {guides.map((guide, i) => (
              <Link
                key={guide.slug}
                to={`/guides/${guide.slug}`}
                className={`group relative flex flex-col bg-white dark:bg-zinc-900 border rounded-3xl p-7 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  guide.highlight
                    ? 'border-primary/40 shadow-lg shadow-primary/10 ring-1 ring-primary/20'
                    : 'border-zinc-100 dark:border-zinc-800 hover:border-primary/30'
                } ${i === 0 ? 'lg:col-span-2' : ''}`}
              >
                {guide.highlight && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-primary text-zinc-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">{guide.badge}</span>
                  </div>
                )}

                <div className="flex items-start gap-4 mb-5">
                  <div className={`p-3 rounded-2xl ${guide.highlight ? 'bg-primary text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800 text-primary group-hover:bg-primary group-hover:text-zinc-900'} transition-colors shrink-0`}>
                    <span className="material-icons text-xl">{guide.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">{guide.badge}</span>
                      <span className="text-zinc-300 dark:text-zinc-600">·</span>
                      <span className="text-[10px] font-medium text-zinc-400 flex items-center gap-1">
                        <span className="material-icons text-xs">schedule</span>
                        {guide.readTime}
                      </span>
                    </div>
                    <h2 className={`font-black tracking-tight leading-tight text-zinc-900 dark:text-white group-hover:text-primary transition-colors ${i === 0 ? 'text-xl md:text-2xl' : 'text-lg'}`}>
                      {guide.title}
                    </h2>
                  </div>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-5 flex-1">
                  {guide.description}
                </p>

                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl px-4 py-3 mb-5">
                  <p className="text-xs text-zinc-400 font-medium flex items-start gap-1.5">
                    <span className="material-icons text-xs text-primary mt-0.5">search</span>
                    <span className="italic">&ldquo;{guide.seoPhrase}&rdquo;</span>
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary group-hover:gap-2 flex items-center gap-1.5 transition-all">
                    Read Guide
                    <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-20 bg-zinc-950 rounded-[40px] p-10 md:p-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Direct Guidance</span>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 leading-tight">
                  Have a Question Not Covered in the Guides?
                </h2>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  Every investor situation is different. Yhen personally answers all inquiries — no bots, no holding queue. Whether you are comparing two properties, navigating a specific legal structure, or planning your exit strategy from abroad, get a direct answer.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi Yhen, I've been reading your investor guides and have a question.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-conversion flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-green-900/30"
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Ask Yhen on WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold py-4 px-8 rounded-2xl transition-all border border-white/10"
                >
                  <span className="material-icons text-sm">mail</span>
                  Send a Message
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-2 block">Browse Listings</span>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Ready to Make a Move?</h2>
              </div>
              <Link to="/" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-zinc-500 hover:text-primary transition-colors">
                View All Listings
                <span className="material-icons text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { to: '/inventory', icon: 'table_view', label: 'Full Inventory', color: 'text-sky-500' },
                { to: '/category/buy-condos', icon: 'apartment', label: 'Buy Condos', color: 'text-primary' },
                { to: '/category/buy-houses', icon: 'home', label: 'Buy Houses', color: 'text-amber-500' },
                { to: '/category/buy-land', icon: 'landscape', label: 'Buy Land', color: 'text-emerald-500' },
                { to: '/sell', icon: 'sell', label: 'Sell Property', color: 'text-rose-500' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl py-6 px-4 hover:border-primary/40 hover:bg-primary/5 transition-all group text-center"
                >
                  <span className={`material-icons text-2xl ${item.color} group-hover:scale-110 transition-transform`}>{item.icon}</span>
                  <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-primary transition-colors">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Guides;
