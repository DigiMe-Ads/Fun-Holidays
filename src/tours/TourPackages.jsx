import { useRef, useState, useEffect } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const TourCard = ({ tour, index }) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  useScrollReveal(ref, index * 100);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
      className="flex flex-col sm:flex-row rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300 bg-white cursor-pointer"
      onClick={() => navigate(`/tours/${tour.slug}`)}
    >
      {/* Image */}
      <div className="relative w-full sm:w-[220px] shrink-0 h-52 sm:h-auto">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow hover:bg-orange-50 transition-colors"
        >
          <FaHeart className="text-gray-300 hover:text-orange-500 text-xs transition-colors" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-5 flex-1">
        <div className="flex flex-col gap-2">
          <p className="text-gray-400 text-xs font-medium">{tour.duration}</p>
          <h3 className="text-gray-900 font-bold text-lg leading-snug">
            {tour.title}
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-4">
            {tour.description}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/tours/${tour.slug}`);
          }}
          className="mt-4 bg-gray-900 hover:bg-orange-500 transition-colors text-white text-xs font-semibold px-5 py-2.5 rounded-lg w-fit"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

const TourPackages = () => {
  const headingRef = useRef(null);
  useScrollReveal(headingRef, 0);

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "tours"))
      .then((snap) => {
        const data = snap.docs
          .map((d) => ({ ...d.data(), slug: d.id }))
          .filter((t) => t.published !== false);
        setTours(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load tours:", err);
        setLoading(false);
      });
  }, []);

  const leftCol = tours.filter((_, i) => i % 2 === 0);
  const rightCol = tours.filter((_, i) => i % 2 !== 0);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <div
        ref={headingRef}
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
        className="text-center mb-10"
      >
        <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-2">
          Tour Packages
        </h2>
        <p className="text-gray-400 text-sm">
          One site{" "}
          <span className="text-orange-500 font-semibold">30,500+</span> most
          popular experience you'll remember
        </p>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-sm">Loading tour packages…</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col gap-5">
            {leftCol.map((tour, i) => (
              <TourCard key={tour.slug} tour={tour} index={i * 2} />
            ))}
          </div>
          <div className="flex flex-col gap-5">
            {rightCol.map((tour, i) => (
              <TourCard key={tour.slug} tour={tour} index={i * 2 + 1} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TourPackages;
