import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const guides = [
  {
    id: 1,
    name: "Emma Williams",
    role: "Senior Tour Guide",
    image: "/images/about/guide-emma.jpg",
  },
  {
    id: 2,
    name: "James Anderson",
    role: "Travel Specialist",
    image: "/images/about/guide-james.jpg",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    role: "Cultural Guide",
    image: "/images/about/guide-sophia.jpg",
  },
  {
    id: 4,
    name: "Ava Thompson",
    role: "Holiday Planner",
    image: "/images/about/guide-ava.jpg",
  },
];

const GuideCard = ({ guide, index }) => {
  const ref = useRef(null);
  useScrollReveal(ref, index * 120);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
      className="flex flex-col items-center gap-3 group cursor-pointer"
    >
      {/* Circular image */}
      <div className="w-40 h-40 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-orange-400 transition-all duration-300">
        <img
          src={guide.image}
          alt={guide.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Name + role */}
      <div className="text-center">
        <p className="text-gray-800 text-sm font-medium">{guide.name}</p>
        <p className="text-gray-400 text-xs mt-0.5">{guide.role}</p>
      </div>
    </div>
  );
};

const TravelGuides = () => {
  const headingRef = useRef(null);
  useScrollReveal(headingRef, 0);

  return (
    <section className="w-full px-4 sm:px-6 py-14">
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
        <h2 className="text-5xl sm:text-6xl font-semibold text-gray-900">
          Meet Our Travel Guide
        </h2>
      </div>

      {/* Guide cards */}
      <div className="flex flex-wrap justify-center gap-10 sm:gap-16 max-w-4xl mx-auto">
        {guides.map((guide, i) => (
          <GuideCard key={guide.id} guide={guide} index={i} />
        ))}
      </div>
    </section>
  );
};

export default TravelGuides;