import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { gunzipSync } from "node:zlib"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const audioDir = join(root, "public", "audio")
const mp3Path = join(audioDir, "buildborn-vo.mp3")
const gzDir = join(audioDir, "gz")
const remoteUrl =
  "https://hxxyhcfnsvyynpktxpku.supabase.co/storage/v1/object/public/audio/buildborn-vo.mp3"
const expectedBytes = 195638

const fromGzipParts = () => {
  if (!existsSync(gzDir)) return null
  const names = readdirSync(gzDir)
    .filter((name) => name.endsWith(".b64"))
    .sort()
  if (names.length < 42) return null
  try {
    const encoded = names.map((name) => readFileSync(join(gzDir, name), "utf8")).join("")
    return gunzipSync(Buffer.from(encoded.replace(/\s/g, ""), "base64"))
  } catch {
    return null
  }
}

if (existsSync(mp3Path) && readFileSync(mp3Path).length === expectedBytes) {
  process.exit(0)
}

let mp3 = fromGzipParts()

if (!mp3 || mp3.length !== expectedBytes) {
  const response = await fetch(remoteUrl)
  if (!response.ok) {
    console.error(`Could not download voiceover (${response.status})`)
    process.exit(1)
  }
  mp3 = Buffer.from(await response.arrayBuffer())
}

if (mp3.length !== expectedBytes) {
  console.error(`Voiceover size mismatch: ${mp3.length}`)
  process.exit(1)
}

mkdirSync(audioDir, { recursive: true })
writeFileSync(mp3Path, mp3)
