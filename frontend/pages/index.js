import Head from 'next/head';
import Link from 'next/link';
import StatCard from '@/components/StatCard';
import { analyticsSummary } from '@/utils/mockData';
import { formatCurrency } from '@/utils/format';

const routes = [
  { href: '/borrower', title: 'Borrower Portal', description: 'Create new micro-loan applications.' },
  { href: '/documents', title: 'Document Uploader', description: 'Enter alternative credit inputs.' },
  { href: '/credit', title: 'Credit Dashboard', description: 'View simulated credit results.' },
  { href: '/investor', title: 'Investor Marketplace', description: 'Fund open loan requests.' },
  { href: '/portfolio', title: 'Portfolio Manager', description: 'Review holdings and returns.' },
  { href: '/repayment', title: 'Repayment Tracker', description: 'Pay EMIs and inspect schedules.' },
  { href: '/marketplace', title: 'Secondary Market', description: 'Buy listed loan portions.' },
  { href: '/kyc', title: 'KYC Verification', description: 'Submit or verify compliance data.' },
  { href: '/collections', title: 'Collections Dashboard', description: 'Manage overdue accounts.' },
  { href: '/analytics', title: 'Analytics Dashboard', description: 'Track platform-wide metrics.' }
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Micro Lending Platform</title>
        <meta name="description" content="Micro lending frontend dashboard" />
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
              This frontend is wired to the FastAPI backend for loan creation, funding, repayment, and KYC actions.
              It also includes dashboards for pages that are currently read-only or demo-backed.
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
            <StatCard label="Total loans" value={analyticsSummary.totalLoans} detail="Across all active borrowers" accent="sky" />
            <StatCard label="Total funded" value={formatCurrency(analyticsSummary.totalFunded)} detail="Capital deployed through the platform" accent="emerald" />
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="group rounded-3xl border border-slate-800/80 bg-slate-950/70 p-5 shadow-glow transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-slate-900/80"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">Open page</p>
            <h2 className="mt-3 text-2xl font-semibold text-white text-display">{route.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{route.description}</p>
            <div className="mt-5 inline-flex items-center text-sm font-semibold text-sky-300 transition group-hover:text-sky-200">
              Go to page
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
