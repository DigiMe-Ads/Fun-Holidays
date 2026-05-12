import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toSlug } from "../pages/DestinationDetailPage";
import useScrollReveal from "../hooks/useScrollReveal";

const slides = [
  {
    id: 1,
    activities: [
      {
        id: 1,
        title: "Climb Sigiriya",
        image: "/images/destination/sigiriya-aerial.jpg",
        description:
          "Discover King Kassapa's hideaway, perched on a rock among a lush forest. The 2 hr climb up the magnificent Sigiriya Rock Fortress leaves you breathless with its scenic views, explaining why the King picked this location to build his kingdom.",
      },
      {
        id: 2,
        title: "Adam's Peak",
        image: "/images/destination/sigiriya-aerial2.jpg",
        description:
          "Sri Lanka's most sacred mountain, Adam's Peak is a challenging and rewarding climb best done before dawn to witness the breathtaking sunrise over the misty hills.",
      },
      {
        id: 3,
        title: "Witness Dolphins & Whales",
        image: "/images/destination/dolphins.jpg",
        description:
          "Head out to the deep blue waters off Mirissa or Trincomalee for an unforgettable encounter with spinner dolphins and majestic blue whales in their natural habitat.",
      },
      {
        id: 4,
        title: "Into the Wild",
        image: "/images/destination/leopard-tree.jpg",
        description:
          "Yala National Park is home to the world's highest density of leopards. Spot these elusive big cats lounging in trees or stalking prey through the dry scrub jungle.",
      },
      {
        id: 5,
        title: "Sun and Fun",
        image: "/images/destination/sunset-beach.jpg",
        description:
          "Sri Lanka's southern and eastern coastlines offer pristine golden beaches, turquoise waters, and epic sunsets — perfect for unwinding after days of adventure.",
      },
      {
        id: 6,
        title: "Witness the Elephant Gathering",
        image: "/images/destination/elephants-gather.jpg",
        description:
          "Minneriya National Park hosts the world's largest wild elephant gathering every year. Hundreds of elephants congregate around the ancient reservoir in a truly awe-inspiring spectacle.",
      },
      {
        id: 7,
        title: "Surfing the Coast",
        image: "/images/destination/surfing.jpg",
        description:
          "Arugam Bay on Sri Lanka's east coast is one of Asia's top surf destinations. Whether you're a beginner or a pro, the consistent waves and laid-back vibe make it unmissable.",
      },
      {
        id: 8,
        title: "Whitewater Rafting",
        image: "/images/destination/rafting.jpg",
        description:
          "The Kelani River near Kitulgala offers thrilling grade 3–4 rapids through lush rainforest. It's an adrenaline-pumping experience set against Sri Lanka's most beautiful scenery.",
      },
      {
        id: 9,
        title: "Bird Watching",
        image: "/images/destination/peacock.png",
        description:
          "Sri Lanka is a birder's paradise with over 230 endemic and migratory species. From vibrant peacocks to the rare Sri Lanka blue magpie, the island's national parks teem with colour and song.",
      },
    ],
  },
  { id: 2, activities: [] },
  { id: 3, activities: [] },
  { id: 4, activities: [] },
  { id: 5, activities: [] },
];

const ROW_HEIGHT = 175;

const rowColTemplates = [
  "grid-cols-[1fr_1.5fr_1fr]",
  "grid-cols-[1.5fr_1fr_1fr]",
  "grid-cols-3",
];

const slideDirection = {
  0: "right",
  1: null,
  2: "left",
};

// ─── Mobile card ─────────────────────────────────────────────────────────────
const MobileCard = ({ item, index }) => {
  const [tapped, setTapped] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  useScrollReveal(ref, index * 80);

  const handleTap = () => {
    if (tapped) {
      // Second tap → navigate
      navigate(`/destination/${toSlug(item.title)}`);
    } else {
      // First tap → show description
      setTapped(true);
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      className="relative h-48 rounded-2xl overflow-hidden cursor-pointer"
      onClick={handleTap}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Title always visible */}
      <div className="absolute bottom-3 left-4 text-white z-10">
        <p className="font-semibold text-sm drop-shadow">{item.title}</p>
      </div>

      {/* Description overlay on first tap */}
      {tapped && (
        <div
          className="absolute inset-0 z-20 flex flex-col justify-between px-5 py-4 rounded-2xl"
          style={{
            background: "rgba(20,20,20,0.93)",
            backdropFilter: "blur(4px)",
            animation: "fadeUp 0.25s ease both",
          }}
        >
          <div>
            <p className="text-white font-semibold text-sm mb-2">
              {item.title}
            </p>
            <p className="text-gray-300 text-xs leading-relaxed">
              {item.description}
            </p>
          </div>
          <p className="text-orange-400 text-[10px] font-medium mt-2">
            Tap again to explore →
          </p>
        </div>
      )}
    </div>
  );
};

