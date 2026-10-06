import { Frame } from "@/components/frame"
import { SectionIndex } from "@/components/section-index"
import type { SectionCopy, Step } from "@/lib/types"

type MethodProps = {
  steps: Step[]
  copy: SectionCopy
}

export const Method = ({ steps, copy }: MethodProps) => (
  <section id="method" className="scroll-mt-20 border-b border-line">
    <Frame className="py-20 md:py-28">
      <SectionIndex index="03" label="How we work" />
      <h2 className="mt-8 max-w-xl font-serif text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
        {copy.heading}
      </h2>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{copy.body}</p>
      <ol className="mt-12">
        {steps.map((step, index) => (
          <li key={step.title} className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:items-baseline md:gap-6">
            <span className="font-serif text-3xl text-ink md:col-span-2">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="font-serif text-2xl text-ink md:col-span-4">{step.title}</h3>
            <p className="text-base leading-relaxed text-muted md:col-span-6">{step.body}</p>
          </li>
        ))}
      </ol>
    </Frame>
  </section>
)
