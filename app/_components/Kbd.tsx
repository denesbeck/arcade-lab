interface IKbd {
  children: React.ReactNode
}

const Kbd = ({ children }: IKbd) => {
  return (
    <span className="py-1 px-2 mr-1.5 ml-3 text-xs font-bold rounded ring-1 text-nowrap animate-text-focus ring-dark-200 text-dark-200">
      {children}
    </span>
  )
}

export default Kbd
