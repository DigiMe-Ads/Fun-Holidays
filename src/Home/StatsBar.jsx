import { FaPlus } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const StatsBar = () => {
    const ref = useRef(null);
    useScrollReveal(ref, 0);
  return (
    <section className="w-full px-6 pb-6 overflow-hidden" ref={ref} style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
      <div className="relative bg-[#1a1a1a] rounded-2xl px-10 py-7 flex items-center justify-between overflow-hidden">

        {/* Left: Stats */}
        <div className="flex flex-col gap-3 min-w-[160px]">
          <h2 className="text-white text-4xl font-extrabold">10m+</h2>
          <p className="text-gray-400 text-sm">Trusted clients / happy clients</p>

          {/* Avatar Stack */}
          <div className="flex items-center">
            {[
              "https://randomuser.me/api/portraits/women/44.jpg",
              "https://randomuser.me/api/portraits/women/68.jpg",
              "https://randomuser.me/api/portraits/men/32.jpg",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`client-${i}`}
                className="w-9 h-9 rounded-full border-2 border-[#1a1a1a] object-cover"
                style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: i }}
              />
            ))}
            {/* Plus button */}
            <div
              className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center border-2 border-[#1a1a1a] cursor-pointer"
              style={{ marginLeft: "-10px", zIndex: 4 }}
            >
              <FaPlus className="text-white text-xs" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-20 bg-gray-700 mx-8" />

        {/* Right: Search Bar */}
        <div className="flex flex-col gap-3 flex-1 z-10">
          <div>
            <h3 className="text-white font-bold text-lg">
              Find adventure that suits your needs
            </h3>
            <p className="text-gray-400 text-sm mt-0.5">
              We provide more than{" "}
              <span className="text-orange-500 font-semibold">800+</span>{" "}
              travel destination
            </p>
          </div>

          {/* Filter Row */}
          <div className="flex items-center gap-3">
            {/* Where To Go 1 */}
            <button className="flex items-center justify-between gap-6 bg-transparent border border-gray-600 text-gray-400 text-sm rounded-lg px-4 py-3 hover:border-orange-500 transition-colors flex-1">
              <span>Where To Go</span>
              <IoChevronDown className="text-gray-500 text-xs shrink-0" />
            </button>

            {/* Where To Go 2 */}
            <button className="flex items-center justify-between gap-6 bg-transparent border border-gray-600 text-gray-400 text-sm rounded-lg px-4 py-3 hover:border-orange-500 transition-colors flex-1">
              <span>Where To Go</span>
              <IoChevronDown className="text-gray-500 text-xs shrink-0" />
            </button>

            {/* Travel Type */}
            <button className="flex items-center justify-between gap-6 bg-transparent border border-gray-600 text-gray-400 text-sm rounded-lg px-4 py-3 hover:border-orange-500 transition-colors flex-1">
              <span>Travel Type</span>
              <IoChevronDown className="text-gray-500 text-xs shrink-0" />
            </button>

            {/* Find Tours Button */}
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-8 py-3 rounded-lg transition-colors whitespace-nowrap">
              Find Tours
            </button>
          </div>
        </div>

        {/* Palm Tree Decoration — top right */}
        <img
          src="/images/home/palm-tree.png"
          alt="palm tree"
          className="absolute -bottom-2 right-9 h-40 object-contain opacity-90 pointer-events-none select-none z-0"
        />
      </div>
    </section>
  );
};

export default StatsBar;