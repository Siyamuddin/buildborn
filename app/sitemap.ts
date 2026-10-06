import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/fallback"

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  },
]

export default sitemap
