import { ContactButton } from "./_components";
import { INFO } from "@/about/_config/data";
import { Suspense } from "react";
import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Arcade Lab | Home",
  description: `Hi, I'm ${INFO.Name}. I'm a ${INFO.Role} based in ${INFO.Location}.`,
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
