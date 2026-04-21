import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import GuideLayout from '../../components/GuideLayout';
import TransferFeeCalculator from '../../components/TransferFeeCalculator';
import { siteConfig } from '../../config/site';

const relatedGuides = [
  { title: 'Can Foreigners Legally Own Property?', slug: 'foreigner-property-ownership', icon: 'public' },
  { title: 'RA 12252: The New 99-Year Lease Explained', slug: 'ra-12252-99-year-lease', icon: 'gavel' },
  { title: 'BGC vs. Makati vs. Batangas: Best Rental Yields', slug: 'bgc-makati-batangas-rental-yields', icon: 'bar_chart' },
  { title: 'Retiring in the Philippines: SRRV & Dual Citizenship', slug: 'retiring-philippines-srrv', icon: 'beach_access' },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Philippines Property Buyer's Guide 2026: All Fees, Taxes & Steps Explained",
  "description": "Complete step-by-step guide to buying property in the Philippines. Understand every fee, tax, and legal step — from reservation to title transfer. Updated for 2026.",
  "author": { "@type": "Person", "name": "Yhen", "jobTitle": "Licensed Real Estate Broker" },
  "publisher": { "@type": "Organization", "name": siteConfig.officialName },
  "datePublished": "2026-01-01",
  "dateModified": "2026-04-01",
  "image": "https://yhensproperty.com/Image/Hero_Villa_2.webp",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://yhensproperty.com/guides/philippines-property-buyers-guide" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much are the buyer's fees when purchasing property in the Philippines?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Buyers typically pay a Documentary Stamp Tax of 1.5% of the sale price, Transfer Tax of 0.5–0.75%, Registration Fee of approximately 0.25%, and notarial/legal fees of 1–2%. Total buyer costs are usually 3–4% on top of the purchase price."
      }
    },
    {
      "@type": "Question",
      "name": "Who pays Capital Gains Tax in the Philippines — buyer or seller?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Capital Gains Tax (6% of the higher of the sale price or zonal value) is legally the seller's responsibility. However, in practice it is often negotiated between buyer and seller. Always clarify this in the Contract to Sell before signing."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to transfer a property title in the Philippines?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Title transfer typically takes 2–4 months. This covers payment of taxes at the BIR (2–4 weeks), payment of Transfer Tax at the local government (1–2 weeks), and registration at the Registry of Deeds (4–8 weeks)."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a lawyer to buy property in the Philippines?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is strongly recommended to engage a licensed real estate attorney (not just a broker) to review the Contract to Sell, conduct a title search at the Registry of Deeds, and oversee the tax payments and title transfer process."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between a pre-selling and RFO property?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pre-selling means buying a unit before it's built, usually at a lower price but with 2–5 years of construction risk. Ready-for-Occupancy (RFO) means the unit exists and you can move in or rent it immediately after transfer."
      }
    }
  ]
};

