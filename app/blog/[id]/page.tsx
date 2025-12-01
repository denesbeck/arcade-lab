import "highlight.js/styles/nord.css";
import { GoBack, ScrollToTop } from "@/_components";
import blogEntries from "../_config/data";
import { Share, Tag } from "../_components";
import { Metadata } from "next/types";

interface IPost {
  params: Promise<{ id: string }>;
}

const domain = process.env.NEXT_PUBLIC_DOMAIN;

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  return blogEntries.map((entry) => ({
    id: entry.id.toString(),
  }));
}

// Only allow pre-generated blog post IDs
export const dynamicParams = false;

// Enable static generation with revalidation every hour
export const revalidate = 3600;

export async function generateMetadata({ params }: IPost): Promise<Metadata> {
  const id = (await params).id;
  const post = blogEntries.find((entry) => entry.id.toString() === id);
  const { title, description, cover, tags, date } = post || {};

  return {
    metadataBase: new URL(`https://${domain}/`),
    title: title,
    description: description,
    keywords: tags,
    authors: [{ name: "Denes Beck" }],
    openGraph: {
      title: title,
      description: description,
      url: `https://${domain}/blog/${id}`,
      images: cover?.ogImage ? [{ url: cover.ogImage }] : [],
      type: "article",
      siteName: "Arcade Lab",
      publishedTime: date,
    },
    twitter: {
      card: "summary_large_image",
      site: "Arcade Lab",
      description: description,
      title: title,
      creator: "@DenesBeck",
      images: cover?.ogImageX ? [{ url: cover.ogImageX }] : [],
    },
  };
}

const Post = async ({ params }: IPost) => {
  const { id } = await params;
  const post = blogEntries.find((entry) => entry.id.toString() === id);
  const { default: Post } = await import(
    `../_config/markdown/${post?.content}.mdx`
  );

  // JSON-LD structured data for blog post
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post?.title,
    description: post?.description,
    image: post?.cover?.ogImage ? `https://${domain}${post.cover.ogImage}` : "",
    datePublished: post?.date,
    dateModified: post?.date,
    author: {
      "@type": "Person",
      name: "Denes Beck",
      url: `https://${domain}`,
    },
    publisher: {
      "@type": "Person",
      name: "Denes Beck",
      logo: {
        "@type": "ImageObject",
        url: `https://${domain}/logo/arcade_lab_logo.png`,
      },
    },
    keywords: post?.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://${domain}/blog/${id}`,
    },
  };

  return (
    <div className="flex flex-col items-center pb-4 w-dvw">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GoBack fallbackUrl="/blog" />
      <ScrollToTop />
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
