import { useRef } from "react";
import { FaCity, FaConciergeBell, FaShoppingBag, FaRoad } from "react-icons/fa";
import useScrollReveal from "../../hooks/useScrollReveal";

const highlights = [
  {
    icon: <FaCity />,
    title: "Colombo Port City",
    desc: "A brand-new international financial city rising from the Indian Ocean, with cutting-edge convention and business facilities.",
  },
  {
    icon: <FaConciergeBell />,
    title: "BMICH & Convention Centres",
    desc: "The Bandaranaike Memorial International Conference Hall and other world-class venues host major international events year-round.",
  },
  {
    icon: <FaShoppingBag />,
    title: "Entertainment & Leisure",
    desc: "Shopping malls, fine dining, cultural shows, and vibrant nightlife give delegates an enriching experience beyond the boardroom.",
  },
  {
    icon: <FaRoad />,
    title: "Modern Infrastructure",
    desc: "Upgraded highways, an express transport system, and the renovated Bandaranaike International Airport facilitate seamless movement.",
  },
];

const ColomboCard = ({ icon, title, desc, delay }) => {
  const ref = useRef(null);
  useScrollReveal(ref, delay);
  return (
    <div
      ref={ref}
      className="border border-white/10 rounded-2xl p-6 flex flex-col gap-3 hover:border-orange-500/50 transition-colors duration-300"
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div className="text-orange-500 text-2xl">{icon}</div>
      <h3 className="font-semibold text-white text-base">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
};

const MiceColombo = () => {
  const headingRef = useRef(null);
  const imageRef = useRef(null);

  useScrollReveal(headingRef, 100);
  useScrollReveal(imageRef, 200);

  return (
    <section className="w-full bg-[#1a1a1a] py-16">
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
            Infrastructure & Facilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            The New Colombo
          </h2>
          <p className="text-gray-400 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
            Colombo has undergone a remarkable transformation — a vibrant
            metropolis with a new port city, luxury hotels, modern highways,
            and a cosmopolitan culture ready to host the world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((h, i) => (
            <ColomboCard key={i} {...h} delay={100 + i * 120} />
          ))}
        </div>

        <div
          ref={imageRef}
          className="mt-12 rounded-2xl overflow-hidden h-[480px] sm:h-[560px]"
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <img
            src="/images/colombo2.webp"
            alt="Colombo Skyline"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default MiceColombo;
