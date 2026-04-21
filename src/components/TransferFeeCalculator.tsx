import React, { useState, useMemo } from 'react';

type Mode = 'buyer' | 'seller';

const LGU_RATES: { label: string; rate: number }[] = [
  { label: 'Metro Manila / NCR (0.75%)', rate: 0.0075 },
  { label: 'Outside Metro Manila (0.50%)', rate: 0.005 },
];

function fmt(n: number): string {
  return '₱' + Math.round(n).toLocaleString('en-PH');
}

function parsePHP(raw: string): number {
  const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
  return isNaN(n) ? 0 : n;
}

function formatWithCommas(raw: string): string {
  const digits = raw.replace(/[^0-9]/g, '');
  if (!digits) return '';
  return Number(digits).toLocaleString('en-PH');
}

interface TransferFeeCalculatorProps {
  defaultMode?: Mode;
  prefilledPrice?: number;
}

const TransferFeeCalculator: React.FC<TransferFeeCalculatorProps> = ({ defaultMode = 'buyer', prefilledPrice }) => {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [sellingPrice, setSellingPrice] = useState(prefilledPrice ? prefilledPrice.toLocaleString('en-PH') : '');
  const [zonalValue, setZonalValue] = useState('');
  const [assessorFMV, setAssessorFMV] = useState('');
  const [lguIndex, setLguIndex] = useState(0);
  const [brokerPct, setBrokerPct] = useState('3');
  const [notarialPct, setNotarialPct] = useState('1');
  const [showAll, setShowAll] = useState(false);

  const sp = parsePHP(sellingPrice);
  const zv = parsePHP(zonalValue);
  const fmv = parsePHP(assessorFMV);

  const taxBase = Math.max(sp, zv, fmv);
  const lguRate = LGU_RATES[lguIndex].rate;

  function calcRegistrationFee(value: number): number {
    if (value <= 0) return 0;
    if (value <= 15000) return 107;
    if (value <= 30000) return 152;
    if (value <= 60000) return 204;
    if (value <= 100000) return 281;
    if (value <= 200000) return 403;
    if (value <= 500000) return 699;
    if (value <= 1000000) return 1108;
    return 8796 + Math.ceil((value - 1700000) / 20000) * 90;
  }

  const dst = taxBase * 0.015;
  const transferTax = taxBase * lguRate;
  const registrationFee = calcRegistrationFee(taxBase);
  const notarialFee = sp > 0 ? sp * (parsePHP(notarialPct) / 100) : 0;
  const totalBuyer = dst + transferTax + registrationFee + notarialFee;

  const cgt = taxBase * 0.06;
  const brokerCommission = sp > 0 ? sp * (parsePHP(brokerPct) / 100) : 0;
  const totalSeller = cgt + brokerCommission;

  const totalAll = totalBuyer + totalSeller;

  const hasValues = sp > 0 || zv > 0 || fmv > 0;
  const pctOfSP = (n: number) => sp > 0 ? ` (${((n / sp) * 100).toFixed(2)}%)` : '';

  const buyerRows = useMemo(() => [
    { label: 'Documentary Stamp Tax (1.5%)', value: dst, note: 'of tax base' },
    { label: `Transfer Tax (${(lguRate * 100).toFixed(2)}%) — ${LGU_RATES[lguIndex].label}`, value: transferTax, note: 'of tax base' },
    { label: 'Registration Fee (LRA sliding scale)', value: registrationFee, note: 'based on selling price' },
    { label: `Notarial / Legal Fees (${notarialPct}%)`, value: notarialFee, note: 'of selling price' },
  ], [dst, transferTax, registrationFee, notarialFee, lguRate, lguIndex, notarialPct]);

  const sellerRows = useMemo(() => [
    { label: 'Capital Gains Tax (6%)', value: cgt, note: 'of tax base', highlight: true },
    { label: `Broker's Commission (${brokerPct}%)`, value: brokerCommission, note: 'of selling price' },
  ], [cgt, brokerCommission, brokerPct]);

  return (
    <div
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-3xl overflow-hidden shadow-xl"
      itemScope
      itemType="https://schema.org/WebApplication"
    >
      <meta itemProp="name" content="Philippines Property Transfer Fee Calculator" />
      <meta itemProp="description" content="Calculate buyer and seller costs for Philippine property transfers including DST, Transfer Tax, CGT, and broker commission." />
      <meta itemProp="applicationCategory" content="FinanceApplication" />

      <div className="bg-zinc-950 px-6 pt-6 pb-5">
        <div className="flex items-center gap-3 mb-1">
          <span className="material-icons text-primary text-2xl">calculate</span>
          <h3 className="text-lg font-black text-white tracking-tight">Transfer Fee Calculator</h3>
        </div>
        <p className="text-zinc-400 text-xs leading-relaxed">
          Approximate only — based on current BIR rates. Consult a licensed broker or attorney for a formal computation.
        </p>

        <div className="flex bg-zinc-800 rounded-2xl p-1 mt-5 gap-1">
          <button
            onClick={() => setMode('buyer')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
              mode === 'buyer'
                ? 'bg-primary text-zinc-900 shadow-md'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="material-icons text-sm">home</span>
            I'm a Buyer
          </button>
          <button
            onClick={() => setMode('seller')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
              mode === 'seller'
                ? 'bg-primary text-zinc-900 shadow-md'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span className="material-icons text-sm">sell</span>
            I'm a Seller
          </button>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400 mb-3">Property Values</p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                Agreed Selling Price (₱)
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 8,000,000"
                value={sellingPrice}
                onChange={e => setSellingPrice(formatWithCommas(e.target.value))}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                BIR Zonal Value (₱) <span className="text-zinc-400 font-normal">— leave blank if unknown</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 7,500,000"
                value={zonalValue}
                onChange={e => setZonalValue(formatWithCommas(e.target.value))}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                Assessor's Fair Market Value (₱) <span className="text-zinc-400 font-normal">— optional</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 7,200,000"
                value={assessorFMV}
                onChange={e => setAssessorFMV(formatWithCommas(e.target.value))}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
          </div>

          {taxBase > 0 && (
            <div className="mt-3 bg-primary/10 border border-primary/20 rounded-xl px-4 py-2.5 flex items-center gap-2">
              <span className="material-icons text-primary text-sm">info</span>
              <p className="text-xs text-zinc-700 dark:text-zinc-300">
                Tax base = <strong className="text-zinc-900 dark:text-white">{fmt(taxBase)}</strong> (highest of the three values)
              </p>
            </div>
          )}
        </div>

        {mode === 'buyer' && (
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400 mb-3">Buyer Options</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Local Government Unit (LGU)</label>
                <select
                  value={lguIndex}
                  onChange={e => setLguIndex(Number(e.target.value))}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                >
                  {LGU_RATES.map((r, i) => (
                    <option key={i} value={i}>{r.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Notarial / Legal Fee %
                </label>
                <div className="flex gap-2">
                  {['1', '1.5', '2', '3'].map(v => (
                    <button
                      key={v}
                      onClick={() => setNotarialPct(v)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        notarialPct === v
                          ? 'bg-primary border-primary text-zinc-900'
                          : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-primary/50'
                      }`}
                    >
                      {v}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {mode === 'seller' && (
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400 mb-3">Seller Options</p>
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                Broker's Commission %
              </label>
              <div className="flex gap-2">
                {['0', '3', '3.5', '4', '5'].map(v => (
                  <button
                    key={v}
                    onClick={() => setBrokerPct(v)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      brokerPct === v
                        ? 'bg-primary border-primary text-zinc-900'
                        : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-primary/50'
                    }`}
                  >
                    {v === '0' ? 'None' : `${v}%`}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-zinc-400 mt-1.5">Standard broker commission in the Philippines is 3–5%. Paid by the seller.</p>
            </div>
          </div>
        )}

        {hasValues && (
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-5">
            {mode === 'buyer' && (
              <>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400 mb-3">Buyer-Side Costs</p>
                <div className="space-y-1.5">
                  {buyerRows.map((row) => (
                    <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-zinc-50 dark:border-zinc-800/50">
                      <span className="text-xs text-zinc-600 dark:text-zinc-400 flex-1 pr-2">{row.label}</span>
                      <span className="text-xs font-bold text-zinc-900 dark:text-white whitespace-nowrap">{row.value > 0 ? fmt(row.value) : '—'}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 mt-1">
                    <span className="text-sm font-black text-zinc-900 dark:text-white">Total Buyer Cost</span>
                    <div className="text-right">
                      <span className="text-base font-black text-primary">{totalBuyer > 0 ? fmt(totalBuyer) : '—'}</span>
                      {totalBuyer > 0 && sp > 0 && (
                        <p className="text-[10px] text-zinc-400">{pctOfSP(totalBuyer)} of selling price</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-2.5">
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    <strong>Note:</strong> Capital Gains Tax (6%) is legally the seller's cost but is sometimes negotiated onto the buyer. Clarify this in your Contract to Sell.
                  </p>
                </div>
              </>
            )}

            {mode === 'seller' && (
              <>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400 mb-3">Seller-Side Costs</p>
                <div className="space-y-1.5">
                  {sellerRows.map((row) => (
                    <div key={row.label} className={`flex justify-between items-center py-1.5 border-b border-zinc-50 dark:border-zinc-800/50 ${row.highlight ? 'font-semibold' : ''}`}>
                      <span className={`text-xs flex-1 pr-2 ${row.highlight ? 'text-zinc-800 dark:text-zinc-200' : 'text-zinc-600 dark:text-zinc-400'}`}>{row.label}</span>
                      <span className={`text-xs font-bold whitespace-nowrap ${row.highlight ? 'text-red-600 dark:text-red-400' : 'text-zinc-900 dark:text-white'}`}>
                        {row.value > 0 ? fmt(row.value) : '—'}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 mt-1">
                    <span className="text-sm font-black text-zinc-900 dark:text-white">Total Seller Cost</span>
                    <div className="text-right">
                      <span className="text-base font-black text-primary">{totalSeller > 0 ? fmt(totalSeller) : '—'}</span>
                      {totalSeller > 0 && sp > 0 && (
                        <p className="text-[10px] text-zinc-400">{pctOfSP(totalSeller)} of selling price</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-2.5">
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    <strong>Note:</strong> If you are a corporation selling property, corporate income tax rates (10–35%) may apply instead of CGT. Consult an accountant.
                  </p>
                </div>
              </>
            )}

            <button
              onClick={() => setShowAll(v => !v)}
              className="w-full mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-primary transition-colors py-2"
            >
              <span className="material-icons text-sm">{showAll ? 'expand_less' : 'expand_more'}</span>
              {showAll ? 'Hide' : 'View'} full transaction breakdown (buyer + seller)
            </button>

            {showAll && (
              <div className="mt-2 border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden">
                <div className="bg-zinc-50 dark:bg-zinc-800/50 px-4 py-2.5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Full Transaction Costs</p>
                </div>
                <div className="p-4 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 mb-2">Buyer</p>
                  {buyerRows.map(row => (
                    <div key={row.label} className="flex justify-between text-xs py-1 border-b border-zinc-50 dark:border-zinc-800/30">
                      <span className="text-zinc-500 flex-1 pr-2">{row.label}</span>
                      <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{row.value > 0 ? fmt(row.value) : '—'}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-xs py-1.5 font-bold">
                    <span className="text-zinc-700 dark:text-zinc-300">Buyer Total</span>
                    <span className="text-blue-600 dark:text-blue-400">{totalBuyer > 0 ? fmt(totalBuyer) : '—'}</span>
                  </div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500 mt-3 mb-2">Seller</p>
                  {sellerRows.map(row => (
                    <div key={row.label} className="flex justify-between text-xs py-1 border-b border-zinc-50 dark:border-zinc-800/30">
                      <span className="text-zinc-500 flex-1 pr-2">{row.label}</span>
                      <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{row.value > 0 ? fmt(row.value) : '—'}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-xs py-1.5 font-bold">
                    <span className="text-zinc-700 dark:text-zinc-300">Seller Total</span>
                    <span className="text-rose-600 dark:text-rose-400">{totalSeller > 0 ? fmt(totalSeller) : '—'}</span>
                  </div>

                  <div className="flex justify-between items-center pt-3 mt-1 border-t-2 border-zinc-200 dark:border-zinc-700">
                    <span className="text-sm font-black text-zinc-900 dark:text-white">Grand Total (both sides)</span>
                    <span className="text-sm font-black text-primary">{totalAll > 0 ? fmt(totalAll) : '—'}</span>
                  </div>
                  {totalAll > 0 && sp > 0 && (
                    <p className="text-[10px] text-zinc-400 text-right">{pctOfSP(totalAll)} of selling price</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {!hasValues && (
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-5 text-center py-8">
            <span className="material-icons text-3xl text-zinc-300 dark:text-zinc-700 mb-2 block">calculate</span>
            <p className="text-sm text-zinc-400">Enter the selling price above to see your estimated costs.</p>
          </div>
        )}

        <p className="text-[10px] text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-4">
          Estimates only. Actual fees depend on BIR zonal values, LGU rates, and the specific attorney engaged. Allocation of fees between buyer and seller is subject to negotiation.
        </p>
      </div>
    </div>
  );
};

export default TransferFeeCalculator;
