import Image from "next/image";

interface BadgeProps {
  url: string;
  size?: number;
  img: string;
  alt: string;
}

const Badge = ({ url, size = 28, img, alt }: BadgeProps) => {
  return (
    <a
      className="transition-all duration-200 ease-in-out hover:scale-110 animate-text-focus hover:brightness-125"
      href={url}
      target="_blank"
    >
      <Image
        width={size}
        quality={100}
        height={size}
        src={img}
        alt={alt}
        // Enable aggressive caching for remote certificate images
        unoptimized={false}
        priority={false}
        loading="lazy"
      />
    </a>
  );
};

export default Badge;
