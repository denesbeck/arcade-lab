import { Heading3 } from "@/_components";
import { BIO } from "../../_config/data";

const Bio = () => {
  return (
    <>
      <div className="flex overflow-x-auto flex-col gap-2 px-2 animate-text-focus max-w-[30rem]">
        <Heading3>
          <div className="flex items-center space-x-3">
            <span>Bio</span>
          </div>
        </Heading3>
        <div className="overflow-hidden break-words text-ellipsis">{BIO}</div>
      </div>
    </>
  );
};

export default Bio;
