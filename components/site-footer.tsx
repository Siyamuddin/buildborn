import { Mark } from "@/components/mark"
import { navLinks } from "@/lib/fallback"
import type { Settings } from "@/lib/types"

type SiteFooterProps = {
  settings: Settings
}

export const SiteFooter = ({ settings }: SiteFooterProps) => (
  <footer className="bg-ink text-white">
    <div className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 py-12 md:grid-cols-12 md:px-8">
      <div className="md:col-span-4">
        <div className="flex items-center gap-2.5">
          <Mark />
          <p className="text-[15px] font-medium tracking-[-0.02em]">{settings.companyName}</p>
        </div>
        <p className="mt-4 max-w-xs text-xs leading-relaxed text-mist">{settings.legalLine}</p>
      </div>
      <nav aria-label="Footer" className="md:col-span-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-mist">Navigate</p>
        <ul className="mt-3 space-y-1.5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-white">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#method" className="text-sm text-white">
              How we work
            </a>
          </li>
          <li>
            <a href="#questions" className="text-sm text-white">
              Questions
            </a>
          </li>
        </ul>
      </nav>
      <div className="md:col-span-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-mist">Work</p>
        <ul className="mt-3 space-y-1.5 text-sm text-white">
          <li>Websites</li>
          <li>Mobile apps</li>
          <li>Automation</li>
          <li>Own products</li>
        </ul>
      </div>
      <div className="md:col-span-2">
        <p className="text-[11px] uppercase tracking-[0.16em] text-mist">Contact</p>
        <a href={`mailto:${settings.email}`} className="mt-3 block text-sm text-white">
          {settings.email}
        </a>
        <p className="mt-1 text-sm text-mist">{settings.domain}</p>
      </div>
      <p className="border-t border-line-dark pt-4 text-xs text-mist md:col-span-12">
        © {new Date().getFullYear()} {settings.companyName}
      </p>
    </div>
  </footer>
)
