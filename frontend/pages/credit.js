import { useEffect, useState } from 'react';
import Head from 'next/head';
import FormField from '@/components/FormField';
import StatCard from '@/components/StatCard';
import { formatNumber } from '@/utils/format';
import { fetchLoanDetails } from '@/services/api';

export default function CreditPage() {
  const [loanId, setLoanId] = useState('');
  const [loan, setLoan] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loanId) {
      setLoan(null);
      setError('');
      return;
    }

    fetchLoanDetails(loanId)
      .then((res) => {
        setLoan(res.data || null);
        setError('');
      })
      .catch((err) => {
        setLoan(null);
        setError(err.message || 'Failed to fetch loan details');
      });
  }, [loanId]);

  return (
    <>
      <Head>
        <title>Credit Score Dashboard</title>
      </Head>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">Credit score dashboard</p>
          <h1 className="mt-3 text-3xl font-bold text-white text-display">Inspect live loan credit details</h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <FormField label="Loan ID" id="credit_loan_id" type="number" min="1" value={loanId} onChange={(event) => setLoanId(event.target.value)} />
            <div className="rounded-2xl border border-slate-800 bg-white/5 p-4 text-sm text-slate-300">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Live backend read</p>
              <p className="mt-2">Select a loan to load its credit score and status from the database.</p>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          {error && <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>}
          <StatCard label="Credit score" value={formatNumber(loan?.credit_score || 0)} detail="Fetched from the loans table" accent="emerald" />
          <StatCard label="Loan status" value={loan?.status || 'N/A'} detail={`Loan #${loanId || 'n/a'}`} accent="amber" />
        </aside>
      </div>
    </>
  );
}
