import { CtaBand } from "@/components/cta-band"
import { Engagements } from "@/components/engagements"
import { FaqList } from "@/components/faq"
import { Hero } from "@/components/hero"
import { Inquiry } from "@/components/inquiry"
import { Method } from "@/components/method"
import { Products } from "@/components/products"
import { ProofStrip } from "@/components/proof-strip"
import { Services } from "@/components/services"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Testimonial } from "@/components/testimonial"
import { getContent } from "@/lib/content"
import { fallbackContent } from "@/lib/fallback"

export const revalidate = 60

const copyOf = (sections: Record<string, { heading: string; body: string }>, key: string) =>
  sections[key] ?? fallbackContent.sections[key] ?? { heading: "", body: "" }

const HomePage = async () => {
  const content = await getContent()
  const quote = content.proof.find((item) => item.kind === "quote")

  return (
    <>
      <SiteHeader name={content.settings.companyName} />
      <main id="content">
        <Hero hero={content.hero} />
        <Products products={content.products} copy={copyOf(content.sections, "products")} />
        <CtaBand
          copy={copyOf(content.sections, "cta")}
          label={content.hero.primaryCtaLabel}
          href={content.hero.primaryCtaHref}
        />
        <ProofStrip items={content.proof} copy={copyOf(content.sections, "proof")} />
        <Services services={content.services} copy={copyOf(content.sections, "services")} />
        <Testimonial item={quote} />
        <Method steps={content.steps} copy={copyOf(content.sections, "method")} />
        <Engagements engagements={content.engagements} copy={copyOf(content.sections, "engagement")} />
        <FaqList faqs={content.faqs} copy={copyOf(content.sections, "faq")} />
        <Inquiry
          email={content.settings.email}
          copy={copyOf(content.sections, "contact")}
          submitLabel={copyOf(content.sections, "contact_submit").heading || "Write the email"}
        />
      </main>
      <SiteFooter settings={content.settings} />
    </>
  )
}

export default HomePage
