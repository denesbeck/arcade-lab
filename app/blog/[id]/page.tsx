import { MacOSBar, ScrollToTop } from "@/_components";
import blogEntries from "../_config/data";
import { Share, Tag } from "../_components";
import { Metadata } from "next/types";

interface IPost {
  params: Promise<{ id: string }>;
}

const domain = process.env.NEXT_PUBLIC_DOMAIN;

export async function generateMetadata({ params }: IPost): Promise<Metadata> {
  const id = (await params).id;
  const post = blogEntries.find((entry) => entry.id.toString() === id);
  const { title, description, cover } = post || {};
  const coverImageUrl = cover?.original.src || "";

  return {
    metadataBase: new URL(`https://${domain}/`),
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://${domain}/blog/${id}`,
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
    `../_config/markdown/${post?.content}.md`
  );

  return (
    <div className="flex flex-col items-center pb-4 w-dvw">
      <ScrollToTop />
      <MacOSBar close="/blog" />
      {Post()}
      <div className="flex flex-wrap items-start px-6 mt-8 space-x-4 max-w-screen w-4xl">
        {(post?.tags || []).map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </div>
      <Share id={id} />
    </div>
  );
};

export default Post;
