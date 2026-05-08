import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { href: '/', label: 'Overview' },
  { href: '/borrower', label: 'Borrower' },
  { href: '/documents', label: 'Documents' },
  { href: '/credit', label: 'Credit Score' },
  { href: '/investor', label: 'Investor' },
  { href: '/marketplace', label: 'Secondary Market' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/repayment', label: 'Repayment' },
  { href: '/kyc', label: 'KYC' },
  { href: '/collections', label: 'Collections' },
  { href: '/analytics', label: 'Analytics' }
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-800/70 bg-slate-950/70 px-5 py-6 lg:block">
      <div className="rounded-3xl border border-slate-800/80 bg-white/5 p-5 shadow-glow">
        <p className="text-xs uppercase tracking-[0.3em] text-sky-300/70">Navigation</p>
        <h2 className="mt-2 text-2xl font-bold text-white text-display">Micro-Loan Lending</h2>
        </div>

      <nav className="mt-6 space-y-2">
        {navItems.map((item) => {
          const active = router.pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                active
                  ? 'border-sky-400/40 bg-sky-400/10 text-sky-200'
                  : 'border-transparent bg-white/0 text-slate-300 hover:border-slate-700 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
