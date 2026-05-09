import { useState, useEffect } from 'react';
import Head from 'next/head';
import FormField from '@/components/FormField';
import InvestmentCard from '@/components/InvestmentCard';
import StatCard from '@/components/StatCard';
import { buyInvestment } from '@/services/api';
import { fetchListings } from '@/services/api';

const initialForm = {
  buyer_id: '',
  listing_id: ''
};

export default function MarketplacePage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings().then((res) => setListings(res.data || [])).catch(() => {});
  }, []);

  const handleChange = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleBuy = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const data = await buyInvestment(form);
      setMessage(data.message || 'Investment bought successfully');
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
        <title>Secondary Market</title>
      </Head>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">Secondary market</p>
          <h1 className="mt-3 text-3xl font-bold text-white text-display">Buy listed investment portions</h1>

          <form onSubmit={handleBuy} className="mt-6 grid gap-4">
            <FormField label="Buyer ID" id="buyer_id" type="number" min="1" value={form.buyer_id} onChange={handleChange('buyer_id')} />
            <FormField label="Listing ID" id="listing_id" type="number" min="1" value={form.listing_id} onChange={handleChange('listing_id')} />
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Processing...' : 'Buy investment'}
            </button>
          </form>

          {message ? <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div> : null}
          {error ? <div className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
        </section>

        <section>
          <div className="mb-4 grid gap-4 md:grid-cols-3">
            <StatCard label="Listings" value={listings.length} detail="Live sell offers" accent="sky" />
            </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {listings.map((listing) => (
              <InvestmentCard
                key={listing.id}
                investment={listing}
                onAction={() => setForm({ buyer_id: form.buyer_id, listing_id: String(listing.id) })}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
