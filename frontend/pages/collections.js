import Head from 'next/head';
import StatCard from '@/components/StatCard';
import { useEffect, useState } from 'react';
import { fetchCollections } from '@/services/api';

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections()
      .then((res) => setCollections(res.data || []))
      .catch(() => {});
  }, []);

  const pendingCases = collections.filter((item) => item.status !== 'completed').length;

  return (
    <>
      <Head>
        <title>Collections Dashboard</title>
      </Head>

      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Collection cases" value={collections.length} detail="Live rows from backend" accent="sky" />
          <StatCard label="Pending work" value={pendingCases} detail="Cases not yet completed" accent="amber" />
          <StatCard label="Workflow" value="Default handling" detail="Supports escalation and status updates" accent="emerald" />
        </div>

        <section className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/70">Collections dashboard</p>
          <h1 className="mt-3 text-3xl font-bold text-white text-display">Overdue loans and case tracking</h1>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {collections.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-800 bg-white/5 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-400">Case #{item.id}</p>
                    <h3 className="mt-1 text-xl font-semibold text-white text-display">Loan #{item.loan_id}</h3>
                  </div>
                  <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold capitalize text-sky-200">
                    {item.status}
                  </span>
                </div>
                <div className="mt-4 space-y-2 text-sm text-slate-300">
                  <p><span className="text-slate-500">Action:</span> {item.action}</p>
                  <p><span className="text-slate-500">Notes:</span> {item.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
