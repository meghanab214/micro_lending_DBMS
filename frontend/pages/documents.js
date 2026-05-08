import { useEffect, useState } from 'react';
import Head from 'next/head';
import FormField from '@/components/FormField';
import StatCard from '@/components/StatCard';
import { formatNumber } from '@/utils/format';
import { fetchAnalytics, fetchLoanDetails } from '@/services/api';

const initialForm = {
  loan_id: ''
};

export default function DocumentsPage() {
  const [form, setForm] = useState(initialForm);
  const [analytics, setAnalytics] = useState({ total_loans: 0, defaults: 0, total_funded: 0 });
  const [loan, setLoan] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  useEffect(() => {
    fetchAnalytics().then((res) => setAnalytics(res.data || {})).catch(() => {});
  }, []);

  useEffect(() => {
    if (!form.loan_id) {
      setLoan(null);
      setError('');
      return;
    }

    fetchLoanDetails(form.loan_id)
      .then((res) => {
        setLoan(res.data || null);
        setError('');
      })
      .catch((err) => {
        setLoan(null);
        setError(err.message || 'Failed to fetch loan details');
      });
  }, [form.loan_id]);

  return (
    <>
      <Head>
        <title>Document Uploader</title>
      </Head>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">Document uploader</p>
          <h1 className="mt-3 text-3xl font-bold text-white text-display">View live credit and loan context</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            This page now reflects live platform metrics instead of client-side calculations.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <FormField label="Loan ID" id="loan_id" type="number" min="1" value={form.loan_id} onChange={handleChange('loan_id')} />
            <div className="rounded-2xl border border-slate-800 bg-white/5 p-4 text-sm text-slate-300 sm:col-span-1">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Backend snapshot</p>
              <p className="mt-2">Total loans: {formatNumber(analytics.total_loans)}</p>
              <p className="mt-1">Defaults: {formatNumber(analytics.defaults)}</p>
              <p className="mt-1">Total funded: {formatNumber(analytics.total_funded || 0)}</p>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          {error && <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>}
          <StatCard label="Loan credit score" value={formatNumber(loan?.credit_score || 0)} detail="Fetched from the selected loan" accent="sky" />
          <StatCard label="Loan status" value={loan?.status || 'N/A'} detail="Loaded from the backend" accent="emerald" />
        </aside>
      </div>
    </>
  );
}
