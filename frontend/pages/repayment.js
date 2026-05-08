import { useState } from 'react';
import Head from 'next/head';
import FormField from '@/components/FormField';
import StatCard from '@/components/StatCard';
import { repayLoan } from '@/services/api';
import { formatCurrency } from '@/utils/format';
import { sampleRepayments } from '@/utils/mockData';

const initialForm = {
  loan_id: '',
  amount: ''
};

export default function RepaymentPage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handlePay = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const data = await repayLoan(form);
      setMessage(data.message || 'Repayment processed successfully');
      setForm(initialForm);
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setLoading(false);
    }
  };

  const totalDue = sampleRepayments.reduce((sum, emi) => sum + emi.total, 0);

  return (
    <>
      <Head>
        <title>Repayment Tracker</title>
      </Head>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">Repayment tracker</p>
          <h1 className="mt-3 text-3xl font-bold text-white text-display">Pay EMI and track the schedule</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            The repayment endpoint expects <span className="text-sky-300">loan_id</span> and <span className="text-sky-300">amount</span> as query parameters.
          </p>

          <form onSubmit={handlePay} className="mt-6 grid gap-4">
            <FormField label="Loan ID" id="repay_loan_id" type="number" min="1" value={form.loan_id} onChange={handleChange('loan_id')} />
            <FormField label="Amount" id="repay_amount" type="number" step="0.01" min="0" value={form.amount} onChange={handleChange('amount')} />
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Processing...' : 'Pay EMI'}
            </button>
          </form>

          {message ? <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div> : null}
          {error ? <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
        </section>

        <section>
          <div className="mb-4 grid gap-4 md:grid-cols-3">
            <StatCard label="Upcoming EMI total" value={formatCurrency(totalDue)} detail="Combined from the sample schedule" accent="sky" />
            <StatCard label="Schedule entries" value={sampleRepayments.length} detail="Displayed below for quick review" accent="emerald" />
            <StatCard label="Endpoint" value="/repay" detail="Backend repayment action" accent="amber" />
          </div>

          <div className="space-y-4">
            {sampleRepayments.map((emi) => (
              <div key={emi.installment} className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-5 shadow-glow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Installment {emi.installment}</p>
                    <h3 className="mt-1 text-xl font-semibold text-white text-display">Due {emi.dueDate}</h3>
                  </div>
                  <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold capitalize text-sky-200">
                    {emi.status}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/5 p-3"><p className="text-xs text-slate-400">Principal</p><p className="mt-1 font-semibold text-white">{formatCurrency(emi.principal)}</p></div>
                  <div className="rounded-2xl bg-white/5 p-3"><p className="text-xs text-slate-400">Interest</p><p className="mt-1 font-semibold text-white">{formatCurrency(emi.interest)}</p></div>
                  <div className="rounded-2xl bg-white/5 p-3"><p className="text-xs text-slate-400">Total</p><p className="mt-1 font-semibold text-white">{formatCurrency(emi.total)}</p></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
