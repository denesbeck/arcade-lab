import { MacOSBar } from "@/_components";
import blogEntries from "../_config/data";
import { Share, Tag } from "../_components";
import { Metadata } from "next/types";

interface IPost {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: IPost): Promise<Metadata> {
  const id = (await params).id;
  const post = blogEntries.find((entry) => entry.id.toString() === id);
  const { title, description, cover } = post || {};
  const coverImageUrl = cover?.original.src || "";

  return {
    metadataBase: new URL(`https://arcade-lab.io/`),
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://arcade-lab.io/blog/${id}`,
      images: [{ url: coverImageUrl }],
      type: "website",
      siteName: "Arcade Lab",
    },
    twitter: {
      site: "Arcade Lab",
      description: description,
      title: title,
      images: [{ url: coverImageUrl }],
    },
  };
}

const Post = async ({ params }: IPost) => {
  const { id } = await params;
  const post = blogEntries.find((entry) => entry.id.toString() === id);
  const { default: Post } = await import(
    `../blog-entries/${post?.content}.mdx`
  );

  return (
    <div className="flex flex-col items-center px-8 mb-8 pt-[100px]">
      <MacOSBar close="/blog" />
      {Post()}
      <div className="flex flex-wrap items-start px-5 mt-8 space-x-4 max-w-screen w-4xl">
        {(post?.tags || []).map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </div>
      <Share id={id} />
    </div>
  );
};

export default Post;
