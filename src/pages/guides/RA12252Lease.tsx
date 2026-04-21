import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import GuideLayout from '../../components/GuideLayout';
import { siteConfig } from '../../config/site';

const relatedGuides = [
  { title: 'Can Foreigners Legally Own Property in the Philippines?', slug: 'foreigner-property-ownership', icon: 'home' },
  { title: 'BGC vs. Makati vs. Batangas: Best Rental Yields', slug: 'bgc-makati-batangas-rental-yields', icon: 'bar_chart' },
  { title: 'Retiring in the Philippines: SRRV & Dual Citizenship', slug: 'retiring-philippines-srrv', icon: 'beach_access' },
  { title: "The Foreigner's Selling Guide", slug: 'selling-guide-non-resident', icon: 'sell' },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "RA 12252 Explained: The New 99-Year Lease Law for Foreign Investors in the Philippines (2026)",
  "description": "Complete guide to the Philippines' new 99-year lease law (RA 12252). Learn how foreigners can now secure long-term land rights to build homes and businesses.",
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
      "name": "What is RA 12252?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RA 12252 is the new 99-year lease law that allows foreigners to secure long-term land rights in the Philippines, replacing the old 25+25 year structure."
      }
    },
    {
      "@type": "Question",
      "name": "Can foreigners lease land for 99 years in the Philippines?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, under RA 12252, foreigners can now lease land for a single uninterrupted 99-year term that is transferable and heritable."
      }
    },
    {
      "@type": "Question",
      "name": "Is a 99-year lease transferable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the 99-year lease under RA 12252 is fully transferable to heirs or can be sold to another foreign national."
      }
    }
  ]
};

