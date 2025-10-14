import { Social } from ".";
import { CONNECTIONS } from "../../_config/data";

const Connections = () => {
  return (
    <div className="flex flex-col justify-start items-center px-1 space-y-2 w-max sm:flex-row sm:px-0 sm:mt-4 sm:space-y-0 sm:space-x-5 max-w-[40dvw]">
      {CONNECTIONS.map(({ url, icon }) => (
        <Social key={url} url={url} icon={icon} />
      ))}
    </div>
  );
};

export default Connections;
