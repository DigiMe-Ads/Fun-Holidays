import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const ROW_HEIGHT = 175;

const rowColTemplates = [
  "grid-cols-[1fr_1.5fr_1fr]",
  "grid-cols-[1.5fr_1fr_1fr]",
  "grid-cols-3",
];

const slideDirection = {
  0: "right",
  1: "center",
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
      navigate(`/destination/${item.slug}`);
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
            <p className="text-white font-semibold text-sm mb-2">{item.title}</p>
            <p className="text-gray-300 text-xs leading-relaxed">{item.description}</p>
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
              key={item.slug}
              className="relative rounded-2xl cursor-pointer group"
              style={{ height: ROW_HEIGHT }}
              onMouseEnter={() => setHovered({ rowIdx, colIdx })}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onCardClick(item.slug)}
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-3 left-4 text-white z-10">
                <p className="font-semibold text-sm leading-snug drop-shadow">
                  {item.title}
                </p>
              </div>

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
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const textRef = useRef(null);
  const gridRef = useRef(null);

  useScrollReveal(textRef, 100);
  useScrollReveal(gridRef, 250);

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "destinations"))
      .then((snap) => {
        const data = snap.docs
          .map((d) => ({
            slug:        d.id,
            title:       d.data().title,
            image:       d.data().thumbnail || d.data().heroImage || "",
            description: Array.isArray(d.data().overview)
              ? d.data().overview[0] || ""
              : d.data().overview || "",
          }))
          .filter((d) => d.title)
          .slice(0, 9); // grid shows exactly 9
        setActivities(data);
      })
      .catch((err) => console.error("Failed to load destinations:", err));
  }, []);

  const rows = [
    activities.slice(0, 3),
    activities.slice(3, 6),
    activities.slice(6, 9),
  ];

  const handleCardClick = (slug) => {
    navigate(`/destination/${slug}`);
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
        {activities.length === 0 ? null : (
          <>
            {/* Mobile */}
            <div className="grid grid-cols-2 gap-3 md:hidden">
              {activities.map((item, i) => (
                <MobileCard key={item.slug} item={item} index={i} />
              ))}
            </div>

            {/* Desktop */}
            <DesktopGrid
              rows={rows}
              hovered={hovered}
              setHovered={setHovered}
              onCardClick={handleCardClick}
            />
          </>
        )}
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