const fees = [
  {
    icon: 'receipt_long',
    name: 'Capital Gains Tax (CGT)',
    rate: '6%',
    basis: 'Higher of sale price or zonal value',
    paid_by: 'Seller (often negotiated)',
    color: 'amber',
    note: 'Zonal values are set by the BIR and may be lower than market price. Tax is based on whichever is higher.'
  },
  {
    icon: 'description',
    name: 'Documentary Stamp Tax (DST)',
    rate: '1.5%',
    basis: 'Higher of sale price or zonal value',
    paid_by: 'Buyer',
    color: 'blue',
    note: 'Paid to the BIR before title transfer. Required for all real estate transactions.'
  },
  {
    icon: 'account_balance',
    name: 'Transfer Tax',
    rate: '0.5% – 0.75%',
    basis: 'Higher of sale price or zonal value',
    paid_by: 'Buyer',
    color: 'emerald',
    note: 'Paid to the local government unit (city/municipality). Rate varies by LGU — Metro Manila is typically 0.75%.'
  },
  {
    icon: 'app_registration',
    name: 'Registration Fee',
    rate: '~0.25%',
    basis: 'Sale price',
    paid_by: 'Buyer',
    color: 'teal',
    note: 'Paid to the Registry of Deeds to officially transfer the title. Exact fee follows the LRA schedule.'
  },
  {
    icon: 'gavel',
    name: 'Notarial / Legal Fees',
    rate: '1% – 2%',
    basis: 'Sale price',
    paid_by: 'Buyer',
    color: 'zinc',
    note: 'Covers deed of sale notarisation and attorney\'s fees. Always get a separate attorney from your broker.'
  },
  {
    icon: 'real_estate_agent',
    name: 'Agent Commission',
    rate: '3% – 5%',
    basis: 'Sale price',
    paid_by: 'Seller',
    color: 'primary',
    note: 'Commission is paid by the seller, not the buyer. As the buyer, using a licensed broker costs you nothing.'
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
  amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800', icon: 'text-amber-600', badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300' },
  blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', icon: 'text-blue-600', badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800', icon: 'text-emerald-600', badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300' },
  teal: { bg: 'bg-teal-50 dark:bg-teal-900/20', border: 'border-teal-200 dark:border-teal-800', icon: 'text-teal-600', badge: 'bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300' },
  zinc: { bg: 'bg-zinc-50 dark:bg-zinc-900/50', border: 'border-zinc-200 dark:border-zinc-700', icon: 'text-zinc-600', badge: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300' },
  primary: { bg: 'bg-primary/5', border: 'border-primary/20', icon: 'text-primary', badge: 'bg-primary/10 text-primary' },
};

const steps = [
  {
    step: '01',
    title: 'Property Search & Due Diligence',
    icon: 'search',
    duration: '1–4 weeks',
    desc: 'Identify your target property with a licensed broker. Confirm the title type (CCT for condos, TCT/OCT for house & lot or land), check for encumbrances, and verify the developer\'s credentials for pre-selling units.',
    bullets: [
      'Request a Certified True Copy of the title from the Registry of Deeds',
      'Check for liens, mortgages, or annotations on the title',
      'Verify the seller\'s identity against the title',
      'For pre-selling: check HLURB/DHSUD developer license and permit to sell',
    ]
  },
  {
    step: '02',
    title: 'Negotiate & Sign the Reservation Agreement',
    icon: 'handshake',
    duration: '1–3 days',
    desc: 'Once you\'ve chosen your property, a reservation fee (typically ₱20,000–₱50,000 for condos, higher for house & lot) secures it off the market. This fee is applied toward the purchase price.',
    bullets: [
      'Reservation fee is typically non-refundable if you walk away',
      'Confirm the breakdown: reservation fee, equity/down payment, and balance',
      'For pre-selling: confirm the payment schedule and turnover date',
      'Get the floor plan, specifications, and building rules in writing',
    ]
  },
  {
    step: '03',
    title: 'Legal Review & Contract to Sell (CTS)',
    icon: 'policy',
    duration: '1–2 weeks',
    desc: 'The Contract to Sell is a binding legal document. Have your attorney review it before signing. This document defines the full payment schedule, penalties, what happens if the developer delays, and transfer conditions.',
    bullets: [
      'Confirm who pays CGT and DST (often negotiable)',
      'Check for penalty clauses on late payments',
      'Verify the title transfer timeline and conditions',
      'For foreign buyers: confirm the CCT foreign quota is available',
    ]
  },
  {
    step: '04',
    title: 'Arrange Financing or Full Payment',
    icon: 'account_balance',
    duration: '2–8 weeks',
    desc: 'Most properties are purchased through in-house developer financing, bank mortgage (PAG-IBIG or commercial bank), or full cash payment. Foreign buyers must document funds as foreign currency inward remittance.',
    bullets: [
      'Bank mortgage: requires credit check, income docs, 20–30% down payment',
      'PAG-IBIG Fund: available to OFWs and contributors, competitive rates',
      'In-house financing: easier to qualify but higher interest rates',
      'Foreign buyers: obtain BSP Certificate of Inward Remittance for all funds',
    ]
  },
  {
    step: '05',
    title: 'Execute the Deed of Absolute Sale (DOAS)',
    icon: 'draw',
    duration: '1–2 days',
    desc: 'Once full payment or mortgage approval is confirmed, both parties sign the Deed of Absolute Sale in front of a notary public. This is the document that triggers the title transfer process.',
    bullets: [
      'Both buyer and seller (or authorised representatives) must be present',
      'Notarised DOAS becomes the basis for all tax payments',
      'Ensure you receive the original owner\'s duplicate of the title from the seller',
      'Keep all original documents in a safe place throughout the process',
    ]
  },
  {
    step: '06',
    title: 'Pay Capital Gains Tax at the BIR',
    icon: 'receipt_long',
    duration: '2–4 weeks',
    desc: 'The CGT (6%) must be paid at the Bureau of Internal Revenue (BIR) Revenue District Office covering the property\'s location within 30 days of the notarised DOAS. Late payment incurs penalties.',
    bullets: [
      'File BIR Form 1706 (for individual sellers) or 1707 (for corporations)',
      'BIR issues a Certificate Authorizing Registration (CAR) after payment',
      'CAR is required for the next step — without it, the title cannot transfer',
      'CGT deadline: 30 days from notarisation of the DOAS',
    ]
  },
  {
    step: '07',
    title: 'Pay Documentary Stamp Tax & Transfer Tax',
    icon: 'paid',
    duration: '1–2 weeks',
    desc: 'DST (1.5%) is paid at the BIR alongside CGT. Transfer Tax (0.5–0.75%) is paid separately at the local treasurer\'s office of the city or municipality where the property is located.',
    bullets: [
      'DST is filed using BIR Form 2000-OT',
      'Transfer Tax receipt is required by the Registry of Deeds',
      'Bring the notarised DOAS and BIR CAR to the local treasurer',
      'Some LGUs require payment within 60 days of the DOAS',
    ]
  },
  {
    step: '08',
    title: 'Register the Title at the Registry of Deeds',
    icon: 'app_registration',
    duration: '4–8 weeks',
    desc: 'With the BIR CAR, Transfer Tax receipt, and original title, you submit everything to the Registry of Deeds. They cancel the seller\'s title and issue a new one in your name.',
    bullets: [
      'Required docs: notarised DOAS, BIR CAR, Transfer Tax receipt, original title, tax clearance',
      'Pay registration fee (approximately 0.25% of sale price)',
      'New title is issued with your name as registered owner',
      'For condos, a new CCT is issued; for land and houses, a new TCT',
    ]
  },
  {
    step: '09',
    title: 'Declare Property for Real Property Tax',
    icon: 'home_work',
    duration: '1 week',
    desc: 'Once you hold the new title, update the Tax Declaration at the local Assessor\'s Office. This is the basis for your annual real property tax (RPT) obligations.',
    bullets: [
      'Bring the new title to the City/Municipal Assessor\'s Office',
      'Update the Tax Declaration to reflect your ownership',
      'Annual RPT rate: 1% (cities) to 2% (municipalities) of assessed value',
      'Pay RPT annually; delinquency attracts penalties and eventual foreclosure',
    ]
  },
];

const BuyersGuide: React.FC = () => {
  return (
    <>
      <SEO
        title="Philippines Property Buyer's Guide 2026: All Fees, Taxes & Steps | Yhen's Property"
        description="The complete guide to buying property in the Philippines. Every fee, every tax, every legal step — from reservation to title transfer. Clear, honest, and updated for 2026."
        canonical="https://yhensproperty.com/guides/philippines-property-buyers-guide"
        ogType="article"
        ogUrl="https://yhensproperty.com/guides/philippines-property-buyers-guide"
        ogImage="https://yhensproperty.com/Image/Hero_Villa_2.webp"
        structuredData={structuredData}
        breadcrumbs={[
          { name: "Home", url: "https://yhensproperty.com" },
          { name: "Guides", url: "https://yhensproperty.com/guides" },
          { name: "Philippines Property Buyer's Guide", url: "https://yhensproperty.com/guides/philippines-property-buyers-guide" }
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <GuideLayout
        title="Philippines Property Buyer's Guide 2026: Every Fee, Tax & Step Explained"
        subtitle="From finding your property to holding the title in your name — a clear, honest breakdown of exactly what you pay, who pays it, and what happens at every stage."
        readTime="12 min"
        relatedGuides={relatedGuides}
        whatsappMessage="Hi Yhen, I read your buyer's guide and I'd like help buying a property in the Philippines."
      >
        <div className="space-y-12 text-zinc-700 dark:text-zinc-300">

          <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 rounded-3xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <span className="material-icons text-3xl text-primary mt-1">lightbulb</span>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Quick Summary</h3>
                <p className="text-sm leading-relaxed">
                  Total buyer-side costs are typically <strong className="text-zinc-900 dark:text-white">3–4% of the purchase price</strong> (DST 1.5% + Transfer Tax 0.75% + Registration ~0.25% + Legal 1–2%). Capital Gains Tax (6%) is the seller's responsibility but is often negotiated. The full title transfer process takes <strong className="text-zinc-900 dark:text-white">2–4 months</strong> after the Deed of Sale is signed.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">Fee Calculator</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">Enter your property values below to get an instant estimate of your costs — whether you're buying or selling.</p>
            <TransferFeeCalculator />
          </section>

          <section>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 border-l-4 border-primary pl-6 py-2 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-2xl">
              Buying property in the Philippines is a straightforward process — but only if you know the rules upfront. The biggest surprises for first-time buyers are the taxes due at completion and the 2–4 month wait for the title to transfer. This guide removes all the surprises.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">Complete Fee & Tax Breakdown</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">All rates are based on the <strong>higher of the sale price or BIR zonal value</strong> unless noted otherwise.</p>

            <div className="space-y-4">
              {fees.map((fee) => {
                const c = colorMap[fee.color];
                return (
                  <div key={fee.name} className={`${c.bg} ${c.border} border rounded-2xl p-5`}>
                    <div className="flex flex-wrap items-start gap-3 mb-3">
                      <span className={`material-icons text-2xl ${c.icon}`}>{fee.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-black text-zinc-900 dark:text-white">{fee.name}</h3>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.badge}`}>{fee.rate}</span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Paid by: {fee.paid_by}</span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Based on: {fee.basis}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed pl-9">{fee.note}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bg-zinc-900 dark:bg-zinc-950 rounded-3xl p-6">
            <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
              <span className="material-icons text-primary">calculate</span>
              Real Example: ₱8,000,000 Condo Purchase
            </h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Purchase Price', value: '₱8,000,000', highlight: false },
                { label: 'Documentary Stamp Tax (1.5% — buyer)', value: '₱120,000', highlight: false },
                { label: 'Transfer Tax (0.75% Metro Manila — buyer)', value: '₱60,000', highlight: false },
                { label: 'Registration Fee (~0.25% — buyer)', value: '₱20,000', highlight: false },
                { label: 'Legal / Notarial Fees (~1% — buyer)', value: '₱80,000', highlight: false },
                { label: 'Capital Gains Tax (6% — seller, but often negotiated)', value: '₱480,000', highlight: true },
              ].map((row) => (
                <div key={row.label} className={`flex justify-between items-center py-2 border-b border-zinc-800 ${row.highlight ? 'opacity-60' : ''}`}>
                  <span className={`${row.highlight ? 'text-zinc-400 italic' : 'text-zinc-300'}`}>{row.label}</span>
                  <span className={`font-bold ${row.highlight ? 'text-zinc-400' : 'text-white'}`}>{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3">
                <span className="text-white font-black">Total Buyer Costs (excl. CGT)</span>
                <span className="text-primary font-black text-lg">₱280,000 (3.5%)</span>
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-4">*This is an estimate. Exact fees depend on BIR zonal value, LGU rates, and the specific attorney engaged. Always get a written fee breakdown before signing.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">Who Pays Capital Gains Tax?</h2>
            <p className="leading-relaxed mb-4">
              This is the most commonly misunderstood aspect of Philippine property transactions. Under the National Internal Revenue Code, <strong>CGT is legally the seller's obligation</strong>. However, in practice, it is regularly negotiated — particularly in secondary market (resale) transactions where the seller may price it into the asking price or explicitly pass it to the buyer.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <span className="material-icons text-amber-600 mt-0.5">warning</span>
                <div>
                  <p className="font-bold text-amber-800 dark:text-amber-300 mb-1">Always clarify this in writing before you sign</p>
                  <p className="text-amber-700 dark:text-amber-400 text-sm leading-relaxed">
                    Make sure the Contract to Sell explicitly states which party is responsible for CGT. If it is silent, the default legal position is that the seller pays — but disputes can arise. A clear contract clause prevents costly arguments at closing.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">Step-by-Step: The Full Buying Process</h2>
            <div className="space-y-6">
              {steps.map((item) => (
                <div key={item.step} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="bg-primary/10 text-primary font-black text-sm w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">{item.step}</div>
                    <div className="w-px flex-1 bg-zinc-200 dark:bg-zinc-800 mt-2"></div>
                  </div>
                  <div className="pb-6 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-black text-zinc-900 dark:text-white">{item.title}</h3>
                      <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full">
                        <span className="material-icons text-xs">schedule</span>
                        {item.duration}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3">{item.desc}</p>
                    <ul className="space-y-1.5">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm">
                          <span className="material-icons text-xs text-primary mt-0.5 shrink-0">check_circle</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Pre-Selling vs. Ready-for-Occupancy (RFO)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-zinc-200 dark:border-zinc-700 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-icons text-blue-500">construction</span>
                  <h3 className="font-black text-zinc-900 dark:text-white">Pre-Selling</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-emerald-500 mt-0.5">check</span><span>Lower entry price — typically 10–20% below RFO</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-emerald-500 mt-0.5">check</span><span>Flexible payment terms during construction period</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-emerald-500 mt-0.5">check</span><span>Strong capital appreciation potential by turnover</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-red-500 mt-0.5">close</span><span>Construction risk — developer delays are common</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-red-500 mt-0.5">close</span><span>No rental income until the unit is turned over</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-amber-500 mt-0.5">info</span><span>Always verify DHSUD permit to sell before reserving</span></li>
                </ul>
              </div>
              <div className="border border-zinc-200 dark:border-zinc-700 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-icons text-emerald-500">home</span>
                  <h3 className="font-black text-zinc-900 dark:text-white">Ready-for-Occupancy (RFO)</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-emerald-500 mt-0.5">check</span><span>Move in or start renting immediately after transfer</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-emerald-500 mt-0.5">check</span><span>What you see is what you get — no construction surprises</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-emerald-500 mt-0.5">check</span><span>Title transfer is simpler and faster</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-red-500 mt-0.5">close</span><span>Higher price than equivalent pre-selling units</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-red-500 mt-0.5">close</span><span>Less flexibility on payment terms</span></li>
                  <li className="flex items-start gap-2"><span className="material-icons text-xs text-amber-500 mt-0.5">info</span><span>Best for buyers who need immediate occupancy or rental income</span></li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Annual Costs After Purchase</h2>
            <p className="leading-relaxed mb-5">The buying costs are a one-time expense. Once you own the property, expect these recurring annual costs:</p>
            <div className="space-y-3">
              {[
                { icon: 'home_work', label: 'Real Property Tax (RPT)', detail: '1% (cities) or 2% (municipalities) of the assessed value annually. The assessed value is a fraction of market value — typically 20–60% depending on property class.', color: 'text-blue-600' },
                { icon: 'apartment', label: 'Condominium Association Dues', detail: 'For condos, monthly dues cover building maintenance, security, and amenities. Typical range: ₱60–₱200 per sqm/month depending on the building.', color: 'text-emerald-600' },
                { icon: 'shield', label: 'Property Insurance', detail: 'Required by most banks if there\'s a mortgage. For outright owners, highly recommended. Expect ₱5,000–₱20,000/year depending on property value.', color: 'text-amber-600' },
                { icon: 'build', label: 'Maintenance & Repairs', detail: 'Budget 0.5–1% of property value annually for maintenance. Higher for older buildings and standalone houses.', color: 'text-zinc-500' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4">
                  <span className={`material-icons text-2xl ${item.color} shrink-0`}>{item.icon}</span>
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-white text-sm">{item.label}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Are You a Foreign Buyer?</h2>
            <p className="leading-relaxed mb-4">
              The process above applies to all buyers. However, foreign nationals have additional requirements and restrictions. If you are not a Philippine citizen, read our dedicated guide before proceeding.
            </p>
            <Link
              to="/guides/foreigner-property-ownership"
              className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-primary hover:bg-primary/10 font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
            >
              <span className="material-icons text-sm">public</span>
              Read: Can Foreigners Legally Own Property in the Philippines?
            </Link>
          </section>

          <section className="bg-zinc-950 rounded-3xl p-8 text-center">
            <h2 className="text-xl font-black text-white mb-3">Ready to Buy? Let Yhen Guide You</h2>
            <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
              Yhen is a licensed real estate broker specialising in helping both locals and foreigners buy property across the Philippines. Get a free consultation — no obligation.
            </p>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi Yhen, I read your buyer's guide and I'd like help buying a property in the Philippines.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Ask Yhen on WhatsApp
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">Browse Properties to Buy</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { to: '/category/buy-condos', icon: 'apartment', color: 'text-blue-500', label: 'Buy Condos', sub: 'BGC, Makati, Manila — foreigner-eligible' },
                { to: '/category/buy-houses', icon: 'home', color: 'text-emerald-500', label: 'Buy Houses & Villas', sub: 'Batangas, Nasugbu & Metro Manila' },
                { to: '/category/buy-land', icon: 'landscape', color: 'text-amber-500', label: 'Buy Land', sub: 'Freehold & leasehold options' },
                { to: '/category/commercial', icon: 'store', color: 'text-primary', label: 'Commercial Properties', sub: 'Office, retail & warehouse' },
              ].map((cat) => (
                <Link key={cat.to} to={cat.to} className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                  <span className={`material-icons text-2xl ${cat.color}`}>{cat.icon}</span>
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">{cat.label}</p>
                    <p className="text-xs text-zinc-500">{cat.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </GuideLayout>
    </>
  );
};

export default BuyersGuide;
