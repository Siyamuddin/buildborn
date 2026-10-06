import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { gunzipSync } from "node:zlib"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const audioDir = join(root, "public", "audio")
const mp3Path = join(audioDir, "buildborn-vo.mp3")
const gzDir = join(audioDir, "gz")

if (existsSync(mp3Path)) {
  process.exit(0)
}

if (!existsSync(gzDir)) {
  console.error("Missing public/audio/buildborn-vo.mp3 and public/audio/gz")
  process.exit(1)
}

const names = readdirSync(gzDir)
  .filter((name) => name.endsWith(".b64"))
  .sort()

if (names.length === 0) {
  console.error("No voiceover parts in public/audio/gz")
  process.exit(1)
}

const encoded = names.map((name) => readFileSync(join(gzDir, name), "utf8")).join("")
const mp3 = gunzipSync(Buffer.from(encoded.replace(/\s/g, ""), "base64"))

mkdirSync(audioDir, { recursive: true })
writeFileSync(mp3Path, mp3)
