import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PropertyListing, PropertyType } from '../types';
import { siteConfig } from '../config/site';

interface Props {
  properties: PropertyListing[];
  isLoading: boolean;
}

const formatPrice = (price: number) =>
  '₱' + price.toLocaleString('en-PH');

const formatArea = (sqft: number) =>
  sqft > 0 ? `${sqft.toLocaleString()} sqm` : '—';

function getPropertySchema(p: PropertyListing) {
  const base = {
    "@type": p.type === PropertyType.Land ? "LandLot" : p.type === PropertyType.House || p.type === PropertyType.Villa ? "SingleFamilyResidence" : "Apartment",
    "name": p.title,
    "url": `https://yhensproperty.com/property/${p.slug}`,
    "address": { "@type": "PostalAddress", "addressLocality": p.city, "addressCountry": "PH" },
    "offers": {
      "@type": "Offer",
      "price": p.price,
      "priceCurrency": "PHP",
      "availability": p.status === 'active' ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
    },
  };
  return base;
}

const statusConfig: Record<string, { label: string; classes: string }> = {
  active:   { label: 'Active',   classes: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' },
  sold:     { label: 'Sold',     classes: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800' },
  rented:   { label: 'Rented',   classes: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800' },
  draft:    { label: 'Draft',    classes: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700' },
  archived: { label: 'Archived', classes: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700' },
};

const InventoryMaster: React.FC<Props> = ({ properties, isLoading }) => {
  const [filterLocation, setFilterLocation] = useState('');
  const [filterOfferType, setFilterOfferType] = useState('');
  const [filterPropertyType, setFilterPropertyType] = useState('');
  const [filterStatus, setFilterStatus] = useState('active');

  const cities = useMemo(() => {
    const set = new Set(properties.map(p => p.city).filter(Boolean));
    return Array.from(set).sort();
  }, [properties]);

  const dynamicH1Cities = useMemo(() => {
    if (cities.length === 0) return 'Philippines';
    if (cities.length === 1) return cities[0];
    if (cities.length === 2) return `${cities[0]} & ${cities[1]}`;
    return `${cities.slice(0, -1).join(', ')} & ${cities[cities.length - 1]}`;
  }, [cities]);

  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (filterLocation && p.city !== filterLocation) return false;
      if (filterOfferType === 'sale' && p.listingType !== 'sale') return false;
      if (filterOfferType === 'rent' && p.listingType !== 'rent') return false;
      if (filterPropertyType && p.type !== filterPropertyType) return false;
      if (filterStatus && p.status !== filterStatus) return false;
      return true;
    });
  }, [properties, filterLocation, filterOfferType, filterPropertyType, filterStatus]);

  const activeCount = properties.filter(p => p.status === 'active').length;
  const lastUpdated = useMemo(() => {
    const dates = properties.map(p => p.dateUpdated || p.dateListed).filter(Boolean);
    if (!dates.length) return null;
    const latest = dates.sort().reverse()[0];
    return new Date(latest).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
  }, [properties]);

  const propertyTypes = useMemo(() => {
    const set = new Set(properties.map(p => p.type));
    return Array.from(set).sort();
  }, [properties]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Property Inventory — ${dynamicH1Cities}`,
    "description": "Complete master inventory of all properties listed by Yhen's Property in the Philippines.",
    "url": "https://yhensproperty.com/inventory",
    "numberOfItems": filtered.length,
    "itemListElement": filtered.slice(0, 50).map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": getPropertySchema(p),
    })),
  };

  const renderSizeCell = (p: PropertyListing) => {
    if (p.type === PropertyType.Land) {
      return (
        <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
          <span className="text-zinc-400 text-xs">Lot</span>{' '}
          {p.lotArea ? `${p.lotArea.toLocaleString()} sqm` : '—'}
        </td>
      );
    }
    if (p.type === PropertyType.Warehouse) {
      return (
        <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
          <span className="text-zinc-400 text-xs">WH</span>{' '}
          {p.warehouseSize ? `${p.warehouseSize.toLocaleString()} sqm` : '—'}
        </td>
      );
    }
    if (p.type === PropertyType.Commercial) {
      return (
        <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
          <span className="text-zinc-400 text-xs">Office</span>{' '}
          {p.officeSpace ? `${p.officeSpace.toLocaleString()} sqm` : p.sqft ? formatArea(p.sqft) : '—'}
        </td>
      );
    }
    return (
      <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
        {p.sqft ? formatArea(p.sqft) : '—'}
        {p.lotArea && p.type !== PropertyType.Condo && p.type !== PropertyType.Apartment && p.type !== PropertyType.HotelRoom ? (
          <span className="text-zinc-400 text-xs ml-1">(lot {p.lotArea.toLocaleString()})</span>
        ) : null}
      </td>
    );
  };

  const renderBedsCell = (p: PropertyListing) => {
    if (p.type === PropertyType.Land || p.type === PropertyType.Commercial || p.type === PropertyType.Warehouse) {
      return <td className="px-4 py-3 text-sm text-zinc-300 dark:text-zinc-600 text-center">—</td>;
    }
    return (
      <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 text-center">
        {p.beds ?? '—'}
      </td>
    );
  };

  const renderBathsCell = (p: PropertyListing) => {
    if (p.type === PropertyType.Land || p.type === PropertyType.Commercial || p.type === PropertyType.Warehouse) {
      return <td className="px-4 py-3 text-sm text-zinc-300 dark:text-zinc-600 text-center">—</td>;
    }
    return (
      <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 text-center">
        {p.baths ?? '—'}
      </td>
    );
  };

  return (
    <>
      <SEO
        title={`Property Inventory: ${dynamicH1Cities} — Master Listings List | Yhen's Property`}
        description={`Full inventory of all properties listed by Yhen's Property across ${dynamicH1Cities}. Filter by location, type, offer, and status. Search by reference number.`}
        canonical="https://yhensproperty.com/inventory"
        ogType="website"
        ogUrl="https://yhensproperty.com/inventory"
        structuredData={structuredData}
        breadcrumbs={[
          { name: "Home", url: "https://yhensproperty.com" },
          { name: "Guides & Resources", url: "https://yhensproperty.com/guides" },
          { name: "Property Inventory", url: "https://yhensproperty.com/inventory" },
        ]}
      />

      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <div className="bg-zinc-950 py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, #84cc16 0%, transparent 50%), radial-gradient(circle at 85% 20%, #84cc16 0%, transparent 40%)' }} />
          <div className="max-w-7xl mx-auto relative">
            <div className="flex items-center gap-2 text-sm mb-8">
              <Link to="/" className="text-zinc-400 hover:text-primary transition-colors font-medium">Home</Link>
              <span className="text-zinc-600">/</span>
              <Link to="/guides" className="text-zinc-400 hover:text-primary transition-colors font-medium">Guides & Resources</Link>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-300 font-medium">Property Inventory</span>
            </div>

            <div className="max-w-3xl mb-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">Master List</span>
                {lastUpdated && (
                  <span className="text-zinc-500 text-sm">Last updated {lastUpdated}</span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-5">
                Current Property Inventory: {dynamicH1Cities}
              </h1>
              <p className="text-zinc-400 text-base leading-relaxed max-w-2xl">
                Complete master list of all properties available through {siteConfig.officialName}. Use the reference number (Listing ID) to look up a specific property you may have seen on a flyer, social post, or another listing site.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { value: String(activeCount), label: 'Active Listings' },
                { value: String(cities.length), label: cities.length === 1 ? 'City Covered' : 'Cities Covered' },
                { value: String(propertyTypes.length), label: 'Property Types' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-black text-primary">{stat.value}</p>
                  <p className="text-sm text-zinc-400 mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Location</label>
                <select
                  value={filterLocation}
                  onChange={e => setFilterLocation(e.target.value)}
                  className="w-full text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="">All Locations</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Offer Type</label>
                <select
                  value={filterOfferType}
                  onChange={e => setFilterOfferType(e.target.value)}
                  className="w-full text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="">All Offers</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Property Type</label>
                <select
                  value={filterPropertyType}
                  onChange={e => setFilterPropertyType(e.target.value)}
                  className="w-full text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="">All Types</option>
                  {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Status</label>
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="w-full text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-zinc-500 font-medium">
                Showing <span className="font-bold text-zinc-700 dark:text-zinc-300">{filtered.length}</span> of <span className="font-bold text-zinc-700 dark:text-zinc-300">{properties.length}</span> listings
              </p>
              {(filterLocation || filterOfferType || filterPropertyType || filterStatus !== 'active') && (
                <button
                  onClick={() => { setFilterLocation(''); setFilterOfferType(''); setFilterPropertyType(''); setFilterStatus('active'); }}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span className="material-icons text-xs">close</span>
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <span className="material-icons animate-spin text-primary text-3xl">sync</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="material-icons text-5xl text-zinc-300 dark:text-zinc-700 mb-4">search_off</span>
              <p className="text-zinc-500 font-medium">No listings match your current filters.</p>
              <button
                onClick={() => { setFilterLocation(''); setFilterOfferType(''); setFilterPropertyType(''); setFilterStatus(''); }}
                className="mt-4 text-sm font-bold text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full min-w-[860px] border-collapse">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-zinc-400 whitespace-nowrap">Listing ID</th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-zinc-400">Property</th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-zinc-400 whitespace-nowrap">Type</th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-zinc-400 whitespace-nowrap">Offer</th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-zinc-400 whitespace-nowrap">Location</th>
                    <th className="px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-zinc-400">Beds</th>
                    <th className="px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-zinc-400">Baths</th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-zinc-400 whitespace-nowrap">Size</th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-zinc-400 whitespace-nowrap">Price</th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-zinc-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {filtered.map(p => (
                    <tr key={p.id} className="bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Link
                          to={`/property/${p.slug}`}
                          className="inline-flex items-center gap-1 font-mono text-xs font-bold text-primary hover:underline hover:text-primary/80 transition-colors"
                          title={`View listing #${p.listing_id}`}
                        >
                          #{p.listing_id}
                          <span className="material-icons text-xs opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/property/${p.slug}`} className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 hover:text-primary transition-colors line-clamp-1 max-w-[220px] block">
                          {p.title}
                        </Link>
                        {p.condoName && (
                          <span className="text-xs text-zinc-400">{p.condoName}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">{p.type}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.listingType === 'sale' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                          {p.listingType === 'sale' ? 'For Sale' : 'For Rent'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">{p.city}</span>
                        {p.barangay && <span className="text-xs text-zinc-400 block">{p.barangay}</span>}
                      </td>
                      {renderBedsCell(p)}
                      {renderBathsCell(p)}
                      {renderSizeCell(p)}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{formatPrice(p.price)}</span>
                        {p.listingType === 'rent' && <span className="text-xs text-zinc-400">/mo</span>}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full ${(statusConfig[p.status] ?? statusConfig.draft).classes}`}>
                          {(statusConfig[p.status] ?? statusConfig.draft).label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-16 bg-zinc-950 rounded-[32px] p-10 md:p-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">See Something You Like?</span>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-4 leading-tight">
                  Reach Out to Yhen Directly
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Every inquiry is answered personally. Whether you spotted a reference number on a flyer or you are browsing fresh, Yhen will walk you through the full details, availability, and next steps.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hi Yhen, I found a property on the inventory list and would like more information.")}`}
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
        </div>
      </div>
    </>
  );
};

export default InventoryMaster;
