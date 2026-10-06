type SurfaceProps = {
  label: string
  variant?: "list" | "panel" | "split"
  dark?: boolean
}

export const Surface = ({ label, variant = "panel", dark = false }: SurfaceProps) => (
  <div className={`p-2 sm:p-4 ${dark ? "text-mist" : "text-muted"}`}>
    <div className="flex items-center justify-between px-2 text-[10px] uppercase tracking-[0.18em]">
      <span>Interface</span>
      <span>{label}</span>
    </div>
    <div className={`mt-3 overflow-hidden rounded-2xl border ${dark ? "border-line-dark bg-[#161617]" : "border-line bg-paper"}`}>
      {variant === "list" ? <ListPlate dark={dark} /> : null}
      {variant === "panel" ? <PanelPlate dark={dark} /> : null}
      {variant === "split" ? <SplitPlate dark={dark} /> : null}
    </div>
  </div>
)

const bar = (dark: boolean) => (dark ? "bg-line-dark" : "bg-line")
const edge = (dark: boolean) => (dark ? "border-line-dark" : "border-line")

const ListPlate = ({ dark }: { dark: boolean }) => (
  <div className="space-y-2 p-5" aria-hidden="true">
    <div className={`h-2 w-16 ${bar(dark)}`} />
    <div className={`h-10 rounded-lg border ${edge(dark)}`} />
    <div className={`h-10 rounded-lg border ${edge(dark)}`} />
    <div className={`h-10 rounded-lg border ${edge(dark)}`} />
  </div>
)

const PanelPlate = ({ dark }: { dark: boolean }) => (
  <div className="p-6" aria-hidden="true">
    <div className={`h-2 w-24 ${bar(dark)}`} />
    <div className={`mt-4 h-2 w-full ${bar(dark)}`} />
    <div className={`mt-2 h-2 w-4/5 ${bar(dark)}`} />
    <div className={`mt-8 h-24 rounded-xl border ${edge(dark)}`} />
  </div>
)

const SplitPlate = ({ dark }: { dark: boolean }) => (
  <div className="grid min-h-44 grid-cols-[88px_1fr]" aria-hidden="true">
    <div className={`border-r p-3 ${edge(dark)}`}>
      <div className={`h-2 w-full ${bar(dark)}`} />
      <div className={`mt-3 h-2 w-full ${bar(dark)}`} />
      <div className={`mt-3 h-2 w-2/3 ${bar(dark)}`} />
    </div>
    <div className="p-5">
      <div className={`h-2 w-20 ${bar(dark)}`} />
      <div className={`mt-4 h-20 rounded-xl border ${edge(dark)}`} />
    </div>
  </div>
)
