"use client";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface BlogCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  cover: { image: StaticImageData; alt: string };
}

const BlogCard = ({ id, title, description, date, cover }: BlogCardProps) => {
  const searchParams = useSearchParams();

  return (
    <Link
      href={`/blog/${id}?${searchParams.toString()}`}
      className="flex overflow-hidden border-b-2 transition-all duration-200 ease-in-out cursor-pointer sm:border-b-0 sm:ring-2 last:border-b-0 ring-offset-root border-secondary ring-primary group animate-text-focus max-h-[10rem] min-h-[10rem] sm:active:ring-active sm:hover:ring-offset-4"
    >
      <Image
        src={cover.image}
        alt={cover.alt}
        className="h-full animate-text-focus max-w-36 min-w-36 sm:max-w-42 sm:min-w-42"
      />
      <div className="flex flex-col py-3 px-6 space-y-2">
        <h1 className="relative text-lg text-left transition-all duration-200 ease-in-out group-hover:font-bold after:bg-primary after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-200 after:ease-in-out after:content-[''] group-hover:after:w-full">
          {title}
        </h1>

        <p className="overflow-hidden flex-1 text-sm text-left whitespace-nowrap md:w-full md:whitespace-pre-wrap w-[20ch] text-ellipsis sm:w-[32ch]">
          {description}
        </p>
        <div className="flex justify-end items-center space-x-2 w-full">
          <FaRegCalendarAlt />
          <div className="text-sm">{date}</div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
