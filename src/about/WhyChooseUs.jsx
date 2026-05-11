import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import {
  FaSuitcaseRolling,
  FaTags,
  FaMobileAlt,
  FaGlobeAmericas,
} from "react-icons/fa";

const reasons = [
  {
    id: 1,
    icon: FaSuitcaseRolling,
    title: "Personal Tour Plans",
    description: "Tailored itineraries to match your interests and budget.",
  },
  {
    id: 2,
    icon: FaTags,
    title: "Best Price Guarantee",
    description: "Competitive tours rates without compromising quality.",
  },
  {
    id: 3,
    icon: FaMobileAlt,
    title: "Hassle-Free Booking",
    description: "Easy safe and hassle-free online reservation process.",
  },
  {
    id: 4,
    icon: FaGlobeAmericas,
    title: "Range of Destinations",
    description: "From popular hotspots to hidden gems worldwide.",
  },
];

const ReasonCard = ({ item, index }) => {
  const ref = useRef(null);
  useScrollReveal(ref, index * 120);

  const Icon = item.icon;

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
      className="bg-white rounded-2xl p-7 flex flex-col gap-6 hover:shadow-md transition-shadow duration-300"
    >
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center">
        <Icon className="text-orange-500 text-4xl" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-gray-900 font-semibold text-base">{item.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
};

const WhyChooseUs = () => {
  const headingRef = useRef(null);
  useScrollReveal(headingRef, 0);

  return (
    <section className="w-full bg-[#fdf6f0] px-4 sm:px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div
          ref={headingRef}
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            People Why Choose Us
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((item, i) => (
            <ReasonCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;