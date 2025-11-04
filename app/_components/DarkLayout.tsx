"use client";
import { Portal } from "@mui/material";
import { ReactElement, useEffect } from "react";

interface DarkLayoutProps {
  children: ReactElement;
  id?: string;
}

const DarkLayout = ({ children, id }: DarkLayoutProps) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      // Restore original overflow when modal closes
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <Portal>
      <div
        id={id}
        className="flex overflow-y-auto fixed top-0 left-0 flex-col w-dvw h-dvh bg-dark-900/60 z-[888] backdrop-blur-md backdrop-grayscale"
      >
        {children}
      </div>
    </Portal>
  );
};

export default DarkLayout;
