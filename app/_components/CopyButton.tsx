"use client";
import { Tooltip } from "@/_components";
import { useState, useCallback } from "react";
import { IoCopyOutline } from "react-icons/io5";

interface ICopyButton {
  content: string;
}

const CopyButton = ({ content }: ICopyButton) => {
  const [open, setOpen] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
    setOpen(true);
    setTimeout(() => setOpen(false), 5000);
  }, [content]);

  return (
    <Tooltip
      onClick={handleCopy}
      open={open}
      arrow
      placement="bottom"
      title="Copied!"
    >
      <button className="absolute top-5 right-5 cursor-pointer">
        <IoCopyOutline className="w-5 h-5 text-dark-200" />
      </button>
    </Tooltip>
  );
};

export default CopyButton;
