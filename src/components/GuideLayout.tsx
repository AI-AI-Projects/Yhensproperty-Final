import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site';

export interface RelatedGuide {
  title: string;
  slug: string;
  icon: string;
}

interface GuideLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  readTime: string;
  relatedGuides: RelatedGuide[];
  whatsappMessage?: string;
}

const WhatsAppCTA: React.FC<{ message: string }> = ({ message }) => (
  <a
    href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-conversion flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/20 group"
    onClick={() => { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'whatsapp_click', button_location: 'guide_sidebar' }); }}
  >
    <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <span>Ask Yhen on WhatsApp</span>
  </a>
);

const GuideLayout: React.FC<GuideLayoutProps> = ({
  children,
  title,
  subtitle,
  readTime,
  relatedGuides,
  whatsappMessage = "Hi Yhen, I read your investor guide and have a question about buying property in the Philippines.",
}) => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="bg-zinc-950 dark:bg-zinc-900 border-b border-zinc-800 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link to="/" className="text-zinc-400 hover:text-primary transition-colors font-medium">Home</Link>
            <span className="text-zinc-600">/</span>
            <Link to="/guides" className="text-zinc-400 hover:text-primary transition-colors font-medium">Investor Guides</Link>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-300 font-medium truncate max-w-xs">{title}</span>
          </div>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">Investor Guide</span>
              <span className="text-zinc-500 text-sm font-medium flex items-center gap-1.5">
                <span className="material-icons text-sm">schedule</span>
                {readTime} read
              </span>
              <span className="text-zinc-500 text-sm font-medium">Updated 2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight mb-4">{title}</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <article className="lg:col-span-2 prose-guide">
            {children}
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/Image/White_suit_manila_background_for_about_pic_720p_.webp"
                    alt="Yhen - Licensed Real Estate Broker"
                    className="w-14 h-14 rounded-2xl object-cover object-top"
                  />
                  <div>
                    <p className="text-white font-bold text-sm">Yhen</p>
                    <p className="text-zinc-400 text-xs">{siteConfig.copyright.descriptor}</p>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                  Have questions about this guide? I personally answer every inquiry — no bots, no middleman.
                </p>
                <WhatsAppCTA message={whatsappMessage} />
                <p className="text-zinc-600 text-xs text-center mt-3">Usually replies within the hour</p>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-5">More Investor Guides</h3>
                <nav className="space-y-2">
                  {relatedGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      to={`/guides/${guide.slug}`}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/10 group transition-colors"
                    >
                      <span className="material-icons text-sm text-zinc-400 group-hover:text-primary transition-colors">{guide.icon}</span>
                      <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 group-hover:text-primary transition-colors leading-tight">{guide.title}</span>
                    </Link>
                  ))}
                </nav>
                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <Link to="/guides" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    <span className="material-icons text-xs">arrow_back</span>
                    All Guides
                  </Link>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-3xl p-6">
                <h3 className="text-sm font-black text-zinc-800 dark:text-white mb-2">Ready to Invest?</h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed mb-4">
                  Browse current listings in BGC, Manila, and Batangas with direct agent access.
                </p>
                <Link
                  to="/category/buy-condos"
                  className="block text-center bg-primary hover:brightness-110 text-zinc-900 font-bold text-sm py-3 px-4 rounded-xl transition-all"
                >
                  Browse Listings
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default GuideLayout;
