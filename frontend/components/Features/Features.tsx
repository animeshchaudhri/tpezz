import  { BentoGridT } from "./bento";

export const Features = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24 ">
      <div className="container">
        <h2 className="text-center font-bold text-5xl sm:text-6xl tracking-tighter">
          Powerful shorts Creation Tools
        </h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center mt-5 text-xl text-white/70">
            Create engaging shorts reels with our intuitive tools. From prompt
            to video generation, we got you covered.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center sm:flex-row gap-4 mt-32">
          <BentoGridT/>
        </div>
      </div>
    </div>
  );
};
