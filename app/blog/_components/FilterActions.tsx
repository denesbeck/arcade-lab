import { GiMineExplosion } from "react-icons/gi";
import { IoCheckmarkSharp } from "react-icons/io5";

interface IFilterActions {
  clear: () => void;
  apply: () => void;
  clearDisabled: boolean;
  applyDisabled: boolean;
}

const FilterActions = ({
  clear,
  apply,
  clearDisabled,
  applyDisabled,
}: IFilterActions) => {
  return (
    <div className="flex overflow-hidden rounded-full ring min-h-[48px] bg-black/20 animate-text-focus ring-dark-500">
      <button
        onClick={clear}
        disabled={clearDisabled}
        className="flex py-3 px-5 space-x-3 border-r cursor-pointer disabled:cursor-not-allowed border-dark-500 not-disabled:hover:bg-dark-600/40 disabled:brightness-75 disabled:grayscale-100"
      >
        <GiMineExplosion className="text-2xl text-red-300" />
        <span>Clear</span>
      </button>
      <button
        disabled={applyDisabled}
        onClick={apply}
        className="flex py-3 px-5 space-x-3 border-r cursor-pointer disabled:cursor-not-allowed border-dark-500 not-disabled:hover:bg-dark-600/40 disabled:brightness-75 disabled:grayscale-100"
      >
        <IoCheckmarkSharp className="text-2xl text-teal-400" />
        <span>Apply</span>
      </button>
    </div>
  );
};

export default FilterActions;
