import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import GuideLayout from '../../components/GuideLayout';
import { siteConfig } from '../../config/site';

const relatedGuides = [
  { title: "Philippines Property Buyer's Guide: Every Fee, Tax & Step Explained", slug: 'philippines-property-buyers-guide', icon: 'real_estate_agent' },
  { title: 'BGC vs. Makati vs. Batangas: Where to Invest for the Best Rental Yields', slug: 'bgc-makati-batangas-rental-yields', icon: 'bar_chart' },
  { title: 'Can Foreigners Legally Buy & Own Property in the Philippines?', slug: 'foreigner-property-ownership', icon: 'home' },
  { title: 'RA 12252 Explained: The New 99-Year Lease for Foreign Investors', slug: 'ra-12252-99-year-lease', icon: 'gavel' },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Union Village Quezon City: Complete Neighbourhood Guide for Families, OFW Investors & Young Professionals (2026)",
  "description": "Everything you need to know about living and investing in Union Village, QC — landmarks, schools, transport, property prices, and rental demand near UP Diliman, Ateneo, and Katipunan.",
  "author": { "@type": "Person", "name": "Yhen", "jobTitle": "Licensed Real Estate Broker" },
  "publisher": { "@type": "Organization", "name": siteConfig.officialName },
  "datePublished": "2026-04-01",
  "dateModified": "2026-04-21",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Union Village good for families?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Union Village offers safe, gated-community living within 5–10 minutes of UP Diliman, Ateneo de Manila, and Miriam College. Spacious townhouses and house-and-lot properties give families room to grow, while active homeowner associations maintain a strong community atmosphere rare in Metro Manila."
      }
    },
    {
      "@type": "Question",
      "name": "How far is Union Village from BGC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Union Village is approximately 25–40 minutes from BGC via Katipunan Avenue and C5 Road in off-peak traffic. With MRT-7 fully operational and the Metro Manila Subway corridor expanding, travel times to major employment hubs will shorten significantly."
      }
    },
    {
      "@type": "Question",
      "name": "Is Union Village a good investment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Union Village benefits from consistent rental demand driven by UP Diliman, Ateneo, and St. Luke's Medical Center — providing a near-permanent pool of student, faculty, and hospital staff tenants. Upcoming MRT-7 completion and the Metro Manila Subway are expected to push property values higher in adjacent Quezon City neighbourhoods."
      }
    },
    {
      "@type": "Question",
      "name": "What is the average property price in Union Village, Quezon City?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Townhouses in Union Village typically range from ₱8M to ₱15M depending on size and finishes. House-and-lot properties start from ₱8M upward. Condominium units in nearby developments start from ₱3.5M."
      }
    },
    {
      "@type": "Question",
      "name": "Is Union Village near MRT-7?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. MRT-7 serves North Quezon City and is operational on key segments, improving north-south Metro Manila connectivity. Properties in and around Union Village benefit from proximity to this expanding rail line."
      }
    },
    {
      "@type": "Question",
      "name": "Are there townhouses for sale near UP Diliman?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Yhens Property lists townhouses in Quezon City within short commuting distance of UP Diliman and Ateneo de Manila University, including 3-storey units with 3–4 bedrooms and garage. View current listings at yhensproperty.com."
      }
    },
    {
      "@type": "Question",
      "name": "Is Union Village good for OFW investment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Strong university-driven rental demand, steady appreciation, and established gated-community management make Union Village a practical OFW investment. Yhens Property assists with remote purchasing, document processing, and property management support."
      }
    }
  ]
};

