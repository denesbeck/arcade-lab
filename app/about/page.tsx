import { Suspense } from "react";
import { Certificates, Info, Skills } from "./_components";
import Bio from "./_components/Bio/Bio";

const About = () => {
  return (
    <div className="flex flex-col items-center pb-8 min-h-[calc(100dvh-100px)] w-dvw lg:pb-[100px]">
      {/* wrapper for adding animate-slide-in-from-bottom */}
      <div className="flex flex-col py-4 px-2 my-auto transition-all duration-200 ease-in-out sm:w-max sm:ring-2 lg:py-8 lg:px-8 ring-secondary animate-slide-in-from-bottom backdrop-blur-md sm:max-w-[90dvw] sm:hover:shadow-[10px_10px_#46ecd5,20px_20px_black]">
        {/* main container */}
        <div className="grid grid-cols-1 px-4 sm:gap-8 lg:grid-cols-2">
          <Info />
          <div className="block my-2 border-b-2 sm:hidden border-secondary" />
          <Certificates />
          <div className="block my-2 border-b-2 sm:hidden border-secondary" />
          <Suspense>
            <Bio />
          </Suspense>
          <div className="block my-2 border-b-2 sm:hidden border-secondary" />
          <Skills />
        </div>
      </div>
    </div>
  );
};

export default About;
