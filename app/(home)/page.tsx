import { ContactButton } from "./_components";
import { INFO } from "@/about/_config/data";
import { Suspense } from "react";
import { Metadata } from "next";

export const dynamic = "force-static";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "arcade-lab.vercel.app";

export const metadata: Metadata = {
  title: "Home",
  description: `Hi, I'm ${INFO.Name}. I'm a ${INFO.Role} at ${INFO.Company} based in ${INFO.Location}. Specializing in full-stack development, DevOps, and cloud infrastructure.`,
  openGraph: {
    title: `${INFO.Name} - ${INFO.Role}`,
    description: `${INFO.Role} at ${INFO.Company} specializing in full-stack development, DevOps, and cloud infrastructure.`,
    url: `https://${domain}`,
    type: "profile",
    images: [
      {
        url: `/logo/arcade_lab_logo.png`,
        width: 1200,
        height: 630,
        alt: `${INFO.Name} - Arcade Lab`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${INFO.Name} - ${INFO.Role}`,
    description: `${INFO.Role} at ${INFO.Company} specializing in full-stack development, DevOps, and cloud infrastructure.`,
    creator: "@DenesBeck",
  },
};

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center px-4 min-h-[calc(100dvh-100px)] w-dvw">
      <div className="flex flex-col justify-center items-center pb-[100px]">
        <div className="text-2xl text-center animate-text-focus">
          👋🏻 Hello, my name is {INFO.Name.split(" ")[0]}.
        </div>
        <div className="mt-2 text-center animate-text-focus">
          I&apos;m a {INFO.Role}.
        </div>
        <Suspense>
          <ContactButton label={"Contact me"} />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