// ─── Desktop grid ─────────────────────────────────────────────────────────────
const DesktopGrid = ({ rows, hovered, setHovered, onCardClick }) => (
  <div className="flex-col gap-3 hidden md:flex">
    {rows.map((row, rowIdx) => (
      <div
        key={rowIdx}
        className={`grid gap-3 relative ${rowColTemplates[rowIdx]}`}
        style={{ height: ROW_HEIGHT }}
      >
        {row.map((item, colIdx) => {
          const isHovered =
            hovered?.rowIdx === rowIdx && hovered?.colIdx === colIdx;
          const dir = slideDirection[colIdx];
          const showPanel = isHovered && dir !== null;

          return (
            <div
              key={item.id}
              className="relative rounded-2xl cursor-pointer group"
              style={{ height: ROW_HEIGHT }}
              onMouseEnter={() => setHovered({ rowIdx, colIdx })}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onCardClick(item.title)}
            >
              {/* Image — clipped inside inner div */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Title */}
              <div className="absolute bottom-3 left-4 text-white z-10">
                <p className="font-semibold text-sm leading-snug drop-shadow">
                  {item.title}
                </p>
              </div>

              {/* Sliding description panel */}
              {showPanel && (
                <div
                  className="absolute top-0 z-30 rounded-2xl flex flex-col justify-between px-6 py-5"
                  style={{
                    height: ROW_HEIGHT,
                    width: "160%",
                    ...(dir === "right"
                      ? { left: "100%", marginLeft: "12px" }
                      : { right: "100%", marginRight: "12px" }),
                    background:
                      "linear-gradient(135deg, rgba(25,25,25,0.97) 0%, rgba(45,45,45,0.92) 100%)",
                    backdropFilter: "blur(4px)",
                    animation: `slideIn-${dir} 0.3s cubic-bezier(0.22,1,0.36,1) both`,
                  }}
                >
                  <p className="text-white text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-orange-400 text-xs font-medium mt-2">
                    Click to explore →
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const ActivitiesGrid = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const textRef = useRef(null);
  const gridRef = useRef(null);

  useScrollReveal(textRef, 100);
  useScrollReveal(gridRef, 250);

  const activities = slides[activeSlide].activities;
  const rows = [
    activities.slice(0, 3),
    activities.slice(3, 6),
    activities.slice(6, 9),
  ];

  const handleCardClick = (title) => {
    navigate(`/destination/${toSlug(title)}`);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Intro Text */}
      <div
        ref={textRef}
        style={{
          opacity: 0,
          transform: "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
        className="mb-8"
      >
        <p className="text-gray-600 text-sm leading-relaxed">
          With a range of fun activities catering to the many needs of our
          diverse guests from around the world, Sri Lanka is definitely the
          laughing island. Experience its wonders by enriching your soul with
          rich culture and heritage, enchant yourself with mesmerizing views of
          misty hills and endless beaches, excite yourself with exhilarating
          adventure and thrills, and explore this paradise island from coast to
          coast.
        </p>
      </div>

      {/* Grids */}
      <div
        ref={gridRef}
        style={{
          opacity: 0,
          transform: "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Mobile — 2 col, tap once for description, tap again to navigate */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {activities.map((item, i) => (
            <MobileCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Desktop — hover sliding panel, click to navigate */}
        <DesktopGrid
          rows={rows}
          hovered={hovered}
          setHovered={setHovered}
          onCardClick={handleCardClick}
        />
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-3 mt-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeSlide
                ? "w-3 h-3 bg-orange-500"
                : "w-3 h-3 bg-transparent border-2 border-gray-400 hover:border-orange-400"
            }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes slideIn-right {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideIn-left {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default ActivitiesGrid;