import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import GuideLayout from '../../components/GuideLayout';
import { siteConfig } from '../../config/site';

const relatedGuides = [
  { title: 'BGC vs. Makati vs. Batangas: Where to Invest for the Best Rental Yields', slug: 'bgc-makati-batangas-rental-yields', icon: 'bar_chart' },
  { title: 'Can Foreigners Legally Buy & Own Property in the Philippines?', slug: 'foreigner-property-ownership', icon: 'home' },
  { title: "Philippines Property Buyer's Guide: Every Fee, Tax & Step Explained", slug: 'philippines-property-buyers-guide', icon: 'real_estate_agent' },
  { title: 'Union Village, Quezon City: Complete Neighbourhood Guide', slug: 'union-village-quezon-city', icon: 'location_city' },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "BGC Taguig Neighbourhood Guide 2026: Living, Investing & Things To Do in Bonifacio Global City",
  "description": "The complete guide to Bonifacio Global City — restaurants, things to do, hospitals, international schools, property prices, rental yields, and why BGC is the top choice for expats, OFW investors, and high-income professionals.",
  "author": { "@type": "Person", "name": "Yhen", "jobTitle": "Licensed Real Estate Broker" },
  "publisher": { "@type": "Organization", "name": siteConfig.officialName },
  "datePublished": "2026-04-21",
  "dateModified": "2026-04-21",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is there to do in BGC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BGC offers the Mind Museum, BGC Arts Center, Track 30th urban park, a 70+ mural street art trail, Bonifacio High Street dining and retail, The Grid Food Market, Serendra, and some of Metro Manila's best restaurants and fitness studios — all within walking distance of each other."
      }
    },
    {
      "@type": "Question",
      "name": "Is BGC walkable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. BGC is the most walkable neighbourhood in Metro Manila. Wide, clean pavements, pedestrian crossings, and a compact grid layout mean residents can walk between their condo, office, restaurant, gym, and mall without needing a car or Grab — almost uniquely so in the Philippines."
      }
    },
    {
      "@type": "Question",
      "name": "Is BGC good for families?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, particularly for expat families. International School Manila and British School Manila are both within 10–15 minutes. St. Luke's Medical Center BGC is on-site. The walkable, flood-free environment and proximity to parks and the Mind Museum make it one of Metro Manila's most family-friendly urban addresses."
      }
    },
    {
      "@type": "Question",
      "name": "Can foreigners buy property in BGC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. BGC condominium units are CCT-eligible (Condominium Certificate of Title), allowing foreign nationals to hold freehold title directly. The 40% foreign ownership quota applies per building. BGC is one of the most popular and legally straightforward places for foreigners to buy property in the Philippines."
      }
    },
    {
      "@type": "Question",
      "name": "What is the rental yield in BGC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BGC rental yields typically range from 4% to 6% per annum gross, depending on unit size, building, and fit-out. Studios and 1-bedroom units in well-managed buildings generally perform strongest on a yield basis. The tenant pool — expats, multinational employees, and embassy staff — provides high payment reliability and low vacancy rates."
      }
    },
    {
      "@type": "Question",
      "name": "Is BGC better than Makati for property investment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BGC offers newer buildings, a more international tenant profile, and slightly higher rental yields than Makati CBD. Makati offers a lower entry price and an established financial district. For investors targeting expat tenants and premium yields, BGC is the stronger choice. For value-entry with stable income, Makati is competitive."
      }
    },
    {
      "@type": "Question",
      "name": "Is BGC flood-free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. BGC was purpose-built on elevated land with a modern drainage system — it is one of the very few areas in Metro Manila that does not flood during typhoon season. This is a significant quality-of-life and property value advantage over many other Metro Manila neighbourhoods."
      }
    },
    {
      "@type": "Question",
      "name": "How far is BGC from NAIA airport?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BGC is approximately 20–35 minutes from NAIA Terminals 1–3 via the Skyway or C5, depending on traffic. It is one of the closest major residential and business districts to the airport in Metro Manila."
      }
    },
    {
      "@type": "Question",
      "name": "Are there hospitals in BGC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. St. Luke's Medical Center BGC is located within Bonifacio Global City itself — one of the Philippines' top-ranked private hospitals. The Medical City in Pasig is approximately 15 minutes away via C5."
      }
    },
    {
      "@type": "Question",
      "name": "What are the best restaurants in BGC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BGC has one of the highest concentrations of quality restaurants in the Philippines. The Grid Food Market at Power Plant-adjacent is a curated food hall with multiple restaurant concepts. Bonifacio High Street and Serendra both offer al fresco dining with international cuisine. Popular areas include Burgos Circle for nightlife and Uptown Bonifacio for premium dining."
      }
    },
    {
      "@type": "Question",
      "name": "Is BGC a good place to live in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — BGC consistently ranks as the most liveable neighbourhood in Metro Manila. Flood-free streets, walkable access to restaurants, offices, gyms, and hospitals, a genuine international community, and continued infrastructure development in Uptown Bonifacio and McKinley West make 2026 one of the strongest years for BGC quality of life."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to live in BGC per month?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget roughly ₱60,000–₱100,000/month for a comfortable lifestyle in a 1-bedroom condo — covering rent (₱35,000–₱60,000), daily meals, utilities, gym, and transport. Ultra-premium living in a 3BR can exceed ₱250,000/month. BGC is one of Metro Manila's most expensive neighbourhoods, but the infrastructure justifies it for most expats and high-income professionals."
      }
    },
    {
      "@type": "Question",
      "name": "How safe is BGC at night?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BGC is one of the safest areas in Metro Manila at night. The area is well-lit with visible security presence, CCTV coverage, and a compact layout that keeps foot traffic high into the late evening. Burgos Circle and High Street remain active until midnight or later most nights."
      }
    },
    {
      "@type": "Question",
      "name": "How is commuting from BGC to Makati or Ortigas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BGC to Makati CBD takes 10–25 minutes by car or Grab off-peak; Ortigas is 20–40 minutes via C5. The BGC Bus (₱13–₱15) runs frequent routes to Ayala MRT station. Peak-hour traffic (7–9am, 6–8pm) is the main challenge, but BGC's walkability means many residents avoid it entirely."
      }
    },
    {
      "@type": "Question",
      "name": "What areas or clusters within BGC are best for buying or renting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bonifacio High Street and Serendra are popular for lifestyle access. Uptown Bonifacio near SM Aura is the newest cluster with premium new builds. Burgos Circle appeals to young professionals for its nightlife proximity. For investment, buildings within walking distance of the BGC corporate centre command the strongest rental demand."
      }
    },
    {
      "@type": "Question",
      "name": "BGC vs McKinley Hill vs Arca South — which is better?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BGC is the most established and liquid — best for rental income and foreign buyers. McKinley Hill is quieter and slightly cheaper with its own Korean community and international schools. Arca South is the newest Taguig development with lower entry prices but still maturing in amenities. For maximum tenant demand and resale value, BGC leads."
      }
    }
  ]
};

