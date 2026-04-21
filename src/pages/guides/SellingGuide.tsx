import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import GuideLayout from '../../components/GuideLayout';
import TransferFeeCalculator from '../../components/TransferFeeCalculator';
import { siteConfig } from '../../config/site';

const relatedGuides = [
  { title: 'Can Foreigners Legally Own Property in the Philippines?', slug: 'foreigner-property-ownership', icon: 'home' },
  { title: 'RA 12252: The New 99-Year Lease Explained', slug: 'ra-12252-99-year-lease', icon: 'gavel' },
  { title: 'BGC vs. Makati vs. Batangas: Best Rental Yields', slug: 'bgc-makati-batangas-rental-yields', icon: 'bar_chart' },
  { title: 'Retiring in the Philippines: SRRV & Dual Citizenship', slug: 'retiring-philippines-srrv', icon: 'beach_access' },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Foreigner's Guide to Selling & Reselling Property in the Philippines: Legal Exit Strategy 2026",
  "description": "Complete guide for non-residents selling property in the Philippines. Capital Gains Tax, finding buyers, remitting proceeds abroad, and the legal exit strategy for foreign investors.",
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
      "name": "What is the capital gains tax when selling property in the Philippines?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Capital Gains Tax is 6% of the higher of selling price or fair market value, payable within 30 days of sale notarization."
      }
    },
    {
      "@type": "Question",
      "name": "Can foreigners remit property sale proceeds out of the Philippines?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, foreigners can repatriate sale proceeds if they have the BSP Certificate of Inward Remittance proving the original investment entered as foreign currency."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to be in the Philippines to sell my property?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, you can sell remotely using a Special Power of Attorney (SPA) notarized at a Philippine Embassy or Consulate."
      }
    }
  ]
};

