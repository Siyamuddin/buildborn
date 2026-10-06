type SectionIndexProps = {
  index: string
  label: string
}

export const SectionIndex = ({ index, label }: SectionIndexProps) => (
  <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted">
    <span className="text-ink">{index}</span>
    <span aria-hidden="true" className="h-px w-8 bg-ink" />
    <span>{label}</span>
  </p>
)
