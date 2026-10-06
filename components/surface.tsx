type SurfaceProps = {
  label: string
  variant?: "list" | "panel" | "split"
}

export const Surface = ({ label, variant = "panel" }: SurfaceProps) => (
  <div className="border border-line bg-sheet p-4">
    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted">
      <span>Surface</span>
      <span>{label}</span>
    </div>
    {variant === "list" ? <ListPlate /> : null}
    {variant === "panel" ? <PanelPlate /> : null}
    {variant === "split" ? <SplitPlate /> : null}
  </div>
)

const ListPlate = () => (
  <div className="mt-4 space-y-2 border border-line bg-paper p-3" aria-hidden="true">
    <div className="h-2 w-16 bg-line" />
    <div className="h-8 border border-line" />
    <div className="h-8 border border-line" />
    <div className="h-8 border border-line" />
  </div>
)

const PanelPlate = () => (
  <div className="mt-4 border border-line bg-paper p-4" aria-hidden="true">
    <div className="h-2 w-24 bg-line" />
    <div className="mt-4 h-2 w-full bg-line" />
    <div className="mt-2 h-2 w-4/5 bg-line" />
    <div className="mt-6 h-16 border border-line" />
  </div>
)

const SplitPlate = () => (
  <div className="mt-4 grid grid-cols-[72px_1fr] border border-line bg-paper" aria-hidden="true">
    <div className="border-r border-line p-2">
      <div className="h-2 w-full bg-line" />
      <div className="mt-2 h-2 w-full bg-line" />
      <div className="mt-2 h-2 w-2/3 bg-line" />
    </div>
    <div className="p-3">
      <div className="h-2 w-20 bg-line" />
      <div className="mt-3 h-14 border border-line" />
    </div>
  </div>
)
