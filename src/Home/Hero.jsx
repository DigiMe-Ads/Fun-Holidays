import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const Hero = () => {
    const ref = useRef(null);
    useScrollReveal(ref, 0);
  return (
    <section className="w-full px-6 py-4 overflow-hidden" ref={ref} style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
      <div className="relative w-full h-[620px] overflow-hidden rounded-2xl">
        {/* Background Image */}
        <img
          src="/images/home/hero.jpg"
          alt="Sri Lanka Beach with Palm Trees"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Blue-tinted dark overlay — matches the screenshot's cool tint */}
        <div className="absolute inset-0 bg-[#1a3a4a]/55" />

        {/* Text Content — vertically centered, left aligned */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 max-w-lg">
          <h1 className="text-4xl font-extrabold leading-tight mb-3 text-white drop-shadow-md">
            Ayubowan - Welcome to <br /> the Laughing Island
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed">
            Experience authentic Sri Lanka holiday packages crafted by <br />
            Asia's most fun travel experts
          </p>
        </div>

        {/* Small orange dot accent — right side center */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-orange-500" />
      </div>
    </section>
  );
};

export default Hero;