import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const stats = [
  {
    value: "30k+",
    label: "Total worldwide satisfied clients",
  },
  {
    value: "500+",
    label: "World tours available in tour",
  },
  {
    value: "20+",
    label: "Professional local tour guides",
  },
];

const TravelExperience = () => {
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
      className="relative w-full overflow-hidden"
    >
      {/* Background Image — height scales with breakpoint */}
      <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[820px]">
        <img
          src="/images/home/leopard.png"
          alt="Leopard - Unlimited Travel Experience"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-white/20" />

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-32 sm:pb-40 lg:pb-48">
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold drop-shadow-lg mb-2 sm:mb-3">
            Unlimited Travel Experience
          </h2>
          <p className="text-gray-200 text-xs sm:text-sm drop-shadow max-w-xs sm:max-w-none">
            Crafting journeys, creating memories plan smarter, travel better
          </p>
        </div>

        {/* Bottom Stats Row */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="w-full h-px bg-white/20" />

          <div className="grid grid-cols-3 divide-x divide-white/20">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col gap-0.5 sm:gap-1 px-4 sm:px-8 lg:px-16 py-5 sm:py-6 lg:py-8"
              >
                <span className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
                  {stat.value}
                </span>
                <span className="text-gray-300 text-[10px] sm:text-xs lg:text-sm leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelExperience;