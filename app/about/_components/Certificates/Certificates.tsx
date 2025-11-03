import { Heading3, Info } from "@/_components";
import { Badge } from ".";
import { CERTIFICATES } from "../../_config/data";

const Certificates = () => {
  return (
    <div className="flex flex-col max-w-[30rem]">
      <Heading3>Certificates</Heading3>
      <Info>Here are some of the certificates I&apos;ve earned:</Info>
      <div className="flex flex-wrap gap-4 justify-start mt-4 w-full">
        {CERTIFICATES.map((item) => (
          <Badge key={item.url} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Certificates;
