/** Cabecera pequeña de cada sección: "01 — Proyectos" con una línea que se dibuja */
export default function SectionLabel({ index, children }) {
  return (
    <div className="flex items-center gap-4">
      <span className="label text-electric">{index}</span>
      <span className="label">{children}</span>
      <span data-line className="h-px flex-1 bg-white/10" />
    </div>
  );
}
