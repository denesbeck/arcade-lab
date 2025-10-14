import { DarkLayout, MacOSBar } from "@/_components";
import { ReactElement } from "react";
import { useClickOutside } from "@/_hooks";

interface ModalProps {
  children: ReactElement;
  close: () => void;
}

const Modal = ({ children, close }: ModalProps) => {
  const ref = useClickOutside<HTMLDivElement>(close);
  return (
    <DarkLayout>
      <div
        ref={ref}
        className="flex flex-col px-4 w-max h-full sm:pb-2 sm:ring-2 ring-primary animate-slide-in-from-bottom bg-dark-900 max-w-[100dvw] font-[DepartureMono] sm:h-max sm:max-w-[640px]"
      >
        <MacOSBar close={"/about"} />
        <div className="overflow-y-auto overflow-x-hidden pt-2 pr-4 pb-4 pl-2 h-full max-h-[calc(100dvh-85px)] lg:max-h-[calc(100dvh-170px)]">
          {children}
        </div>
      </div>
    </DarkLayout>
  );
};

export default Modal;
