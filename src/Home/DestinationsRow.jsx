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
      className="flex flex-col items-center gap-2 sm:gap-3"
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {/* Image */}
      <div className="w-full h-[180px] sm:h-[260px] lg:h-[380px] rounded-2xl overflow-hidden group cursor-pointer">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Label */}
      <p className="text-gray-700 text-xs sm:text-sm font-medium text-center">
        {item.title}
      </p>
    </div>
  );
};

const DestinationsRow = () => {
  return (
    <section className="w-full px-3 sm:px-6 py-6 sm:py-8">

      {/* ── Mobile: 2×3 grid ─────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {destinations.map((dest, i) => (
          <DestinationCard key={dest.id} item={dest} index={i} />
        ))}
      </div>

      {/* ── Tablet: 3-column grid ─────────────────────────── */}
      <div className="hidden sm:grid md:hidden grid-cols-3 gap-3">
        {destinations.map((dest, i) => (
          <DestinationCard key={dest.id} item={dest} index={i} />
        ))}
      </div>

      {/* ── Desktop: 5-column flex row ────────────────────── */}
      <div className="hidden md:flex gap-4 py-9">
        {destinations.map((dest, i) => (
          <DestinationCard
            key={dest.id}
            item={dest}
            index={i}
            className="flex-1"
          />
        ))}
      </div>

    </section>
  );
};

export default DestinationsRow;