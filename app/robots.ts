import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/fallback"

const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: "*", allow: "/" },
  sitemap: `${siteUrl}/sitemap.xml`,
  host: siteUrl,
})

export default robots
