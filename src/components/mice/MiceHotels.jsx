import { useRef } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";

const hotels = [
  { name: "Shangri-La", location: "Colombo", stars: 5 },
  { name: "Hilton", location: "Colombo", stars: 5 },
  { name: "Marriott", location: "Colombo", stars: 5 },
  { name: "Taj Samudra", location: "Colombo", stars: 5 },
  { name: "Cinnamon Grand", location: "Colombo", stars: 5 },
  { name: "ITC Ratnadipa", location: "Colombo", stars: 5 },
  { name: "NH Collection", location: "Colombo", stars: 5 },
  // { name: "OZO Colombo", location: "Colombo", stars: 4 },
];

const HotelCard = ({ name, location, stars, delay }) => {
  const ref = useRef(null);
  useScrollReveal(ref, delay);
  return (
    <div
      ref={ref}
      className="border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center gap-2 hover:shadow-md transition-shadow duration-300"
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white font-bold text-lg shrink-0">
        {name[0]}
      </div>
      <p className="font-semibold text-gray-900 text-sm">{name}</p>
      <p className="text-gray-400 text-xs">{location}</p>
      <div className="flex gap-0.5">
        {Array.from({ length: stars }).map((_, i) => (
          <FaStar key={i} className="text-orange-400 text-xs" />
        ))}
      </div>
    </div>
  );
};

const MiceHotels = () => {
  const headingRef = useRef(null);
  const ctaRef = useRef(null);

  useScrollReveal(headingRef, 100);
  useScrollReveal(ctaRef, 200);

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={headingRef}
          className="text-center mb-12"
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">
            Accommodation
          </span>
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mt-2">
            International Hotel Brands
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
            Sri Lanka is home to leading international hotel brands, ensuring
            your delegates experience world-class comfort, service, and
            dedicated MICE facilities right in the heart of Colombo.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {hotels.map((h, i) => (
            <HotelCard key={i} {...h} delay={100 + i * 80} />
          ))}
        </div>

        <div
          ref={ctaRef}
          className="bg-[#fdf6f0] rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div>
            <h3 className="text-gray-900 font-bold text-lg">
              Need tailored accommodation for your group?
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              We negotiate the best rates and block bookings for MICE groups of all sizes.
            </p>
          </div>
          <Link
            to="/contact"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MiceHotels;
