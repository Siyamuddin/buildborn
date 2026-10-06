import type { ReactNode } from "react"

type FrameProps = {
  children: ReactNode
  className?: string
}

export const Frame = ({ children, className = "" }: FrameProps) => (
  <div className={`mx-auto w-full max-w-[1120px] px-5 md:px-8 ${className}`}>{children}</div>
)
