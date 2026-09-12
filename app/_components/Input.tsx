import { RefObject } from 'react'

interface IInput {
  label: string
  placeholder: string
  inputRef: RefObject<HTMLInputElement | null>
  type?: string
  autoComplete?: string
}

const Input = ({
  label,
  placeholder,
  inputRef,
  type = 'text',
  autoComplete,
}: IInput) => {
  const id = label.toLowerCase()

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label
        htmlFor={id}
        className="text-dark-500 text-[0.625rem] tracking-[0.3em] uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="bg-dark-1000 text-dark-100 placeholder:text-dark-400 ring-dark-500 focus-visible:ring-primary w-full px-4 py-3 text-sm ring-1 transition-colors duration-200 outline-hidden"
        ref={inputRef}
      />
    </div>
  )
}

export default Input
