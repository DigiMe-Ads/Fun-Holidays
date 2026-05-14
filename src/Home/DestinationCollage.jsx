import { useRef, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { useNavigate } from "react-router-dom";

const allSlides = [
  // ── Slide 1 ─────────────────────────────────────────────────
  [
    {
      id: 1,
      title: "Climb Sigiriya Rock Fortress",
      subtitle: "Dambulla · UNESCO Heritage",
      image: "/images/home/sigiriya.jpg",
      description:
        "Scale one of Asia's most dramatic landmarks — the 5th-century Sigiriya Rock Fortress rising 200 metres above the surrounding jungle. Panoramic views, ancient frescoes, and the sheer wonder of King Kassapa's extraordinary sky palace.",
      meta: "Year-round · Half day · Moderate",
    },
    {
      id: 2,
      title: "Expedition to Adam's Peak (Sri Pada)",
      subtitle: "Sri Pada · Sacred Mountain",
      image: "/images/destination/sigiriya-aerial2.jpg",
      description:
        "A sacred footprint at the summit draws all four of Sri Lanka's major religions. The steep pre-dawn climb is rewarded with one of the most spectacular sunrises in Asia — an authentic Sri Lanka experience unlike any other.",
      meta: "December–May · Half day (night climb) · Challenging",
    },
    {
      id: 3,
      title: "Nine Arches Bridge",
      subtitle: "Ella",
      image: "/images/home/nine-arches.jpg",
      description:
        "One of Sri Lanka's most iconic landmarks — a masterpiece of colonial-era engineering set against lush green jungle. Time your visit for the historic blue train crossing in golden morning light.",
      meta: "Year-round · 2 hours · Easy",
    },
    {
      id: 4,
      title: "Whale Watching — Mirissa & Trincomalee",
      subtitle: "Mirissa & Trincomalee",
      image: "/images/destination/dolphins/dolphins-6.webp",
      description:
        "Sri Lanka is one of the world's best destinations for whale watching. Regular sightings of blue whales, humpback whales, sperm whales, and pods of spinner and bottlenose dolphins in extraordinary open ocean.",
      meta: "Nov–Apr (south) · Mar–Apr (east) · Half day",
    },
    {
      id: 5,
      title: "Wildlife Safari — Into the Wild",
      subtitle: "Yala · Udawalawe · Wilpattu",
      image: "/images/destination/leopard-tree.jpg",
      description:
        "From the world's highest density of wild leopards at Yala to the open grassland elephant herds of Udawalawe — guided jeep safaris take you into some of the continent's most extraordinary natural habitats.",
      meta: "Year-round · Half day · Parks: Yala, Udawalawe, Wilpattu",
    },
    {
      id: 6,
      title: "Sun & Sea — Asian Beach Holidays",
      subtitle: "South & East Coast",
      image: "/images/destination/beach/beach-6.jpg",
      description:
        "Sri Lanka's beaches are among the finest in Asia. Golden sands from Negombo to Mirissa and Unawatuna. Swim, snorkel, paddleboard, surf, or sway in a hammock with your favourite drink.",
      meta: "Nov–Apr (south/west) · May–Sep (east) · As long as you like",
    },
  ],

  // ── Slide 2 ─────────────────────────────────────────────────
  [
    {
      id: 7,
      title: "Witness the Elephant Gathering — Minneriya",
      subtitle: "Minneriya National Park",
      image: "/images/destination/elephants/elephant-7.jpg",
      description:
        "Between May and September, over 300 wild elephants converge around the ancient Minneriya Tank in one of the most spectacular wildlife gatherings on earth. Nowhere else in Asia can you witness anything like it.",
      meta: "May–September · Half day safari · Minneriya",
    },
    {
      id: 8,
      title: "Surf Sri Lanka's Coast",
      subtitle: "Arugam Bay · Weligama · Hikkaduwa",
      image: "/images/destination/surfing/surf-5.webp",
      description:
        "Sri Lanka offers world-class surfing year-round. Arugam Bay is a legendary surf destination ranked among Asia's top spots. Hikkaduwa, Weligama, and Midigama offer excellent breaks for beginners and seasoned surfers alike.",
      meta: "Nov–Apr (south) · Apr–Sep (east) · All levels",
    },
    {
      id: 9,
      title: "Whitewater Rafting",
      subtitle: "Kitulgala · Kelani River",
      image: "/images/destination/rafting/raft-5.jpg",
      description:
        "The Kelani River near Kitulgala offers Grade 3–4 rapids through lush rainforest — School Master, Killer Falls, and The Destroyer. Also the filming location of the Oscar-winning 'Bridge on the River Kwai'.",
      meta: "Year-round · Half day · Moderate–Challenging",
    },
    {
      id: 10,
      title: "Bird Watching in Sri Lanka",
      subtitle: "Sinharaja · Bundala · Horton Plains",
      image: "/images/destination/birds/bird-7.jpg",
      description:
        "With over 400 species including 33 endemics found nowhere else on Earth, Sri Lanka is one of Asia's premier birding destinations. From the colourful Indian roller to the rare Sri Lanka blue magpie.",
      meta: "November–March · Sinharaja, Bundala, Horton Plains",
    },
    {
      id: 11,
      title: "The Kandy Perahera Festival",
      subtitle: "Kandy · 400 Years of Tradition",
      image: "/images/destination/kandy/kandy-perehara-1.jpg",
      description:
        "One of the most spectacular cultural festivals in Asia — held every July and August for over 400 years. Decorated elephants, fire dancers, whip crackers, and the sacred Tooth Relic across 10 extraordinary nights.",
      meta: "July–August · 10 nights · Kandy",
    },
    {
      id: 12,
      title: "Meet the Veddas — Sri Lanka's Indigenous People",
      subtitle: "Mahiyanganaya",
      image: "/images/home/Veddas.jpg",
      description:
        "The Veddas — Sri Lanka's indigenous people — have a history stretching to the 5th century BC. Visiting a Vedda village offers one of the most genuinely authentic cultural experiences available anywhere in the world.",
      meta: "Year-round · Half day · Mahiyanganaya",
    },
  ],

  // ── Slide 3 ─────────────────────────────────────────────────
  [
    {
      id: 13,
      title: "Snorkelling & Diving",
      subtitle: "Trincomalee · Hikkaduwa · Bar Reef",
      image: "/images/home/Diving.jpg",
      description:
        "Crystal-clear waters, vibrant coral reefs, and abundant marine life. From colourful reef fish and sea turtles to whale sharks and stingrays. Top spots include Pigeon Island in Trincomalee and Hikkaduwa Marine National Park.",
      meta: "Nov–Apr (west/south) · May–Sep (east) · All levels",
    },
    {
      id: 14,
      title: "Cave Exploration — Dambulla & Beyond",
      subtitle: "Dambulla · UNESCO Heritage",
      image: "/images/home/Cave.jpg",
      description:
        "The magnificent Dambulla Cave Temple — a UNESCO World Heritage Site with 157 Buddha statues and ancient paintings. Cave exploration in Sri Lanka combines archaeology, natural history, and genuine adventure in equal measure.",
      meta: "Year-round · Half day · Dambulla",
    },
    {
      id: 15,
      title: "Ride Around the Country",
      subtitle: "Cultural Triangle · Hill Country · Coast",
      image: "/images/home/Ride.jpg",
      description:
        "Sri Lanka is a perfect cycling and motorbike destination. Cycle through tea estates, ride the coastal road between Galle and Mirissa, or explore the ancient Cultural Triangle by bike. Adventure travel at its most free.",
      meta: "Year-round · 1 day to multi-week · All levels",
    },
    {
      id: 16,
      title: "Nature Trails & Trekking",
      subtitle: "Horton Plains · Knuckles · Sinharaja",
      image: "/images/home/Nature.jpg",
      description:
        "Horton Plains at 2,100 metres offers dramatic walks to World's End — a sheer 900-metre escarpment. The Knuckles Range provides multi-day jungle trekking through mist-covered peaks and UNESCO-listed primary rainforest.",
      meta: "Year-round · Easy to Challenging · Horton Plains, Knuckles, Sinharaja",
    },
    {
      id: 17,
      title: "Cook Your Own Sri Lankan Curry",
      subtitle: "With a Local Family",
      image: "/images/home/Cook.jpg",
      description:
        "Learn to cook an authentic Sri Lankan meal alongside a local family — grinding fresh spices, tempering coconut milk, preparing a full rice-and-curry spread. One of the most authentic holiday experiences we offer.",
      meta: "Year-round · 2–3 hours · All ages, families, couples",
    },
    {
      id: 18,
      title: "Revive Your Body, Mind & Soul — Ayurveda & Wellness",
      subtitle: "Kandy · Bentota · Nuwara Eliya",
      image: "/images/home/Mind.jpg",
      description:
        "Sri Lanka is one of Asia's finest destinations for authentic ayurvedic wellness. Personalised herbal oil treatments, yoga, and guided meditation rooted in a 3,000-year-old tradition. This is real wellness — not a spa day.",
      meta: "Year-round · 1 day to 2 weeks · Traditional ayurveda",
    },
  ],
];

const CollageCard = ({ item, className = "", style = {} }) => {
  const navigate = useNavigate();
  const slug = item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${className}`}
      style={style}
      
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Default gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

      {/* Default label */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-white transition-opacity duration-300 group-hover:opacity-0">
        <p className="text-sm sm:text-base font-bold drop-shadow-md leading-snug">
          {item.title}
        </p>
        <p className="text-xs text-gray-300 mt-0.5">{item.subtitle}</p>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(15,15,15,0.97) 0%, rgba(20,20,20,0.85) 60%, rgba(0,0,0,0.2) 100%)",
        }}
      >
        <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
          <div className="w-8 h-0.5 bg-orange-500 mb-2" />
          <p className="text-white font-bold text-sm sm:text-base leading-snug mb-1">
            {item.title}
          </p>
          <p className="text-orange-400 text-[10px] font-semibold mb-2">
            {item.subtitle}
          </p>
          <p className="text-gray-300 text-xs leading-relaxed mb-2 line-clamp-3">
            {item.description}
          </p>
          <p className="text-gray-500 text-[10px] italic">{item.meta}</p>
        </div>
      </div>
    </div>
  );
};

const CollageGrid = ({ destinations }) => (
  <>
    {/* Mobile: 2-col */}
    <div className="grid grid-cols-2 gap-2 sm:hidden">
      {destinations.map((item) => (
        <CollageCard key={item.id} item={item} className="h-44" />
      ))}
    </div>

    {/* Tablet: 3-col */}
    <div
      className="hidden sm:grid md:hidden gap-2"
      style={{
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "200px 200px",
      }}
    >
      <CollageCard item={destinations[0]} style={{ gridColumn: "1", gridRow: "1 / 3" }} />
      <CollageCard item={destinations[1]} style={{ gridColumn: "2", gridRow: "1" }} />
      <CollageCard item={destinations[2]} style={{ gridColumn: "3", gridRow: "1" }} />
      <CollageCard item={destinations[3]} style={{ gridColumn: "2", gridRow: "2" }} />
      <CollageCard item={destinations[4]} style={{ gridColumn: "3", gridRow: "2" }} />
    </div>

    {/* Desktop: asymmetric */}
    <div
      className="hidden md:grid gap-3"
      style={{
        gridTemplateColumns: "1fr 1fr 1.8fr 1fr",
        gridTemplateRows: "220px 220px",
      }}
    >
      <CollageCard item={destinations[0]} style={{ gridColumn: "1", gridRow: "1 / 3" }} />
      <CollageCard item={destinations[1]} style={{ gridColumn: "2", gridRow: "1" }} />
      <CollageCard item={destinations[2]} style={{ gridColumn: "3", gridRow: "1 / 3" }} />
      <CollageCard item={destinations[3]} style={{ gridColumn: "4", gridRow: "1" }} />
      <CollageCard item={destinations[4]} style={{ gridColumn: "2", gridRow: "2" }} />
      <CollageCard item={destinations[5]} style={{ gridColumn: "4", gridRow: "2" }} />
    </div>
  </>
);

const DestinationsCollage = () => {
  const ref = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
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
      {/* Grid */}
      <CollageGrid destinations={allSlides[activeSlide]} />

      {/* Carousel dots */}
      <div className="flex items-center justify-center gap-3 mt-5">
        {allSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeSlide
                ? "w-7 h-2.5 bg-orange-500"
                : "w-2.5 h-2.5 bg-gray-300 hover:bg-orange-300"
            }`}
          />
        ))}
      </div>

      {/* Slide label */}
      <p className="text-center text-gray-400 text-xs mt-2">
        {activeSlide === 0 && "Activities 1 – 6 of 18"}
        {activeSlide === 1 && "Activities 7 – 12 of 18"}
        {activeSlide === 2 && "Activities 13 – 18 of 18"}
      </p>
    </section>
  );
};

export default DestinationsCollage;