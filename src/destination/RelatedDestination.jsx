import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { useNavigate } from "react-router-dom";

const destinations = [
  {
    id: 1,
    title: "Mountain",
    subtitle: "Ella",
    tours: 20,
    image: "/images/destination/related-mountain.jpg",
    slug: "nature-trails-trekking",
  },
  {
    id: 2,
    title: "Wild Life",
    subtitle: "Yala",
    tours: 18,
    image: "/images/home/leopard.png",
    slug: "into-the-wild",
  },
  {
    id: 3,
    title: "Beach",
    subtitle: "Jaffna",
    tours: 20,
    image: "/images/destination/related-beach.jpg",
    slug: "sun-and-fun",
  },
  {
    id: 4,
    title: "Bird Watching",
    subtitle: "Polonnaruwa",
    tours: 10,
    image: "/images/destination/peacock.png",
    slug: "bird-watching",
  },
];

const RelatedCard = ({ item, index }) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  useScrollReveal(ref, index * 120);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
      className="flex flex-col items-center gap-3 cursor-pointer group"
      onClick={() => navigate(`/destination/${item.slug}`)}
    >
      {/* Oval image container */}
      <div
        className="relative overflow-hidden w-[170px] h-[210px] rounded-[50%] border-4 border-transparent group-hover:border-orange-500 transition-all duration-300"
        style={{
          borderRadius: "50% / 50%",
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Tours badge — bottom center of oval */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <span className="bg-orange-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
            {item.tours} Tours
          </span>
        </div>
      </div>

      {/* Text below oval */}
      <div className="text-center">
        <p className="text-white font-semibold text-base group-hover:text-orange-400 transition-colors">
          {item.title}
        </p>
        <p className="text-gray-500 text-xs mt-0.5">{item.subtitle}</p>
      </div>
    </div>
  );
};

const RelatedDestinations = () => {
  const headingRef = useRef(null);
  useScrollReveal(headingRef, 0);

  return (
    <section className="w-full bg-[#141414] py-14 px-4 sm:px-6">
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
        <h2 className="text-white text-3xl sm:text-4xl font-bold">
          Related Destinations
        </h2>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8 sm:gap-12 max-w-4xl mx-auto">
        {destinations.map((dest, i) => (
          <RelatedCard key={dest.id} item={dest} index={i} />
        ))}
      </div>
    </section>
  );
};

export default RelatedDestinations;