/**
 * SeedData — push existing hardcoded site content into Firestore.
 * Run each section once. After seeding, edit content through the other admin pages.
 */
import { useState } from "react";
import { db } from "../../firebase/config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { blogs } from "../../data/blogData";

// ── Hardcoded tour data (merged list + detail) ────────────────────────────
const TOURS = [
  {
    slug: "golden-beach-tour",
    title: "Golden Beach Tour",
    duration: "4 Nights / 5 Days",
    image: "/images/tours/golden-beach.jpg",
    heroImage: "/images/tours/golden-beach.jpg",
    thumbnailImage: "/images/tours/beach-tour2.jpg",
    description: "Escape to Sri Lanka's finest beaches on this perfectly crafted 5-day coastal holiday. From the fishing village of Negombo — just 10 minutes from Colombo airport — to the golden south coast beaches below the UNESCO-listed city of Galle. Includes a canal boat ride, turtle hatchery visit, cookery class, and tours of Colombo and Galle.",
    tagline: "Sri Lanka's Best Beaches in 5 Days",
    keyword: "beach holidays Sri Lanka",
    overview: [
      "Explore Sri Lanka's golden coastline from north to south on this perfectly crafted 5-day beach holiday. The Golden Beach Tour is designed for travellers who want the very best of Sri Lanka's Asian beach holiday experience: beautiful beaches, rich local culture, delicious cuisine, and expert guided discovery — all within 5 days.",
      "Your journey begins in Negombo — Sri Lanka's most accessible beach destination, just 10 minutes from Bandaranaike International Airport. Negombo is a charming coastal town with a rich fishing heritage, a fascinating canal system, and golden sands that make it the perfect first-night arrival destination.",
      "The historic city of Galle, a UNESCO World Heritage Site and one of Asia's most beautifully preserved colonial fortresses, is your cultural highlight. The tour also includes a canal boat ride through tropical mangroves, a visit to a sea turtle hatchery, a traditional Sri Lankan cookery demonstration and lunch with a local family, and a visit to a batik factory.",
    ],
    highlights: [
      "Traditional fishing village tour in Negombo",
      "Canal boat ride through tropical mangroves",
      "Sri Lankan cookery demonstration and homemade lunch",
      "Local batik factory visit",
      "City tour of Colombo — Sri Lanka's vibrant capital",
      "City tour of Galle — UNESCO World Heritage Site",
      "Sea turtle hatchery visit",
      "Free time for optional water sports on the south coast",
    ],
    includes: ["Entrance fees to all sites in itinerary","All meals as specified","City tours in Colombo and Galle","Air-conditioned vehicle throughout","Professional English-speaking guide","Bottled water during tour"],
    excludes: ["Beverages during meals","Fees for sites not in itinerary","Optional activity fees","Tips and porterage","Personal expenses"],
    itinerary: [
      { day: "Day 1", title: "Airport / Negombo / Marawila", activities: ["Welcome at airport by Fun Holidays representative","Breakfast at hotel — Fishing Village Tour in Negombo","Canal Boat Ride to a local house","Cookery Demonstration and Sri Lankan homemade lunch","Visit to a local Batik Factory","Check-in at hotel — free time for leisure","Dinner and overnight stay"] },
      { day: "Day 2", title: "Marawila / Colombo / South Coast", activities: ["Breakfast at hotel — depart for South Coast","City Tour in Colombo","Lunch at a local restaurant","Check-in at hotel — free time for leisure","Dinner and overnight stay"] },
      { day: "Day 3", title: "South Coast / Galle / South Coast", activities: ["Breakfast — depart for City Tour in Galle (UNESCO World Heritage Site)","Mangrove Boat Ride","Sea Turtle Hatchery visit","Lunch at a local restaurant","Return to hotel — free time for leisure","Dinner and overnight stay"] },
      { day: "Day 4", title: "South Coast", activities: ["Breakfast at hotel — free day by the beach","Optional: Water Sports (surfing, snorkelling, paddleboarding)","Lunch at hotel","Dinner and overnight stay"] },
      { day: "Day 5", title: "South Coast / Airport", activities: ["Breakfast at hotel","Transfer to Bandaranaike International Airport for departure","— End of Tour —"] },
    ],
    price: { child: 299, adult: 599 },
    published: true,
  },
  {
    slug: "best-of-sri-lanka-tour",
    title: "Best of Sri Lanka Tour",
    duration: "6 Nights / 7 Days",
    image: "/images/tours/best-sri-lanka.jpg",
    heroImage: "/images/tours/best-sri-lanka.jpg",
    thumbnailImage: "/images/tours/tour-elephants.webp",
    description: "The definitive 7-day Sri Lanka holiday — our most popular tour package. From the ancient kingdoms of Anuradhapura and the cave temples of Dambulla to Sigiriya Rock Fortress, the tea plantations of Nuwara Eliya, and a thrilling afternoon jeep safari in Yala National Park.",
    tagline: "The Complete 7-Day Sri Lanka Holiday",
    keyword: "Sri Lanka 7 day tour itinerary",
    overview: [
      "The Best of Sri Lanka Tour is our most popular holiday package — and it is easy to understand why. In just 7 days, this tour takes you through the extraordinary breadth of Sri Lanka's greatest landscapes, history, culture, and wildlife.",
      "The tour begins with one of Sri Lanka's most heartwarming experiences: a visit to the Pinnawala Elephant Orphanage. From Pinnawala, you travel to the Dambulla Cave Temple complex — a UNESCO World Heritage Site — before checking in near the iconic Sigiriya Rock Fortress.",
      "Sigiriya itself is one of the most spectacular archaeological sites in Asia. The climb up the 200-metre ancient rock fortress delivers panoramic views of the surrounding jungle. A Spice Garden lunch in Matale and a Kandyan cultural dance show precede your visit to the Temple of the Tooth Relic.",
    ],
    highlights: ["Pinnawala Elephant Orphanage","Dambulla Cave Temple (UNESCO)","Sigiriya Rock Fortress (UNESCO)","Spice Garden lunch in Matale","Kandyan Cultural Dance Show","Temple of the Tooth Relic","Tea plantation visit in Nuwara Eliya","Jeep Safari in Yala National Park","City Tour in Galle (UNESCO)","Turtle Hatchery & Mangrove Boat Ride","City Tour in Colombo"],
    includes: ["Entrance fees to all itinerary sites","All meals as specified","City tours: Kandy, Nuwara Eliya, Galle, Colombo","Air-conditioned vehicle","Professional English-speaking guide","Bottled water during tour"],
    excludes: ["Beverages during meals","Optional activity fees","Tips and porterage","Personal expenses"],
    itinerary: [
      { day: "Day 1", title: "Airport / Pinnawala / Dambulla", activities: ["Welcome at airport","Breakfast — Pinnawala Elephant Orphanage","Lunch — Dambulla Cave Temple","Check-in near Sigiriya — dinner"] },
      { day: "Day 2", title: "Sigiriya / Matale / Kandy", activities: ["Breakfast — Sigiriya Rock Fortress","Lunch at Spice Garden Matale","Kandyan Cultural Dance Show","Temple of the Tooth Relic","Dinner in Kandy"] },
      { day: "Day 3", title: "Kandy / Nuwara Eliya", activities: ["Breakfast — City Tour Kandy","Scenic drive through tea estates","Tea Plantation visit","City Tour Nuwara Eliya","Dinner"] },
      { day: "Day 4", title: "Nuwara Eliya / Yala", activities: ["Breakfast — depart for Yala","Lunch en route","Afternoon Jeep Safari in Yala National Park","Dinner and overnight"] },
      { day: "Day 5", title: "Yala / South Coast / Galle", activities: ["Breakfast — depart for south coast","Stilt fishermen photo stop","City Tour in Galle","Mangrove Boat Ride","Turtle Hatchery visit","Dinner"] },
      { day: "Day 6", title: "South Coast / Colombo", activities: ["Breakfast — leisure morning","City Tour in Colombo","Dinner"] },
      { day: "Day 7", title: "Colombo / Airport", activities: ["Breakfast","Transfer to airport — End of Tour"] },
    ],
    price: { child: 399, adult: 799 },
    published: true,
  },
  {
    slug: "amazing-sri-lanka-tour",
    title: "Amazing Sri Lanka Tour",
    duration: "6 Nights / 7 Days",
    image: "/images/tours/amazing-sri-lanka.jpg",
    heroImage: "/images/tours/amazing-sri-lanka.jpg",
    description: "Venture beyond the well-trodden path and discover Sri Lanka's most extraordinary hidden treasures. The east coast — opened to tourism after a 30-year civil war — offers whale watching in Trincomalee, meeting the Veddas indigenous people, and Passikudah's pristine beaches.",
    tagline: "Sri Lanka's Hidden Gems in 7 Days",
    keyword: "off the beaten path Sri Lanka tour",
    overview: ["Discover Sri Lanka's most extraordinary hidden treasures on this 7-day off-the-beaten-path adventure. Visit the untouched east coast, meet indigenous Veddas people, and explore rarely visited ancient cities."],
    highlights: ["East coast exploration","Whale watching in Trincomalee","Meeting the Veddas indigenous people","Passikudah pristine beach","Ancient Polonnaruwa ruins"],
    includes: ["Entrance fees to all itinerary sites","All meals as specified","Air-conditioned vehicle","Professional English-speaking guide","Bottled water"],
    excludes: ["Beverages during meals","Optional activity fees","Tips and porterage","Personal expenses"],
    itinerary: [
      { day: "Day 1", title: "Airport / Cultural Triangle", activities: ["Welcome at airport","Drive to Cultural Triangle","Check-in and dinner"] },
      { day: "Day 2", title: "Cultural Triangle / East Coast", activities: ["Breakfast — cultural sites visit","Drive to east coast","Dinner and overnight"] },
      { day: "Day 3", title: "East Coast", activities: ["Breakfast — whale watching trip","Passikudah beach","Dinner"] },
      { day: "Day 4", title: "Veddas Village / Polonnaruwa", activities: ["Breakfast — Veddas Village visit","Polonnaruwa ancient city","Dinner"] },
      { day: "Day 5", title: "South Coast", activities: ["Breakfast — drive to south coast","Beach leisure","Dinner"] },
      { day: "Day 6", title: "South Coast / Colombo", activities: ["Breakfast — City Tour Colombo","Dinner"] },
      { day: "Day 7", title: "Colombo / Airport", activities: ["Breakfast","Transfer to airport"] },
    ],
    price: { child: 399, adult: 799 },
    published: true,
  },
  {
    slug: "culture-heritage-tour",
    title: "Culture & Heritage Tour",
    duration: "7 Nights / 8 Days",
    image: "/images/tours/culture-heritage.jpg",
    heroImage: "/images/tours/culture-heritage.jpg",
    description: "For travellers inspired by history — the ultimate Sri Lanka cultural holiday. This 8-day journey covers 5 of Sri Lanka's 8 UNESCO World Heritage Sites: Anuradhapura, Dambulla, Sigiriya, Polonnaruwa, Galle, and Kandy.",
    tagline: "5 UNESCO Sites in 8 Days",
    keyword: "Sri Lanka cultural heritage tour",
    overview: ["Experience over 2,000 years of Sri Lankan civilisation on this 8-day cultural journey. Visit 5 UNESCO World Heritage Sites and discover the island's extraordinary ancient history."],
    highlights: ["Anuradhapura ancient city (UNESCO)","Dambulla Cave Temple (UNESCO)","Sigiriya Rock Fortress (UNESCO)","Polonnaruwa ancient city","Galle Fort (UNESCO)","Kandy Temple of Tooth Relic (UNESCO)","Kandy Perahera (seasonal)"],
    includes: ["Entrance fees to all UNESCO sites","All meals as specified","Air-conditioned vehicle","Professional English-speaking guide","Bottled water"],
    excludes: ["Beverages during meals","Optional activity fees","Tips and porterage","Personal expenses"],
    itinerary: [
      { day: "Day 1", title: "Airport / Anuradhapura", activities: ["Welcome at airport","Drive to Anuradhapura","Check-in and dinner"] },
      { day: "Day 2", title: "Anuradhapura / Dambulla", activities: ["Breakfast — Anuradhapura ancient city","Dambulla Cave Temple","Check-in near Sigiriya"] },
      { day: "Day 3", title: "Sigiriya / Polonnaruwa", activities: ["Breakfast — Sigiriya Rock Fortress","Polonnaruwa ancient city","Dinner"] },
      { day: "Day 4", title: "Kandy", activities: ["Breakfast — drive to Kandy","Temple of Tooth Relic","Kandyan Dance Show","Dinner"] },
      { day: "Day 5", title: "Kandy / Nuwara Eliya", activities: ["Breakfast — Kandy City Tour","Tea estates drive","Nuwara Eliya City Tour","Dinner"] },
      { day: "Day 6", title: "South Coast / Galle", activities: ["Breakfast — drive to south coast","Galle Fort City Tour","Dinner"] },
      { day: "Day 7", title: "South Coast / Colombo", activities: ["Breakfast — leisure morning","City Tour Colombo","Dinner"] },
      { day: "Day 8", title: "Colombo / Airport", activities: ["Breakfast","Transfer to airport"] },
    ],
    price: { child: 449, adult: 899 },
    published: true,
  },
  {
    slug: "honeymoon-tour",
    title: "Honeymoon Tour",
    duration: "8 Nights / 9 Days",
    image: "/images/tours/honeymoon.jpg",
    heroImage: "/images/tours/honeymoon.jpg",
    description: "Begin your forever together on Asia's most romantic island. A beautifully crafted 9-day journey balancing adventure, culture, and pure relaxation — elephant blessings at Pinnawala, a scenic train ride through misty tea plantations, and a private candlelit dinner on the beach.",
    tagline: "Sri Lanka's Most Romantic 9-Day Journey",
    keyword: "honeymoon Sri Lanka tour package",
    overview: ["Begin your married life together on Asia's most romantic island — Sri Lanka. This specially crafted 9-day honeymoon journey balances adventure, culture, and pure romantic relaxation."],
    highlights: ["Elephant blessings at Pinnawala","Scenic train ride through tea plantations","Small Adam's Peak sunrise trek in Ella","Private candlelit beach dinner","Whale watching off the south coast","Galle Fort sunset walk"],
    includes: ["Entrance fees to all itinerary sites","All meals as specified","Scenic train tickets","Air-conditioned vehicle","Professional English-speaking guide","Romantic room decorations","Private candlelit dinner"],
    excludes: ["Beverages during meals","Optional activity fees","Tips and porterage","Personal expenses"],
    itinerary: [
      { day: "Day 1", title: "Airport / Negombo", activities: ["Welcome at airport","Check-in at beach hotel","Romantic dinner"] },
      { day: "Day 2", title: "Negombo / Pinnawala / Kandy", activities: ["Breakfast — Pinnawala Elephant Orphanage","Drive to Kandy","Temple of Tooth Relic","Kandyan Dance Show","Dinner"] },
      { day: "Day 3", title: "Kandy / Nuwara Eliya", activities: ["Breakfast — tea estate scenic drive","Nuwara Eliya City Tour","Romantic dinner"] },
      { day: "Day 4", title: "Nuwara Eliya / Ella", activities: ["Breakfast — scenic train to Ella","Little Adam's Peak trek","Dinner"] },
      { day: "Day 5", title: "Ella / South Coast", activities: ["Breakfast — drive to south coast","Beach check-in","Private candlelit beach dinner"] },
      { day: "Day 6", title: "South Coast", activities: ["Breakfast — leisure beach day","Optional water sports","Romantic dinner"] },
      { day: "Day 7", title: "South Coast / Galle", activities: ["Breakfast — Galle Fort walk","Whale watching optional","Dinner"] },
      { day: "Day 8", title: "South Coast / Colombo", activities: ["Breakfast — City Tour Colombo","Farewell dinner"] },
      { day: "Day 9", title: "Colombo / Airport", activities: ["Breakfast","Transfer to airport"] },
    ],
    price: { child: 499, adult: 999 },
    published: true,
  },
];

