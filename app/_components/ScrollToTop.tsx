"use client";
import { useEffect, useState, useCallback } from "react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      {visible && (
        <button
          className="fixed right-6 bottom-6 z-20 p-2 rounded-md border transition-colors duration-200 ease-in-out cursor-pointer text-dark-50 border-dark-500 bg-secondary animate-text-focus hover:bg-dark-900"
          onClick={scrollToTop}
        >
          Scroll to top
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
