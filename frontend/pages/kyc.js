import { useState } from 'react';
import Head from 'next/head';
import FormField from '@/components/FormField';
import StatCard from '@/components/StatCard';
import { submitKyc, verifyKyc } from '@/services/api';

const submitInitial = {
  user_id: '',
  doc_type: 'passport',
  doc_number: ''
};

const verifyInitial = {
  user_id: ''
};

export default function KycPage() {
  const [submitForm, setSubmitForm] = useState(submitInitial);
  const [verifyForm, setVerifyForm] = useState(verifyInitial);
  const [submitMessage, setSubmitMessage] = useState('');
  const [verifyMessage, setVerifyMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitChange = (field) => (event) => setSubmitForm((current) => ({ ...current, [field]: event.target.value }));
  const handleVerifyChange = (field) => (event) => setVerifyForm((current) => ({ ...current, [field]: event.target.value }));

  const submitKycForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSubmitMessage('');

    try {
      const data = await submitKyc(submitForm);
      setSubmitMessage(data.message || 'KYC submitted');
      setSubmitForm(submitInitial);
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyKycForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setVerifyMessage('');

    try {
      const data = await verifyKyc(verifyForm);
      setVerifyMessage(data.message || 'KYC verified');
      setVerifyForm(verifyInitial);
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>KYC Verification</title>
      </Head>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">KYC verification</p>
          <h1 className="mt-3 text-3xl font-bold text-white text-display">Submit and verify compliance data</h1>

          <div className="mt-6 space-y-6">
            <form onSubmit={submitKycForm} className="grid gap-4">
              <h2 className="text-xl font-semibold text-white text-display">Submit KYC</h2>
              <FormField label="User ID" id="kyc_user_id" type="number" min="1" value={submitForm.user_id} onChange={handleSubmitChange('user_id')} />
              <FormField label="Document Type" id="doc_type" type="select" value={submitForm.doc_type} onChange={handleSubmitChange('doc_type')} options={[
                { value: 'passport', label: 'Passport' },
                { value: 'national_id', label: 'National ID' },
                { value: 'business_registration', label: 'Business Registration' }
              ]} />
              <FormField label="Document Number" id="doc_number" type="text" value={submitForm.doc_number} onChange={handleSubmitChange('doc_number')} />
              <button type="submit" disabled={loading} className="rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60">
                Submit KYC
              </button>
            </form>

            <form onSubmit={verifyKycForm} className="grid gap-4 border-t border-slate-800 pt-6">
              <h2 className="text-xl font-semibold text-white text-display">Verify KYC</h2>
              <FormField label="User ID" id="verify_user_id" type="number" min="1" value={verifyForm.user_id} onChange={handleVerifyChange('user_id')} />
              <button type="submit" disabled={loading} className="rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:border-sky-400 hover:text-sky-200 disabled:cursor-not-allowed disabled:opacity-60">
                Verify KYC
              </button>
            </form>
          </div>

          {submitMessage ? <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{submitMessage}</div> : null}
          {verifyMessage ? <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{verifyMessage}</div> : null}
          {error ? <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
        </section>
      </div>
    </>
  );
}
