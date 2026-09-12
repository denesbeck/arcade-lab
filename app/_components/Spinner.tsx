import { ImSpinner8 } from 'react-icons/im'

interface SpinnerProps {
  className?: string
}

const Spinner = ({ className = 'w-6 h-6' }: SpinnerProps) => {
  return <ImSpinner8 className={`${className} animate-spin`} />
}

export default Spinner
