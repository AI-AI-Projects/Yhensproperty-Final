import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import GuideLayout from '../../components/GuideLayout';
import { siteConfig } from '../../config/site';

const relatedGuides = [
  { title: 'RA 12252: The New 99-Year Lease Explained', slug: 'ra-12252-99-year-lease', icon: 'gavel' },
  { title: 'BGC vs. Makati vs. Batangas: Best Rental Yields', slug: 'bgc-makati-batangas-rental-yields', icon: 'bar_chart' },
  { title: 'Retiring in the Philippines: SRRV & Dual Citizenship', slug: 'retiring-philippines-srrv', icon: 'beach_access' },
  { title: "The Foreigner's Selling Guide", slug: 'selling-guide-non-resident', icon: 'sell' },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Can Foreigners Legally Buy & Own Property in the Philippines? 2026 Rules Explained",
  "description": "Complete 2026 guide for Americans, Canadians, Australians, and Europeans on legally owning property in the Philippines. Understand the 40% condo cap, CCT vs TCT, and safe investment strategies.",
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
      "name": "Can Americans buy condos in BGC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Americans can buy condos in BGC through the Condominium Certificate of Title (CCT) pathway, provided the building hasn't exceeded the 40% foreign ownership cap."
      }
    },
    {
      "@type": "Question",
      "name": "Is it safe for foreigners to buy property in the Philippines?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, when done correctly through the legal CCT pathway for condos, foreigners are fully protected under Philippine law with strong title registry protection."
      }
    },
    {
      "@type": "Question",
      "name": "Can foreigners own land in the Philippines?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, foreigners cannot hold land titles (TCT) directly. However, they can secure 99-year leases under RA 12252 or purchase condominiums which include CCT ownership."
      }
    }
  ]
};

