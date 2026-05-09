import { useState, useEffect } from 'react';
import Head from 'next/head';
import FormField from '@/components/FormField';
import LoanCard from '@/components/LoanCard';
import StatCard from '@/components/StatCard';
import { fundLoan } from '@/services/api';
import { fetchLoans } from '@/services/api';
import { formatCurrency } from '@/utils/format';

const initialFunding = {
  investor_id: '',
  loan_id: '',
  amount: ''
};

export default function InvestorPage() {
  const [form, setForm] = useState(initialFunding);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans()
      .then((res) => setLoans(res.data || []))
      .catch(() => {});
  }, []);

  const handleChange = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleFund = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const data = await fundLoan(form);
      setMessage(data.message || 'Loan funded successfully');
      setForm(initialFunding);
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Investor Marketplace</title>
      </Head>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">Investor marketplace</p>
          <h1 className="mt-3 text-3xl font-bold text-white text-display">Fund open loan requests</h1>

          <form onSubmit={handleFund} className="mt-6 grid gap-4">
            <FormField label="Investor ID" id="investor_id" type="number" min="1" value={form.investor_id} onChange={handleChange('investor_id')} />
            <FormField label="Loan ID" id="loan_id" type="number" min="1" value={form.loan_id} onChange={handleChange('loan_id')} />
            <FormField label="Amount" id="fund_amount" type="number" step="0.01" min="0" value={form.amount} onChange={handleChange('amount')} />
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Funding...' : 'Fund loan'}
            </button>
          </form>

          {message ? <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div> : null}
          {error ? <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
        </section>

        <section>
          <div className="mb-4 grid gap-4 md:grid-cols-3">
            <StatCard label="Loan records" value={loans.length} detail="Loans loaded from the database" accent="sky" />
            <StatCard label="Min ticket" value={formatCurrency(5000)} detail="Suggested starting amount for funding" accent="emerald" />
            </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {loans.map((loan) => (
              <LoanCard key={loan.id} loan={loan} onFund={() => setForm({ investor_id: form.investor_id, loan_id: String(loan.id), amount: '' })} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

