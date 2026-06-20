export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#0b0b0b] px-6 text-center">
      {/* Sleek rotating ring animation */}
      <div className="relative flex size-20 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-fuchsia-500/10 border-t-fuchsia-500" />
        <div className="absolute inset-2 animate-spin rounded-full border-4 border-purple-500/10 border-b-purple-500 [animation-duration:1.5s]" />
      </div>
      <h3 className="mt-8 text-lg font-black uppercase tracking-widest text-white/80">
        Loading Universe
      </h3>
      <p className="mt-2 text-xs text-white/45">
        Fetching premium layouts and series content...
      </p>
    </div>
  );
}
