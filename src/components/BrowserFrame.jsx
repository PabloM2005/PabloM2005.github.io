/** Marco de ventana de navegador para enseñar las capturas de un proyecto */
export default function BrowserFrame({ src, alt, url, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-ink-800 shadow-2xl shadow-black/60 ${className}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-white/8 px-3 md:h-9 md:px-4">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="mx-auto truncate rounded-md bg-ink-950/70 px-3 py-0.5 font-mono text-[10px] text-muted">
          {url}
        </span>
        <span className="w-8" aria-hidden="true" />
      </div>
      <img src={src} alt={alt} width="1440" height="900" loading="lazy" className="block h-auto w-full" />
    </div>
  );
}
