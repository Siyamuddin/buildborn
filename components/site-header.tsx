"use client"

import { useEffect, useState } from "react"
import { Mark } from "@/components/mark"
import { navLinks } from "@/lib/fallback"

type SiteHeaderProps = {
  name: string
}

export const SiteHeader = ({ name }: SiteHeaderProps) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open])

  const handleToggleMenu = () => setOpen((current) => !current)
  const handleCloseMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-sheet/80 backdrop-blur-xl">
      <div className="mx-auto flex h-12 w-full max-w-[1120px] items-center justify-between px-5 md:px-8">
        <a href="#content" className="flex items-center gap-2.5 text-ink" aria-label={`${name} home`}>
          <Mark />
          <span className="text-[15px] font-medium tracking-[-0.02em]">{name}</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-[13px] text-ink">
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex h-11 items-center px-2 text-sm text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={handleToggleMenu}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line px-5 py-2 md:hidden">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="flex h-12 items-center text-base text-ink" onClick={handleCloseMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
