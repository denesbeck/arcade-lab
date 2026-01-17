import { StaticImageData } from "next/image";

export interface BlogEntry {
  id: number;
  title: string;
  description: string;
  date: string;
  hidden: boolean;
  content: string;
  tags: string[];
  cover: {
    image: StaticImageData;
    original: StaticImageData;
    xImage: StaticImageData;
    alt: string;
    ogImage: string; // absolute path for OG meta tags (e.g., "/blog/covers/image.png")
    ogImageX: string; // absolute path for Twitter/X meta tags
  };
}
