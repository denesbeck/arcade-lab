import { ReactNode } from "react";

interface Heading3Props {
  children: string | ReactNode;
}

const Heading3 = ({ children }: Heading3Props) => {
  return <h3 className="w-full text-xl font-semibold">{children}</h3>;
};

export default Heading3;
