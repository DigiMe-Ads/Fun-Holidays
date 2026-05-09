import { useEffect, useRef } from "react";


const destinations = [
  {
    id: 1,
    title: "Underwater Dive",
    image: "/images/home/underwater.jpg",
  },
  {
    id: 2,
    title: "Kalutara South",
    image: "/images/home/kalutara.jpg",
  },
  {
    id: 3,
    title: "Nuwara Eliya",
    image: "/images/home/nuwara-eliya.jpg",
  },
  {
    id: 4,
    title: "Galle",
    image: "/images/home/galle.jpg",
  },
  {
    id: 5,
    title: "Wildlife Safaris",
    image: "/images/home/wildlife.jpg",
  },
];

// Reusable scroll animation hook
const useScrollReveal = (ref, delay = 0) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, delay]);
};

const DestinationCard = ({ item, index }) => {
  const cardRef = useRef(null);
  useScrollReveal(cardRef, index * 100);

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center gap-3 flex-1 py-9"
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {/* Image */}
      <div className="w-full h-[380px] rounded-2xl overflow-hidden group cursor-pointer">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Label */}
      <p className="text-gray-700 text-sm font-medium text-center">
        {item.title}
      </p>
    </div>
  );
};

const DestinationsRow = () => {
  const headingRef = useRef(null);
  useScrollReveal(headingRef, 0);

  return (
    <section className="w-full px-6 py-8">
      <div className="flex gap-4">
        {destinations.map((dest, i) => (
          <DestinationCard key={dest.id} item={dest} index={i} />
        ))}
      </div>
    </section>
  );
};

export default DestinationsRow;