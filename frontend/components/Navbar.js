import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sky-300/70">Micro-Loan Lending Platform</p>
          <h1 className="mt-1 text-lg font-semibold text-white text-display">Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:border-sky-400 hover:text-sky-200"
          >
            Home
          </Link>
        </div>
      </div>
    </header>
  );
}
