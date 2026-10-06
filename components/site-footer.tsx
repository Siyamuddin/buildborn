import { Mark } from "@/components/mark"
import { navLinks } from "@/lib/fallback"
import type { Settings } from "@/lib/types"

type SiteFooterProps = {
  settings: Settings
}

export const SiteFooter = ({ settings }: SiteFooterProps) => (
  <footer className="bg-ink text-paper">
    <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 py-14 md:grid-cols-12 md:px-8 md:py-16">
      <div className="md:col-span-5">
        <div className="flex items-center gap-3">
          <Mark />
          <p className="text-[13px] tracking-[0.16em] uppercase">{settings.companyName}</p>
        </div>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">{settings.legalLine}</p>
      </div>
      <nav aria-label="Footer" className="md:col-span-3">
        <p className="text-[11px] uppercase tracking-[0.18em] text-mist">Navigate</p>
        <ul className="mt-4 space-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-paper">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#method" className="text-sm text-paper">
              How we work
            </a>
          </li>
          <li>
            <a href="#questions" className="text-sm text-paper">
              Questions
            </a>
          </li>
        </ul>
      </nav>
      <div className="md:col-span-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-mist">Contact</p>
        <a href={`mailto:${settings.email}`} className="mt-4 block text-sm text-paper underline decoration-line-dark underline-offset-4">
          {settings.email}
        </a>
        <p className="mt-2 text-sm text-mist">{settings.domain}</p>
      </div>
      <p className="border-t border-line-dark pt-6 text-xs tracking-wide text-mist md:col-span-12">
        © {new Date().getFullYear()} {settings.companyName}
      </p>
    </div>
  </footer>
)
