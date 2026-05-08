import { useState } from 'react';
import Head from 'next/head';
import FormField from '@/components/FormField';
import StatCard from '@/components/StatCard';
import { createLoan } from '@/services/api';

const initialForm = {
  borrower_id: '',
  amount: '',
  interest_rate: '',
  term_months: '',
  business_id: ''
};

export default function BorrowerPage() {
  const [form, setForm] = useState(initialForm);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const data = await createLoan(form);
      setResponse(data);
      setForm(initialForm);
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Borrower Portal</title>
      </Head>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">Borrower application portal</p>
          <h1 className="mt-3 text-3xl font-bold text-white text-display">Create a micro-loan request</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Submit the borrower, loan, and business identifiers. The backend route accepts query parameters on POST, so the form posts values directly through the API helper.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <FormField label="Borrower ID" id="borrower_id" type="number" value={form.borrower_id} onChange={handleChange('borrower_id')} />
            <FormField label="Business ID" id="business_id" type="number" value={form.business_id} onChange={handleChange('business_id')} />
            <FormField label="Amount" id="amount" type="number" step="0.01" min="0" value={form.amount} onChange={handleChange('amount')} />
            <FormField label="Interest Rate" id="interest_rate" type="number" step="0.01" min="0" value={form.interest_rate} onChange={handleChange('interest_rate')} />
            <FormField label="Term Months" id="term_months" type="number" min="1" value={form.term_months} onChange={handleChange('term_months')} />

            <div className="sm:col-span-2 flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Submitting...' : 'Create loan'}
              </button>
              <span className="text-xs text-slate-500">POST /create-loan</span>
            </div>
          </form>

          {error ? <div className="mt-5 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
          {response ? <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">Loan created successfully. Loan ID: {response.loan_id ?? 'n/a'}</div> : null}
        </section>

        <aside className="space-y-4">
          <StatCard label="Endpoint" value="/create-loan" detail="Uses query params via POST" accent="emerald" />
          <StatCard label="Required fields" value="5" detail="borrower_id, amount, interest_rate, term_months, business_id" accent="amber" />
          <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
            <h2 className="text-xl font-semibold text-white text-display">Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
              <li>• Use numeric IDs that already exist in the backend database.</li>
              <li>• Interest rate should be entered as a number like 12.5.</li>
              <li>• Loan creation may trigger downstream scoring and EMI schedule generation in the backend.</li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
