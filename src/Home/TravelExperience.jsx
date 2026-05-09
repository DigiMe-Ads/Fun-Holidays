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
    <section className="relative w-full h-[820px] overflow-hidden rounded-2xl" ref={ref} style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
      {/* Full-bleed Background Image */}
      <img
        src="/images/home/leopard.png"
        alt="Leopard - Unlimited Travel Experience"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Very subtle vignette overlay — keeps it natural like the screenshot */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-white/30" />

      {/* Center Text — middle of image */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4" style={{ paddingTop: "60px" }}>
        <h2 className="text-white text-4xl font-bold drop-shadow-lg mb-3">
          Unlimited Travel Experience
        </h2>
        <p className="text-gray-200 text-sm drop-shadow">
          Crafting journeys, creating memories plan smarter, travel better
        </p>
      </div>

      {/* Bottom Stats Row */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Frosted glass divider line */}
        <div className="w-full h-px bg-white/20" />

        <div className="grid grid-cols-3 divide-x divide-white/20">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-1 px-16 py-8">
              <span className="text-white text-3xl font-bold">
                {stat.value}
              </span>
              <span className="text-gray-300 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelExperience;