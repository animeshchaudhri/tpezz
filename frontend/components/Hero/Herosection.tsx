import Link from "next/link";

import { Icons } from "@/components/Icons";
import { buttonVariants } from "../ui/button";
import { HeroCards } from "./HeroCards";
import V1 from "./V1";

const Hero = () => {
  return (
    <>
      <V1 />
      <section className="container grid lg:grid-cols-2 place-items-center py-12 md:pt-17 pb-32  gap-10">
        <div className="text-center lg:text-start space-y-6">
          <main className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">
              <span className="inline bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-transparent bg-clip-text">
                AI-Powered
              </span>{" "}
              travel
            </h1>{" "}
            planning for{" "}
            <h2 className="inline">
              <span className="inline bg-gradient-to-r from-[#45B649] to-[#DCE35B] text-transparent bg-clip-text">
                adventurous
              </span>{" "}
              souls.
            </h2>
          </main>

          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Generate personalized travel itineraries in seconds with Tpezz. Your
            perfect trip is just a click away.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Link
              className={`w-full md:w-1/3 ${buttonVariants()}`}
              href={"/trip"}
            >
              Plan Your Trip
            </Link>

            <Link
              href="#Features"
              className={`w-full md:w-1/3 ${buttonVariants({
                variant: "outline",
              })}`}
            >
              Features
              <Icons.question className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Hero cards sections */}
        <div className="z-10">
          <HeroCards />
        </div>

        {/* Shadow effect */}
        <div className="shadow"></div>
      </section>
    </>
  );
};

export default Hero;
