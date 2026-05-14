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
        title: "The Kandy Perahera",
        image: "/images/destination/kandy-perehara.webp",
        description:
          "One of the most extraordinary spectacles in all of Asia — a living, breathing festival performed without interruption for over 400 years. Fire dancers spin flaming torches, whip dancers crack echoes across the hillsides, and the magnificent Maligawa Tusker carries the Sacred Tooth Relic through thousands of lights. The Perahera cannot be missed.",
      },
      {
        id: 2,
        title: "Nature Trails & Trekking",
        image: "/images/destination/nature-trail.jpg",
        description:
          "From the sheer 900-metre escarpment of World's End at Horton Plains to the pre-dawn pilgrimage up Adam's Peak, Sri Lanka's landscapes were made for exploration on foot. The Knuckles Range, Sinharaja rainforest, and Ella's tea country trails each offer a completely different and unforgettable trekking experience.",
      },
      {
        id: 3,
        title: "Witness Dolphins & Whales",
        image: "/images/destination/dolphins.jpg",
        description:
          "The waters off Mirissa and Dondra Point are among the world's most reliable locations for blue whale encounters — the largest creatures ever to have lived on Earth. Spinner dolphins, sperm whales, and humpbacks are also regularly seen. An early morning boat tour into the Indian Ocean creates moments of pure, breathtaking awe.",
      },
      {
        id: 4,
        title: "Into the Wild",
        image: "/images/destination/leopard-tree.jpg",
        description:
          "Yala National Park holds the world's highest density of wild leopards. Your jeep slows — a female leopard regards you from 15 metres with magnificent calm. Elephants cross the road. A sloth bear shuffles through the undergrowth. Beyond Yala, Udawalawe offers reliable elephant herds and Wilpattu provides a wilder, more remote safari experience.",
      },
      {
        id: 5,
        title: "Sun and Fun",
        image: "/images/destination/sunset-beach.jpg",
        description:
          "Over 1,300 kilometres of stunning coastline — Sri Lanka's beaches rival Bali and Phuket and are far less crowded. The south and west coasts shine from November to April; the pristine east coast comes alive from May to September. From Hikkaduwa's coral reef to Passikudah's translucent lagoon, outstanding beach conditions await year-round.",
      },
      {
        id: 6,
        title: "The Elephant Gathering",
        image: "/images/destination/elephants-gather.jpg",
        description:
          "Every year between May and September, over 300 wild elephants converge on Minneriya National Park — the largest congregation of wild Asian elephants on Earth. Giant bulls compete at the water's edge. Calves splash in the shallows. Comparable in drama to the Serengeti migration, yet almost entirely unknown outside Sri Lanka.",
      },
      {
        id: 7,
        title: "Surfing the Coast",
        image: "/images/destination/surfing.jpg",
        description:
          "Arugam Bay is globally celebrated as one of Asia's finest surf destinations. Long, consistent right-handers suit every level from first-timers to seasoned pros. The laid-back fishing village atmosphere, warm Indian Ocean waters, and reliable May–September season keep travellers returning year after year.",
      },
      {
        id: 8,
        title: "Whitewater Rafting",
        image: "/images/destination/rafting.jpg",
        description:
          "Kitulgala is Sri Lanka's adventure capital. The Kelani River delivers thrilling grade 3–4 rapids — School Master, Killer Falls, The Destroyer — weaving through dense tropical rainforest. Also the filming location of the Academy Award-winning 'The Bridge on the River Kwai'. Adrenaline meets extraordinary history.",
      },
      {
        id: 9,
        title: "Bird Watching",
        image: "/images/destination/peacock.png",
        description:
          "Sri Lanka is a world-class birding destination with over 230 species including 33 endemics found nowhere else on Earth. Sinharaja Forest Reserve, Horton Plains, and Bundala wetlands each harbour remarkable birdlife — from the elusive Serendib scops owl to vast flocks of painted storks rising at dawn over ancient lagoons.",
      },
    ],
  },
  // { id: 2, activities: [] },
  // { id: 3, activities: [] },
  // { id: 4, activities: [] },
  // { id: 5, activities: [] },
];

const ROW_HEIGHT = 175;

const rowColTemplates = [
  "grid-cols-[1fr_1.5fr_1fr]",
  "grid-cols-[1.5fr_1fr_1fr]",
  "grid-cols-3",
];

const slideDirection = {
  0: "right",
  1: "center", // overlay directly on top of the card
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
      navigate(`/destination/${toSlug(item.title)}`);
    } else {
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
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div className="absolute bottom-3 left-4 text-white z-10">
        <p className="font-semibold text-sm drop-shadow">{item.title}</p>
      </div>

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

          // Center cards overlay on top; left/right cards slide out from the edge
          const panelStyle =
            dir === "center"
              ? {
                  inset: 0,
                  animation: "fadeUp 0.3s cubic-bezier(0.22,1,0.36,1) both",
                }
              : {
                  top: 0,
                  height: ROW_HEIGHT,
                  width: "160%",
                  ...(dir === "right"
                    ? { left: "calc(100% - 16px)" }
                    : { right: "calc(100% - 16px)" }),
                  animation: `slideIn-${dir} 0.3s cubic-bezier(0.22,1,0.36,1) both`,
                };

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

              {/* Description panel */}
              {isHovered && (
                <div
                  className="absolute z-30 rounded-2xl flex flex-col justify-between px-6 py-5"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(25,25,25,0.97) 0%, rgba(45,45,45,0.92) 100%)",
                    backdropFilter: "blur(4px)",
                    ...panelStyle,
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