const RA12252Lease: React.FC = () => {
  return (
    <>
      <SEO
        title="RA 12252 Explained: The New 99-Year Lease for Foreign Investors in the Philippines | 2026 Update"
        description="99 year lease Philippines foreign ownership 2026 update. Learn how RA 12252 replaced the old 25+25 lease structure, giving foreigners near-permanent land rights to build homes and businesses."
        canonical="https://yhensproperty.com/guides/ra-12252-99-year-lease"
        ogType="article"
        ogUrl="https://yhensproperty.com/guides/ra-12252-99-year-lease"
        structuredData={structuredData}
        breadcrumbs={[
          { name: "Home", url: "https://yhensproperty.com" },
          { name: "Guides", url: "https://yhensproperty.com/guides" },
          { name: "RA 12252: 99-Year Lease", url: "https://yhensproperty.com/guides/ra-12252-99-year-lease" }
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <GuideLayout
        title="RA 12252 Explained: The New 99-Year Lease Law for Foreign Investors (2026 Update)"
        subtitle="The landmark law that changes everything for foreigners wanting to build on Philippine land. Here is what it means, how it works, and why it matters for your 2026 investment strategy."
        readTime="7 min"
        relatedGuides={relatedGuides}
        whatsappMessage="Hi Yhen, I read your guide on RA 12252 and want to learn more about long-term land leases in the Philippines."
      >
        <div className="space-y-10 text-zinc-700 dark:text-zinc-300">
          <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 rounded-3xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <span className="material-icons text-3xl text-primary mt-1">lightbulb</span>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Fast Facts</h3>
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  RA 12252 allows foreigners to lease Philippine land for a single 99-year term (replacing the old 25+25 structure). It's transferable to heirs, bankable for financing, and covers residential and commercial use. This gives near-permanent land rights for building homes, resorts, or businesses.
                </p>
              </div>
            </div>
          </section>

          <section>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 border-l-4 border-primary pl-6 py-2 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-2xl">
              The passage of <strong className="text-zinc-800 dark:text-white">Republic Act 12252</strong> is the most significant change to foreign land rights in the Philippines in decades. For the first time, foreigners can secure a single, uninterrupted <strong className="text-zinc-800 dark:text-white">99-year lease</strong> on Philippine land — providing the kind of long-term security needed to justify building a home, a resort, or a business.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">What Was Wrong With the Old Law?</h2>
            <p className="leading-relaxed mb-4">
              Before RA 12252, the Foreign Investments Act allowed foreigners to lease land for an initial period of <strong>25 years, renewable once for another 25 years</strong> — a maximum of 50 years. This created serious problems:
            </p>
            <ul className="space-y-3 mb-4">
              {[
                "Banks were reluctant to finance construction on land with a 50-year cap, limiting financing options for foreigners",
                "Uncertainty about lease renewal made multi-generational planning impossible",
                "The 25+25 structure was often too short to justify major capital investment like resorts, large homes, or commercial buildings",
                "Renewal rights depended on landowner cooperation — creating leverage disputes at the 25-year mark",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="material-icons text-red-400 text-sm mt-0.5">cancel</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">What is RA 12252?</h3>
            <p className="leading-relaxed mb-4">
              RA 12252 is the new 99-year lease law that allows foreigners to secure long-term land rights in the Philippines, replacing the old 25+25 year structure.
            </p>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 mt-6">What RA 12252 Changes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Old Law</p>
                <p className="text-3xl font-black text-zinc-400">50 Years</p>
                <p className="text-sm text-zinc-500 mt-1">25 + 25 (renewal not guaranteed)</p>
              </div>
              <div className="bg-primary/10 border border-primary/30 rounded-2xl p-5">
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">RA 12252 — New Law</p>
                <p className="text-3xl font-black text-zinc-900 dark:text-white">99 Years</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Single term, fully transferable</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: 'verified', title: 'Single 99-Year Term', desc: 'No renewal dependency. The lease runs for 99 years from the signing date, providing true long-term certainty.' },
                { icon: 'swap_horiz', title: 'Transferable & Heritable', desc: 'The lease can be transferred to heirs or sold to another foreign national, protecting your family\'s investment.' },
                { icon: 'account_balance', title: 'Bank-Financeable', desc: 'The extended term makes it significantly easier to secure financing from Philippine banks for construction.' },
                { icon: 'gavel', title: 'Covers Residential & Commercial', desc: 'Applies to foreigners building homes, resorts, retirement properties, and commercial developments.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <span className="material-icons text-primary mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Who Benefits Most?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: 'beach_access', label: 'Retirees', desc: 'Build your dream retirement home on Batangas beachfront or Tagaytay highland land without ownership anxiety.' },
                { icon: 'hotel', label: 'Resort Developers', desc: 'Long-term financing is now accessible for boutique hotel and eco-resort development in tourist zones.' },
                { icon: 'business', label: 'Business Owners', desc: 'Establish commercial premises with a lease term that outlasts any business plan horizon.' },
                { icon: 'family_restroom', label: 'Expat Families', desc: 'Pass the leasehold to your children. The transferable structure ensures your family keeps the asset.' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-5">
                  <span className="material-icons text-primary text-xl">{item.icon}</span>
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-white text-sm">{item.label}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">How to Structure a 99-Year Land Lease in 2026</h2>
            <p className="leading-relaxed mb-5">
              The process for setting up a legal 99-year lease requires careful documentation and a licensed attorney. Yhen can refer you to trusted legal partners who specialise in foreign land agreements.
            </p>
            <ol className="space-y-4">
              {[
                { step: '01', title: 'Identify Suitable Land', desc: 'Batangas, Tagaytay, and Cavite are popular for residential leases. Boracay and Palawan for resort development.' },
                { step: '02', title: 'Title Verification', desc: 'Confirm the land is a clean TCT (no encumbrances, no agrarian reform coverage) at the Registry of Deeds.' },
                { step: '03', title: 'Draft the Lease Agreement', desc: 'A licensed attorney drafts the 99-year contract with all RA 12252 provisions including transfer rights and improvements clauses.' },
                { step: '04', title: 'Notarize and Register', desc: 'The lease must be notarized and annotated on the landowner\'s TCT to be legally binding against third parties.' },
                { step: '05', title: 'BIR Registration and Tax', desc: 'Documentary Stamp Tax applies. The lease must be registered with the Bureau of Internal Revenue.' },
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
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Can foreigners lease land for 99 years in the Philippines?</h3>
            <p className="leading-relaxed mb-4">
              Yes, under RA 12252, foreigners can now lease land for a single uninterrupted 99-year term that is transferable and heritable.
            </p>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 mt-6">Is a 99-year lease transferable?</h3>
            <p className="leading-relaxed mb-4">
              Yes, the 99-year lease under RA 12252 is fully transferable to heirs or can be sold to another foreign national.
            </p>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 mt-6">Important Limitations to Know</h2>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
              <ul className="space-y-3">
                {[
                  "RA 12252 covers lease rights only — the land itself remains owned by a Filipino national or corporation",
                  "Improvements on the land (buildings, structures) are owned by the leaseholder and can be sold separately from the land",
                  "Agricultural land and land in protected areas may have additional restrictions",
                  "The 99-year term begins from the date of contract signing, not from construction completion",
                  "Strict Qualification Required: The 99-year lease is reserved for registered foreign investors with projects approved by the BOI or relevant agencies. It is not available for purely residential/personal use. For tourism-related projects, a minimum investment of USD $5 million is required, with 70% to be deployed within the first three years. Failure to maintain the registered investment or using the land for unauthorized purposes will result in automatic termination of the lease.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-amber-800 dark:text-amber-300">
                    <span className="material-icons text-amber-500 text-sm mt-0.5">info</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-zinc-950 rounded-3xl p-8 text-center">
            <h2 className="text-xl font-black text-white mb-3">Find Your 99-Year Lease Property</h2>
            <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
              Yhen specialises in connecting international investors with landowners open to long-term lease arrangements in Batangas, Cavite, and Metro Manila.
            </p>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi Yhen, I'm interested in a 99-year land lease under RA 12252. Can you help me find suitable land?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Ask Yhen on WhatsApp
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Browse Land & Commercial Listings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/category/buy-land" className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-icons text-2xl text-primary">landscape</span>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">Land Plots</p>
                  <p className="text-xs text-zinc-500">Batangas, Cavite & Metro Manila</p>
                </div>
              </Link>
              <Link to="/category/buy-commercial" className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <span className="material-icons text-2xl text-amber-500">business</span>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">Commercial Properties</p>
                  <p className="text-xs text-zinc-500">Office, retail & mixed-use</p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </GuideLayout>
    </>
  );
};

export default RA12252Lease;
