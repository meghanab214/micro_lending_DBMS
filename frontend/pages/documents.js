import { useMemo, useState } from 'react';
import Head from 'next/head';
import FormField from '@/components/FormField';
import StatCard from '@/components/StatCard';
import { clamp, formatNumber } from '@/utils/format';

const initialForm = {
  monthly_revenue: '',
  payment_history_score: '',
  social_score: ''
};

export default function DocumentsPage() {
  const [form, setForm] = useState(initialForm);

  const simulatedScore = useMemo(() => {
    const revenue = Number(form.monthly_revenue || 0);
    const history = Number(form.payment_history_score || 0);
    const social = Number(form.social_score || 0);

    if (!revenue && !history && !social) {
      return 0;
    }

    const score = revenue * 0.002 + history * 0.5 + social * 0.35;
    return clamp(score, 0, 100);
  }, [form]);

  const handleChange = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  return (
    <>
      <Head>
        <title>Document Uploader</title>
      </Head>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">Document uploader</p>
          <h1 className="mt-3 text-3xl font-bold text-white text-display">Simulate alternative credit inputs</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            These values are stored locally on the frontend and used to preview a simulated credit score.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <FormField label="Monthly Revenue" id="monthly_revenue" type="number" min="0" value={form.monthly_revenue} onChange={handleChange('monthly_revenue')} />
            <FormField label="Payment History Score" id="payment_history_score" type="number" min="0" max="100" value={form.payment_history_score} onChange={handleChange('payment_history_score')} />
            <FormField label="Social Score" id="social_score" type="number" min="0" max="100" value={form.social_score} onChange={handleChange('social_score')} />
          </div>
        </section>

        <aside className="space-y-4">
          <StatCard label="Simulated credit score" value={formatNumber(simulatedScore)} detail="Derived from the inputs above" accent="sky" />
          <StatCard label="Data source" value="Frontend" detail="No backend write endpoint is required for this page" accent="emerald" />
          <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
            <h2 className="text-xl font-semibold text-white text-display">Why this page exists</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              It gives borrowers or admins a quick way to preview the non-traditional credit metrics that will feed into loan evaluation.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
