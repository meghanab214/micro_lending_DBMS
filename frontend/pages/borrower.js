import { useEffect, useState } from 'react';
import Head from 'next/head';
import FormField from '@/components/FormField';
import StatCard from '@/components/StatCard';
import { createLoan, fetchLoans } from '@/services/api';

const initialForm = {
  borrower_id: '',
  amount: '',
  interest_rate: '',
  term_months: ''
};

export default function BorrowerPage() {
  const [form, setForm] = useState(initialForm);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans()
      .then((res) => setLoans(res.data || []))
      .catch(() => setLoans([]));
  }, []);

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
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">Borrower application</p>
          <h1 className="mt-3 text-3xl font-bold text-white text-display">Create a micro-loan request</h1>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <FormField label="Borrower ID" id="borrower_id" type="number" value={form.borrower_id} onChange={handleChange('borrower_id')} />
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
            </div>
          </form>

          {error ? <div className="mt-5 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
          {response ? <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">Loan created successfully. Loan ID: {response.loan_id ?? 'n/a'}</div> : null}
        </section>

        <aside className="space-y-4">
          <StatCard label="Loan records" value={loans.length} detail="Loans loaded from the database" accent="sky" />
          <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-5 shadow-glow">
            <h2 className="text-sm font-semibold text-slate-200">Recent loans</h2>
            <div className="mt-4 space-y-3">
              {loans.slice(0, 5).map((loan) => (
                <div key={loan.id} className="rounded-2xl border border-slate-800 bg-white/5 p-3 text-sm text-slate-300">
                  <div className="flex items-center justify-between gap-3">
                    <span>Loan #{loan.id}</span>
                    <span className="text-sky-300">{loan.status || 'unknown'}</span>
                  </div>
                  <div className="mt-1 text-slate-500">Borrower #{loan.borrower_id} · Amount {loan.amount}</div>
                </div>
              ))}
              {!loans.length ? <div className="text-sm text-slate-500">No loans loaded yet.</div> : null}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
