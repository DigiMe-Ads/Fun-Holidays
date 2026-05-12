import { FaPlus } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const StatsBar = () => {
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
      className="w-full px-3 sm:px-6 pb-4 sm:pb-6"
    >
      <div className="relative bg-[#1a1a1a] rounded-2xl px-5 sm:px-10 py-6 sm:py-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 overflow-hidden">

        {/* Left: Stats */}
        <div className="flex flex-row lg:flex-col items-center lg:items-start gap-6 lg:gap-3 min-w-0 lg:min-w-[160px] w-full lg:w-auto">
          <div>
            <h2 className="text-white text-3xl sm:text-4xl font-extrabold">10m+</h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Trusted clients / happy clients
            </p>
          </div>

          {/* Avatar Stack */}
          <div className="flex items-center shrink-0">
            {[
              "https://randomuser.me/api/portraits/women/44.jpg",
              "https://randomuser.me/api/portraits/women/68.jpg",
              "https://randomuser.me/api/portraits/men/32.jpg",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`client-${i}`}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-[#1a1a1a] object-cover"
                style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: i }}
              />
            ))}
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-500 flex items-center justify-center border-2 border-[#1a1a1a] cursor-pointer"
              style={{ marginLeft: "-10px", zIndex: 4 }}
            >
              <FaPlus className="text-white text-xs" />
            </div>
          </div>
        </div>

        {/* Divider — horizontal on mobile, vertical on desktop */}
        <div className="w-full h-px lg:w-px lg:h-20 bg-gray-700 lg:mx-8" />

        {/* Right: Search */}
        <div className="flex flex-col gap-3 flex-1 z-10 w-full">
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg">
              Find adventure that suits your needs
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
              We provide more than{" "}
              <span className="text-orange-500 font-semibold">800+</span>{" "}
              travel destination
            </p>
          </div>

          {/* Filter Row — stacks on mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <button className="flex items-center justify-between gap-4 bg-transparent border border-gray-600 text-gray-400 text-sm rounded-lg px-4 py-2.5 hover:border-orange-500 transition-colors sm:flex-1">
              <span>Where To Go</span>
              <IoChevronDown className="text-gray-500 text-xs shrink-0" />
            </button>

            <button className="flex items-center justify-between gap-4 bg-transparent border border-gray-600 text-gray-400 text-sm rounded-lg px-4 py-2.5 hover:border-orange-500 transition-colors sm:flex-1">
              <span>Where To Go</span>
              <IoChevronDown className="text-gray-500 text-xs shrink-0" />
            </button>

            <button className="flex items-center justify-between gap-4 bg-transparent border border-gray-600 text-gray-400 text-sm rounded-lg px-4 py-2.5 hover:border-orange-500 transition-colors sm:flex-1">
              <span>Travel Type</span>
              <IoChevronDown className="text-gray-500 text-xs shrink-0" />
            </button>

            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap w-full sm:w-auto">
              Find Tours
            </button>
          </div>
        </div>

        {/* Palm Tree — smaller on mobile, repositioned */}
        <img
          src="/images/home/palm-tree.png"
          alt="palm tree"
          className="absolute -bottom-2 right-4 sm:right-9 h-24 sm:h-32 lg:h-40 object-contain opacity-90 pointer-events-none select-none z-0"
        />
      </div>
    </section>
  );
};

export default StatsBar;