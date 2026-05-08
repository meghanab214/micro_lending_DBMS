import Head from 'next/head';
import StatCard from '@/components/StatCard';
import { formatCurrency, formatPercent } from '@/utils/format';
import { samplePortfolio } from '@/utils/mockData';

export default function PortfolioPage() {
  const totalInvested = samplePortfolio.reduce((sum, item) => sum + item.invested, 0);
  const totalReturns = samplePortfolio.reduce((sum, item) => sum + item.returns, 0);

  return (
    <>
      <Head>
        <title>Portfolio Manager</title>
      </Head>

      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Total invested" value={formatCurrency(totalInvested)} detail="Across current holdings" accent="sky" />
          <StatCard label="Total returns" value={formatCurrency(totalReturns)} detail="Estimated collected repayments" accent="emerald" />
          <StatCard label="Holdings" value={samplePortfolio.length} detail="Active portfolio entries" accent="amber" />
        </div>

        <section className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">Portfolio manager</p>
          <h1 className="mt-3 text-3xl font-bold text-white text-display">Investor holdings and returns</h1>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {samplePortfolio.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-800 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-400">{item.name}</p>
                    <h3 className="mt-1 text-xl font-semibold text-white text-display">{formatPercent(item.ownership)} ownership</h3>
                  </div>
                  <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold capitalize text-sky-200">
                    {item.status}
                  </span>
                </div>
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <div className="flex justify-between"><span>Invested</span><span className="font-semibold text-white">{formatCurrency(item.invested)}</span></div>
                  <div className="flex justify-between"><span>Estimated returns</span><span className="font-semibold text-white">{formatCurrency(item.returns)}</span></div>
                  <div className="flex justify-between"><span>Portfolio share</span><span className="font-semibold text-white">{formatPercent(item.ownership)}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
