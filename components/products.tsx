import { Frame } from "@/components/frame"
import { SectionIndex } from "@/components/section-index"
import { Surface } from "@/components/surface"
import type { Product, SectionCopy } from "@/lib/types"

type ProductsProps = {
  products: Product[]
  copy: SectionCopy
}

const variants = ["panel", "list", "split"] as const

export const Products = ({ products, copy }: ProductsProps) => (
  <section id="products" className="scroll-mt-20">
    <Frame className="border-b border-line py-16 md:py-20">
      <SectionIndex index="01" label="Products" />
      <div className="mt-8 grid gap-6 md:grid-cols-12">
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink md:col-span-5">
          {copy.heading}
        </h2>
        <p className="max-w-md text-base leading-relaxed text-muted md:col-span-6 md:col-start-7">{copy.body}</p>
      </div>
    </Frame>
    <ul>
      {products.map((product, index) => {
        const dark = product.theme === "dark"
        return (
          <li key={`${product.sort}-${product.name}`} className={dark ? "bg-ink text-white" : "bg-sheet text-ink"}>
            <Frame className="grid items-center gap-16 py-24 md:grid-cols-2 md:py-32 lg:py-40">
              <div>
                <p className={`text-[11px] uppercase tracking-[0.18em] ${dark ? "text-mist" : "text-muted"}`}>
                  {String(index + 1).padStart(2, "0")}
                  <span className="px-2" aria-hidden="true">
                    /
                  </span>
                  {product.status}
                </p>
                <h3 className="mt-4 text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
                  {product.name}
                </h3>
                <p className={`mt-5 max-w-md text-base leading-relaxed ${dark ? "text-mist" : "text-muted"}`}>
                  {product.summary}
                </p>
                <p className="mt-5 max-w-md text-base leading-relaxed">{product.outcome}</p>
                <p className={`mt-6 text-xs tracking-wide ${dark ? "text-mist" : "text-ink"}`}>{product.stack}</p>
                {product.metricLabel ? (
                  <p className={`mt-6 text-sm ${dark ? "text-mist" : "text-muted"}`}>
                    <span className={dark ? "text-paper" : "text-ink"}>{product.metricValue}</span>
                    <span className="px-2" aria-hidden="true">
                      ·
                    </span>
                    {product.metricLabel}
                  </p>
                ) : null}
              </div>
              <div className="md:px-6">
                {product.imageUrl ? (
                  <div className={`aspect-[16/10] overflow-hidden ${dark ? "bg-ink" : "bg-paper"}`}>
                    <img src={product.imageUrl} alt={product.imageAlt} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <Surface label={product.status} variant={variants[index % variants.length]} dark={dark} />
                )}
              </div>
            </Frame>
          </li>
        )
      })}
    </ul>
  </section>
)
