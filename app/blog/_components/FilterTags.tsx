"use client";
import { Badge } from "@mui/material";
import { useState, useMemo } from "react";
import { FaHashtag } from "react-icons/fa";
import blogEntries from "../_config/data";
import { DarkLayout, MacOSBar } from "@/_components";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import FilterActions from "./FilterActions";

const FilterTags = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const tags = searchParams.getAll("tag");
  const [selection, setSelection] = useState<string[]>(tags);
  const hasChanges = useMemo(() => {
    const selectionSet = new Set(selection);
    const tagsSet = new Set(tags);
    if (selectionSet.size !== tagsSet.size) return true;
    return [...selectionSet].some((tag) => !tagsSet.has(tag));
  }, [selection, tags]);
  const allTags = useMemo(
    () =>
      Array.from([
        ...new Set(blogEntries.map((entry) => entry.tags).flat()),
      ]).sort(),
    [],
  );
  const router = useRouter();

  const handleSelect = (tag: string) => {
    if (selection.includes(tag)) {
      setSelection((prev) => prev.filter((el) => el !== tag));
    } else {
      setSelection((prev) => [...prev, tag]);
    }
  };

  const handleApply = () => {
    router.push(
      selection.length > 0
        ? `/blog?${selection.map((tag) => `tag=${tag}`).join("&")}`
        : "/blog",
    );
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSelection(tags);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelection([]);
    router.push("/blog");
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex fixed right-0 z-20 justify-end py-2 px-4 sm:px-8 top-[100px] animate-text-focus">
        <Badge
          badgeContent={tags.length}
          color="primary"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ "& .MuiBadge-badge": { top: 4, right: 4 } }}
        >
          <button
            className="flex justify-center items-center p-2 w-11 h-11 rounded-full border cursor-pointer border-dark-500 bg-secondary animate-text-focus text-dark-50 hover:bg-dark-900"
            onClick={() => setIsOpen(true)}
          >
            <FaHashtag className="w-5 h-5 text-dark-100" />
          </button>
        </Badge>
      </div>
      {isOpen && (
        <DarkLayout>
          <div className="flex flex-col gap-4 justify-between items-center pb-8 h-full">
            <div className="flex justify-start w-full">
              <MacOSBar close={handleCancel} />
            </div>
            <div className="flex overflow-auto flex-wrap gap-8 justify-center items-center p-4 xs:mt-0 animate-text-focus max-h-[80dvh] max-w-[50rem]">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleSelect(tag)}
                  className={`sm:text-xl ${selection.includes(tag) ? "text-primary scale-110" : "text-gray-200"} cursor-pointer transition-all duration-200 ease-in-out hover:scale-110`}
                >
                  #{tag}
                </button>
              ))}
            </div>
            <FilterActions
              clear={handleClear}
              apply={handleApply}
              clearDisabled={tags.length === 0}
              applyDisabled={!hasChanges}
            />
          </div>
        </DarkLayout>
      )}
    </>
  );
};

export default FilterTags;
