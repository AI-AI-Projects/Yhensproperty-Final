import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import GuideLayout from '../../components/GuideLayout';
import { siteConfig } from '../../config/site';

const relatedGuides = [
  { title: 'Can Foreigners Legally Own Property in the Philippines?', slug: 'foreigner-property-ownership', icon: 'home' },
  { title: 'RA 12252: The New 99-Year Lease Explained', slug: 'ra-12252-99-year-lease', icon: 'gavel' },
  { title: 'Retiring in the Philippines: SRRV & Dual Citizenship', slug: 'retiring-philippines-srrv', icon: 'beach_access' },
  { title: "The Foreigner's Selling Guide", slug: 'selling-guide-non-resident', icon: 'sell' },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "BGC vs. Makati vs. Batangas: Where to Buy & Invest for the Best Rental Yields in the Philippines (2026)",
  "description": "Data-driven comparison of BGC, Makati, and Batangas for foreign investors. City condo yields vs provincial land growth, best locations to rent out property in Manila, 2026 analysis.",
  "author": { "@type": "Person", "name": "Yhen", "jobTitle": "Licensed Real Estate Broker" },
  "publisher": { "@type": "Organization", "name": siteConfig.officialName },
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-01",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best area to buy property in the Philippines for rental income?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BGC offers 4-6% gross rental yields with stable demand from expats and corporates, making it the top choice for consistent rental income."
      }
    },
    {
      "@type": "Question",
      "name": "Is Batangas better than BGC for property investment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Batangas offers higher capital appreciation (30-60% over 5 years) and better gross yields (5-8%) for short-term rentals, but BGC provides more stability and liquidity."
      }
    },
    {
      "@type": "Question",
      "name": "Should foreigners invest in Makati or BGC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BGC offers premium yields and newer developments, while Makati provides lower entry prices with dependable rental income. Choose BGC for higher returns, Makati for value."
      }
    }
  ]
};

