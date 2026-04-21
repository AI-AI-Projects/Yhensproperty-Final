import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import GuideLayout from '../../components/GuideLayout';
import { siteConfig } from '../../config/site';

const relatedGuides = [
  { title: 'Can Foreigners Legally Own Property in the Philippines?', slug: 'foreigner-property-ownership', icon: 'home' },
  { title: 'RA 12252: The New 99-Year Lease Explained', slug: 'ra-12252-99-year-lease', icon: 'gavel' },
  { title: 'BGC vs. Makati vs. Batangas: Best Rental Yields', slug: 'bgc-makati-batangas-rental-yields', icon: 'bar_chart' },
  { title: "The Foreigner's Selling Guide", slug: 'selling-guide-non-resident', icon: 'sell' },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Retiring in the Philippines: How to Buy a Home with an SRRV or Dual Citizenship (2026)",
  "description": "Complete guide for retirees buying property in the Philippines. Learn about SRRV retirement visas, Balikbayan rights, and how Dual Citizens can buy land and houses directly.",
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
      "name": "Can I buy a house in the Philippines with an SRRV visa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SRRV holders can own condos (CCT) but not land (TCT). However, SRRV deposit funds can be used to purchase qualifying condominium units."
      }
    },
    {
      "@type": "Question",
      "name": "Can dual citizens own land in the Philippines?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, RA 9225 dual citizens have full property rights including owning land (TCT), houses, and commercial properties directly in their name."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best retirement location in the Philippines for foreigners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tagaytay offers cool highland climate, Batangas provides beachfront living, BGC/Makati offer city lifestyle with world-class healthcare, while Subic/Clark have established expat communities."
      }
    }
  ]
};

