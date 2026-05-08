import Head from 'next/head';
import StatCard from '@/components/StatCard';
import { analyticsSummary } from '@/utils/mockData';
import { formatCurrency } from '@/utils/format';

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Total loans', value: analyticsSummary.totalLoans, detail: 'All applications tracked by the platform', accent: 'sky' },
    { label: 'Total funded', value: formatCurrency(analyticsSummary.totalFunded), detail: 'Capital successfully deployed', accent: 'emerald' },
    { label: 'Default count', value: analyticsSummary.defaults, detail: 'Loans in default state', accent: 'rose' },
    { label: 'Returns', value: formatCurrency(analyticsSummary.returns), detail: 'Estimated returns to investors', accent: 'amber' }
  ];

  return (
    <>
      <Head>
        <title>Analytics Dashboard</title>
      </Head>

      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <StatCard key={metric.label} {...metric} />
          ))}
        </div>

        <section className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">Analytics dashboard</p>
          <h1 className="mt-3 text-3xl font-bold text-white text-display">Platform overview</h1>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-white/5 p-5">
              <h2 className="text-xl font-semibold text-white text-display">Performance</h2>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="mb-2 flex justify-between text-sm text-slate-400"><span>Funding utilization</span><span>84%</span></div>
                  <div className="h-2 rounded-full bg-slate-800"><div className="h-2 w-[84%] rounded-full bg-gradient-to-r from-sky-400 to-cyan-300" /></div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm text-slate-400"><span>Collection rate</span><span>{analyticsSummary.collectionRate}%</span></div>
                  <div className="h-2 rounded-full bg-slate-800"><div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" /></div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm text-slate-400"><span>Defaults</span><span>6%</span></div>
                  <div className="h-2 rounded-full bg-slate-800"><div className="h-2 w-[6%] rounded-full bg-gradient-to-r from-rose-400 to-pink-300" /></div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-white/5 p-5">
              <h2 className="text-xl font-semibold text-white text-display">What to connect later</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
                <li>• Loan count and funded totals from SQL aggregate endpoints.</li>
                <li>• Default and collection counts from the collections workflow.</li>
                <li>• Investor return metrics from repayment distribution records.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
