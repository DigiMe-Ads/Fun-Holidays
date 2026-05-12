import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const AboutBanner = () => {
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
      className="w-full px-3 sm:px-6 lg:px-10 py-8"
    >
      {/* ── Mobile & Tablet: stacked layout ───────────────────────── */}
      <div className="flex flex-col lg:hidden gap-5">

        {/* Heading */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
            Passionate about your adventures with Fun Holidays
          </h2>
          <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2">
            <p className="text-sm text-gray-500">
              We are started with 2005s,{" "}
              <span className="text-orange-500 font-semibold">20+</span>{" "}
              years of experience
            </p>
          </div>
        </div>

        {/* Image — full width */}
        <div className="w-full h-[220px] sm:h-[260px] rounded-2xl overflow-hidden">
          <img
            src="/images/home/about-beach.jpg"
            alt="Stilt Fishermen Sri Lanka"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Trusted & Secure — full width horizontal on mobile */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 flex flex-col justify-end">
          <h3 className="text-white font-bold text-base mb-2">
            Trusted & Secure
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your safety and trust are our top priorities.
          </p>
        </div>
      </div>

      {/* ── Desktop: original 3-column side-by-side layout ────────── */}
      <div className="hidden lg:flex items-center gap-6">

        {/* Left: Text */}
        <div className="flex-1 pr-8">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-5">
            Passionate about <br />
            your adventures <br />
            with Fun Holidays
          </h2>
          <div className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-4 py-2">
            <p className="text-sm text-gray-500">
              We are started with 2005s,{" "}
              <span className="text-orange-500 font-semibold">20+</span>{" "}
              years of experience
            </p>
          </div>
        </div>

        {/* Center: Image */}
        <div className="flex-[1.2] h-[220px] rounded-2xl overflow-hidden shrink-0">
          <img
            src="/images/home/about-beach.jpg"
            alt="Stilt Fishermen Sri Lanka"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Trusted & Secure */}
        <div className="bg-[#1a1a1a] rounded-2xl p-7 h-[220px] flex flex-col justify-end w-[220px] shrink-0">
          <h3 className="text-white font-bold text-base mb-2">
            Trusted & Secure
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your safety and trust are <br /> our top priorities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;