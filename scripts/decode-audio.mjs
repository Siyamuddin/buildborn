import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const audioDir = join(root, "public", "audio")
const mp3Path = join(audioDir, "buildborn-vo.mp3")
const b64Path = join(audioDir, "buildborn-vo.mp3.b64")
const partsDir = join(audioDir, "parts")

if (existsSync(mp3Path)) {
  process.exit(0)
}

let encoded = ""

if (existsSync(b64Path)) {
  encoded = readFileSync(b64Path, "utf8")
} else if (existsSync(partsDir)) {
  const names = readdirSync(partsDir)
    .filter((name) => name.endsWith(".b64"))
    .sort()
  encoded = names.map((name) => readFileSync(join(partsDir, name), "utf8")).join("")
}

if (!encoded.trim()) {
  console.error("Missing public/audio/buildborn-vo.mp3 and its base64 source")
  process.exit(1)
}

mkdirSync(audioDir, { recursive: true })
writeFileSync(mp3Path, Buffer.from(encoded.replace(/\s/g, ""), "base64"))