const RentalYields: React.FC = () => {
  return (
    <>
      <SEO
        title="BGC vs. Makati vs. Batangas: Best Places to Buy & Rent Out Property in Manila | 2026 Guide"
        description="Best places for foreigners to buy and rent out property in Manila. Data-driven 2026 comparison of BGC, Makati, and Batangas rental yields, capital appreciation, and investment strategy."
        canonical="https://yhensproperty.com/guides/bgc-makati-batangas-rental-yields"
        ogType="article"
        ogUrl="https://yhensproperty.com/guides/bgc-makati-batangas-rental-yields"
        structuredData={structuredData}
        breadcrumbs={[
          { name: "Home", url: "https://yhensproperty.com" },
          { name: "Guides", url: "https://yhensproperty.com/guides" },
          { name: "BGC vs Makati vs Batangas", url: "https://yhensproperty.com/guides/bgc-makati-batangas-rental-yields" }
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <GuideLayout
        title="BGC vs. Makati vs. Batangas: Where to Buy & Invest for the Best Rental Yields (2026)"
        subtitle="A data-driven comparison of the Philippines' top three investment corridors for international investors — city condos vs. provincial land. Which market delivers the best returns in 2026?"
        readTime="10 min"
        relatedGuides={relatedGuides}
        whatsappMessage="Hi Yhen, I read your BGC vs Makati vs Batangas guide and want to discuss investment options."
      >
        <div className="space-y-10 text-zinc-700 dark:text-zinc-300">
          <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 rounded-3xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <span className="material-icons text-3xl text-primary mt-1">lightbulb</span>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Fast Facts</h3>
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  BGC delivers 4-6% rental yields with high stability for income investors. Makati offers lower entry cost with 4-5.5% yields. Batangas provides 5-8% yields on short-term rentals plus 30-60% capital appreciation over 5 years. Choose BGC for stable income, Batangas for growth, or Makati for value.
                </p>
              </div>
            </div>
          </section>

          <section>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 border-l-4 border-primary pl-6 py-2 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-2xl">
              Whether you are an <strong className="text-zinc-800 dark:text-white">American looking for a rental income property, a Canadian seeking capital growth, or an Australian planning a lifestyle investment</strong>, the right location in the Philippines depends on your strategy. BGC, Makati, and Batangas each offer distinct profiles — and the best one for you depends on your timeline, risk tolerance, and investment goals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">At a Glance: 2026 Investment Comparison</h2>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-950 text-white">
                    <th className="text-left px-5 py-4 font-bold">Metric</th>
                    <th className="text-center px-5 py-4 font-bold text-primary">BGC</th>
                    <th className="text-center px-5 py-4 font-bold">Makati CBD</th>
                    <th className="text-center px-5 py-4 font-bold text-amber-400">Batangas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {[
                    { metric: 'Entry Price (Condo/sqm)', bgc: '₱200K–₱350K', makati: '₱150K–₱280K', batangas: '₱8K–₱30K (land/sqm)' },
                    { metric: 'Gross Rental Yield', bgc: '4–6% p.a.', makati: '4–5.5% p.a.', batangas: '5–8% (short-term rental)' },
                    { metric: 'Capital Appreciation (5yr est.)', bgc: '25–40%', makati: '15–25%', batangas: '30–60% (land)' },
                    { metric: 'Tenant Pool', bgc: 'Expats, Corporates, BPO', makati: 'Finance, Corporates', batangas: 'Tourists, Weekend Renters' },
                    { metric: 'Foreigner CCT Eligible', bgc: 'Yes', makati: 'Yes', batangas: 'Yes (condo) / Lease (land)' },
                    { metric: 'Liquidity', bgc: 'High', makati: 'High', batangas: 'Moderate' },
                    { metric: 'Lifestyle Score', bgc: '★★★★★', makati: '★★★★☆', batangas: '★★★★★' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50 dark:bg-zinc-900/50'}>
                      <td className="px-5 py-3.5 font-semibold text-zinc-800 dark:text-zinc-200">{row.metric}</td>
                      <td className="px-5 py-3.5 text-center text-primary font-medium">{row.bgc}</td>
                      <td className="px-5 py-3.5 text-center text-zinc-600 dark:text-zinc-400">{row.makati}</td>
                      <td className="px-5 py-3.5 text-center text-amber-600 dark:text-amber-400 font-medium">{row.batangas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-zinc-400 mt-3">Estimates based on 2025–2026 market data. Yields vary by unit type, building, and management approach.</p>
          </section>

          <section>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">What is the best area to buy property in the Philippines for rental income?</h3>
            <p className="leading-relaxed mb-4">
              BGC offers 4-6% gross rental yields with stable demand from expats and corporates, making it the top choice for consistent rental income.
            </p>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 mt-6">BGC (Bonifacio Global City): Premium Yields, Safe Entry</h2>
            <p className="leading-relaxed mb-4">
              BGC is the Philippines' most internationally recognised business district and the <strong>top choice for foreign investors seeking stable, long-term rental income</strong>. Its tenant base is dominated by multinational corporations, BPO companies, and affluent Filipino professionals — creating consistent demand for high-spec condo units.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {[
                { label: 'Average Rental Yield', value: '4–6%', sub: 'per annum (gross)' },
                { label: 'Average Resale Gain', value: '+30%', sub: 'over 5 years (BGC premium projects)' },
                { label: 'Foreign Quota', value: '40%', sub: 'cap — most projects have availability' },
              ].map((stat) => (
                <div key={stat.label} className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black text-zinc-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">{stat.label}</p>
                  <p className="text-xs text-zinc-500 mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>
            <p className="leading-relaxed mb-4">
              Premium projects like Uptown Parksuites, Aurelia Residences, and The Rise command premium rentals from ₱50,000–₱200,000/month depending on size and fit-out — making them ideal for investors targeting the expat and corporate relocation market.
            </p>
            <Link
              to="/category/buy-condos"
              className="inline-flex items-center gap-2 bg-primary text-zinc-900 font-bold text-sm px-6 py-3 rounded-xl hover:brightness-110 transition-all shadow-md shadow-primary/20"
            >
              <span className="material-icons text-sm">apartment</span>
              Browse BGC Listings
            </Link>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Makati CBD: The Established Market</h2>
            <p className="leading-relaxed mb-4">
              Makati is the Philippines' financial capital and offers a slightly more affordable entry point than BGC while maintaining a strong, diversified tenant base. For investors who prioritise <strong>lower buy-in cost with dependable rental income</strong>, Makati represents excellent value.
            </p>
            <p className="leading-relaxed mb-4">
              The Makati CBD commands rental premiums, particularly in Salcedo and Legaspi villages. Older buildings can offer better value-for-money compared to BGC's newer, higher-priced stock, though gross yields are marginally lower due to slower capital appreciation.
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5">
              <p className="font-bold text-zinc-900 dark:text-white mb-2">Best for:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2"><span className="material-icons text-xs text-primary">check_circle</span>Investors with ₱8M–₱20M budget</li>
                <li className="flex items-center gap-2"><span className="material-icons text-xs text-primary">check_circle</span>Long-term, stable rental income strategy</li>
                <li className="flex items-center gap-2"><span className="material-icons text-xs text-primary">check_circle</span>Buyers who value established infrastructure and amenities</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Is Batangas better than BGC for property investment?</h3>
            <p className="leading-relaxed mb-4">
              Batangas offers higher capital appreciation (30-60% over 5 years) and better gross yields (5-8%) for short-term rentals, but BGC provides more stability and liquidity.
            </p>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 mt-6">Should foreigners invest in Makati or BGC?</h3>
            <p className="leading-relaxed mb-4">
              BGC offers premium yields and newer developments, while Makati provides lower entry prices with dependable rental income. Choose BGC for higher returns, Makati for value.
            </p>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 mt-6">Batangas: The High-Growth Provincial Play</h2>
            <p className="leading-relaxed mb-4">
              For investors with a longer time horizon and appetite for higher returns, <strong>Batangas offers the Philippines' most compelling growth story</strong>. Land prices along the coast — particularly around Nasugbu, Matabungkay, and Laiya — have appreciated 30–60% over five years as Metro Manila overflow, tourism infrastructure, and the CALABARZON development corridor drive demand.
            </p>
            <p className="leading-relaxed mb-4">
              Short-term rental (Airbnb-style) properties on Batangas beachfront can generate <strong>5–8% gross yields</strong> during peak season, significantly outperforming city condos on a cash-on-cash basis.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
              <p className="font-bold text-amber-800 dark:text-amber-300 mb-2">Key Consideration for Foreigners</p>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Most desirable Batangas properties are land-based. Foreign investors should use the RA 12252 99-year lease structure for land, or purchase within condominium-titled resort developments (CCT eligible). Yhen can identify the right structure for each specific property.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Which Should You Choose?</h2>
            <div className="space-y-4">
              {[
                { strategy: 'Stable Rental Income', recommendation: 'BGC or Makati Condo', rationale: 'High-demand tenant pool, professional property management available, consistent monthly cash flow', icon: 'trending_up' },
                { strategy: 'Capital Growth', recommendation: 'Batangas Land', rationale: 'Provincial land prices in the growth corridor continue to outperform city condos on appreciation', icon: 'show_chart' },
                { strategy: 'Lifestyle + Income Hybrid', recommendation: 'Batangas Beach Property', rationale: 'Live in your investment during the off-season, rent it short-term during peak season', icon: 'beach_access' },
                { strategy: 'First Philippine Investment', recommendation: 'BGC Entry-Level Condo', rationale: 'Most straightforward legal structure, highest liquidity for exit, easiest to manage remotely', icon: 'star' },
              ].map((item) => (
                <div key={item.strategy} className="flex items-start gap-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5">
                  <span className="material-icons text-primary">{item.icon}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <p className="font-bold text-zinc-900 dark:text-white">{item.strategy}</p>
                      <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{item.recommendation}</span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.rationale}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-zinc-950 rounded-3xl p-8 text-center">
            <h2 className="text-xl font-black text-white mb-3">Discuss Your Investment Strategy</h2>
            <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
              Yhen covers all three markets. Get a direct comparison of current available properties across BGC, Makati, and Batangas matched to your budget and goals.
            </p>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi Yhen, I read your BGC vs Makati vs Batangas guide and want to discuss which market suits my investment goals.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Ask Yhen on WhatsApp
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Browse Properties by Location</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/category/buy-condos" className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-icons text-xl text-primary">apartment</span>
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-primary transition-colors">BGC Condos</p>
                  <p className="text-xs text-zinc-500">Buy to rent</p>
                </div>
              </Link>
              <Link to="/category/buy-houses" className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-icons text-xl text-amber-500">home</span>
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-primary transition-colors">Houses & Villas</p>
                  <p className="text-xs text-zinc-500">Batangas & Metro Manila</p>
                </div>
              </Link>
              <Link to="/category/buy-land" className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-icons text-xl text-emerald-500">landscape</span>
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-primary transition-colors">Land Plots</p>
                  <p className="text-xs text-zinc-500">High-growth corridors</p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </GuideLayout>
    </>
  );
};

export default RentalYields;
