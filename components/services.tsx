import { Frame } from "@/components/frame"
import { SectionIndex } from "@/components/section-index"
import type { SectionCopy, Service } from "@/lib/types"

type ServicesProps = {
  services: Service[]
  copy: SectionCopy
}

export const Services = ({ services, copy }: ServicesProps) => (
  <section id="services" className="scroll-mt-20 border-b border-line">
    <Frame className="py-20 md:py-28">
      <SectionIndex index="02" label="Services" />
      <div className="mt-8 grid gap-6 md:grid-cols-12">
        <h2 className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink md:col-span-5">
          {copy.heading}
        </h2>
        <p className="max-w-md text-base leading-relaxed text-muted md:col-span-6 md:col-start-7">{copy.body}</p>
      </div>
      <ul className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
        {services.map((service, index) => (
          <li
            key={service.title}
            className="bg-paper p-6 transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none md:p-8"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-5 font-serif text-[1.7rem] leading-tight text-ink">{service.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink">{service.outcome}</p>
            <ul className="mt-6 space-y-2">
              {service.details.map((detail) => (
                <li key={detail} className="text-sm leading-relaxed text-muted">
                  {detail}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Frame>
  </section>
)
