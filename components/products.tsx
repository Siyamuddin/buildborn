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
        <h2 className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink md:col-span-5">
          {copy.heading}
        </h2>
        <p className="max-w-md text-base leading-relaxed text-muted md:col-span-6 md:col-start-7">{copy.body}</p>
      </div>
    </Frame>
    <ul>
      {products.map((product, index) => {
        const dark = product.theme === "dark"
        return (
          <li key={`${product.sort}-${product.name}`} className={dark ? "bg-ink text-paper" : "bg-paper text-ink"}>
            <Frame className="grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
              <div>
                <p className={`text-[11px] uppercase tracking-[0.18em] ${dark ? "text-mist" : "text-muted"}`}>
                  {String(index + 1).padStart(2, "0")}
                  <span className="px-2" aria-hidden="true">
                    /
                  </span>
                  {product.status}
                </p>
                <h3 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em]">
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
                  <div className="aspect-[16/10] overflow-hidden border border-line bg-sheet">
                    <img src={product.imageUrl} alt={product.imageAlt} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <Surface label={product.status} variant={variants[index % variants.length]} />
                )}
              </div>
            </Frame>
          </li>
        )
      })}
    </ul>
  </section>
)
