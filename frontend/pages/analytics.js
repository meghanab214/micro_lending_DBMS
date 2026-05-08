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

  const totalLoans = Number(analytics.total_loans || 0);
  const defaults = Number(analytics.defaults || 0);
  const totalFunded = Number(analytics.total_funded || 0);
  const totalRepayments = Number(analytics.total_repayments || 0);

  const performingLoans = Math.max(totalLoans - defaults, 0);
  const defaultRate = totalLoans > 0 ? (defaults / totalLoans) * 100 : 0;
  const collectionRate = totalLoans > 0 ? (performingLoans / totalLoans) * 100 : 0;
  const repaymentCoverage = totalFunded > 0 ? (totalRepayments / totalFunded) * 100 : 0;
  const avgFundedPerLoan = totalLoans > 0 ? totalFunded / totalLoans : 0;
  const maxFlow = Math.max(totalFunded, totalRepayments, 1);

  const fundedBar = (totalFunded / maxFlow) * 100;
  const repaidBar = (totalRepayments / maxFlow) * 100;
  const performingArc = Math.max(Math.min(collectionRate, 100), 0);

  const metrics = [
    { label: 'Total loans', value: totalLoans, detail: 'All applications tracked by the platform', accent: 'sky' },
    { label: 'Total funded', value: formatCurrency(totalFunded), detail: 'Capital successfully deployed', accent: 'emerald' },
    { label: 'Default count', value: defaults, detail: 'Loans currently in default state', accent: 'rose' },
    { label: 'Returns', value: formatCurrency(totalRepayments), detail: 'Repayment totals captured by backend', accent: 'amber' }
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
          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-white/5 p-5">
              <h2 className="text-xl font-semibold text-white text-display">Portfolio health</h2>
              <p className="mt-1 text-sm text-slate-400">Healthy vs default distribution across all tracked loans.</p>
              <div className="mt-5 grid items-center gap-6 sm:grid-cols-[auto_1fr]">
                <div
                  className="relative h-36 w-36 rounded-full"
                  style={{
                    background: `conic-gradient(#34d399 ${performingArc}%, #fb7185 ${performingArc}% 100%)`
                  }}
                >
                  <div className="absolute inset-3 grid place-items-center rounded-full bg-slate-950">
                    <p className="text-2xl font-semibold text-white">{Math.round(collectionRate)}%</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Healthy</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3">
                    <p className="text-sm text-emerald-200">Performing loans</p>
                    <p className="text-lg font-semibold text-white">{performingLoans}</p>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3">
                    <p className="text-sm text-rose-200">Defaulted loans</p>
                    <p className="text-lg font-semibold text-white">{defaults}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-300">
                    Default ratio: <span className="font-semibold text-rose-300">{defaultRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-white/5 p-5">
              <h2 className="text-xl font-semibold text-white text-display">Capital flow</h2>
              <p className="mt-1 text-sm text-slate-400">Compares funded capital with repayments received.</p>

              <div className="mt-5 space-y-5">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>Total funded</span>
                    <span>{formatCurrency(totalFunded)}</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800">
                    <div className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-sky-300" style={{ width: `${fundedBar}%` }} />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>Total repayments</span>
                    <span>{formatCurrency(totalRepayments)}</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800">
                    <div className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" style={{ width: `${repaidBar}%` }} />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Repayment coverage</p>
                    <p className="mt-1 text-xl font-semibold text-white">{repaymentCoverage.toFixed(1)}%</p>
                  </div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Avg funded per loan</p>
                    <p className="mt-1 text-xl font-semibold text-white">{formatCurrency(avgFundedPerLoan)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
