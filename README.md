# Buildvorn

Company site for [Buildvorn](https://buildvorn.com). The studio ships its own software and takes client work: websites, mobile apps, and automation.

This site was written for Buildvorn. It is not a theme, and it does not reuse another studio’s layout or copy.

The page is one homepage. Text, products, services, proof, questions, and the hero narration path are stored in Supabase, with a coded fallback if the database is unreachable.

## Brand system

- **Wordmark.** `Buildvorn` in the system sans, next to a two-corner registration mark (`components/mark.tsx`, `app/icon.svg`).
- **Index rule.** Sections are numbered `00`–`06`, then a short rule and a label (`components/section-index.tsx`).
- **Type.** System UI first (`system-ui`, `-apple-system`), then Inter. No display serif.
- **Color.** Near-white `#f5f5f7`, near-black `#1d1d1f`, one blue `#0066cc` for actions and links. Product tiles alternate light and dark, full bleed.
- **Motion.** A three-beat story in the hero, timed to `public/audio/buildvorn-vo.mp3` (about 11.9 seconds). It loops silently. Sound starts only from the Unmute control.

## Voiceover

File: `public/audio/buildvorn-vo.mp3`

`npm run dev` and `npm run build` run `scripts/decode-audio.mjs` first. If the mp3 is not already in `public/audio`, the script downloads the studio copy from the public Supabase Storage object `audio/buildvorn-vo.mp3` (project `hxxyhcfnsvyynpktxpku`). Writes to that bucket are locked. The object is the ElevenLabs file, 208,595 bytes, about 11.9 seconds.

Spoken line:

> Buildvorn ships software products of its own. We also design and build for clients — websites, mobile apps, and automation. Clear craft. Real shipping. Built to last.

The control sits on the hero story, bottom right. Default is muted. Unmute is a button, so the browser never starts audio on its own. `prefers-reduced-motion` holds the story on the first frame and does not unmute by itself.

To point the hero at a different file, update `hero.audio_url` in Supabase. A root-relative path such as `/audio/buildvorn-vo.mp3` or a full `https://` URL both work. If the database is down, the site uses the file above.

## Edit content

Supabase project **buildvorn**, ref `hxxyhcfnsvyynpktxpku`, region `ap-northeast-2`.

Dashboard: SQL editor, as the database owner. The anon key can only read published rows. It cannot insert, update, or delete.

| Table | What it edits |
| --- | --- |
| `site_settings` | Name, domain, email, legal line, meta title, meta description |
| `hero` | Headline, subhead, buttons, narration, `audio_url`, `beats` (JSON) |
| `products` | Own-product tiles. `theme` is `light` or `dark`. `image_url` optional. `published` hides a row. |
| `services` | Websites, mobile apps, automation. `details` is a text array. |
| `steps` | How we work |
| `proof_items` | `logo`, `metric`, or `quote`. Set `is_placeholder` to false when a line is real. |
| `faqs` | Questions |
| `engagements` | Fixed scope, care, product partnership |
| `section_copy` | Section headings and supporting lines, keyed by `products`, `services`, `proof`, `method`, `engagement`, `faq`, `cta`, `contact`, `contact_submit` |

Example:

```sql
update public.site_settings
set legal_line = 'Buildvorn Co., Ltd. — Seoul — registration number'
where id = 1;

update public.products
set name = 'A real product', status = 'In use', image_url = 'https://example.com/screen.png'
where sort = 1;
```

Changes show on the site within about a minute (`revalidate = 60`). No code deploy is required for copy or image URLs.

`lib/fallback.ts` is what renders when Supabase is unset, empty, or failing. Keep it close to the seed if you want the offline page to match. `supabase/seed.sql` is the original seed.

## Environment

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, `robots.txt`, and the sitemap |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://hxxyhcfnsvyynpktxpku.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon or publishable key from Project Settings → API |
| `RESEND_API_KEY` | Unused. The form opens a `mailto:` draft and stores nothing |
| `CONTACT_TO` | Unused while the form stays `mailto:` |

Do not put the service role key in `NEXT_PUBLIC_` variables or in the repository.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
```

## Deploy

The project is a Next.js 15 app. On Vercel, framework preset **Next.js**, root directory at the repository root. Set the three `NEXT_PUBLIC_` variables for Production.

`buildvorn.com` is the intended domain. Attach it on the Vercel project when you are ready to point DNS. This repository does not register or buy the domain.

## Contact

The inquiry form validates in the browser and opens the visitor’s mail app to `hello@buildvorn.com` (or whatever `site_settings.email` says). No mail API is required for the first deploy.
