"use client";
import { useRouter } from "next/navigation";

interface MacOSBarProps {
  close?: string | (() => void);
  size?: "sm" | "md";
}

const MacOSBar = ({ size = "md", close }: MacOSBarProps) => {
  const router = useRouter();

  const calcSize = () => {
    switch (size) {
      case "sm":
        return { dots: "w-3 h-3", padding: "pb-4 px-1" };
      case "md":
        return { dots: "w-4 h-4", padding: "py-4 px-6" };
      default:
        return { dots: "w-4 h-4", padding: "py-4 px-6" };
    }
  };

  const { dots, padding } = calcSize();
  const isCloseFunction = typeof close === "function";

  return (
    <div
      className={`flex justify-start items-center ${padding} w-4xl max-w-screen`}
    >
      <button
        disabled={!close}
        onClick={isCloseFunction ? close : () => router.push(close!)}
        className={`flex space-x-2 ${close && "cursor-pointer"}`}
      >
        <div className={`${dots} rounded-full bg-macos-red`} />
        <div className={`${dots} rounded-full bg-macos-yellow`} />
        <div className={`${dots} rounded-full bg-macos-green`} />
      </button>
    </div>
  );
};

export default MacOSBar;
