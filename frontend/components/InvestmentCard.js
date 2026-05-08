import { formatCurrency, formatPercent } from '@/utils/format';

export default function InvestmentCard({ investment, actionLabel = 'Buy investment', onAction }) {
  const ownership = investment.ownership_ratio ?? investment.ownership ?? 0;
  const listingId = investment.id ?? investment.listing_id ?? investment.investmentId;
  const sellerLabel = investment.seller_id ? `Seller #${investment.seller_id}` : investment.seller || `Loan #${investment.loan_id || investment.loanName || ''}`;

  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-5 shadow-glow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{investment.loan_id ? `Loan #${investment.loan_id}` : investment.loanName}</p>
          <h3 className="mt-1 text-lg font-semibold text-white text-display">{sellerLabel}</h3>
        </div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
          {formatPercent(ownership)} ownership
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
        <div className="rounded-2xl bg-white/5 p-3">
          <p className="text-xs text-slate-400">Listing price</p>
          <p className="mt-1 font-semibold text-white">{formatCurrency(investment.price)}</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-3">
          <p className="text-xs text-slate-400">Investment ID</p>
          <p className="mt-1 font-semibold text-white">{listingId}</p>
        </div>
      </div>

      {onAction ? (
        <button
          onClick={() => onAction(investment)}
          className="mt-5 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:border-sky-400 hover:text-sky-200"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
