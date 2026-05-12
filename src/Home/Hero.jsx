import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const Hero = () => {
  const ref = useRef(null);
  useScrollReveal(ref, 0);

  return (
    <section
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
      className="w-full px-3 sm:px-6 py-3 sm:py-4"
    >
      <div className="relative w-full h-[280px] sm:h-[380px] md:h-[480px] lg:h-[620px] overflow-hidden rounded-2xl">
        {/* Background Image */}
        <img
          src="/images/home/hero.jpg"
          alt="Sri Lanka Beach with Palm Trees"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Blue-tinted dark overlay */}
        <div className="absolute inset-0 bg-[#1a3a4a]/55" />

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-2 sm:mb-3 text-white drop-shadow-md max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            Ayubowan - Welcome to the Laughing Island
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-xs sm:max-w-sm">
            Experience authentic Sri Lanka holiday packages crafted by
            Asia's most fun travel experts
          </p>
        </div>

        {/* Orange dot accent — hidden on smallest screens */}
        <div className="hidden sm:block absolute right-8 sm:right-16 top-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-orange-500" />
      </div>
    </section>
  );
};

export default Hero;