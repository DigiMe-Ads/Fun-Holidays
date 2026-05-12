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
      "Escape to Sri Lanka's finest beaches on this perfectly crafted 5-day coastal holiday. From the fishing village of Negombo — just 10 minutes from Colombo airport — to the golden south coast beaches below the UNESCO-listed city of Galle. Includes a canal boat ride, turtle hatchery visit, cookery class, and tours of Colombo and Galle.",
    slug: "golden-beach-tour",
  },
  {
    id: 2,
    title: "Best of Sri Lanka Tour",
    duration: "6 Nights / 7 Days",
    image: "/images/tours/best-sri-lanka.jpg",
    description:
      "The definitive 7-day Sri Lanka holiday — our most popular tour package. From the ancient kingdoms of Anuradhapura and the cave temples of Dambulla to Sigiriya Rock Fortress, the tea plantations of Nuwara Eliya, and a thrilling afternoon jeep safari in Yala National Park.",
    slug: "best-of-sri-lanka-tour",
  },
  {
    id: 3,
    title: "Amazing Sri Lanka Tour",
    duration: "6 Nights / 7 Days",
    image: "/images/tours/amazing-sri-lanka.jpg",
    description:
      "Venture beyond the well-trodden path and discover Sri Lanka's most extraordinary hidden treasures. The east coast — opened to tourism after a 30-year civil war — offers whale watching in Trincomalee, meeting the Veddas indigenous people, and Passikudah's pristine beaches.",
    slug: "amazing-sri-lanka-tour",
  },
  {
    id: 4,
    title: "Culture & Heritage Tour",
    duration: "7 Nights / 8 Days",
    image: "/images/tours/culture-heritage.jpg",
    description:
      "For travellers inspired by history — the ultimate Sri Lanka cultural holiday. This 8-day journey covers 5 of Sri Lanka's 8 UNESCO World Heritage Sites: Anuradhapura, Dambulla, Sigiriya, Polonnaruwa, Galle, and Kandy, bringing over 2,000 years of Sri Lankan civilisation to life.",
    slug: "culture-heritage-tour",
  },
  {
    id: 5,
    title: "Honeymoon Tour",
    duration: "8 Nights / 9 Days",
    image: "/images/tours/honeymoon.jpg",
    description:
      "Begin your forever together on Asia's most romantic island. A beautifully crafted 9-day journey balancing adventure, culture, and pure relaxation — elephant blessings at Pinnawala, a scenic train ride through misty tea plantations, Small Adam's Peak in Ella, and a private candlelit dinner on the beach.",
    slug: "honeymoon-tour",
  },
];

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
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
          Tour Packages
        </h2>
        <p className="text-gray-400 text-sm">
          One site{" "}
          <span className="text-orange-500 font-semibold">30,500+</span> most
          popular experience you'll remember
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          {leftCol.map((tour, i) => (
            <TourCard key={tour.id} tour={tour} index={i * 2} />
          ))}
        </div>
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