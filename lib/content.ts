import { cache } from "react"
import { fallbackContent } from "@/lib/fallback"
import { getSupabase } from "@/lib/supabase"
import type {
  Beat,
  Engagement,
  Faq,
  HeroContent,
  Product,
  ProofItem,
  ProofKind,
  SectionCopy,
  Service,
  Settings,
  SiteContent,
  Step,
  Theme,
} from "@/lib/types"

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null

const text = (value: unknown, fallback: string) => (typeof value === "string" && value.trim() ? value : fallback)

const isTheme = (value: unknown): value is Theme => value === "light" || value === "dark"

const isKind = (value: unknown): value is ProofKind =>
  value === "logo" || value === "metric" || value === "quote"

const asBeats = (value: unknown, fallback: Beat[]) => {
  if (!Array.isArray(value)) return fallback
  const beats = value.flatMap((item) => {
    if (!isRecord(item)) return []
    if (typeof item.kicker !== "string" || typeof item.title !== "string" || typeof item.line !== "string") return []
    return [{ kicker: item.kicker, title: item.title, line: item.line }]
  })
  return beats.length > 0 ? beats : fallback
}

const mapSettings = (row: unknown): Settings | null => {
  if (!isRecord(row)) return null
  return {
    companyName: text(row.company_name, fallbackContent.settings.companyName),
    domain: text(row.domain, fallbackContent.settings.domain),
    email: text(row.email, fallbackContent.settings.email),
    legalLine: text(row.legal_line, fallbackContent.settings.legalLine),
    metaTitle: text(row.meta_title, fallbackContent.settings.metaTitle),
    metaDescription: text(row.meta_description, fallbackContent.settings.metaDescription),
  }
}

const mapHero = (row: unknown): HeroContent | null => {
  if (!isRecord(row)) return null
  const base = fallbackContent.hero
  return {
    eyebrow: text(row.eyebrow, base.eyebrow),
    headline: text(row.headline, base.headline),
    subhead: text(row.subhead, base.subhead),
    primaryCtaLabel: text(row.primary_cta_label, base.primaryCtaLabel),
    primaryCtaHref: text(row.primary_cta_href, base.primaryCtaHref),
    secondaryCtaLabel: text(row.secondary_cta_label, base.secondaryCtaLabel),
    secondaryCtaHref: text(row.secondary_cta_href, base.secondaryCtaHref),
    audioUrl: text(row.audio_url, base.audioUrl),
    narration: text(row.narration, base.narration),
    beats: asBeats(row.beats, base.beats),
  }
}

const mapProduct = (row: unknown): Product | null => {
  if (!isRecord(row)) return null
  if (typeof row.name !== "string") return null
  return {
    sort: typeof row.sort === "number" ? row.sort : 0,
    name: row.name,
    summary: text(row.summary, ""),
    outcome: text(row.outcome, ""),
    stack: text(row.stack, ""),
    status: text(row.status, ""),
    theme: isTheme(row.theme) ? row.theme : "light",
    imageUrl: typeof row.image_url === "string" && row.image_url.trim() ? row.image_url : null,
    imageAlt: text(row.image_alt, row.name),
    metricLabel: text(row.metric_label, ""),
    metricValue: text(row.metric_value, ""),
  }
}

const mapService = (row: unknown): Service | null => {
  if (!isRecord(row) || typeof row.title !== "string") return null
  const details = Array.isArray(row.details) ? row.details.filter((item): item is string => typeof item === "string") : []
  return {
    sort: typeof row.sort === "number" ? row.sort : 0,
    title: row.title,
    outcome: text(row.outcome, ""),
    details,
  }
}

const mapStep = (row: unknown): Step | null => {
  if (!isRecord(row) || typeof row.title !== "string") return null
  return {
    sort: typeof row.sort === "number" ? row.sort : 0,
    title: row.title,
    body: text(row.body, ""),
  }
}

const mapProof = (row: unknown): ProofItem | null => {
  if (!isRecord(row) || !isKind(row.kind)) return null
  return {
    sort: typeof row.sort === "number" ? row.sort : 0,
    kind: row.kind,
    label: text(row.label, ""),
    value: typeof row.value === "string" ? row.value : "",
    quote: typeof row.quote === "string" ? row.quote : "",
    person: typeof row.person === "string" ? row.person : "",
    role: typeof row.role === "string" ? row.role : "",
    isPlaceholder: row.is_placeholder !== false,
  }
}

