import { useEffect, useState } from 'react';
import Head from 'next/head';
import FormField from '@/components/FormField';
import StatCard from '@/components/StatCard';
import { formatNumber } from '@/utils/format';
import { fetchAnalytics, fetchLoanDetails } from '@/services/api';
import { submitKyc } from '@/services/api';

const initialForm = {
  loan_id: ''
};

export default function DocumentsPage() {
  const [form, setForm] = useState(initialForm);
  const [analytics, setAnalytics] = useState({ total_loans: 0, defaults: 0, total_funded: 0 });
  const [loan, setLoan] = useState(null);
  const [kycForm, setKycForm] = useState({ user_id: '', doc_type: 'id_card', doc_number: '' });
  const [kycMsg, setKycMsg] = useState('');
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

  const handleKycChange = (field) => (e) => setKycForm((s) => ({ ...s, [field]: e.target.value }));

  const handleKycSubmit = async (e) => {
    e.preventDefault();
    setKycMsg('');
    try {
      await submitKyc(kycForm);
      setKycMsg('Document submitted successfully');
      setKycForm({ user_id: '', doc_type: 'id_card', doc_number: '' });
    } catch (err) {
      setKycMsg(err.message || 'Submission failed');
    }
  };

  return (
    <>
      <Head>
        <title>Document Uploader</title>
      </Head>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">Document uploader</p>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-slate-300">Submit document for user</h2>
            <p className="mt-1 text-xs text-slate-500">Upload a KYC document tied to a user id.</p>
            <form onSubmit={handleKycSubmit} className="mt-4 grid gap-3 sm:grid-cols-3">
              <FormField label="User ID" id="kyc_user_id" type="number" value={kycForm.user_id} onChange={handleKycChange('user_id')} />
              <div>
                <label className="block text-sm text-slate-300">Document type</label>
                <select value={kycForm.doc_type} onChange={handleKycChange('doc_type')} className="mt-2 w-full rounded-md bg-slate-900 border border-slate-800 p-2 text-sm text-white">
                  <option value="id_card">ID Card</option>
                  <option value="business_registration">Business Registration</option>
                  <option value="utility_bill">Utility Bill</option>
                </select>
              </div>
              <FormField label="Document number" id="kyc_doc_number" type="text" value={kycForm.doc_number} onChange={handleKycChange('doc_number')} />

              <div className="sm:col-span-3">
                <button className="rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950" type="submit">Submit document</button>
              </div>
            </form>
            {kycMsg ? <div className="mt-3 rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm text-slate-200">{kycMsg}</div> : null}
          </div>
        </section>
      </div>
    </>
  );
}
