import { Heading3 } from "@/_components";
import { Badge } from ".";
import { CERTIFICATES } from "../../_config/data";

const Certificates = () => {
  return (
    <div className="flex flex-col gap-4 max-w-[30rem]">
      <Heading3>Certificates</Heading3>
      <div className="flex flex-wrap gap-8 justify-start w-full">
        {CERTIFICATES.map((item) => (
          <Badge key={item.url} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Certificates;
