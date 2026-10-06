export type Theme = "light" | "dark"

export type Beat = {
  kicker: string
  title: string
  line: string
}

export type Settings = {
  companyName: string
  domain: string
  email: string
  legalLine: string
  metaTitle: string
  metaDescription: string
}

export type HeroContent = {
  eyebrow: string
  headline: string
  subhead: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
  audioUrl: string
  narration: string
  beats: Beat[]
}

export type Product = {
  sort: number
  name: string
  summary: string
  outcome: string
  stack: string
  status: string
  theme: Theme
  imageUrl: string | null
  imageAlt: string
  metricLabel: string
  metricValue: string
}

export type Service = {
  sort: number
  title: string
  outcome: string
  details: string[]
}

export type Step = {
  sort: number
  title: string
  body: string
}

export type ProofKind = "logo" | "metric" | "quote"

export type ProofItem = {
  sort: number
  kind: ProofKind
  label: string
  value: string
  quote: string
  person: string
  role: string
  isPlaceholder: boolean
}

export type Faq = {
  sort: number
  question: string
  answer: string
}

export type Engagement = {
  sort: number
  title: string
  body: string
}

export type SectionCopy = {
  heading: string
  body: string
}

export type SiteContent = {
  settings: Settings
  hero: HeroContent
  products: Product[]
  services: Service[]
  steps: Step[]
  proof: ProofItem[]
  faqs: Faq[]
  engagements: Engagement[]
  sections: Record<string, SectionCopy>
}
