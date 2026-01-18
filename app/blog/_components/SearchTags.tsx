"use client";
import { IoSearch } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { Kbd } from "@/_components";

interface ISearchTags {
  search: (value: string) => void;
}

const SearchTags = ({ search }: ISearchTags) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isMac] = useState(
    () =>
      typeof navigator !== "undefined" &&
      navigator.userAgent.toLowerCase().includes("mac"),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setValue("");
    search("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key === "k" && (isMac ? event.metaKey : event.ctrlKey)) {
        if (!isOpen) {
          event.preventDefault();
          setIsOpen(true);
        } else {
          handleClear();
        }
      }
    };

    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMac]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      inputRef.current?.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="p-5" ref={containerRef}>
      <button
        className={`flex justify-between items-center ${isOpen && "ring-search"} p-2 min-w-[200px] rounded-full ring-2 cursor-pointer ring-dark-100 hover:ring-search`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoSearch className="text-2xl text-dark-100" />
        <input
          ref={inputRef}
          type="search"
          value={value}
          placeholder="Search..."
          className={`${isOpen ? "w-48 ml-3" : "w-20"} ml-4 placeholder:text-sm placeholder:text-dark-200 outline-none transition-all duration-200 ease-in-out [&::-webkit-search-cancel-button]:appearance-none`}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          onChange={(e) => {
            setValue(e.target.value);
            search(e.target.value);
          }}
        />
        <Kbd>{isOpen ? "Esc" : `${isMac ? "⌘ " : "Ctrl+"}K`}</Kbd>
      </button>
    </div>
  );
};

export default SearchTags;
