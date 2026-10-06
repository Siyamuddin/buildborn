import type { SiteContent } from "@/lib/types"

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://buildborn.dev"

export const navLinks = [
  { href: "#products", label: "Products" },
  { href: "#services", label: "Services" },
  { href: "#inquiry", label: "Contact" },
] as const

export const inquiryKinds = ["Website", "Mobile app", "Automation", "Not sure yet"] as const

export const fallbackContent: SiteContent = {
  settings: {
    companyName: "Buildborn",
    domain: "buildborn.dev",
    email: "hello@buildborn.dev",
    legalLine:
      "Buildborn. Add the registered legal name, jurisdiction, and registration number here.",
    metaTitle: "Buildborn — software we ship, and keep",
    metaDescription:
      "Buildborn ships its own software products and builds websites, mobile apps, and automation for clients.",
  },
  hero: {
    eyebrow: "Studio",
    headline: "Software we ship,\nand keep.",
    subhead:
      "Buildborn builds products of its own, and takes on websites, mobile apps, and automation for people who want something made.",
    primaryCtaLabel: "Contact",
    primaryCtaHref: "#inquiry",
    secondaryCtaLabel: "See products",
    secondaryCtaHref: "#products",
    audioUrl: "/audio/buildborn-vo.mp3",
    narration:
      "Buildborn ships software products of its own. We also design and build for clients — websites, mobile apps, and automation. Clear craft. Real shipping. Built to last.",
    beats: [
      {
        kicker: "01",
        title: "Own products",
        line: "Buildborn ships software products of its own.",
      },
      {
        kicker: "02",
        title: "Client work",
        line: "Websites, mobile apps, and automation.",
      },
      {
        kicker: "03",
        title: "The standard",
        line: "Clear craft. Real shipping. Built to last.",
      },
    ],
  },
  products: [
    {
      sort: 1,
      name: "First product",
      summary: "A product this studio will operate. The public name is not set yet.",
      outcome: "A system we keep running, with a named owner inside Buildborn.",
      stack: "Stack placeholder",
      status: "Placeholder",
      theme: "dark",
      imageUrl: null,
      imageAlt: "Placeholder surface for the first product",
      metricLabel: "Status",
      metricValue: "Not yet public",
    },
    {
      sort: 2,
      name: "Second product",
      summary: "A second product, still private. The line below is a stand-in for the outcome.",
      outcome: "A narrower job, finished, and left in daily use.",
      stack: "Stack placeholder",
      status: "Placeholder",
      theme: "light",
      imageUrl: null,
      imageAlt: "Placeholder surface for the second product",
      metricLabel: "Status",
      metricValue: "Not yet public",
    },
    {
      sort: 3,
      name: "Third product",
      summary: "Held for a later release. Replace this card when the product has a name.",
      outcome: "Work we can point to, because we still run it.",
      stack: "Stack placeholder",
      status: "Placeholder",
      theme: "dark",
      imageUrl: null,
      imageAlt: "Placeholder surface for the third product",
      metricLabel: "Status",
      metricValue: "Not yet public",
    },
  ],
  services: [
    {
      sort: 1,
      title: "Websites",
      outcome: "A public site a visitor can understand in a minute, and you can edit after we leave.",
      details: ["A written set of pages", "Type, space, and a clear next step", "Handed over with notes"],
    },
    {
      sort: 2,
      title: "Mobile apps",
      outcome: "A first version people can install, scoped so it can actually ship.",
      details: ["iPhone first, Android when the work needs it", "Native-feeling interaction", "A path for the next release"],
    },
    {
      sort: 3,
      title: "Automation",
      outcome: "A workflow your team can trust, with a record of what it did.",
      details: ["A map of the flow before it is built", "A person in the loop where judgment matters", "Logs that can be read"],
    },
  ],
  steps: [
    {
      sort: 1,
      title: "Name the work",
      body: "We write what will be built, what will not, and the date it should be in use.",
    },
    {
      sort: 2,
      title: "Build it in view",
      body: "You see the work as it takes shape. Decisions stay small and are written down.",
    },
    {
      sort: 3,
      title: "Leave it owned",
      body: "The result ships with notes, access, and a named person responsible for it.",
    },
  ],
  proof: [
    { sort: 1, kind: "logo", label: "Logo placeholder", value: "", quote: "", person: "", role: "", isPlaceholder: true },
    { sort: 2, kind: "logo", label: "Logo placeholder", value: "", quote: "", person: "", role: "", isPlaceholder: true },
    { sort: 3, kind: "logo", label: "Logo placeholder", value: "", quote: "", person: "", role: "", isPlaceholder: true },
    { sort: 4, kind: "logo", label: "Logo placeholder", value: "", quote: "", person: "", role: "", isPlaceholder: true },
    { sort: 5, kind: "metric", label: "Products in care", value: "—", quote: "", person: "", role: "", isPlaceholder: true },
    { sort: 6, kind: "metric", label: "Client projects", value: "—", quote: "", person: "", role: "", isPlaceholder: true },
    { sort: 7, kind: "metric", label: "Years of practice", value: "—", quote: "", person: "", role: "", isPlaceholder: true },
    {
      sort: 8,
      kind: "quote",
      label: "Testimonial",
      value: "",
      quote: "Placeholder. A sentence about the outcome of the work, not a rating.",
      person: "Name placeholder",
      role: "Role, company — placeholder",
      isPlaceholder: true,
    },
  ],
  faqs: [
    {
      sort: 1,
      question: "What do you take on?",
      answer:
        "Websites, mobile apps, and automation, plus the products we run ourselves. If the work is unclear, we say so before a scope is written.",
    },
    {
      sort: 2,
      question: "How does a project start?",
      answer:
        "A short note is enough. We reply with what we think the work is. Nothing is built until the scope is written and agreed.",
    },
    {
      sort: 3,
      question: "How long does it take?",
      answer:
        "It follows the scope. A small site and a multi-month product are not the same length. We name a date before the build starts, and we do not invent one here.",
    },
    {
      sort: 4,
      question: "How is an engagement held?",
      answer:
        "Usually a fixed scope. Some work continues as care after launch. Some products we keep operating with you. There is no seat-based plan on this page.",
    },
    {
      sort: 5,
      question: "Who does the work?",
      answer: "The same people who maintain Buildborn’s own products. The work is not passed to an unnamed bench.",
    },
  ],
  engagements: [
    {
      sort: 1,
      title: "Fixed scope",
      body: "One outcome, one boundary, one date. The right shape for a site, a first app version, or a single workflow.",
    },
    {
      sort: 2,
      title: "Care after launch",
      body: "A defined period after release. We watch the system in use and fix what the first weeks reveal.",
    },
    {
      sort: 3,
      title: "Product partnership",
      body: "We keep operating a product with you. The same practice we use for software Buildborn ships itself.",
    },
  ],
  sections: {
    products: {
      heading: "Selected work",
      body: "Products Buildborn intends to run. Each name below is a placeholder until that product is public.",
    },
    services: {
      heading: "Client work",
      body: "Three forms. The scope is written first. The result is something a person can own.",
    },
    proof: {
      heading: "Placeholder proof",
      body: "Logos, figures, and the quotation are stand-ins. Replace them when the work can be named.",
    },
    method: {
      heading: "How we work",
      body: "The same sequence for our products and for client work.",
    },
    engagement: {
      heading: "Ways to work together",
      body: "Not a price list. Three shapes a project can take. A date is promised only after the scope is written.",
    },
    faq: {
      heading: "Questions",
      body: "Scope, time, and how an engagement is held.",
    },
    cta: {
      heading: "A paragraph is enough.",
      body: "Tell us what you want built, and which of the three forms it is.",
    },
    contact: {
      heading: "Write to the studio.",
      body: "The note opens in your email app. Nothing is stored on a server.",
    },
    contact_submit: {
      heading: "Write the email",
      body: "Shown on the submit button.",
    },
  },
}
