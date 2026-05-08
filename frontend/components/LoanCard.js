import { formatCurrency } from '@/utils/format';

export default function LoanCard({ loan, onFund }) {
  const amount = Number(loan.amount || loan.requested_amount || 0);
  const funded = Number(loan.funded_amount || loan.funded || 0);
  const fundedPercent = amount > 0 ? Math.min((funded / amount) * 100, 100) : 0;
  const borrowerLabel = loan.borrower_id ? `Borrower #${loan.borrower_id}` : loan.borrower || 'Borrower';

  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-5 shadow-glow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Loan #{loan.id}</p>
          <h3 className="mt-1 text-xl font-semibold text-white text-display">{borrowerLabel}</h3>
          <p className="mt-2 text-sm text-slate-300">Status: <span className="capitalize text-sky-300">{loan.status}</span></p>
        </div>
        <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-200">
          {Number(loan.interest_rate || loan.rate || 0)}% APR
        </span>
      </div>

      <div className="mt-5 space-y-3 text-sm text-slate-300">
        <div className="flex justify-between">
          <span>Requested</span>
          <span className="font-semibold text-white">{formatCurrency(amount)}</span>
        </div>
        <div className="flex justify-between">
          <span>Funded</span>
          <span className="font-semibold text-white">{formatCurrency(funded)}</span>
        </div>
        <div className="flex justify-between">
          <span>Term</span>
          <span className="font-semibold text-white">{loan.term_months || loan.term || 0} months</span>
        </div>
        <div>
          <div className="mb-2 flex justify-between text-xs text-slate-400">
            <span>Funding progress</span>
            <span>{fundedPercent.toFixed(1)}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-800">
            <div className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300" style={{ width: `${fundedPercent}%` }} />
          </div>
        </div>
      </div>

      {onFund ? (
        <button
          onClick={() => onFund(loan)}
          className="mt-5 w-full rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          Fund loan
        </button>
      ) : null}
    </div>
  );
}
