import { Frame } from "@/components/frame"
import { SectionIndex } from "@/components/section-index"
import type { Engagement, SectionCopy } from "@/lib/types"

type EngagementsProps = {
  engagements: Engagement[]
  copy: SectionCopy
}

export const Engagements = ({ engagements, copy }: EngagementsProps) => (
  <section id="engagements" className="scroll-mt-20 border-b border-line">
    <Frame className="py-20 md:py-28">
      <SectionIndex index="04" label="Engagements" />
      <div className="mt-8 grid gap-6 md:grid-cols-12">
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink md:col-span-6">
          {copy.heading}
        </h2>
        <p className="max-w-md text-base leading-relaxed text-muted md:col-span-5 md:col-start-8">{copy.body}</p>
      </div>
      <ul className="mt-14 grid gap-8 md:grid-cols-3">
        {engagements.map((item) => (
          <li key={item.title} className="border-t border-line pt-6">
            <h3 className="text-2xl font-semibold tracking-[-0.03em] text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </Frame>
  </section>
)
