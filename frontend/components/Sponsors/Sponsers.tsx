"use client";
import { RandomAvatar } from "react-random-avatars";

const names = ["Animesh", "John", "Jane", "Doe", "Alice", "Bob", "Charlie"];
export function LogoCarousel() {
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className="flex items-center gap-10  justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        {names.map((name: any) => (
          <div key={name}>
            <RandomAvatar name={name} size={90} />
          </div>
        ))}
      </ul>
      <ul
        className="flex items-center gap-10 justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
        aria-hidden="true"
      >
        {names.map((name: any) => (
          <div key={name}>
            <RandomAvatar name={name} size={90} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default function Logos() {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-lg text-center text-white/70 mb-16">
          Trusted by world&apos;s leading companies
        </h2>
        <LogoCarousel />
      </div>
    </div>
  );
}
