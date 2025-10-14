import { StaticImageData } from "next/image";

export interface BlogEntry {
  id: number;
  title: string;
  description: string;
  date: string;
  content: string;
  tags: string[];
  cover: { image: StaticImageData; alt: string };
}
