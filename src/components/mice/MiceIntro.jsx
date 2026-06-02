import { useRef } from "react";
import { FaGlobe, FaBuilding, FaUsers, FaCalendarAlt } from "react-icons/fa";
import useScrollReveal from "../../hooks/useScrollReveal";

const features = [
  {
    icon: <FaGlobe />,
    title: "Strategic Location",
    desc: "Positioned at the crossroads of major international sea and air routes, Sri Lanka offers unmatched connectivity to the world.",
  },
  {
    icon: <FaBuilding />,
    title: "World-Class Venues",
    desc: "State-of-the-art conference centers, luxury hotels, and unique event spaces throughout Colombo and beyond.",
  },
  {
    icon: <FaUsers />,
    title: "Expert Local Support",
    desc: "Our experienced MICE team delivers end-to-end event management, ensuring seamless experiences for every delegate.",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Year-Round Destination",
    desc: "With a tropical climate and diverse landscapes, Sri Lanka offers memorable MICE experiences in every season.",
  },
];

const FeatureCard = ({ icon, title, desc, delay }) => {
  const ref = useRef(null);
  useScrollReveal(ref, delay);
  return (
    <div
      ref={ref}
      className="bg-[#fdf6f0] rounded-2xl p-6 flex flex-col gap-3"
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div className="text-orange-500 text-2xl">{icon}</div>
      <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
};

const MiceIntro = () => {
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useScrollReveal(headingRef, 100);
  useScrollReveal(textRef, 200);
  useScrollReveal(imageRef, 150);

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="flex-1">
            <div
              ref={headingRef}
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">
                MICE & Destination Weddings
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4 leading-tight">
                Sri Lanka — Your Premier
                <br />
                MICE Destination
              </h2>
            </div>
            <div
              ref={textRef}
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Sri Lanka is rapidly emerging as one of Asia's most sought-after
                MICE destinations. With its stunning natural landscapes, rich
                cultural heritage, and world-class infrastructure, the island
                offers a unique blend of business efficiency and exotic
                experiences that leave delegates inspired and energized.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                From intimate executive retreats to large-scale international
                conferences, Sri Lanka's diverse venues, competitive pricing,
                and warm hospitality create the perfect backdrop for successful
                corporate events, incentive travel, and destination weddings.
              </p>
            </div>
          </div>

          <div
            ref={imageRef}
            className="w-full lg:w-[480px] h-[320px] rounded-2xl overflow-hidden shrink-0"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <img
              src="/images/mice/hotel.jpg"
              alt="Colombo City"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} delay={100 + i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MiceIntro;
