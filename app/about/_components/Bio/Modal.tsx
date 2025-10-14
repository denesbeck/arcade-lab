import { DarkLayout, MacOSBar } from "@/_components";
import { ReactElement } from "react";
import { useClickOutside } from "@/_hooks";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface ModalProps {
  children: ReactElement;
}

const Modal = ({ children }: ModalProps) => {
  const { push } = useRouter();
  const ref = useClickOutside<HTMLDivElement>(() => push("/about"));
  const searchParams = useSearchParams();
  const isOpen = searchParams.has("modalOpen");

  if (!isOpen) return;
  return (
    <DarkLayout>
      <div
        ref={ref}
        className="flex flex-col pt-2 w-max h-full sm:pb-2 sm:ring-2 ring-primary animate-slide-in-from-bottom bg-dark-900 max-w-[100dvw] sm:h-max sm:max-w-[640px]"
      >
        <MacOSBar close={"/about"} />
        <div className="overflow-y-auto overflow-x-hidden px-5 pt-3 pb-5 h-full max-h-[calc(100dvh-85px)] lg:max-h-[calc(100dvh-170px)]">
          {children}
        </div>
      </div>
    </DarkLayout>
  );
};

export default Modal;
