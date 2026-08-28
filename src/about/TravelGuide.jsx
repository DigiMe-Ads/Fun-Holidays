import { useRef, useState, useEffect } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

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
      <div className="w-40 h-40 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-orange-400 transition-all duration-300">
        <img
          src={guide.image}
          alt={guide.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
        />
      </div>
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

  const [guides, setGuides] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "team"))
      .then((snap) => {
        const data = snap.docs
          .map((d) => ({ ...d.data(), firestoreId: d.id }))
          .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
        setGuides(data);
      })
      .catch((err) => console.error("Failed to load team:", err));
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 py-14">
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

      <div className="flex flex-wrap justify-center gap-10 sm:gap-16 max-w-4xl mx-auto">
        {guides.map((guide, i) => (
          <GuideCard key={guide.firestoreId} guide={guide} index={i} />
        ))}
      </div>
    </section>
  );
};

export default TravelGuides;
