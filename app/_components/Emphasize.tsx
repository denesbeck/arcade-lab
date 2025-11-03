interface IEmphasize {
  children: React.ReactNode;
}

const Emphasize = ({ children }: IEmphasize) => {
  return <strong className="font-bold text-sky-300">{children}</strong>;
};

export default Emphasize;
