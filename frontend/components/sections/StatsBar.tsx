export default function StatsBar({ totalAnime }: { totalAnime?: number }) {
  if (totalAnime === undefined) return null;
  return (
    <section className="border-y border-white/10 bg-white/[0.025] px-5 py-7 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-white/45">Anime in the catalog</p>
      <p className="mt-1 text-3xl font-black text-white">{totalAnime?.toLocaleString()}</p>
    </section>
  );
}
