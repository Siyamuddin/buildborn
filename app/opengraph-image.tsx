import { ImageResponse } from "next/og"
import { getContent } from "@/lib/content"

export const alt = "Buildvorn"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const OpenGraphImage = async () => {
  const content = await getContent()
  const lines = content.hero.headline.split("\n")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f5f7",
          color: "#1d1d1f",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, textTransform: "uppercase" }}>
          {content.settings.companyName}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 68, lineHeight: 1.05, letterSpacing: -2 }}>
          {lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#0066cc" }}>{content.settings.domain}</div>
      </div>
    ),
    { ...size },
  )
}

export default OpenGraphImage