// ── Destinations ──────────────────────────────────────────────────────────
const DESTINATIONS = [
  { slug: "the-kandy-perahera", title: "The Kandy Perahera", subtitle: "Sri Lanka's Most Spectacular Festival", heroImage: "/images/destination/kandy-perahera-hero.jpg", thumbnail: "/images/destination/kandy-perahera.jpg", gallery: [], overview: ["The Kandy Esala Perahera is one of Asia's oldest and most spectacular festivals, performed without interruption for over 400 years. The pageant features elaborately decorated elephants, Kandyan dancers, fire performers, and whip crackers — all processing through the streets of Kandy over 10 nights."], highlights: ["400+ years of unbroken tradition","Dozens of adorned elephants","Kandyan dancers and fire performers","Held annually in July/August"], toChild: 150, toAdult: 250, published: true },
  { slug: "the-elephant-gathering", title: "The Elephant Gathering", subtitle: "World's Largest Wild Elephant Congregation", heroImage: "/images/destination/elephant-gathering-hero.jpg", thumbnail: "/images/destination/elephant-gathering.jpg", gallery: [], overview: ["Each year, between August and October, hundreds of wild elephants gather at Minneriya National Park in one of the greatest wildlife spectacles on earth. Up to 400 elephants converge around the receding Minneriya Tank to graze, socialise, play, and bathe."], highlights: ["Up to 400 wild elephants in one place","Best viewed August to October","Minneriya National Park jeep safari","Unforgettable photographic opportunity"], toChild: 120, toAdult: 220, published: true },
  { slug: "into-the-wild", title: "Into the Wild", subtitle: "Sri Lanka's Premier Safari Experience", heroImage: "/images/destination/into-the-wild-hero.jpg", thumbnail: "/images/destination/into-the-wild.jpg", gallery: [], overview: ["Sri Lanka's national parks — Yala, Udawalawe, Wilpattu, Minneriya, and Wasgamuwa — offer some of the finest wildlife encounters in Asia. Yala National Park has the world's highest density of leopards, while Udawalawe is famed for its large resident elephant herds."], highlights: ["Yala National Park leopard safari","Udawalawe elephant herds","Wilpattu — Sri Lanka's largest park","Half and full day safari options"], toChild: 150, toAdult: 280, published: true },
  { slug: "witness-dolphins-whales", title: "Witness Dolphins & Whales", subtitle: "Blue Whales Off Sri Lanka's Coast", heroImage: "/images/destination/dolphins-whales-hero.jpg", thumbnail: "/images/destination/dolphins-whales.jpg", gallery: [], overview: ["Sri Lanka's south coast, particularly around Mirissa, offers world-class blue whale and dolphin watching from November to April. Blue whales — the largest animals on earth — surface regularly in these waters, often within sight of the shore."], highlights: ["Blue whales — largest animals on earth","Spinner dolphin pods","Best season: November to April","Mirissa whale watching tours"], toChild: 100, toAdult: 180, published: true },
  { slug: "sun-and-fun", title: "Sun & Fun", subtitle: "Sri Lanka's Finest Beach Experiences", heroImage: "/images/destination/sun-fun-hero.jpg", thumbnail: "/images/destination/sun-fun.jpg", gallery: [], overview: ["Sri Lanka's coastline stretches for over 1,600 kilometres of beaches ranging from the golden sands of the west and south to the pristine lagoons of the east. From Negombo to Mirissa, Unawatuna to Passikudah, each beach has its own distinct character."], highlights: ["West coast: Negombo, Marawila, Kalutara","South coast: Unawatuna, Mirissa, Weligama","East coast: Passikudah, Arugam Bay","Water sports at multiple locations"], toChild: 80, toAdult: 150, published: true },
  { slug: "nature-trails-trekking", title: "Nature Trails & Trekking", subtitle: "Trek Sri Lanka's Highlands and Forests", heroImage: "/images/destination/trekking-hero.jpg", thumbnail: "/images/destination/trekking.jpg", gallery: [], overview: ["Sri Lanka's highlands offer some of the finest trekking in Asia, from the misty peaks of Horton Plains to the lush forests of the Knuckles Range and the dramatic landscapes around Ella. The Knuckles Mountain Range, a UNESCO World Heritage Site, features cloud forest trails, waterfalls, and extraordinary biodiversity."], highlights: ["Horton Plains — World's End viewpoint","Knuckles Mountain Range (UNESCO)","Little Adam's Peak, Ella","Sinharaja Rainforest trails"], toChild: 100, toAdult: 200, published: true },
  { slug: "surfing-the-coast", title: "Surfing the Coast", subtitle: "World-Class Surf at Arugam Bay", heroImage: "/images/destination/surfing-hero.jpg", thumbnail: "/images/destination/surfing.jpg", gallery: [], overview: ["Arugam Bay on Sri Lanka's east coast is one of the top surf destinations in Asia, consistently ranked in lists of the world's best surf spots. The main point break at Arugam Bay works best from May to October, when the Indian Ocean swell produces long, consistent right-handers."], highlights: ["Arugam Bay — world top-10 surf spot","Hikkaduwa west coast surf","Weligama beginner-friendly waves","Surf schools and board rentals available"], toChild: 100, toAdult: 180, published: true },
  { slug: "whitewater-rafting", title: "Whitewater Rafting", subtitle: "Kitulgala Rafting on the Kelani River", heroImage: "/images/destination/rafting-hero.jpg", thumbnail: "/images/destination/rafting.jpg", gallery: [], overview: ["Kitulgala, nestled in the lush rainforest of the Sabaragamuwa Province, is Sri Lanka's premier whitewater rafting destination. The Kelani River here offers an exhilarating 8-kilometre rafting run with Grade 3-4 rapids."], highlights: ["Grade 3-4 rapids on Kelani River","Professional guides and safety equipment","Combined with jungle trekking","Optional: waterfall abseiling nearby"], toChild: 80, toAdult: 150, published: true },
  { slug: "bird-watching", title: "Bird Watching", subtitle: "Sri Lanka's 400+ Bird Species", heroImage: "/images/destination/birdwatching-hero.jpg", thumbnail: "/images/destination/birdwatching.jpg", gallery: [], overview: ["Sri Lanka is one of Asia's premier birdwatching destinations, with over 400 recorded bird species including 33 endemics found nowhere else on earth. From the endemic Sri Lanka Blue Magpie to the colourful Malabar Pied Hornbill, the island's birdlife is extraordinary."], highlights: ["33 endemic bird species","Sinharaja Rainforest — best endemic site","Bundala National Park — migratory birds","Knuckles Range highland species"], toChild: 80, toAdult: 150, published: true },
];

