"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";

interface IGoBack {
  fallbackUrl: string;
}

const GoBack = ({ fallbackUrl }: IGoBack) => {
  const [hasHistory, setHasHistory] = useState(false);
  const { back, push } = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasHistory(window.history.length > 1);
    }
  }, []);

  return (
    <div className="flex justify-end px-6 pb-2 w-dvw">
      <button
        onClick={hasHistory ? () => back() : () => push(fallbackUrl)}
        className="flex items-center space-x-2 underline whitespace-nowrap cursor-pointer underline-offset-4 text-dark-100 animate-text-focus hover:decoration-dashed"
      >
        <FaArrowCircleLeft />
        <span>Go back</span>
      </button>
    </div>
  );
};

export default GoBack;