const UnionVillageGuide: React.FC = () => {
  return (
    <>
      <SEO
        title="Union Village Quezon City: Neighbourhood Guide for Families, OFW Investors & Professionals | 2026"
        description="Is Union Village QC good for families, investment, or young professionals? Complete 2026 guide: landmarks, schools, transport, property prices, and rental demand near UP Diliman and Ateneo."
        canonical="https://yhensproperty.com/guides/union-village-quezon-city"
        ogType="article"
        ogUrl="https://yhensproperty.com/guides/union-village-quezon-city"
        structuredData={structuredData}
        breadcrumbs={[
          { name: "Home", url: "https://yhensproperty.com" },
          { name: "Guides", url: "https://yhensproperty.com/guides" },
          { name: "Union Village QC", url: "https://yhensproperty.com/guides/union-village-quezon-city" }
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <GuideLayout
        title="Union Village, Quezon City: The Complete Neighbourhood Guide (2026)"
        subtitle="A genuine community guide for families, OFW investors, and young professionals — covering location, schools, transport, property prices, and why Union Village remains one of Quezon City's most in-demand addresses."
        readTime="11 min"
        relatedGuides={relatedGuides}
        whatsappMessage="Hi Yhen, I read your Union Village guide and want to know more about properties in the area."
      >
        <div className="space-y-10 text-zinc-700 dark:text-zinc-300">

          {/* Fast Facts */}
          <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 rounded-3xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <span className="material-icons text-3xl text-primary mt-1">lightbulb</span>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Fast Facts — Union Village QC</h3>
                <ul className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 space-y-1">
                  <li><strong>Location:</strong> Union Drive, Quezon City, Metro Manila</li>
                  <li><strong>Nearest landmarks:</strong> UP Diliman (~7 min), Ateneo de Manila (~10 min), St. Luke's Medical (~10 min), Katipunan Ave (C5)</li>
                  <li><strong>Property types:</strong> Townhouses, house & lot, nearby condominiums</li>
                  <li><strong>Townhouse price range:</strong> ₱8M – ₱15M</li>
                  <li><strong>Rental demand drivers:</strong> University students, faculty, hospital staff, BPO professionals</li>
                  <li><strong>Transport:</strong> MRT-7 (operational), Metro Manila Subway (under construction)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intro */}
          <section>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 border-l-4 border-primary pl-6 py-2 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-2xl">
              Union Village is one of those Quezon City addresses that quietly over-delivers. It sits in the academic heart of Metro Manila — a short drive from UP Diliman, Ateneo de Manila, and Miriam College — yet it feels like a genuine neighbourhood rather than a satellite of the university belt. The streets have trees. Homeowners know their neighbours. And the location, already strong, is about to get significantly better when MRT-7 completes and the Metro Manila Subway opens.
            </p>
            <p className="leading-relaxed mt-5">
              This guide covers Union Village honestly, for three very different readers: a <strong className="text-zinc-800 dark:text-white">family</strong> deciding if it's the right place to raise children, a <strong className="text-zinc-800 dark:text-white">young professional</strong> weighing the commute and lifestyle trade-offs, and an <strong className="text-zinc-800 dark:text-white">OFW investor</strong> running the numbers on rental yield and long-term appreciation.
            </p>
          </section>

          {/* Location table */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">What's Around Union Village?</h2>
            <p className="leading-relaxed mb-5">
              Location intelligence is the single biggest driver of real estate value. Here is what surrounds Union Drive — and why each one matters to a different type of buyer.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-950 text-white">
                    <th className="text-left px-5 py-4 font-bold">Landmark</th>
                    <th className="text-left px-5 py-4 font-bold">Distance</th>
                    <th className="text-left px-5 py-4 font-bold">Why It Matters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {[
                    { place: 'UP Diliman', distance: '~7 min drive', why: 'Top state university — strong student & faculty rental demand' },
                    { place: 'Ateneo de Manila University', distance: '~10 min drive', why: 'Premier private university — professional tenant pool' },
                    { place: 'Miriam College', distance: '~8 min drive', why: 'K–12 to college — excellent for school-age children' },
                    { place: 'St. Luke's Medical Center', distance: '~10 min drive', why: 'World-class hospital — healthcare access + staff rental demand' },
                    { place: 'Katipunan Avenue (C5)', distance: 'Direct access', why: 'Main artery to BGC, Makati, Ortigas, and the airport' },
                    { place: 'Eastwood City', distance: '~15 min drive', why: 'BPO hub and lifestyle centre — employment for professionals' },
                    { place: 'UP Town Center', distance: '~10 min drive', why: 'Al fresco dining, supermarkets, weekend market' },
                    { place: 'SM Fairview / Trinoma', distance: '~15–20 min drive', why: 'Major retail and entertainment options' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50 dark:bg-zinc-900/50'}>
                      <td className="px-5 py-3.5 font-semibold text-zinc-800 dark:text-zinc-200">{row.place}</td>
                      <td className="px-5 py-3.5 text-primary font-medium whitespace-nowrap">{row.distance}</td>
                      <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-400">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Transport */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Transport & Connectivity — Now and Next</h2>
            <p className="leading-relaxed mb-6">
              One of the most underappreciated reasons to buy in Union Village <em>right now</em> is timing. The neighbourhood's fundamentals are already strong — but two infrastructure projects are about to make it significantly more connected.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              {[
                {
                  icon: 'train',
                  title: 'MRT-7',
                  status: 'Operational on key segments',
                  color: 'text-primary',
                  bg: 'bg-primary/10 border-primary/20',
                  detail: 'Links North Quezon City directly to EDSA — faster commutes to BGC, Makati, and Ortigas. Already boosting property values in adjacent QC neighbourhoods.',
                },
                {
                  icon: 'subway',
                  title: 'Metro Manila Subway',
                  status: 'Under construction',
                  color: 'text-amber-500',
                  bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
                  detail: "The Philippines' first underground subway will eventually connect QC stations to Makati and the airport — a game-changer for commute times and property appreciation.",
                },
              ].map((item) => (
                <div key={item.title} className={`border rounded-2xl p-5 ${item.bg}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`material-icons text-2xl ${item.color}`}>{item.icon}</span>
                    <div>
                      <p className="font-black text-zinc-900 dark:text-white">{item.title}</p>
                      <span className={`text-xs font-bold uppercase tracking-widest ${item.color}`}>{item.status}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-950 text-white">
                    <th className="text-left px-5 py-4 font-bold">Destination</th>
                    <th className="text-center px-5 py-4 font-bold">Current (by road)</th>
                    <th className="text-center px-5 py-4 font-bold text-primary">With MRT-7 / Subway</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {[
                    { dest: 'BGC', now: '25–40 min', future: 'Significantly reduced' },
                    { dest: 'Makati CBD', now: '30–50 min', future: 'Significantly reduced' },
                    { dest: 'Ortigas Center', now: '20–35 min', future: 'Reduced via MRT-7' },
                    { dest: 'NAIA Airport', now: '45–75 min', future: 'Reduced via Subway' },
                    { dest: 'Eastwood City', now: '~15 min', future: 'Already accessible' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50 dark:bg-zinc-900/50'}>
                      <td className="px-5 py-3.5 font-semibold text-zinc-800 dark:text-zinc-200">{row.dest}</td>
                      <td className="px-5 py-3.5 text-center text-zinc-500">{row.now}</td>
                      <td className="px-5 py-3.5 text-center text-primary font-medium">{row.future}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-zinc-400 mt-3">Travel times estimated in off-peak conditions. Future times are indicative pending full completion of infrastructure projects.</p>
          </section>

          {/* Three personas */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">Who Lives in Union Village — And Why</h2>
            <div className="space-y-5">

              {/* Families */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <span className="material-icons text-primary">family_restroom</span>
                  </div>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white">For Families</h3>
                </div>
                <p className="leading-relaxed mb-4">
                  Families are drawn to Union Village for the same core reasons: good schools nearby, enough space to actually live in, and streets that feel safe. The proximity to UP Diliman, Ateneo, and Miriam College covers schooling from primary through university — an unusual concentration of quality education within a single short commute.
                </p>
                <p className="leading-relaxed mb-4">
                  Townhouses here offer three floors, dedicated parking, and a private entrance — a meaningful quality-of-life upgrade over a condo unit for a family with two or more children. Gated communities within Union Village maintain 24-hour security and active homeowner associations that keep common areas and facilities in good condition.
                </p>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl px-4 py-3">
                  <p className="font-bold text-zinc-800 dark:text-zinc-200 text-sm mb-2">Best for families:</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2"><span className="material-icons text-xs text-primary">check_circle</span>School-age children (K–12 to university)</li>
                    <li className="flex items-center gap-2"><span className="material-icons text-xs text-primary">check_circle</span>Couples wanting space without leaving the city</li>
                    <li className="flex items-center gap-2"><span className="material-icons text-xs text-primary">check_circle</span>Parents who value active HOA management and security</li>
                  </ul>
                </div>
              </div>

              {/* Young Professionals */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-sky-100 dark:bg-sky-900/30">
                    <span className="material-icons text-sky-500">work</span>
                  </div>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white">For Young Professionals</h3>
                </div>
                <p className="leading-relaxed mb-4">
                  The calculation for a young professional is straightforward: stop renting, start building equity, and find a base that keeps you close to both the lifestyle you want and the office you need. Union Village sits directly on Katipunan Avenue — one of Metro Manila's best-connected arteries — making Eastwood, Ortigas, and BGC all reachable without crossing into the worst of EDSA traffic.
                </p>
                <p className="leading-relaxed mb-4">
                  The Katipunan strip — with its cafés, restaurants, and independent shops that cater to the Ateneo and UP crowd — is ten minutes from your door. For professionals who value that kind of walkable-adjacent urban texture, it's a genuine lifestyle win.
                </p>
                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl px-4 py-3">
                  <p className="font-bold text-zinc-800 dark:text-zinc-200 text-sm mb-2">Best for young professionals:</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2"><span className="material-icons text-xs text-primary">check_circle</span>BPO and corporate employees in Eastwood or Ortigas</li>
                    <li className="flex items-center gap-2"><span className="material-icons text-xs text-primary">check_circle</span>First-time buyers who want to own, not rent</li>
                    <li className="flex items-center gap-2"><span className="material-icons text-xs text-primary">check_circle</span>Couples starting out who need a spare room for a home office</li>
                  </ul>
                </div>
              </div>

              {/* OFW Investors */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/30">
                    <span className="material-icons text-amber-500">flight_takeoff</span>
                  </div>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white">For OFW Investors</h3>
                </div>
                <p className="leading-relaxed mb-4">
                  OFW investors ask different questions. Not "do I like the neighbourhood?" but "will it rent reliably, appreciate steadily, and be easy to manage from abroad?" Union Village scores well on all three.
                </p>
                <p className="leading-relaxed mb-4">
                  The rental market here is anchored by a permanent base of demand: UP Diliman and Ateneo produce a continuous stream of students, faculty, and staff who need housing close to campus. St. Luke's Medical Center adds hospital staff — nurses, resident doctors, and allied health workers who prefer proximity to the hospital. This is not seasonal demand. It is structural.
                </p>
                <p className="leading-relaxed mb-4">
                  Gated communities with professional administration simplify remote management considerably. Most established HOAs handle common area maintenance, security, and visitor management — reducing the landlord burden for owners who cannot be on the ground.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                  {[
                    { label: 'Rental Demand', value: 'High', sub: 'University + hospital-driven, year-round' },
                    { label: 'Remote Management', value: 'Practical', sub: 'Established HOA administration in gated estates' },
                    { label: 'Appreciation Outlook', value: 'Positive', sub: 'MRT-7 and Subway expected to lift adjacent values' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4 text-center">
                      <p className="text-xl font-black text-zinc-900 dark:text-white">{stat.value}</p>
                      <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mt-1">{stat.label}</p>
                      <p className="text-xs text-zinc-500 mt-1">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Property types + pricing */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">Property Types & Price Ranges</h2>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-950 text-white">
                    <th className="text-left px-5 py-4 font-bold">Type</th>
                    <th className="text-left px-5 py-4 font-bold">Price Range</th>
                    <th className="text-left px-5 py-4 font-bold">Typical Configuration</th>
                    <th className="text-left px-5 py-4 font-bold">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {[
                    { type: 'Condominium', price: '₱3.5M – ₱8M', config: 'Studio to 2BR, in nearby developments', best: 'Young professionals, entry-level OFW investment' },
                    { type: 'Townhouse (3-storey)', price: '₱8M – ₱15M', config: '3–4 BR, maid\'s room, 1–2 car garage', best: 'Families, OFW investors targeting professional renters' },
                    { type: 'House & Lot', price: '₱8M and up', config: 'Varied — garden, larger lot sizes', best: 'Families wanting long-term space and land ownership' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50 dark:bg-zinc-900/50'}>
                      <td className="px-5 py-3.5 font-semibold text-zinc-800 dark:text-zinc-200">{row.type}</td>
                      <td className="px-5 py-3.5 text-primary font-medium">{row.price}</td>
                      <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-400">{row.config}</td>
                      <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-400">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-zinc-400">Prices are indicative based on 2025–2026 QC market data. Contact Yhens Property for current availability and verified pricing.</p>
          </section>

          {/* Featured listing */}
          <section className="bg-gradient-to-br from-primary/10 to-transparent border-2 border-primary/30 rounded-3xl p-6">
            <div className="flex items-start gap-4">
              <span className="material-icons text-3xl text-primary mt-1">villa</span>
              <div className="flex-1">
                <span className="text-xs font-black uppercase tracking-widest text-primary mb-1 block">Featured Listing</span>
                <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2">Cute 3-Storey Townhouse Near UP Diliman, QC</h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mb-4">
                  A well-presented 3-storey townhouse in Quezon City — close to UP Diliman, Ateneo, and Katipunan Avenue. Suitable for families and OFW investors looking for a practical property with strong rental fundamentals in the university belt.
                </p>
                <a
                  href="https://yhensproperty.com/property/cute-3-story-town-house-002"
                  className="inline-flex items-center gap-2 bg-primary text-zinc-900 font-bold text-sm px-6 py-3 rounded-xl hover:brightness-110 transition-all shadow-md shadow-primary/20"
                >
                  <span className="material-icons text-sm">open_in_new</span>
                  View This Property
                </a>
              </div>
            </div>
          </section>

          {/* Decision guide */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">Is Union Village Right for You?</h2>
            <div className="space-y-4">
              {[
                { profile: 'Family with school-age children', verdict: 'Strong match', rationale: 'UP, Ateneo, and Miriam all within 10 minutes. Townhouses offer the space a growing family needs. Gated communities provide safety and community.', icon: 'family_restroom', color: 'text-primary', badge: 'bg-primary/10 text-primary' },
                { profile: 'Young professional, first home purchase', verdict: 'Good match', rationale: 'Katipunan lifestyle, C5 access to Eastwood/Ortigas, and a chance to build equity instead of renting. Smaller townhouses and nearby condos are accessible entry points.', icon: 'work', color: 'text-sky-500', badge: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' },
                { profile: 'OFW investor seeking rental income', verdict: 'Strong match', rationale: 'Year-round rental demand from universities and St. Luke\'s, established HOA management, and transport infrastructure that will only improve rental appeal.', icon: 'flight_takeoff', color: 'text-amber-500', badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
                { profile: 'Investor seeking short-term Airbnb yield', verdict: 'Not the primary use case', rationale: 'Union Village is better suited to long-term residential tenants than short-term rental. For Airbnb-style yields, Batangas beachfront properties are a stronger fit.', icon: 'hotel', color: 'text-zinc-400', badge: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500' },
              ].map((item) => (
                <div key={item.profile} className="flex items-start gap-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5">
                  <span className={`material-icons ${item.color} mt-0.5`}>{item.icon}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <p className="font-bold text-zinc-900 dark:text-white text-sm">{item.profile}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.badge}`}>{item.verdict}</span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.rationale}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Is Union Village good for families?',
                  a: 'Yes. Union Village offers safe, gated-community living within 5–10 minutes of UP Diliman, Ateneo de Manila, and Miriam College. Spacious townhouses and house-and-lot properties give families room to grow, while active homeowner associations maintain a strong community atmosphere rare in Metro Manila.',
                },
                {
                  q: 'How far is Union Village from BGC?',
                  a: 'Union Village is approximately 25–40 minutes from BGC via Katipunan Avenue and C5 Road in off-peak traffic. With MRT-7 fully operational and the Metro Manila Subway corridor expanding, travel times to major employment hubs will shorten significantly.',
                },
                {
                  q: 'Is Union Village a good investment?',
                  a: 'Yes. Union Village benefits from consistent rental demand driven by UP Diliman, Ateneo, and St. Luke\'s Medical Center — providing a near-permanent pool of student, faculty, and hospital staff tenants. Upcoming MRT-7 completion and the Metro Manila Subway are expected to push property values higher in adjacent Quezon City neighbourhoods.',
                },
                {
                  q: 'What is the average property price in Union Village?',
                  a: 'Townhouses in Union Village typically range from ₱8M to ₱15M depending on size and finishes. House-and-lot properties start from ₱8M upward. Condominium units in nearby developments start from ₱3.5M. Contact Yhens Property for current verified pricing.',
                },
                {
                  q: 'Is Union Village near MRT-7?',
                  a: 'Yes. MRT-7 serves North Quezon City and is operational on key segments, with full completion improving north-south Metro Manila connectivity. Properties in and around Union Village benefit from proximity to this expanding rail line — making the area increasingly attractive to commuters and investors.',
                },
                {
                  q: 'Are there townhouses for sale near UP Diliman?',
                  a: 'Yes. Yhens Property lists townhouses in Quezon City within short commuting distance of UP Diliman and Ateneo de Manila University, including 3-storey units with 3–4 bedrooms and garage. Browse current listings at yhensproperty.com or speak directly with Yhen.',
                },
                {
                  q: 'Is Union Village good for OFW investment?',
                  a: 'Yes. Strong university-driven rental demand, steady appreciation, and established gated-community management make Union Village a practical OFW investment. Yhens Property assists with remote purchasing, document processing, and property management support.',
                },
                {
                  q: 'Will the Metro Manila Subway affect property values in Union Village?',
                  a: 'Almost certainly positively. Infrastructure projects of this scale historically drive property appreciation in adjacent areas. The subway will reduce travel times to major hubs including Makati and the airport, increasing Union Village\'s appeal to a broader range of buyers and renters.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5">
                  <p className="font-bold text-zinc-900 dark:text-white mb-2 flex items-start gap-2">
                    <span className="material-icons text-sm text-primary mt-0.5">help_outline</span>
                    {item.q}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-6">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-zinc-950 rounded-3xl p-8 text-center">
            <h2 className="text-xl font-black text-white mb-3">Looking for a Property in Union Village or Nearby QC?</h2>
            <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
              Yhen covers Quezon City, BGC, Manila, and Batangas. Get direct, no-jargon guidance on current listings, pricing, and which property fits your situation — family, investor, or first-time buyer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi Yhen, I read your Union Village guide and want to ask about properties in the area.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Ask Yhen on WhatsApp
              </a>
              <a
                href="https://yhensproperty.com/property/cute-3-story-town-house-002"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold py-4 px-8 rounded-2xl transition-all border border-white/10"
              >
                <span className="material-icons text-sm">villa</span>
                View Townhouse Listing
              </a>
            </div>
          </section>

          {/* Browse links */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Browse Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/category/buy-houses" className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-icons text-xl text-primary">home</span>
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-primary transition-colors">Houses & Townhouses</p>
                  <p className="text-xs text-zinc-500">Quezon City & Metro Manila</p>
                </div>
              </Link>
              <Link to="/category/buy-condos" className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-icons text-xl text-amber-500">apartment</span>
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-primary transition-colors">Condominiums</p>
                  <p className="text-xs text-zinc-500">BGC, Manila, QC</p>
                </div>
              </Link>
              <Link to="/inventory" className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-icons text-xl text-sky-500">table_view</span>
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-primary transition-colors">Full Inventory</p>
                  <p className="text-xs text-zinc-500">All current listings</p>
                </div>
              </Link>
            </div>
          </section>

        </div>
      </GuideLayout>
    </>
  );
};

export default UnionVillageGuide;