// ── Team ──────────────────────────────────────────────────────────────────
const TEAM = [
  { name: "Emma Williams",   role: "Senior Tour Guide",  image: "/images/about/guide-emma.jpg",   order: 1 },
  { name: "James Anderson",  role: "Travel Specialist",  image: "/images/about/guide-james.jpg",  order: 2 },
  { name: "Sophia Martinez", role: "Cultural Guide",     image: "/images/about/guide-sophia.jpg", order: 3 },
  { name: "Ava Thompson",    role: "Holiday Planner",    image: "/images/about/guide-ava.jpg",    order: 4 },
];

// ── Seed helpers ──────────────────────────────────────────────────────────
function Section({ title, description, onSeed, status }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-gray-900">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
        <button
          onClick={onSeed}
          disabled={status === "seeding" || status === "done"}
          className={`ml-4 shrink-0 px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
            status === "done"
              ? "bg-green-100 text-green-700"
              : status === "seeding"
              ? "bg-gray-100 text-gray-400"
              : status === "error"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
          }`}
        >
          {status === "done" ? "✓ Done" : status === "seeding" ? "Seeding…" : status === "error" ? "⚠ Error — Retry" : "Seed Now"}
        </button>
      </div>
    </div>
  );
}

export default function SeedData() {
  const [status, setStatus] = useState({ tours: "", blogs: "", destinations: "", team: "" });

  function setS(key, val) { setStatus((s) => ({ ...s, [key]: val })); }

  async function seedTours() {
    setS("tours", "seeding");
    try {
      for (const t of TOURS) {
        await setDoc(doc(db, "tours", t.slug), {
          ...t, createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
        });
      }
      setS("tours", "done");
    } catch (err) {
      console.error(err);
      setS("tours", "error");
    }
  }

  async function seedBlogs() {
    setS("blogs", "seeding");
    try {
      for (const b of blogs) {
        await setDoc(doc(db, "blogs", b.slug), {
          ...b, published: true, createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
        });
      }
      setS("blogs", "done");
    } catch (err) {
      console.error(err);
      setS("blogs", "error");
    }
  }

  async function seedDestinations() {
    setS("destinations", "seeding");
    try {
      for (const d of DESTINATIONS) {
        await setDoc(doc(db, "destinations", d.slug), {
          ...d, createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
        });
      }
      setS("destinations", "done");
    } catch (err) {
      console.error(err);
      setS("destinations", "error");
    }
  }

  async function seedTeam() {
    setS("team", "seeding");
    try {
      for (let i = 0; i < TEAM.length; i++) {
        await setDoc(doc(db, "team", `guide-${i + 1}`), {
          ...TEAM[i], createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
        });
      }
      setS("team", "done");
    } catch (err) {
      console.error(err);
      setS("team", "error");
    }
  }

  const allDone = Object.values(status).every((v) => v === "done");

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Seed Data</h1>
      <p className="text-gray-400 text-sm mb-2">
        Push your existing site content into Firebase — run each section once.
        After seeding, manage everything from the admin pages.
      </p>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-sm text-yellow-800 mb-8">
        ⚠ This will overwrite matching documents in Firestore. Safe to re-run — it won't duplicate data.
      </div>

      <div className="space-y-4">
        <Section
          title="Tours (5 packages)"
          description="Golden Beach, Best of Sri Lanka, Amazing Sri Lanka, Culture & Heritage, Honeymoon — with full itinerary, highlights, pricing."
          onSeed={seedTours}
          status={status.tours}
        />
        <Section
          title="Blog Posts (4 posts)"
          description="All 4 existing blog posts with full content blocks, tags, and related posts."
          onSeed={seedBlogs}
          status={status.blogs}
        />
        <Section
          title="Destinations (9 experiences)"
          description="All 9 destination/experience cards — Kandy Perahera, Elephant Gathering, safari, beaches, trekking, surfing, rafting, birding."
          onSeed={seedDestinations}
          status={status.destinations}
        />
        <Section
          title="Team Members (4 guides)"
          description="Emma Williams, James Anderson, Sophia Martinez, Ava Thompson."
          onSeed={seedTeam}
          status={status.team}
        />
      </div>

      {allDone && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <p className="text-green-800 font-semibold text-lg">✓ All data seeded successfully!</p>
          <p className="text-green-600 text-sm mt-1">
            Your content is now in Firestore. Go to Tours, Blog, or Destinations to edit it.
          </p>
        </div>
      )}
    </div>
  );
}
