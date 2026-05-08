import Head from 'next/head';
import StatCard from '@/components/StatCard';
import { formatCurrency } from '@/utils/format';
import { useEffect, useState } from 'react';
import { fetchAnalytics } from '@/services/api';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    fetchAnalytics()
      .then((res) => setAnalytics(res.data || {}))
      .catch(() => {});
  }, []);

  const metrics = [
    { label: 'Total loans', value: analytics.total_loans || 0, detail: 'All applications tracked by the platform', accent: 'sky' },
    { label: 'Total funded', value: formatCurrency(analytics.total_funded || 0), detail: 'Capital successfully deployed', accent: 'emerald' },
    { label: 'Default count', value: analytics.defaults || 0, detail: 'Loans in default state', accent: 'rose' },
    { label: 'Returns', value: formatCurrency(analytics.total_repayments || 0), detail: 'Repayment totals captured by the backend', accent: 'amber' }
  ];

  const collectionRate = analytics.total_loans ? Math.max(0, Math.round(((analytics.total_loans - (analytics.defaults || 0)) / analytics.total_loans) * 100)) : 0;

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
                  <div className="mb-2 flex justify-between text-sm text-slate-400"><span>Collection rate</span><span>{collectionRate}%</span></div>
                  <div className="h-2 rounded-full bg-slate-800"><div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" /></div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm text-slate-400"><span>Defaults</span><span>6%</span></div>
                  <div className="h-2 rounded-full bg-slate-800"><div className="h-2 w-[6%] rounded-full bg-gradient-to-r from-rose-400 to-pink-300" /></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
