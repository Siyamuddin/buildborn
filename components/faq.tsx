import { Frame } from "@/components/frame"
import { SectionIndex } from "@/components/section-index"
import type { Faq, SectionCopy } from "@/lib/types"

type FaqListProps = {
  faqs: Faq[]
  copy: SectionCopy
}

export const FaqList = ({ faqs, copy }: FaqListProps) => (
  <section id="questions" className="scroll-mt-20 border-b border-line">
    <Frame className="py-20 md:py-28">
      <SectionIndex index="05" label="Questions" />
      <h2 className="mt-8 font-serif text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
        {copy.heading}
      </h2>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{copy.body}</p>
      <div className="mt-12 border-b border-line">
        {faqs.map((faq) => (
          <details key={faq.question} className="group border-t border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base text-ink [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <span aria-hidden="true" className="text-xl leading-none text-muted transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Frame>
  </section>
)
