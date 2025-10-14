import Link from "next/link";

interface MacOSBarProps {
  close?: string;
}
const MacOSBar = ({ close }: MacOSBarProps) => {
  return (
    <div className="flex justify-start items-center py-4 px-6 w-4xl max-w-screen">
      <Link href={close || ""} className="flex space-x-2 cursor-pointer">
        <div className="w-4 h-4 rounded-full bg-macos-red" />
        <div className="w-4 h-4 rounded-full bg-macos-yellow" />
        <div className="w-4 h-4 rounded-full bg-macos-green" />
      </Link>
    </div>
  );
};

export default MacOSBar;
