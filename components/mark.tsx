type MarkProps = {
  className?: string
}

export const Mark = ({ className = "h-4 w-4" }: MarkProps) => (
  <svg
    viewBox="0 0 16 16"
    aria-hidden="true"
    className={className}
    fill="none"
  >
    <path d="M1.5 6.5V1.5H6.5" stroke="currentColor" strokeWidth="1" />
    <path d="M14.5 9.5V14.5H9.5" stroke="currentColor" strokeWidth="1" />
  </svg>
)
