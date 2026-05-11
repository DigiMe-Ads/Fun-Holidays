import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const tours = [
  {
    id: 1,
    title: "Golden Beach Tour",
    duration: "4 Nights / 5 Days",
    image: "/images/tours/golden-beach.jpg",
    description:
      "Explore Sri Lanka's golden soft sand beaches from coast to coast with the Golden Beach Package Tour. The first beach destination is Negombo just a 10-minute drive from the airport, taking you to your first golden beach as soon as you arrive.",
    slug: "golden-beach-tour",
  },
  {
    id: 2,
    title: "Best of Sri Lanka Tour",
    duration: "6 Nights / 7 Days",
    image: "/images/tours/best-sri-lanka.jpg",
    description:
      "From the ancient kingdom of Anuradhapura to one of the world's only elephant orphanages, we make sure you experience the best of Sri Lanka within 7 days. Relax and enjoy this classical tour as we take you through the wonders of our laughing island.",
    slug: "best-of-sri-lanka-tour",
  },
  {
    id: 3,
    title: "Amazing Sri Lanka Tour",
    duration: "6 Nights / 7 Days",
    image: "/images/tours/amazing-sri-lanka.jpg",
    description:
      "Since the end of a 26-year civil war, Sri Lanka's hidden treasures in the East of the island have travelled from around the world. From getting close views of whales and dolphins to bathing in hot spring custom local hot water springs, be ready to be truly amazed.",
    slug: "amazing-sri-lanka-tour",
  },
  {
    id: 4,
    title: "Culture & Heritage Tour",
    duration: "7 Nights / 8 Days",
    image: "/images/tours/culture-heritage.jpg",
    description:
      "With over 2,000 years of rich history, Sri Lanka is an island that boasts of ancient kingdoms built with garden cities, rock fortresses, and endless lakes ruled by monarchs of legendary personalities. Visit the ruins and amaze yourself with the stories that are brought to life on this tour.",
    slug: "culture-heritage-tour",
  },
  {
    id: 5,
    title: "Honeymoon Tour",
    duration: "8 Nights / 9 Days",
    image: "/images/tours/honeymoon.jpg",
    description:
      "From star-studded skies in deep blue oceans amidst a backdrop of pink canopy sunsets, this paradise island has lured lovers from around the world for years. The soothing cool climates and misty hills, whisper calming melodies, as the pearl-white waves as they gently kiss the golden sands.",
    slug: "honeymoon-tour",
  },
];

const TourCard = ({ tour, index, reverse }) => {
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
      className="flex flex-col sm:flex-row gap-0 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300 bg-white"
    >
      {/* Image */}
      <div className="relative w-full sm:w-[220px] shrink-0 h-52 sm:h-auto">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        {/* Wishlist button */}
        <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow hover:bg-orange-50 transition-colors">
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
          onClick={() => navigate(`/tours/${tour.slug}`)}
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

  // Split into two columns
  const leftCol = tours.filter((_, i) => i % 2 === 0);
  const rightCol = tours.filter((_, i) => i % 2 !== 0);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-14">
      {/* Heading */}
      <div
        ref={headingRef}
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
          Tour Packages
        </h2>
        <p className="text-gray-400 text-sm">
          One site{" "}
          <span className="text-orange-500 font-semibold">30,500+</span> most
          popular experience you'll remember
        </p>
      </div>

      {/* Two-column grid — stacks on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          {leftCol.map((tour, i) => (
            <TourCard key={tour.id} tour={tour} index={i * 2} />
          ))}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {rightCol.map((tour, i) => (
            <TourCard key={tour.id} tour={tour} index={i * 2 + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourPackages;