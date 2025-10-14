"use client";
import { Heading3 } from "@/_components";
import { BIO, BIO_START } from "../../_config/data";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Modal } from ".";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

const Bio = () => {
  const { push } = useRouter();
  return (
    <>
      <div className="flex overflow-x-auto flex-col gap-2 px-2 animate-text-focus max-w-[30rem]">
        <Heading3>
          <div className="flex items-center space-x-3">
            <span>Bio</span>
            <Tooltip arrow placement="right" title="Show more">
              <button
                onClick={() => push("/about?modalOpen")}
                className="transition-all duration-200 ease-in-out cursor-pointer hover:scale-110 text-primary hover:brightness-125"
              >
                <FaMagnifyingGlass className="text-base text-primary" />
              </button>
            </Tooltip>
          </div>
        </Heading3>
        <div className="overflow-hidden break-words text-ellipsis">
          {BIO_START}
        </div>
      </div>
      <Modal>{BIO}</Modal>
    </>
  );
};

export default Bio;
