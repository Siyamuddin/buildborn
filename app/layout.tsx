import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import { getContent } from "@/lib/content"
import { siteUrl } from "@/lib/fallback"
import "./globals.css"

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const revalidate = 60

export const generateMetadata = async (): Promise<Metadata> => {
  const content = await getContent()
  const { settings } = content

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.metaTitle,
      template: `%s — ${settings.companyName}`,
    },
    description: settings.metaDescription,
    applicationName: settings.companyName,
    alternates: { canonical: "/" },
    openGraph: {
      title: settings.metaTitle,
      description: settings.metaDescription,
      url: "/",
      siteName: settings.companyName,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.metaTitle,
      description: settings.metaDescription,
    },
    robots: { index: true, follow: true },
  }
}

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const content = await getContent()
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: content.settings.companyName,
    url: siteUrl,
    email: content.settings.email,
    description: content.settings.metaDescription,
  }

  return (
    <html lang="en" className={sans.variable}>
      <body className="bg-paper font-sans text-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}

export default HomeLayout
