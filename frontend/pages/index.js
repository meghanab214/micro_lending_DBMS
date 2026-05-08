import Head from 'next/head';
import Link from 'next/link';
import StatCard from '@/components/StatCard';
import { formatCurrency } from '@/utils/format';
import { useEffect, useState } from 'react';
import { fetchAnalytics } from '@/services/api';

export default function Home() {
  const [analytics, setAnalytics] = useState({ total_loans: 0, total_funded: 0 });

  useEffect(() => {
    fetchAnalytics()
      .then((res) => setAnalytics(res.data || {}))
      .catch(() => {});
  }, []);
  return (
    <>
      <Head>
        <title>Micro-Loan Lending Platform</title>
        <meta name="description" content="Micro-Loan lending dashboard" />
      </Head>

      <section className="relative overflow-hidden rounded-[2rem] border border-slate-800/70 bg-hero-grid px-6 py-10 shadow-glow lg:px-10">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-cyan-950/30" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-sky-300/80">Micro-lending control center</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white text-display lg:text-6xl">
              Manage borrower applications, investor funding, repayments, and compliance in one clean interface.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 lg:text-lg">
              This is a platform for loan creation, funding, repayment, KYC actions, and live dashboard reads.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/borrower" className="rounded-full bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300">
                Create loan
              </Link>
              <Link href="/investor" className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:border-sky-400 hover:text-sky-200">
                Fund loans
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <StatCard label="Total loans" value={analytics.total_loans} detail="Across all active borrowers" accent="sky" />
            <StatCard label="Total funded" value={formatCurrency(analytics.total_funded || 0)} detail="Capital deployed through the platform" accent="emerald" />
          </div>
        </div>
      </section>
    </>
  );
}
