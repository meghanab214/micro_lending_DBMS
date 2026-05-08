export default function StatCard({ label, value, detail, accent = 'sky' }) {
  const accents = {
    sky: 'from-sky-500/20 to-cyan-500/5 border-sky-400/20',
    emerald: 'from-emerald-500/20 to-teal-500/5 border-emerald-400/20',
    amber: 'from-amber-500/20 to-orange-500/5 border-amber-400/20',
    rose: 'from-rose-500/20 to-pink-500/5 border-rose-400/20'
  };

  return (
    <div className={`rounded-3xl border bg-gradient-to-br p-5 shadow-glow ${accents[accent] || accents.sky}`}>
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <div className="mt-3 text-3xl font-bold text-white text-display">{value}</div>
      {detail ? <p className="mt-2 text-sm text-slate-300">{detail}</p> : null}
    </div>
  );
}
