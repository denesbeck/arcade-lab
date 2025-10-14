import Head from "next/head";
import { ContactButton } from "./_components";
import { INFO } from "@/_config/about";
import { Suspense } from "react";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center px-4 min-h-[calc(100dvh-100px)] w-dvw">
      <Head>
        <title>Arcade Lab | Home</title>
      </Head>
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
  );
};

export default Home;