const SellingGuide: React.FC = () => {
  return (
    <>
      <SEO
        title="Selling Real Estate in Philippines as a Non-Resident: The Foreigner's Guide 2026 | Yhen's Property"
        description="Selling real estate in Philippines as a non-resident. Complete guide on Capital Gains Tax, finding buyers, remitting proceeds abroad, and the legal exit strategy for foreign property investors."
        canonical="https://yhensproperty.com/guides/selling-guide-non-resident"
        ogType="article"
        ogUrl="https://yhensproperty.com/guides/selling-guide-non-resident"
        structuredData={structuredData}
        breadcrumbs={[
          { name: "Home", url: "https://yhensproperty.com" },
          { name: "Guides", url: "https://yhensproperty.com/guides" },
          { name: "Selling Guide for Foreigners", url: "https://yhensproperty.com/guides/selling-guide-non-resident" }
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <GuideLayout
        title="The Foreigner's Selling Guide: How to Flip or Resell Your Philippine Property"
        subtitle="Everything a non-resident needs to know about selling Philippine real estate — Capital Gains Tax, finding a qualified buyer, remitting your profits, and keeping the exit clean and legal."
        readTime="9 min"
        relatedGuides={relatedGuides}
        whatsappMessage="Hi Yhen, I want to sell my property in the Philippines as a foreigner. Can you help?"
      >
        <div className="space-y-10 text-zinc-700 dark:text-zinc-300">
          <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 rounded-3xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <span className="material-icons text-3xl text-primary mt-1">lightbulb</span>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Fast Facts</h3>
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  Selling property in the Philippines requires 6% Capital Gains Tax and 1.5% Documentary Stamp Tax. You can sell remotely using a Special Power of Attorney. To repatriate proceeds abroad, you need your original BSP Certificate of Inward Remittance proving foreign currency investment.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">Seller Cost Calculator</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">Enter your property values to instantly estimate Capital Gains Tax, broker commission, and total selling costs.</p>
            <TransferFeeCalculator defaultMode="seller" />
          </section>

          <section>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 border-l-4 border-primary pl-6 py-2 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-2xl">
              Whether you are <strong className="text-zinc-800 dark:text-white">flipping a BGC condo, offloading a Batangas beachfront property, or exiting after a long-term hold</strong>, selling real estate in the Philippines as a non-resident involves specific taxes, documentation, and legal steps. This guide walks you through the entire process so you keep as much of your profit as legally possible.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">What is the capital gains tax when selling property in the Philippines?</h3>
            <p className="leading-relaxed mb-4">
              Capital Gains Tax is 6% of the higher of selling price or fair market value, payable within 30 days of sale notarization.
            </p>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 mt-6">The Taxes You Must Pay</h2>
            <p className="leading-relaxed mb-5">
              Before listing your property, understand the full tax picture. These are the government-mandated costs that apply to property sales in the Philippines.
            </p>
            <div className="space-y-4">
              {[
                {
                  name: 'Capital Gains Tax (CGT)',
                  rate: '6%',
                  base: 'Higher of: selling price or fair market value (BIR zonal value)',
                  note: 'The most significant tax. Payable within 30 days of notarization of the sale.',
                  payer: 'Seller',
                  highlight: true,
                },
                {
                  name: 'Documentary Stamp Tax (DST)',
                  rate: '1.5%',
                  base: 'Higher of: selling price or fair market value',
                  note: 'Payable within 5 days after the end of the month of transaction.',
                  payer: 'Seller (negotiable with buyer)',
                  highlight: false,
                },
                {
                  name: 'Creditable Withholding Tax (CWT)',
                  rate: '1.5%–6%',
                  base: 'Gross selling price (for properties sold by non-resident dealers)',
                  note: 'Applies if the seller is engaged in real estate trade. Most individual foreign investors are exempt from CWT — CGT applies instead.',
                  payer: 'Buyer withholds from seller',
                  highlight: false,
                },
                {
                  name: 'Transfer Tax',
                  rate: '0.5%–0.75%',
                  base: 'Zonal or selling value',
                  note: 'Paid by the buyer, but often negotiated. Varies by local government unit.',
                  payer: 'Buyer (typically)',
                  highlight: false,
                },
                {
                  name: 'Registration Fee',
                  rate: 'Graduated scale',
                  base: 'Based on property value',
                  note: 'Paid at the Registry of Deeds when transferring the CCT/TCT.',
                  payer: 'Buyer (typically)',
                  highlight: false,
                },
              ].map((tax) => (
                <div key={tax.name} className={`rounded-2xl p-5 border ${tax.highlight ? 'bg-primary/5 border-primary/30' : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800'}`}>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <p className="font-black text-zinc-900 dark:text-white">{tax.name}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-black ${tax.highlight ? 'text-primary' : 'text-zinc-700 dark:text-zinc-300'}`}>{tax.rate}</span>
                      <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full">Paid by: {tax.payer}</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 mb-1.5"><span className="font-semibold">Base:</span> {tax.base}</p>
                  <p className="text-xs text-zinc-500 italic">{tax.note}</p>
                </div>
              ))}
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5 mt-4">
              <p className="text-sm font-bold text-zinc-900 dark:text-white mb-1">Example: Selling a ₱15M BGC Condo</p>
              <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                <div className="flex justify-between"><span>Capital Gains Tax (6%)</span><span className="font-semibold text-zinc-900 dark:text-white">₱900,000</span></div>
                <div className="flex justify-between"><span>Documentary Stamp Tax (1.5%)</span><span className="font-semibold text-zinc-900 dark:text-white">₱225,000</span></div>
                <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-700 pt-1 mt-1"><span className="font-bold">Total Seller-Side Tax</span><span className="font-black text-primary">₱1,125,000</span></div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">The Complete Selling Process</h2>
            <ol className="space-y-4">
              {[
                { step: '01', title: 'Set the Right Asking Price', desc: 'Your broker will conduct a Comparative Market Analysis (CMA) based on recent transactions in the building and area. Pricing above the BIR zonal value means CGT is based on your selling price — not the zonal value.' },
                { step: '02', title: 'Prepare Your Documents', desc: 'Gather: original CCT/TCT, tax declaration, recent Real Property Tax (RPT) receipts, deed of absolute sale from when you purchased, and your valid ID. If you are abroad, a Special Power of Attorney (SPA) allows your representative to sign.' },
                { step: '03', title: 'Find a Qualified Buyer', desc: 'Your broker markets the property to local and international buyers. For condo resales, pre-selling the unit to expats or OFWs tends to command premium prices. This is where Yhen\'s network is most valuable.' },
                { step: '04', title: 'Execute the Deed of Absolute Sale', desc: 'Once terms are agreed, the Deed of Absolute Sale (DOAS) is drafted by an attorney and signed by both parties before a notary public.' },
                { step: '05', title: 'Pay Capital Gains Tax and DST', desc: 'File BIR Form 1706 (CGT) and BIR Form 2000 (DST) and pay the taxes at the BIR Revenue District Office where the property is located. Must be done within 30 days of notarization.' },
                { step: '06', title: 'Transfer the Title', desc: 'The buyer presents the BIR receipts, transfer tax receipt, and other documents to the Registry of Deeds to receive a new CCT/TCT in their name.' },
                { step: '07', title: 'Remit Your Proceeds Abroad', desc: 'This is the step most foreign sellers overlook. Document your original inward remittance (BSP Certificate) to prove the funds entered the Philippines as foreign currency. This is required to legally repatriate your proceeds.' },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <div className="bg-primary/10 text-primary font-black text-sm w-10 h-10 rounded-xl flex items-center justify-center shrink-0">{item.step}</div>
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Can foreigners remit property sale proceeds out of the Philippines?</h3>
            <p className="leading-relaxed mb-4">
              Yes, foreigners can repatriate sale proceeds if they have the BSP Certificate of Inward Remittance proving the original investment entered as foreign currency.
            </p>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 mt-6">Repatriating Your Money Abroad</h2>
            <p className="leading-relaxed mb-4">
              This is a critical step that many foreign investors do not plan for in advance. The Bangko Sentral ng Pilipinas (BSP) allows full repatriation of your capital and profits, but only if the original investment was properly documented.
            </p>
            <div className="space-y-3">
              {[
                { icon: 'description', label: 'BSP Certificate of Inward Remittance', desc: 'You must have obtained this when you originally funded the purchase from abroad. Keep it permanently.' },
                { icon: 'account_balance', label: 'Philippine Bank Documentation', desc: 'Your selling proceeds are deposited into a Philippine bank account. You then initiate a wire transfer abroad.' },
                { icon: 'receipt_long', label: 'BIR Tax Clearance', desc: 'Some banks require a BIR certificate confirming all taxes have been paid before releasing funds for repatriation.' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4">
                  <span className="material-icons text-primary">{item.icon}</span>
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-white text-sm">{item.label}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mt-4">
              <p className="font-bold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
                <span className="material-icons text-sm">warning</span>
                Selling Without BSP Documentation
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                If you cannot produce proof of original inward remittance, BSP regulations may limit your ability to repatriate proceeds above certain thresholds. This is why proper documentation at the time of purchase is essential.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">Do I need to be in the Philippines to sell my property?</h3>
            <p className="leading-relaxed mb-4">
              No, you can sell remotely using a Special Power of Attorney (SPA) notarized at a Philippine Embassy or Consulate.
            </p>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 mt-6">Selling Remotely: The Special Power of Attorney</h2>
            <p className="leading-relaxed mb-4">
              If you are based overseas, you do not need to be physically present in the Philippines to sell your property. A <strong>Special Power of Attorney (SPA)</strong> authorises a trusted representative in the Philippines to sign on your behalf.
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5">
              <ul className="space-y-2 text-sm">
                {[
                  'The SPA must be notarized at the nearest Philippine Embassy or Consulate in your country',
                  'The Philippine Consulate\'s authentication (red ribbon/apostille) is required',
                  'SPA should specifically authorize the representative to sign the Deed of Absolute Sale and BIR documents',
                  'Your broker and attorney will guide the SPA content to match the specific transaction',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-icons text-xs text-primary mt-0.5">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-zinc-950 rounded-3xl p-8 text-center">
            <h2 className="text-xl font-black text-white mb-3">Ready to Sell? Start Here.</h2>
            <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
              Yhen handles the entire selling process for non-resident owners — from pricing and marketing to title transfer and documentation — so you can close from anywhere in the world.
            </p>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi Yhen, I want to sell my property in the Philippines. I'm currently abroad and need help with the process.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Ask Yhen on WhatsApp
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">List Your Property for Sale</h2>
            <Link to="/sell" className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 hover:border-primary/50 hover:bg-primary/5 transition-all group">
              <span className="material-icons text-2xl text-primary">sell</span>
              <div>
                <p className="font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">List Your Property with Yhen</p>
                <p className="text-xs text-zinc-500">Direct marketing to local and international buyers</p>
              </div>
              <span className="material-icons text-zinc-400 ml-auto">arrow_forward</span>
            </Link>
          </section>
        </div>
      </GuideLayout>
    </>
  );
};

export default SellingGuide;
