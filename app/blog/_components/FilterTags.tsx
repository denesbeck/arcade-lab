"use client";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
import { LiaBroomSolid } from "react-icons/lia";
import blogEntries from "../_config/data";
import { DarkLayout } from "@/_components";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const FilterTags = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const tags = searchParams.getAll("tag");
  const [selection, setSelection] = useState<string[]>(tags);
  const allTags = Array.from([
    ...new Set(blogEntries.map((entry) => entry.tags).flat()),
  ]).sort();
  const router = useRouter();

  const handleSelect = (tag: string) => {
    if (selection.includes(tag)) {
      setSelection((prev) => prev.filter((el) => el !== tag));
    } else {
      setSelection((prev) => [...prev, tag]);
    }
  };

  const handleApply = () => {
    router.push(`/blog?${selection.map((tag) => `tag=${tag}`).join("&")}`);
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
      <div className="flex fixed right-0 justify-end py-2 px-4 sm:px-8 top-[100px] animate-text-focus">
        <Badge badgeContent={tags.length} color="primary">
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
          <>
            <div className="flex absolute top-2 right-2 gap-4">
              <Tooltip arrow placement="bottom" title="Clear">
                <IconButton onClick={handleClear}>
                  <LiaBroomSolid className="text-3xl text-white" />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="bottom" title="Close">
                <IconButton onClick={handleCancel}>
                  <IoClose className="text-3xl text-white" />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="bottom" title="Apply">
                <IconButton onClick={handleApply}>
                  <IoCheckmarkSharp className="text-3xl text-primary" />
                </IconButton>
              </Tooltip>
            </div>

            <div className="flex overflow-auto flex-wrap gap-8 justify-center items-center p-4 animate-text-focus max-h-[80dvh] max-w-[50rem]">
              {[...allTags].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleSelect(tag)}
                  className={`sm:text-xl ${selection.includes(tag) ? "text-primary scale-110" : "text-gray-200"} cursor-pointer transition-all duration-200 ease-in-out hover:scale-110`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </>
        </DarkLayout>
      )}
    </>
  );
};

export default FilterTags;