const RetiringPhilippines: React.FC = () => {
  return (
    <>
      <SEO
        title="Retiring in the Philippines: Buy a Home with an SRRV or Dual Citizenship | 2026 Guide"
        description="Can I buy a house in the Philippines with a retirement visa? Complete 2026 guide for retirees on SRRV visas, Balikbayan rights, and how Dual Citizens can own land and houses without restrictions."
        canonical="https://yhensproperty.com/guides/retiring-philippines-srrv"
        ogType="article"
        ogUrl="https://yhensproperty.com/guides/retiring-philippines-srrv"
        structuredData={structuredData}
        breadcrumbs={[
          { name: "Home", url: "https://yhensproperty.com" },
          { name: "Guides", url: "https://yhensproperty.com/guides" },
          { name: "Retiring in the Philippines", url: "https://yhensproperty.com/guides/retiring-philippines-srrv" }
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <GuideLayout
        title="Retiring in the Philippines: How to Buy a Home with an SRRV or Dual Citizenship"
        subtitle="Everything retirees, Balikbayans, and Dual Citizens need to know about their specific property rights — including the full land ownership rights that most people do not realise they have."
        readTime="8 min"
        relatedGuides={relatedGuides}
        whatsappMessage="Hi Yhen, I'm a retiree/Balikbayan looking to buy property in the Philippines. Can you help?"
      >
        <div className="space-y-10 text-zinc-700 dark:text-zinc-300">
          <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 rounded-3xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <span className="material-icons text-3xl text-primary mt-1">lightbulb</span>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Fast Facts</h3>
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  SRRV retirement visa holders can own condos but not land. RA 9225 dual citizens have full property rights including land ownership. Best retirement locations: Tagaytay for cool climate, Batangas for beaches, BGC/Makati for city healthcare access, and Subic/Clark for established expat communities.
                </p>
              </div>
            </div>
          </section>

          <section>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 border-l-4 border-primary pl-6 py-2 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-2xl">
              The Philippines is one of the world's top retirement destinations — and for good reason. Low cost of living, English-speaking population, warm climate, and a familiar culture make it ideal for <strong className="text-zinc-800 dark:text-white">American, Australian, and European retirees</strong>. But what many do not realise is that their immigration status directly determines what kind of property they can legally own.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">The Three Key Categories</h2>
            <div className="space-y-4">
              {[
                {
                  icon: 'card_membership',
                  title: 'Foreign National with SRRV',
                  badge: 'Retirement Visa',
                  badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
                  desc: 'The Special Resident Retiree\'s Visa (SRRV) is issued by the Philippine Retirement Authority (PRA). Holders are still classified as foreign nationals for property ownership purposes — they can own condos (CCT) but not land (TCT).',
                },
                {
                  icon: 'flight_land',
                  title: 'Balikbayan (Returning Filipino)',
                  badge: 'Filipino Heritage',
                  badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
                  desc: 'Former Filipino citizens who have become naturalized foreign nationals retain some privileges but their property rights depend on whether they have reacquired Philippine citizenship.',
                },
                {
                  icon: 'stars',
                  title: 'Dual Citizen (RA 9225)',
                  badge: 'Full Rights',
                  badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
                  desc: 'Filipinos who reacquired Philippine citizenship under RA 9225 have FULL property rights — including owning land (TCT), houses, and commercial properties with no restrictions.',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5">
                  <span className="material-icons text-primary text-2xl mt-0.5">{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <p className="font-black text-zinc-900 dark:text-white">{item.title}</p>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.badgeColor}`}>{item.badge}</span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Can I buy a house in the Philippines with an SRRV visa?</h3>
            <p className="leading-relaxed mb-4">
              SRRV holders can own condos (CCT) but not land (TCT). However, SRRV deposit funds can be used to purchase qualifying condominium units.
            </p>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 mt-6">SRRV: What the Retirement Visa Gives You</h2>
            <p className="leading-relaxed mb-5">
              The SRRV is the most common path for American, Australian, and European retirees. It provides indefinite stay in the Philippines with multiple-entry privileges but does not change your property ownership rights.
            </p>

            <h3 className="font-black text-zinc-900 dark:text-white mb-3">SRRV Variants and Requirements (2026)</h3>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 mb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-950 text-white">
                    <th className="text-left px-4 py-3 font-bold">SRRV Type</th>
                    <th className="text-left px-4 py-3 font-bold">Age</th>
                    <th className="text-left px-4 py-3 font-bold">Deposit Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {[
                    { type: 'SRRV Classic', age: '50+ (no pension) / 35+ (with pension)', deposit: 'USD 20,000 (no pension) / USD 10,000 (with pension)' },
                    { type: 'SRRV Smile', age: '35+', deposit: 'USD 20,000' },
                    { type: 'SRRV Human Touch', age: '35+ (with medical/hospital use)', deposit: 'USD 10,000' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50 dark:bg-zinc-900/50'}>
                      <td className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">{row.type}</td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.age}</td>
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.deposit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-5">
              <p className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                <span className="material-icons text-sm">info</span>
                SRRV Property Tip
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                SRRV holders can invest their required deposit into the purchase of a condominium unit or a long-term retirement village. This allows the deposit to work as an income-generating asset while satisfying the visa requirement. Ask Yhen for SRRV-approved developments.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Can dual citizens own land in the Philippines?</h3>
            <p className="leading-relaxed mb-4">
              Yes, RA 9225 dual citizens have full property rights including owning land (TCT), houses, and commercial properties directly in their name.
            </p>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 mt-6">Dual Citizenship: Full Land Ownership Rights</h2>
            <p className="leading-relaxed mb-4">
              Under <strong>Republic Act 9225</strong>, natural-born Filipinos who have become foreign citizens can reacquire Philippine citizenship and with it, <strong>full property rights identical to any Filipino citizen</strong>. This includes owning land, houses, and commercial properties directly in their name.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5">
                <p className="font-bold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
                  <span className="material-icons text-sm">check_circle</span>
                  With RA 9225 Dual Citizenship
                </p>
                <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-400">
                  <li className="flex items-center gap-2"><span className="material-icons text-xs">check</span>Own land (TCT) in your name</li>
                  <li className="flex items-center gap-2"><span className="material-icons text-xs">check</span>Own a house and lot directly</li>
                  <li className="flex items-center gap-2"><span className="material-icons text-xs">check</span>No acreage limits for residential land</li>
                  <li className="flex items-center gap-2"><span className="material-icons text-xs">check</span>Buy agricultural land (with restrictions)</li>
                  <li className="flex items-center gap-2"><span className="material-icons text-xs">check</span>Inherit and transfer property freely</li>
                </ul>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5">
                <p className="font-bold text-zinc-800 dark:text-zinc-200 mb-3 flex items-center gap-2">
                  <span className="material-icons text-sm text-amber-500">info</span>
                  How to Reacquire Citizenship
                </p>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2"><span className="material-icons text-xs mt-0.5 text-primary">arrow_right</span><span>Apply at the Philippine Bureau of Immigration or nearest Philippine consulate</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs mt-0.5 text-primary">arrow_right</span><span>Oath-taking ceremony required</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs mt-0.5 text-primary">arrow_right</span><span>Identification Certificate (IC) issued immediately</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs mt-0.5 text-primary">arrow_right</span><span>Typically completed within 3–6 months</span></li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">What is the best retirement location in the Philippines for foreigners?</h3>
            <p className="leading-relaxed mb-4">
              Tagaytay offers cool highland climate, Batangas provides beachfront living, BGC/Makati offer city lifestyle with world-class healthcare, while Subic/Clark have established expat communities.
            </p>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 mt-6">Best Retirement Property Locations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Tagaytay & Cavite', desc: 'Cool highland climate, 1.5 hours from Manila, strong rental demand from Manila weekenders. Popular among American and Australian retirees.', icon: 'terrain', type: 'House & Lot / Land' },
                { name: 'Batangas Coast', desc: 'Beachfront living with some of the Philippines\' cleanest water. Affordable vs. Boracay and Palawan with easier access.', icon: 'beach_access', type: 'House & Lot / Condo' },
                { name: 'BGC & Makati', desc: 'For retirees who want a city lifestyle — world-class hospitals, international dining, golf, and cultural amenities.', icon: 'location_city', type: 'Condo (CCT eligible)' },
                { name: 'Subic & Clark', desc: 'Former US bases with established expat communities, wide roads, and international infrastructure. Popular with American retirees specifically.', icon: 'military_tech', type: 'House & Lot / Land' },
              ].map((loc) => (
                <div key={loc.name} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-icons text-primary">{loc.icon}</span>
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white">{loc.name}</p>
                      <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">{loc.type}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{loc.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-zinc-950 rounded-3xl p-8 text-center">
            <h2 className="text-xl font-black text-white mb-3">Plan Your Philippine Retirement Property</h2>
            <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
              Yhen has helped dozens of retirees and Balikbayans find their ideal property. Get personalised guidance on SRRV-compatible developments and Dual Citizenship land options.
            </p>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi Yhen, I'm planning to retire in the Philippines and want to buy property. Can you help me find the right home?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Ask Yhen on WhatsApp
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Browse Retirement-Ideal Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/category/buy-condos" className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-icons text-2xl text-primary">apartment</span>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">City Condos</p>
                  <p className="text-xs text-zinc-500">SRRV-compatible, CCT ownership</p>
                </div>
              </Link>
              <Link to="/category/buy-houses" className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-icons text-2xl text-emerald-500">home</span>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">Houses & Villas</p>
                  <p className="text-xs text-zinc-500">For Dual Citizens and Balikbayans</p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </GuideLayout>
    </>
  );
};

export default RetiringPhilippines;
