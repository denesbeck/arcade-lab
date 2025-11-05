"use client";
import { usePathname } from "next/navigation";
import { ReactElement, useState, useEffect, useCallback } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

interface MenuProps {
  children: ReactElement;
}

const Menu = ({ children }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <>
      <button
        onClick={toggleMenu}
        className={`z-30 cursor-pointer p-1 ${!isOpen && "hover:bg-secondary ring-2"} ring-secondary transition-colors duration-200 ease-in-out`}
      >
        <RxHamburgerMenu
          className={`text-3xl transition-all duration-200 ease-in-out ${isOpen && "rotate-90"}`}
        />
      </button>
      {isOpen && (
        <div className="flex fixed top-0 left-0 z-20 flex-col justify-center items-center p-8 space-y-4 w-screen h-screen text-text-dark animate-text-focus bg-root">
          {children}
        </div>
      )}
    </>
  );
};

export default Menu;
