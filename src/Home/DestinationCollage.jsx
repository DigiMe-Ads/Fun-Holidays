import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const destinations = [
  {
    id: 1,
    title: "Sigiriya",
    subtitle: "Dambulla",
    image: "/images/home/sigiriya.jpg",
    gridClass: "row-span-2",
  },
  {
    id: 2,
    title: "Climbing Waterfalls",
    subtitle: "Ella",
    image: "/images/home/climbing.jpg",
    gridClass: "",
  },
  {
    id: 3,
    title: "Nine Arches Bridge",
    subtitle: "Ella",
    image: "/images/home/nine-arches.jpg",
    gridClass: "row-span-2 col-start-3 row-start-1",
  },
  {
    id: 4,
    title: "Buddha Statue",
    subtitle: "Bahiravokanda Viharaya",
    image: "/images/home/buddha.jpg",
    gridClass: "",
  },
  {
    id: 5,
    title: "Water Rafting Sri Lanka",
    subtitle: "Kitulgala",
    image: "/images/home/rafting.jpg",
    gridClass: "",
  },
  {
    id: 6,
    title: "Heritance Tea Factory",
    subtitle: "Kandapola",
    image: "/images/home/tea-factory.jpg",
    gridClass: "",
  },
];

const DestinationsCollage = () => {
    const ref = useRef(null);
  useScrollReveal(ref, 0);
  return (
    <section className="w-full px-6 py-4" ref={ref} style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: "1fr 1fr 1.8fr 1fr",
          gridTemplateRows: "220px 220px",
        }}
      >
        {/* Card 1 — Sigiriya: spans 2 rows, col 1 */}
        <CollageCard
          item={destinations[0]}
          style={{ gridColumn: "1", gridRow: "1 / 3" }}
          textSize="text-lg"
        />

        {/* Card 2 — Climbing Waterfalls: col 2, row 1 */}
        <CollageCard
          item={destinations[1]}
          style={{ gridColumn: "2", gridRow: "1" }}
        />

        {/* Card 3 — Nine Arches Bridge: spans 2 rows, col 3 */}
        <CollageCard
          item={destinations[2]}
          style={{ gridColumn: "3", gridRow: "1 / 3" }}
          textSize="text-lg"
        />

        {/* Card 4 — Buddha Statue: col 4, row 1 */}
        <CollageCard
          item={destinations[3]}
          style={{ gridColumn: "4", gridRow: "1" }}
        />

        {/* Card 5 — Water Rafting: col 2, row 2 */}
        <CollageCard
          item={destinations[4]}
          style={{ gridColumn: "2", gridRow: "2" }}
        />

        {/* Card 6 — Tea Factory: col 4, row 2 */}
        <CollageCard
          item={destinations[5]}
          style={{ gridColumn: "4", gridRow: "2" }}
        />
      </div>
    </section>
  );
};

const CollageCard = ({ item, style, textSize = "text-base" }) => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl cursor-pointer group"
      style={style}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay — bottom only */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Text — bottom left */}
      <div className="absolute bottom-4 left-4 text-white">
        <p className={`${textSize} font-bold drop-shadow-md leading-snug`}>
          {item.title}
        </p>
        <p className="text-xs text-gray-300 mt-0.5">{item.subtitle}</p>
      </div>
    </div>
  );
};

export default DestinationsCollage;