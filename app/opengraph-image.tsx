import { ImageResponse } from "next/og"
import { getContent } from "@/lib/content"

export const alt = "Buildborn"
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
          background: "#f4f2ec",
          color: "#121211",
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
        <div style={{ display: "flex", fontSize: 22, color: "#4a463f" }}>{content.settings.domain}</div>
      </div>
    ),
    { ...size },
  )
}

export default OpenGraphImage
