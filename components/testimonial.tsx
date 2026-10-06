import { Frame } from "@/components/frame"
import type { ProofItem } from "@/lib/types"

type TestimonialProps = {
  item: ProofItem | undefined
}

export const Testimonial = ({ item }: TestimonialProps) => {
  if (!item) return null

  return (
    <section aria-label="Testimonial" className="border-b border-line">
      <Frame className="py-20 md:py-28">
        <figure className="max-w-3xl">
          <blockquote className="font-serif text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-[1.25] tracking-[-0.03em] text-ink">
            {item.quote}
          </blockquote>
          <figcaption className="mt-8 text-sm text-muted">
            <span className="text-ink">{item.person}</span>
            <span className="px-2" aria-hidden="true">
              ·
            </span>
            {item.role}
            {item.isPlaceholder ? (
              <span className="mt-2 block text-[11px] uppercase tracking-[0.16em]">Placeholder</span>
            ) : null}
          </figcaption>
        </figure>
      </Frame>
    </section>
  )
}
