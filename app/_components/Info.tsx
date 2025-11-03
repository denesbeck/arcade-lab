interface IInfo {
  children: React.ReactNode;
}

const Info = ({ children }: IInfo) => {
  return <div className="text-sm text-dark-200">{children}</div>;
};

export default Info;
