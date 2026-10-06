import { Frame } from "@/components/frame"
import type { SectionCopy } from "@/lib/types"

type CtaBandProps = {
  copy: SectionCopy
  label: string
  href: string
}

export const CtaBand = ({ copy, label, href }: CtaBandProps) => (
  <section className="border-y border-line bg-paper">
    <Frame className="flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-end md:py-16">
      <div className="max-w-xl">
        <h2 className="text-[clamp(1.8rem,3vw,2.75rem)] font-semibold leading-tight tracking-[-0.04em] text-ink">
          {copy.heading}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted">{copy.body}</p>
      </div>
      <a href={href} className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm text-white">
        {label}
      </a>
    </Frame>
  </section>
)