const ForeignerOwnership: React.FC = () => {
  return (
    <>
      <SEO
        title="Can Foreigners Legally Buy & Own Property in the Philippines? 2026 Rules | Yhen's Property"
        description="Is it safe for Americans, Canadians, Australians, and Europeans to buy property in the Philippines? Understand the 40% condo cap, CCT vs TCT ownership, and how to invest safely in 2026."
        canonical="https://yhensproperty.com/guides/foreigner-property-ownership"
        ogType="article"
        ogUrl="https://yhensproperty.com/guides/foreigner-property-ownership"
        structuredData={structuredData}
        breadcrumbs={[
          { name: "Home", url: "https://yhensproperty.com" },
          { name: "Guides", url: "https://yhensproperty.com/guides" },
          { name: "Foreigner Property Ownership", url: "https://yhensproperty.com/guides/foreigner-property-ownership" }
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <GuideLayout
        title="Can Foreigners Legally Buy & Own Property in the Philippines? 2026 Rules Explained"
        subtitle="Is it safe for Americans, Canadians, Australians, and Europeans to invest? Here is exactly what the law allows, what it does not, and how smart investors navigate it."
        readTime="8 min"
        relatedGuides={relatedGuides}
        whatsappMessage="Hi Yhen, I read your guide on foreigner property ownership and I'd like to learn more about buying in the Philippines."
      >
        <div className="space-y-10 text-zinc-700 dark:text-zinc-300">
          <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 rounded-3xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <span className="material-icons text-3xl text-primary mt-1">lightbulb</span>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Fast Facts</h3>
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  Yes, foreigners can own property in the Philippines through condominiums (CCT ownership) under the 40% foreign ownership cap. You cannot own land directly, but you can secure 99-year leases under RA 12252. Always use legal structures like CCT for condos—avoid illegal nominee arrangements that risk property confiscation.
                </p>
              </div>
            </div>
          </section>

          <section>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 border-l-4 border-primary pl-6 py-2 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-2xl">
              Every year, thousands of <strong className="text-zinc-800 dark:text-white">Americans, Canadians, Australians, and Europeans</strong> ask the same question: "Can I actually own property in the Philippines?" The short answer is yes — but with important distinctions that determine whether your investment is fully protected under Philippine law.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Can Americans buy condos in BGC?</h3>
            <p className="leading-relaxed mb-4">
              Yes, Americans can buy condos in BGC through the Condominium Certificate of Title (CCT) pathway, provided the building hasn't exceeded the 40% foreign ownership cap.
            </p>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 mt-6">The 40% Condominium Ownership Cap</h2>
            <p className="leading-relaxed mb-4">
              Under the <strong>Condominium Act of the Philippines (RA 4726)</strong>, foreign nationals can legally own condominium units outright — including full title under a Condominium Certificate of Title (CCT) — provided that foreign ownership within a single condominium project does not exceed <strong>40% of the total units</strong>.
            </p>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <span className="material-icons text-emerald-600 mt-0.5">check_circle</span>
                <div>
                  <p className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">What this means for you</p>
                  <p className="text-emerald-700 dark:text-emerald-400 text-sm leading-relaxed">
                    If a building has 100 units, up to 40 can be owned by foreign nationals. Premium BGC and Makati condos — the most desirable for international investors — typically manage their foreign quota carefully. Always confirm the remaining foreign quota before committing.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">CCT vs. TCT: Understanding Your Title</h2>
            <p className="leading-relaxed mb-6">This is the most critical distinction for any international investor.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-zinc-200 dark:border-zinc-700 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-icons text-primary">apartment</span>
                  <h3 className="font-black text-zinc-900 dark:text-white">CCT — Condominium</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-emerald-500 mt-0.5">check</span><span>Foreigners can own 100% of a condo unit under their name</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-emerald-500 mt-0.5">check</span><span>Title is held directly — no Filipino partner needed</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-emerald-500 mt-0.5">check</span><span>Subject to the 40% building-wide cap</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-emerald-500 mt-0.5">check</span><span>Most common path for expat investors</span></li>
                </ul>
              </div>
              <div className="border border-zinc-200 dark:border-zinc-700 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-icons text-amber-500">landscape</span>
                  <h3 className="font-black text-zinc-900 dark:text-white">TCT — Land / House & Lot</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-red-500 mt-0.5">close</span><span>Foreigners <strong>cannot</strong> hold a TCT (land title) in their name</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-amber-500 mt-0.5">info</span><span>Exception: inherited land from a Filipino spouse or parent</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-amber-500 mt-0.5">info</span><span>Long-term lease (up to 99 years via RA 12252) is the legal alternative</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-amber-500 mt-0.5">info</span><span>Filipino corporations (60% Filipino owned) can hold land</span></li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Is it safe for foreigners to buy property in the Philippines?</h3>
            <p className="leading-relaxed mb-4">
              This is the question asked most by Americans considering retirement, Canadians looking for rental income, and Australians seeking a second home in Southeast Asia. The answer: <strong>yes, when done correctly through the legal CCT pathway</strong>.
            </p>
            <p className="leading-relaxed mb-4">
              The Philippines has a well-established property registry system. CCT titles are issued by the Registry of Deeds and provide strong legal protection. The risk — and where many foreign buyers get into trouble — comes from attempting to hold land through informal arrangements rather than the legally recognised lease structure.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <span className="material-icons text-amber-600 mt-0.5">warning</span>
                <div>
                  <p className="font-bold text-amber-800 dark:text-amber-300 mb-1">Common Pitfall to Avoid</p>
                  <p className="text-amber-700 dark:text-amber-400 text-sm leading-relaxed">
                    Nominee arrangements — where a Filipino national holds land title "on behalf of" a foreigner — are illegal under Philippine law and can result in the property being confiscated with no compensation. Always use the proper legal structures.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Step-by-Step: How to Buy a Condo as a Foreign National</h2>
            <ol className="space-y-4">
              {[
                { step: '01', title: 'Choose a Developer or Resale Unit', desc: 'Work with a licensed broker who can confirm the foreign ownership quota. BGC, Makati, and Pasay are top markets.' },
                { step: '02', title: 'Verify the CCT and Title Status', desc: 'Your broker or a local attorney should conduct a title search at the Registry of Deeds.' },
                { step: '03', title: 'Open a Philippine Bank Account', desc: 'Funds for property purchase must come from foreign currency inward remittance, documented by a BSP Certificate of Inward Remittance.' },
                { step: '04', title: 'Sign the Contract to Sell (CTS)', desc: 'This is a binding agreement. Have a local attorney review before signing.' },
                { step: '05', title: 'Pay Taxes and Transfer the Title', desc: 'Capital Gains Tax (6%), Documentary Stamp Tax (1.5%), and Transfer Tax apply. The new CCT is issued in your name.' },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <div className="bg-primary/10 text-primary font-black text-sm w-10 h-10 rounded-xl flex items-center justify-center shrink-0">{item.step}</div>
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Can foreigners own land in the Philippines?</h3>
            <p className="leading-relaxed mb-4">
              No, foreigners cannot hold land titles (TCT) directly. However, they can secure 99-year leases under RA 12252 or purchase condominiums which include CCT ownership.
            </p>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 mt-6">What About Land? The 99-Year Lease Solution</h2>
            <p className="leading-relaxed mb-4">
              If you want to build a home or business on land in the Philippines, the new <strong>RA 12252 (99-Year Lease Law)</strong> provides the most secure legal framework available to foreigners. This replaces the old 25+25 year lease structure with a single, transferable 99-year lease.
            </p>
            <Link to="/guides/ra-12252-99-year-lease" className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-primary hover:bg-primary/10 font-semibold text-sm px-5 py-3 rounded-xl transition-colors">
              <span className="material-icons text-sm">article</span>
              Read: RA 12252 Explained in Full
            </Link>
          </section>

          <section className="bg-zinc-950 rounded-3xl p-8 text-center">
            <h2 className="text-xl font-black text-white mb-3">Get Personalised Legal Guidance</h2>
            <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
              Every investor's situation is different. Yhen works directly with foreigners to identify the safest and most profitable path into the Philippine property market.
            </p>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi Yhen, I want to buy property in the Philippines as a foreigner and need guidance.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Ask Yhen on WhatsApp
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">Browse Related Listings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/category/buy-condos" className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-icons text-2xl text-primary">apartment</span>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">Buy Condos</p>
                  <p className="text-xs text-zinc-500">Foreigner-eligible units in BGC & Manila</p>
                </div>
              </Link>
              <Link to="/category/buy-land" className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-icons text-2xl text-amber-500">landscape</span>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">Land for Lease</p>
                  <p className="text-xs text-zinc-500">Batangas and provincial lots</p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </GuideLayout>
    </>
  );
};

export default ForeignerOwnership;
