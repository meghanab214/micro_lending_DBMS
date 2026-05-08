import { useMemo, useState } from 'react';
import Head from 'next/head';
import FormField from '@/components/FormField';
import StatCard from '@/components/StatCard';
import { clamp, formatNumber } from '@/utils/format';

const options = [
  { value: 'pending', label: 'Pending' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' }
];

export default function CreditPage() {
  const [form, setForm] = useState({ monthly_revenue: '120000', payment_history_score: '78', social_score: '62', loan_status: 'under_review' });

  const score = useMemo(() => {
    const revenue = Number(form.monthly_revenue || 0);
    const history = Number(form.payment_history_score || 0);
    const social = Number(form.social_score || 0);
    return clamp(revenue * 0.002 + history * 0.45 + social * 0.4, 0, 100);
  }, [form]);

  const getStatusTone = () => {
    if (score >= 75) return 'Approved';
    if (score >= 55) return 'Under Review';
    return 'Rejected';
  };

  const handleChange = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  return (
    <>
      <Head>
        <title>Credit Score Dashboard</title>
      </Head>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">Credit score dashboard</p>
          <h1 className="mt-3 text-3xl font-bold text-white text-display">Simulate scoring and loan status</h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <FormField label="Monthly Revenue" id="credit_monthly_revenue" type="number" min="0" value={form.monthly_revenue} onChange={handleChange('monthly_revenue')} />
            <FormField label="Payment History Score" id="credit_payment_history_score" type="number" min="0" max="100" value={form.payment_history_score} onChange={handleChange('payment_history_score')} />
            <FormField label="Social Score" id="credit_social_score" type="number" min="0" max="100" value={form.social_score} onChange={handleChange('social_score')} />
            <FormField
              label="Loan Status"
              id="loan_status"
              type="select"
              value={form.loan_status}
              onChange={handleChange('loan_status')}
              options={options}
            />
          </div>
        </section>

        <aside className="space-y-4">
          <StatCard label="Credit score" value={formatNumber(score)} detail="Higher values indicate stronger repayment capacity" accent="emerald" />
          <StatCard label="Loan status" value={getStatusTone()} detail={`Selected backend status: ${form.loan_status}`} accent="amber" />
          <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
            <h2 className="text-xl font-semibold text-white text-display">Interpretation</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              This dashboard is frontend-only and mirrors the type of output the backend credit scoring service should return once the loan evaluation route is wired up.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
