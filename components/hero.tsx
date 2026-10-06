import { MotionStory } from "@/components/motion-story"
import { SectionIndex } from "@/components/section-index"
import type { HeroContent } from "@/lib/types"

type HeroProps = {
  hero: HeroContent
}

export const Hero = ({ hero }: HeroProps) => {
  const lines = hero.headline.split("\n")

  return (
    <section className="border-b border-line bg-sheet">
      <div className="grid md:min-h-[calc(100vh-4rem)] md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-24 md:px-16 md:py-28 lg:px-20">
          <SectionIndex index="00" label={hero.eyebrow} />
          <h1 className="mt-10 max-w-[11em] text-[clamp(3rem,6.4vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted md:text-xl">{hero.subhead}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href={hero.primaryCtaHref} className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm text-white">
              {hero.primaryCtaLabel}
            </a>
            <a
              href={hero.secondaryCtaHref}
              className="inline-flex h-11 items-center rounded-full px-5 text-sm text-accent"
            >
              {hero.secondaryCtaLabel}
            </a>
          </div>
        </div>
        <div className="flex items-center bg-ink px-6 py-16 text-white md:px-12 lg:px-16">
          <MotionStory beats={hero.beats} audioUrl={hero.audioUrl} narration={hero.narration} />
        </div>
      </div>
    </section>
  )
}
