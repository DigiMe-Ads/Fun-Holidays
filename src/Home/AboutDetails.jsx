import { FaCheck } from "react-icons/fa";
import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const features = [
  "Destination Search & Filters",
  "Blog & Travel Guides",
  "Pricing & Discounts",
  "Online Booking System",
  "Live Chat Support",
  "Reviews & Ratings",
];

const AboutDetails = () => {
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
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">

        {/* Image — full width on mobile, fixed width on desktop */}
        <div className="w-full lg:w-[480px] xl:w-[580px] h-[220px] sm:h-[260px] shrink-0 rounded-2xl overflow-hidden">
          <img
            src="/images/home/elephants.jpg"
            alt="Elephants in Sri Lanka"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 w-full">
          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            We believe travel is more than just a trip — it's an experience
            that shapes your life. Our mission is to create unforgettable
            journeys that combine adventure, comfort, and authentic cultural
            encounters.
          </p>

          {/* Features Grid — 1 col mobile, 2 col sm, 3 col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-7">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <FaCheck className="text-orange-500 text-xs shrink-0" />
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold text-sm px-8 py-3 rounded-lg w-full sm:w-auto">
            Learn More Us
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutDetails;