import { MotionStory } from "@/components/motion-story"
import { SectionIndex } from "@/components/section-index"
import type { HeroContent } from "@/lib/types"

type HeroProps = {
  hero: HeroContent
}

export const Hero = ({ hero }: HeroProps) => {
  const lines = hero.headline.split("\n")

  return (
    <section className="border-b border-line">
      <div className="grid md:min-h-[calc(100vh-4rem)] md:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-16 md:px-12 md:py-20 lg:px-16">
          <SectionIndex index="00" label={hero.eyebrow} />
          <h1 className="mt-8 max-w-[12em] font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ink">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{hero.subhead}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href={hero.primaryCtaHref} className="inline-flex h-12 items-center bg-accent px-5 text-sm text-paper">
              {hero.primaryCtaLabel}
            </a>
            <a
              href={hero.secondaryCtaHref}
              className="inline-flex h-12 items-center text-sm text-ink underline decoration-line underline-offset-4"
            >
              {hero.secondaryCtaLabel}
            </a>
          </div>
        </div>
        <div className="flex items-center bg-ink px-5 py-10 text-paper md:px-12 lg:px-16">
          <MotionStory beats={hero.beats} audioUrl={hero.audioUrl} narration={hero.narration} />
        </div>
      </div>
    </section>
  )
}
