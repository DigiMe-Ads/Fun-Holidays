import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const destinations = [
  {
    id: 1,
    title: "Sigiriya",
    subtitle: "Dambulla",
    image: "/images/home/sigiriya.jpg",
  },
  {
    id: 2,
    title: "Climbing Waterfalls",
    subtitle: "Ella",
    image: "/images/home/climbing.jpg",
  },
  {
    id: 3,
    title: "Nine Arches Bridge",
    subtitle: "Ella",
    image: "/images/home/nine-arches.jpg",
  },
  {
    id: 4,
    title: "Buddha Statue",
    subtitle: "Bahiravokanda Viharaya",
    image: "/images/home/buddha.jpg",
  },
  {
    id: 5,
    title: "Water Rafting Sri Lanka",
    subtitle: "Kitulgala",
    image: "/images/home/rafting.jpg",
  },
  {
    id: 6,
    title: "Heritance Tea Factory",
    subtitle: "Kandapola",
    image: "/images/home/tea-factory.jpg",
  },
];

const CollageCard = ({ item, className = "", style = {} }) => (
  <div
    className={`relative overflow-hidden rounded-2xl cursor-pointer group ${className}`}
    style={style}
  >
    <img
      src={item.image}
      alt={item.title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-white">
      <p className="text-sm sm:text-base font-bold drop-shadow-md leading-snug">
        {item.title}
      </p>
      <p className="text-xs text-gray-300 mt-0.5">{item.subtitle}</p>
    </div>
  </div>
);

const DestinationsCollage = () => {
  const ref = useRef(null);
  useScrollReveal(ref, 0);

  return (
    <section
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
      className="w-full px-3 sm:px-6 py-4"
    >
      {/* ── Mobile: 2-column uniform grid ───────────────────────── */}
      <div className="grid grid-cols-2 gap-2 sm:hidden">
        {destinations.map((item) => (
          <CollageCard
            key={item.id}
            item={item}
            className="h-40"
          />
        ))}
      </div>

      {/* ── Tablet: 3-column simplified grid ────────────────────── */}
      <div className="hidden sm:grid md:hidden gap-2"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "180px 180px",
        }}
      >
        {/* Sigiriya spans 2 rows */}
        <CollageCard
          item={destinations[0]}
          style={{ gridColumn: "1", gridRow: "1 / 3" }}
        />
        <CollageCard item={destinations[1]} style={{ gridColumn: "2", gridRow: "1" }} />
        <CollageCard item={destinations[2]} style={{ gridColumn: "3", gridRow: "1" }} />
        <CollageCard item={destinations[3]} style={{ gridColumn: "2", gridRow: "2" }} />
        <CollageCard item={destinations[4]} style={{ gridColumn: "3", gridRow: "2" }} />
      </div>

      {/* ── Desktop: full asymmetric collage ────────────────────── */}
      <div
        className="hidden md:grid gap-3"
        style={{
          gridTemplateColumns: "1fr 1fr 1.8fr 1fr",
          gridTemplateRows: "220px 220px",
        }}
      >
        {/* Sigiriya — col 1, spans 2 rows */}
        <CollageCard
          item={destinations[0]}
          style={{ gridColumn: "1", gridRow: "1 / 3" }}
        />
        {/* Climbing Waterfalls — col 2, row 1 */}
        <CollageCard
          item={destinations[1]}
          style={{ gridColumn: "2", gridRow: "1" }}
        />
        {/* Nine Arches — col 3, spans 2 rows */}
        <CollageCard
          item={destinations[2]}
          style={{ gridColumn: "3", gridRow: "1 / 3" }}
        />
        {/* Buddha Statue — col 4, row 1 */}
        <CollageCard
          item={destinations[3]}
          style={{ gridColumn: "4", gridRow: "1" }}
        />
        {/* Water Rafting — col 2, row 2 */}
        <CollageCard
          item={destinations[4]}
          style={{ gridColumn: "2", gridRow: "2" }}
        />
        {/* Tea Factory — col 4, row 2 */}
        <CollageCard
          item={destinations[5]}
          style={{ gridColumn: "4", gridRow: "2" }}
        />
      </div>
    </section>
  );
};

export default DestinationsCollage;