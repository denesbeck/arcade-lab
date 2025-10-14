import Image from "next/image";
interface TitleProps {
  mr?: boolean;
  ml?: boolean;
}

const Title = ({ mr = false, ml = false }: TitleProps) => {
  return (
    <div
      className={`${mr && "mr-auto"} ${ml && "ml-auto"} animate-text-focus z-30 py-2 text-lg font-semibold text-nowrap select-none`}
    >
      <Image
        src="/logo/arcade_lab_logo_120.png"
        width={42}
        height={42}
        alt="arcade_lab_logo"
        className="inline-block mr-2 w-16 h-16 rounded-full"
      />
      <span className="ml-2">Arcade Lab</span>
    </div>
  );
};

export default Title;
