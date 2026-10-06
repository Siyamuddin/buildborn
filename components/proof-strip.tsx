import { Frame } from "@/components/frame"
import type { ProofItem, SectionCopy } from "@/lib/types"

type ProofStripProps = {
  items: ProofItem[]
  copy: SectionCopy
}

export const ProofStrip = ({ items, copy }: ProofStripProps) => {
  const logos = items.filter((item) => item.kind === "logo")
  const metrics = items.filter((item) => item.kind === "metric")
  if (logos.length === 0 && metrics.length === 0) return null

  return (
    <section aria-label={copy.heading} className="border-b border-line">
      <Frame className="py-10 md:py-12">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{copy.heading}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{copy.body}</p>
        {logos.length > 0 ? (
          <ul className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
            {logos.map((logo, index) => (
              <li key={`${logo.label}-${index}`} className="bg-sheet px-4 py-5 text-sm font-medium tracking-[-0.02em] text-ink">
                {logo.label}
                {logo.isPlaceholder ? <span className="ml-2 text-[10px] tracking-[0.16em] text-muted">Placeholder</span> : null}
              </li>
            ))}
          </ul>
        ) : null}
        {metrics.length > 0 ? (
          <ul className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
            {metrics.map((metric) => (
              <li key={metric.label}>
                <p className="text-3xl font-semibold tracking-[-0.04em] text-ink">{metric.value}</p>
                <p className="mt-1 text-sm text-muted">{metric.label}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </Frame>
    </section>
  )
}