const mapFaq = (row: unknown): Faq | null => {
  if (!isRecord(row) || typeof row.question !== "string") return null
  return {
    sort: typeof row.sort === "number" ? row.sort : 0,
    question: row.question,
    answer: text(row.answer, ""),
  }
}

const mapEngagement = (row: unknown): Engagement | null => {
  if (!isRecord(row) || typeof row.title !== "string") return null
  return {
    sort: typeof row.sort === "number" ? row.sort : 0,
    title: row.title,
    body: text(row.body, ""),
  }
}

const mapSections = (rows: unknown, fallback: Record<string, SectionCopy>) => {
  if (!Array.isArray(rows)) return fallback
  const next = { ...fallback }
  rows.forEach((row) => {
    if (!isRecord(row) || typeof row.key !== "string") return
    next[row.key] = {
      heading: text(row.heading, fallback[row.key]?.heading ?? ""),
      body: typeof row.body === "string" ? row.body : (fallback[row.key]?.body ?? ""),
    }
  })
  return next
}

const bySort = <T extends { sort: number }>(items: T[]) => [...items].sort((a, b) => a.sort - b.sort)

type QueryResult<T> = { data: T | null; error: { message: string } | null }

const read = async <T>(query: PromiseLike<QueryResult<T>>, fallback: T): Promise<T> => {
  try {
    const { data, error } = await query
    if (error || data === null) return fallback
    return data
  } catch {
    return fallback
  }
}

export const getContent = cache(async (): Promise<SiteContent> => {
  const supabase = getSupabase()
  if (!supabase) return fallbackContent

  const [settingsRow, heroRow, productRows, serviceRows, stepRows, proofRows, faqRows, engagementRows, sectionRows] =
    await Promise.all([
      read(supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(), null),
      read(supabase.from("hero").select("*").eq("id", 1).maybeSingle(), null),
      read(supabase.from("products").select("*").eq("published", true).order("sort"), [] as unknown[]),
      read(supabase.from("services").select("*").eq("published", true).order("sort"), [] as unknown[]),
      read(supabase.from("steps").select("*").eq("published", true).order("sort"), [] as unknown[]),
      read(supabase.from("proof_items").select("*").eq("published", true).order("sort"), [] as unknown[]),
      read(supabase.from("faqs").select("*").eq("published", true).order("sort"), [] as unknown[]),
      read(supabase.from("engagements").select("*").eq("published", true).order("sort"), [] as unknown[]),
      read(supabase.from("section_copy").select("*"), [] as unknown[]),
    ])

  const products = bySort((Array.isArray(productRows) ? productRows : []).map(mapProduct).filter((item): item is Product => item !== null))
  const services = bySort((Array.isArray(serviceRows) ? serviceRows : []).map(mapService).filter((item): item is Service => item !== null))
  const steps = bySort((Array.isArray(stepRows) ? stepRows : []).map(mapStep).filter((item): item is Step => item !== null))
  const proof = bySort((Array.isArray(proofRows) ? proofRows : []).map(mapProof).filter((item): item is ProofItem => item !== null))
  const faqs = bySort((Array.isArray(faqRows) ? faqRows : []).map(mapFaq).filter((item): item is Faq => item !== null))
  const engagements = bySort(
    (Array.isArray(engagementRows) ? engagementRows : []).map(mapEngagement).filter((item): item is Engagement => item !== null),
  )

  return {
    settings: mapSettings(settingsRow) ?? fallbackContent.settings,
    hero: mapHero(heroRow) ?? fallbackContent.hero,
    products: products.length > 0 ? products : fallbackContent.products,
    services: services.length > 0 ? services : fallbackContent.services,
    steps: steps.length > 0 ? steps : fallbackContent.steps,
    proof: proof.length > 0 ? proof : fallbackContent.proof,
    faqs: faqs.length > 0 ? faqs : fallbackContent.faqs,
    engagements: engagements.length > 0 ? engagements : fallbackContent.engagements,
    sections: mapSections(sectionRows, fallbackContent.sections),
  }
})