const BGCGuide: React.FC = () => {
  return (
    <>
      <SEO
        title="BGC Taguig Neighbourhood Guide 2026: Things To Do, Restaurants, Property & Investment | Yhens Property"
        description="Complete guide to Bonifacio Global City — things to do, best restaurants, hospitals, international schools, condo prices, rental yields, and why BGC is Metro Manila's top address for expats, OFW investors, and professionals."
        canonical="https://yhensproperty.com/guides/bgc-taguig-neighbourhood-guide"
        ogType="article"
        ogUrl="https://yhensproperty.com/guides/bgc-taguig-neighbourhood-guide"
        structuredData={structuredData}
        breadcrumbs={[
          { name: "Home", url: "https://yhensproperty.com" },
          { name: "Guides", url: "https://yhensproperty.com/guides" },
          { name: "BGC Taguig Guide", url: "https://yhensproperty.com/guides/bgc-taguig-neighbourhood-guide" }
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <GuideLayout
        title="BGC, Taguig: The Complete Neighbourhood Guide (2026)"
        subtitle="Everything you need to know about living, eating, investing, and buying property in Bonifacio Global City — Metro Manila's most international, most walkable, and most in-demand urban address."
        readTime="12 min"
        relatedGuides={relatedGuides}
        whatsappMessage="Hi Yhen, I read your BGC neighbourhood guide and want to know more about properties in the area."
      >
        <div className="space-y-10 text-zinc-700 dark:text-zinc-300">

          {/* Freshness badge */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="material-icons text-sm text-primary">update</span>
            <span>Updated April 2026 · Reviewed by Yhen, Licensed Real Estate Broker</span>
          </div>

          {/* Fast Facts */}
          <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 rounded-3xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <span className="material-icons text-3xl text-primary mt-1">lightbulb</span>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Fast Facts — BGC, Taguig</h3>
                <ul className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 space-y-1">
                  <li><strong>Location:</strong> Bonifacio Global City, Fort Bonifacio, Taguig City, Metro Manila</li>
                  <li><strong>Known for:</strong> International lifestyle, walkability, flood-free streets, premium condos</li>
                  <li><strong>Hospital on-site:</strong> St. Luke's Medical Center BGC</li>
                  <li><strong>Nearest schools:</strong> International School Manila (~10 min), British School Manila (~10 min), Enderun Colleges (on-site)</li>
                  <li><strong>Condo price range:</strong> ₱6.8M (studio) to ₱250M+ (ultra-premium)</li>
                  <li><strong>Rental yield:</strong> 4–6% per annum gross</li>
                  <li><strong>Foreign ownership:</strong> Yes — CCT-eligible condos, 40% foreign quota per building</li>
                  <li><strong>Flood risk:</strong> None — purpose-built elevated land with modern drainage</li>
                  <li><strong>To NAIA airport:</strong> ~20–35 min via Skyway</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intro */}
          <section>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 border-l-4 border-primary pl-6 py-2 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-2xl">
              BGC is unlike anywhere else in the Philippines. It was built from scratch on what was once a military base — purpose-designed with wide roads, modern drainage, underground utilities, and a walkable grid. The result is the closest thing to a global city district that Metro Manila has: clean pavements, zero flooding, world-class hospitals and restaurants, and a resident community that is genuinely international.
            </p>
            <p className="leading-relaxed mt-5">
              For property buyers, that uniqueness translates directly into value. BGC condos command premium prices — and those prices are justified by premium infrastructure, a high-quality tenant pool, and consistent demand from expats, multinational employees, and high-income Filipino professionals. This guide covers everything: what to do here, where to eat, which hospitals serve the area, what schools are nearby, and what buying or investing actually looks like in 2026.
            </p>
          </section>

          {/* Why BGC is different */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">What Makes BGC Different from Every Other Metro Manila Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: 'directions_walk', title: "Manila's Most Walkable Neighbourhood", detail: 'Wide pavements, pedestrian crossings, and a compact grid mean you can walk from your condo to your office, restaurant, gym, and mall. Genuinely rare in the Philippines.' },
                { icon: 'water_damage', title: 'Zero Flood Risk', detail: 'BGC was built on elevated land with a modern underground drainage system. It does not flood — not during Ondoy-level rainfall, not during typhoon season. A significant advantage over most of Metro Manila.' },
                { icon: 'public', title: 'Truly International Community', detail: 'Multinationals, embassies, NGOs, and international schools create a resident and tenant community that is diverse in a way no other Philippine address matches.' },
                { icon: 'bolt', title: 'Infrastructure That Works', detail: 'Underground utilities mean no downed power lines during storms. Wide roads, consistent traffic management, and 24-hour security across the district.' },
              ].map((item) => (
                <div key={item.title} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-icons text-primary">{item.icon}</span>
                    <p className="font-black text-zinc-900 dark:text-white text-sm">{item.title}</p>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What's Around */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">What's Around BGC?</h2>
            <p className="leading-relaxed mb-6 text-zinc-600 dark:text-zinc-400">
              BGC is one of the most self-contained districts in Metro Manila — most of what residents need is within walking distance. Here's the full picture, by category.
            </p>

            {/* Hospitals */}
            <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="material-icons text-rose-500 text-xl">local_hospital</span> Hospitals & Healthcare
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 mb-7">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-950 text-white">
                    <th className="text-left px-5 py-3 font-bold">Hospital</th>
                    <th className="text-left px-5 py-3 font-bold">Distance</th>
                    <th className="text-left px-5 py-3 font-bold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {[
                    { place: "St. Luke's Medical Center BGC", dist: 'On-site / walking', note: "One of the Philippines' top-ranked private hospitals — world-class specialists, ER, and diagnostics" },
                    { place: 'The Medical City', dist: '~15 min via C5', note: 'Major full-service hospital in Pasig — strong secondary option' },
                    { place: 'Makati Medical Center', dist: '~15 min', note: 'Established Makati hospital with specialist network' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50 dark:bg-zinc-900/50'}>
                      <td className="px-5 py-3.5 font-semibold text-zinc-800 dark:text-zinc-200">{row.place}</td>
                      <td className="px-5 py-3.5 text-rose-500 font-medium whitespace-nowrap">{row.dist}</td>
                      <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-400">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Shopping */}
            <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="material-icons text-sky-500 text-xl">shopping_bag</span> Shopping
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 mb-7">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-950 text-white">
                    <th className="text-left px-5 py-3 font-bold">Mall / Market</th>
                    <th className="text-left px-5 py-3 font-bold">Distance</th>
                    <th className="text-left px-5 py-3 font-bold">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {[
                    { place: 'Bonifacio High Street', dist: 'Walking', note: 'Open-air flagship retail and dining strip — the heart of BGC lifestyle' },
                    { place: 'Uptown Mall', dist: 'Walking (Uptown)', note: 'Premium retail, specialty grocery, cinemas' },
                    { place: 'SM Aura Premier', dist: '~5 min', note: 'Full-service mall — KidZania, cinemas, major retail anchors' },
                    { place: 'Market! Market!', dist: '~5 min', note: 'Budget-friendly wet market, food stalls, weekend ukay' },
                    { place: 'Serendra Piazza', dist: 'Walking', note: 'Al fresco lifestyle centre — boutiques and restaurants' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50 dark:bg-zinc-900/50'}>
                      <td className="px-5 py-3.5 font-semibold text-zinc-800 dark:text-zinc-200">{row.place}</td>
                      <td className="px-5 py-3.5 text-sky-500 font-medium whitespace-nowrap">{row.dist}</td>
                      <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-400">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Dining & Nightlife */}
            <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="material-icons text-amber-500 text-xl">restaurant</span> Dining & Nightlife
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 mb-7">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-950 text-white">
                    <th className="text-left px-5 py-3 font-bold">Spot</th>
                    <th className="text-left px-5 py-3 font-bold">Distance</th>
                    <th className="text-left px-5 py-3 font-bold">What It Is</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {[
                    { place: 'The Grid Food Market', dist: 'Walking', note: 'Curated multi-concept food hall — one of Metro Manila\'s best dining experiences' },
                    { place: 'Bonifacio High Street dining strip', dist: 'Walking', note: 'Hundreds of restaurants — Japanese, Korean, Italian, Filipino fine dining, casual' },
                    { place: 'Burgos Circle', dist: 'Walking', note: 'BGC\'s nightlife hub — cocktail bars, live music, weekend crowds' },
                    { place: 'Uptown Bonifacio restaurants', dist: 'Walking', note: 'Premium dining cluster including international chains and chef-driven concepts' },
                    { place: 'Poblacion, Makati', dist: '~15 min', note: 'BGC\'s nightlife overflow — craft bars, underground venues, late-night dining' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50 dark:bg-zinc-900/50'}>
                      <td className="px-5 py-3.5 font-semibold text-zinc-800 dark:text-zinc-200">{row.place}</td>
                      <td className="px-5 py-3.5 text-amber-500 font-medium whitespace-nowrap">{row.dist}</td>
                      <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-400">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Things To Do */}
            <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="material-icons text-primary text-xl">explore</span> Things To Do
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 mb-7">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-950 text-white">
                    <th className="text-left px-5 py-3 font-bold">Activity / Attraction</th>
                    <th className="text-left px-5 py-3 font-bold">Distance</th>
                    <th className="text-left px-5 py-3 font-bold">What It Is</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {[
                    { place: 'Mind Museum', dist: 'Walking', note: 'Best science museum in the Philippines — excellent for families and curious adults' },
                    { place: 'BGC Arts Center', dist: 'Walking', note: 'Live theatre, gallery exhibitions, and cultural events year-round' },
                    { place: 'Track 30th', dist: 'Walking', note: 'Urban jogging track and green space — the go-to weekend outdoor spot' },
                    { place: 'BGC Street Art Trail', dist: 'Walking', note: '70+ large-scale murals by local and international artists — unique in Metro Manila' },
                    { place: 'KidZania at SM Aura', dist: '~5 min', note: 'Role-play city experience for kids — popular with expat and local families' },
                    { place: 'Fitness studios (F45, CrossFit, Anytime, etc.)', dist: 'Walking', note: 'Probably the most gym-dense area in the Philippines — every major brand is here' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50 dark:bg-zinc-900/50'}>
                      <td className="px-5 py-3.5 font-semibold text-zinc-800 dark:text-zinc-200">{row.place}</td>
                      <td className="px-5 py-3.5 text-primary font-medium whitespace-nowrap">{row.dist}</td>
                      <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-400">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Schools */}
            <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="material-icons text-emerald-500 text-xl">school</span> Schools & Education
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 mb-7">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-950 text-white">
                    <th className="text-left px-5 py-3 font-bold">School</th>
                    <th className="text-left px-5 py-3 font-bold">Distance</th>
                    <th className="text-left px-5 py-3 font-bold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {[
                    { place: 'Enderun Colleges', dist: 'On-site BGC', note: 'Hospitality and business college — inside BGC itself' },
                    { place: 'International School Manila (ISM)', dist: '~10 min (McKinley Hill)', note: 'Premier international K–12, US/IB curriculum, large expat enrolment' },
                    { place: 'British School Manila (BSM)', dist: '~10 min', note: 'UK curriculum, consistently ranked among the best international schools in PH' },
                    { place: 'Korean International School Philippines', dist: '~10 min', note: 'Serves the significant Korean expat community in BGC' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50 dark:bg-zinc-900/50'}>
                      <td className="px-5 py-3.5 font-semibold text-zinc-800 dark:text-zinc-200">{row.place}</td>
                      <td className="px-5 py-3.5 text-emerald-500 font-medium whitespace-nowrap">{row.dist}</td>
                      <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-400">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Transport */}
            <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="material-icons text-zinc-500 text-xl">directions_car</span> Getting Around
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-950 text-white">
                    <th className="text-left px-5 py-3 font-bold">Destination</th>
                    <th className="text-left px-5 py-3 font-bold">Travel Time</th>
                    <th className="text-left px-5 py-3 font-bold">Route</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {[
                    { dest: 'NAIA Airport (T1–T3)', time: '20–35 min', route: 'Skyway or C5 southbound' },
                    { dest: 'Makati CBD', time: '10–20 min', route: '5th Avenue to Ayala Avenue' },
                    { dest: 'Ortigas Center', time: '20–35 min', route: 'C5 northbound' },
                    { dest: 'Quezon City', time: '30–50 min', route: 'C5 to Katipunan' },
                    { dest: 'Pasay / Mall of Asia', time: '20–30 min', route: 'Skyway westbound' },
                    { dest: 'Alabang', time: '25–40 min', route: 'Skyway southbound' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50 dark:bg-zinc-900/50'}>
                      <td className="px-5 py-3.5 font-semibold text-zinc-800 dark:text-zinc-200">{row.dest}</td>
                      <td className="px-5 py-3.5 text-primary font-medium">{row.time}</td>
                      <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-400">{row.route}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-zinc-400 mt-3">Travel times estimated in off-peak conditions via private vehicle or Grab.</p>
          </section>

          {/* Who buys here */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">Who Buys & Lives in BGC — And Why</h2>
            <div className="space-y-5">

              <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-sky-100 dark:bg-sky-900/30">
                    <span className="material-icons text-sky-500">public</span>
                  </div>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white">Foreign Expats & International Investors</h3>
                </div>
                <p className="leading-relaxed mb-4">
                  BGC's single largest buyer and renter group. Multinational executives, embassy staff, NGO workers, and international business owners choose BGC because it is the only Metro Manila address that genuinely replicates the infrastructure and lifestyle of a global city. International schools for their children, St. Luke's for healthcare, walkable streets, and a community of people from every nationality.
                </p>
                <p className="leading-relaxed mb-4">
                  For foreign buyers specifically, BGC condos are among the cleanest property purchases available in the Philippines. Condominium Certificate of Title (CCT) gives foreigners direct freehold ownership — no trust structures, no nominee arrangements. Most premium buildings — Uptown Parksuites, Aurelia Residences, Grand Hyatt Residences — have foreign quota available.
                </p>
                <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800/50 rounded-xl px-4 py-3">
                  <p className="font-bold text-sky-800 dark:text-sky-300 text-sm mb-1">Key fact for foreign buyers</p>
                  <p className="text-xs text-sky-700 dark:text-sky-400">BGC condo units are CCT-eligible. Foreign nationals can own freehold title directly, subject to the 40% foreign ownership cap per building. Yhens Property can identify current quota availability across buildings.</p>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/30">
                    <span className="material-icons text-amber-500">flight_takeoff</span>
                  </div>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white">OFW Investors</h3>
                </div>
                <p className="leading-relaxed mb-4">
                  BGC is consistently the top OFW investment destination in the Philippines for one straightforward reason: tenant quality. Multinational employees and expats pay on time, maintain properties well, and provide long leases. Vacancy in well-managed BGC buildings is low — buildings like Uptown Parksuites, Trion Tower, and Icon Residences have waiting lists for quality units.
                </p>
                <p className="leading-relaxed mb-4">
                  For OFWs managing investments remotely, BGC's professional building management systems are a significant practical advantage. Most premium condos have full property management services — tenant sourcing, maintenance, and rental collection handled on your behalf.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                  {[
                    { label: 'Gross Rental Yield', value: '4–6%', sub: 'per annum, studio to 1BR units' },
                    { label: 'Tenant Profile', value: 'Premium', sub: 'Expats, multinationals, embassy staff' },
                    { label: 'Vacancy Risk', value: 'Low', sub: 'Structural demand from international employers' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4 text-center">
                      <p className="text-xl font-black text-zinc-900 dark:text-white">{stat.value}</p>
                      <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mt-1">{stat.label}</p>
                      <p className="text-xs text-zinc-500 mt-1">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <span className="material-icons text-primary">work</span>
                  </div>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white">High-Income Filipino Professionals</h3>
                </div>
                <p className="leading-relaxed mb-4">
                  Finance executives, lawyers, tech leaders, and C-suite professionals who work in BGC or Makati and want to live where they work. For this buyer, BGC is as much a lifestyle choice as an investment — walkability, quality restaurants, fitness culture, and the calibre of neighbours all factor in.
                </p>
                <p className="leading-relaxed">
                  This buyer group also appreciates BGC's status signal in a Metro Manila context. Owning in Uptown Parksuites or Aurelia Residences means something in the professional circles where these buyers operate. That intangible, combined with genuine lifestyle value, keeps demand from this group consistently strong.
                </p>
              </div>
            </div>
          </section>

          {/* Property types + listings */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">BGC Property Prices by Bedroom</h2>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-950 text-white">
                    <th className="text-left px-5 py-4 font-bold">Type</th>
                    <th className="text-left px-5 py-4 font-bold">Typical Size</th>
                    <th className="text-left px-5 py-4 font-bold text-primary">Price Range</th>
                    <th className="text-left px-5 py-4 font-bold">Example Buildings</th>
                    <th className="text-left px-5 py-4 font-bold">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {[
                    { type: 'Studio', size: '~36 sqm', price: '₱6.8M – ₱8.5M', examples: 'Icon Residences, Icon Plaza, Grand Hamptons', best: 'Entry-level OFW investment, first-time buyers' },
                    { type: '1 Bedroom', size: '44–65 sqm', price: '₱7M – ₱26M', examples: 'Grand Hamptons, Uptown Parksuites', best: 'OFW investors, young professionals, expat rentals' },
                    { type: '2 Bedroom', size: '~50 sqm', price: 'From ₱8.5M', examples: 'Trion Tower', best: 'Small families, couples upgrading from studio' },
                    { type: '3 Bedroom', size: '94–298 sqm', price: '₱30M – ₱250M+', examples: 'Florence Tower, Grand Hyatt, Aurelia Residences', best: 'Expat families, HNW buyers, corporate housing' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50 dark:bg-zinc-900/50'}>
                      <td className="px-5 py-3.5 font-semibold text-zinc-800 dark:text-zinc-200">{row.type}</td>
                      <td className="px-5 py-3.5 text-zinc-500">{row.size}</td>
                      <td className="px-5 py-3.5 text-primary font-medium">{row.price}</td>
                      <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-400">{row.examples}</td>
                      <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-400">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-zinc-400 mb-5">Price ranges based on 2025–2026 BGC market data from active listings. Contact Yhens Property for current verified pricing.</p>
            <Link to="/category/bgc" className="inline-flex items-center gap-2 bg-primary text-zinc-900 font-bold text-sm px-6 py-3 rounded-xl hover:brightness-110 transition-all shadow-md shadow-primary/20">
              <span className="material-icons text-sm">apartment</span>
              View All Current BGC Listings
            </Link>
          </section>

          {/* Is BGC overpriced */}
          <section className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">
            <h2 className="text-xl font-black text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="material-icons text-primary">balance</span>
              Is BGC Overpriced?
            </h2>
            <p className="leading-relaxed mb-3">
              No — and here is why that question misreads the market. BGC prices reflect something rare in Metro Manila: infrastructure that actually works. No flooding. Wide roads. 24-hour security. Walkable blocks. A tenant pool of multinational employees, embassy staff, and executives who pay on time and stay long-term.
            </p>
            <p className="leading-relaxed mb-3">
              That is not a premium for prestige — it is a premium for reliability. Prices have grown consistently year-on-year because demand from both local and international buyers has grown consistently. The entry point is higher than Makati or Ortigas, but so is the quality of what you are getting: a better-built environment, a stronger tenant, and a more liquid resale market.
            </p>
            <p className="leading-relaxed">
              For investors specifically, the math works because of <em>who</em> rents in BGC. An expat tenant on a corporate lease is a fundamentally different risk profile to the general rental market. Lower vacancy, higher rent, less management overhead. That is what the BGC price premium buys.
            </p>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">Frequently Asked Questions About BGC</h2>
            <div className="space-y-4">
              {[
                { q: 'What is there to do in BGC?', a: "BGC offers the Mind Museum, BGC Arts Center, Track 30th urban park, a 70+ mural street art trail, Bonifacio High Street dining and retail, The Grid Food Market, Serendra, and some of Metro Manila's best restaurants and fitness studios — all within walking distance of each other." },
                { q: 'Is BGC walkable?', a: 'Yes. BGC is the most walkable neighbourhood in Metro Manila. Wide, clean pavements, pedestrian crossings, and a compact grid layout mean residents can walk between their condo, office, restaurant, gym, and mall without needing a car or Grab.' },
                { q: 'Is BGC good for families?', a: 'Yes, particularly for expat families. International School Manila and British School Manila are both within 10–15 minutes. St. Luke\'s Medical Center BGC is on-site. The walkable, flood-free environment and the Mind Museum make it one of Metro Manila\'s most family-friendly urban addresses.' },
                { q: 'Can foreigners buy property in BGC?', a: 'Yes. BGC condominium units are CCT-eligible, allowing foreign nationals to hold freehold title directly. The 40% foreign ownership quota applies per building. BGC is one of the most legally straightforward places for foreigners to buy property in the Philippines.' },
                { q: 'What is the rental yield in BGC?', a: 'BGC rental yields typically range from 4% to 6% per annum gross. Studios and 1-bedroom units in well-managed buildings generally perform strongest. The expat and multinational tenant pool provides high payment reliability and low vacancy rates.' },
                { q: 'Is BGC better than Makati for investment?', a: 'BGC offers newer buildings, a more international tenant profile, and slightly higher rental yields. Makati offers a lower entry price with stable income. For investors targeting expat tenants and premium yields, BGC is the stronger choice.' },
                { q: 'Is BGC flood-free?', a: 'Yes. BGC was purpose-built on elevated land with a modern underground drainage system. It does not flood during typhoon season — a significant advantage over most of Metro Manila.' },
                { q: 'How far is BGC from NAIA airport?', a: 'Approximately 20–35 minutes via the Skyway or C5, depending on traffic. BGC is one of the closest major residential and business districts to NAIA in Metro Manila.' },
                { q: 'Are there hospitals in BGC?', a: "Yes. St. Luke's Medical Center BGC is located within Bonifacio Global City itself — one of the Philippines' top-ranked private hospitals. The Medical City in Pasig is approximately 15 minutes away via C5." },
                { q: 'What are the best restaurants in BGC?', a: "BGC has one of the highest concentrations of quality restaurants in the Philippines. The Grid Food Market is a curated food hall with multiple restaurant concepts. Bonifacio High Street and Serendra offer al fresco international dining. Burgos Circle is the go-to for nightlife and cocktails." },
                { q: 'Is BGC a good place to live in 2026?', a: "Yes — BGC consistently ranks as the most liveable neighbourhood in Metro Manila. Flood-free streets, walkable access to restaurants, offices, gyms, and hospitals, a genuine international community, and continued development in Uptown Bonifacio and McKinley West make 2026 one of the strongest years for BGC quality of life." },
                { q: 'How much does it cost to live in BGC per month?', a: "Budget roughly ₱60,000–₱100,000/month for a comfortable lifestyle in a 1-bedroom condo — covering rent (₱35,000–₱60,000), daily meals, utilities, gym, and transport. Ultra-premium living in a 3BR can exceed ₱250,000/month. BGC is one of Metro Manila's most expensive neighbourhoods, but the infrastructure justifies it for most expats and high-income professionals." },
                { q: 'How safe is BGC at night?', a: "BGC is one of the safest areas in Metro Manila at night. The area is well-lit with visible security presence, CCTV coverage, and a compact layout that keeps foot traffic high into the late evening. Burgos Circle and High Street remain active until midnight or later most nights." },
                { q: 'How is commuting from BGC to Makati or Ortigas?', a: "BGC to Makati CBD takes 10–25 minutes by car or Grab off-peak; Ortigas is 20–40 minutes via C5. The BGC Bus (₱13–₱15) runs frequent routes to Ayala MRT station. Peak-hour traffic (7–9am, 6–8pm) is the main challenge, but BGC's walkability means many residents avoid it entirely." },
                { q: 'What areas or clusters within BGC are best for buying or renting?', a: "Bonifacio High Street and Serendra are popular for lifestyle access. Uptown Bonifacio near SM Aura is the newest cluster with premium new builds. Burgos Circle appeals to young professionals for nightlife proximity. For investment, buildings within walking distance of the BGC corporate centre command the strongest rental demand." },
                { q: 'BGC vs McKinley Hill vs Arca South — which is better?', a: "BGC is the most established and liquid — best for rental income and foreign buyers. McKinley Hill is quieter and slightly cheaper with its own Korean community and international schools. Arca South is the newest Taguig development with lower entry prices but still maturing in amenities. For maximum tenant demand and resale value, BGC leads." },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5">
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-2 flex items-start gap-2 text-base">
                    <span className="material-icons text-sm text-primary mt-0.5">help_outline</span>
                    {item.q}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-6">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-zinc-950 rounded-3xl p-8 text-center">
            <h2 className="text-xl font-black text-white mb-3">Interested in a BGC Property?</h2>
            <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
              Yhens Property has active listings in BGC across all price points — from entry-level studios to ultra-premium residences. Get direct guidance on current availability, foreign quota status, and rental potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi Yhen, I read your BGC neighbourhood guide and want to ask about properties in the area.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Ask Yhen on WhatsApp
              </a>
              <Link
                to="/category/bgc"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold py-4 px-8 rounded-2xl transition-all border border-white/10"
              >
                <span className="material-icons text-sm">apartment</span>
                Browse BGC Listings
              </Link>
            </div>
          </section>

          {/* Browse */}
          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Browse More Listings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/category/bgc" className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-icons text-xl text-primary">apartment</span>
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-primary transition-colors">BGC Properties</p>
                  <p className="text-xs text-zinc-500">All current BGC listings</p>
                </div>
              </Link>
              <Link to="/category/rent-condos" className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-icons text-xl text-amber-500">key</span>
                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-primary transition-colors">Condos for Rent</p>
                  <p className="text-xs text-zinc-500">BGC rental listings</p>
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

export default BGCGuide;
