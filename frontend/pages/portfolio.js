import Head from 'next/head';
import FormField from '@/components/FormField';
import StatCard from '@/components/StatCard';
import { formatCurrency, formatPercent } from '@/utils/format';
import { useEffect, useState } from 'react';
import { fetchInvestments } from '@/services/api';

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState([]);
  const [investorId, setInvestorId] = useState('1');

  useEffect(() => {
    if (!investorId) {
      setPortfolio([]);
      return;
    }

    fetchInvestments({ investor_id: investorId }).then((res) => setPortfolio(res.data || [])).catch(() => setPortfolio([]));
  }, [investorId]);

  const totalInvested = portfolio.reduce((sum, item) => sum + (item.amount_invested || 0), 0);
  const totalReturns = 0;

  return (
    <>
      <Head>
        <title>Portfolio Manager</title>
      </Head>

      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">Portfolio filter</p>
              <h1 className="mt-3 text-3xl font-bold text-white text-display">Investor holdings and returns</h1>
              <p className="mt-2 text-sm leading-6 text-slate-400">Choose an investor ID to load live investment rows.</p>
            </div>
            <div className="min-w-[220px]">
              <FormField label="Investor ID" id="portfolio_investor_id" type="number" min="1" value={investorId} onChange={(event) => setInvestorId(event.target.value)} />
            </div>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Total invested" value={formatCurrency(totalInvested)} detail="Across current holdings" accent="sky" />
          <StatCard label="Total returns" value={formatCurrency(totalReturns)} detail="Collected repayments" accent="emerald" />
          <StatCard label="Holdings" value={portfolio.length} detail="Active portfolio entries" accent="amber" />
        </div>

        <section className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {portfolio.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-800 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-400">Investment {item.id}</p>
                    <h3 className="mt-1 text-xl font-semibold text-white text-display">{formatPercent(item.ownership_ratio || 0)} ownership</h3>
                  </div>
                  <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold capitalize text-sky-200">
                    active
                  </span>
                </div>
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <div className="flex justify-between"><span>Invested</span><span className="font-semibold text-white">{formatCurrency(item.amount_invested || 0)}</span></div>
                  <div className="flex justify-between"><span>Estimated returns</span><span className="font-semibold text-white">{formatCurrency(0)}</span></div>
                  <div className="flex justify-between"><span>Portfolio share</span><span className="font-semibold text-white">{formatPercent(item.ownership_ratio || 0)}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
