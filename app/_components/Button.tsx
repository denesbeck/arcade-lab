import { Spinner } from '.'

interface ButtonProps {
  disabled?: boolean
  label: string
  action: () => void
  loading?: boolean
}

const Button = ({
  disabled = false,
  label,
  action,
  loading = false,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={action}
      className="bg-primary text-dark-900 hover:not-disabled:bg-primary/80 disabled:bg-dark-600 disabled:text-dark-400 flex w-full cursor-pointer items-center justify-center gap-3 py-3 text-xs tracking-[0.25em] uppercase transition-colors duration-200 disabled:cursor-not-allowed"
    >
      {loading && <Spinner className="h-4 w-4" />}
      <span>{label}</span>
      {/* Blinks only while the human check is still running, so the disabled
          state reads as waiting rather than broken. */}
      {disabled && !loading && (
        <span aria-hidden className="animate-caret">
          ▮
        </span>
      )}
    </button>
  )
}

export default Button
