import { Portal } from "@mui/material";
import { ReactElement } from "react";

interface DarkLayoutProps {
  children: ReactElement;
  id?: string;
}

const DarkLayout = ({ children, id }: DarkLayoutProps) => {
  return (
    <Portal>
      <div
        id={id}
        className="flex overflow-y-auto fixed top-0 left-0 flex-col justify-center items-center w-screen h-screen bg-dark-900/60 z-[888] backdrop-blur-md backdrop-grayscale"
      >
        {children}
      </div>
    </Portal>
  );
};

export default DarkLayout;
