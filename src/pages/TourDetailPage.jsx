import { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import PageHero from "../common/PageHero";
import useScrollReveal from "../hooks/useScrollReveal";
import { FaCheck, FaTimes, FaCalendarAlt } from "react-icons/fa";

const tourData = {
  "golden-beach-tour": {
    title: "Golden Beach Tour",
    subtitle: "4 Nights / 5 Days",
    heroImage: "/images/tours/golden-beach.jpg",
    thumbnailImage: "/images/tours/beach-tour2.jpg",
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
    includes: [
      "Entrance fees to all sites in itinerary",
      "All meals as specified",
      "City tours in Colombo and Galle",
      "Air-conditioned vehicle throughout",
      "Professional English-speaking guide",
      "Bottled water during tour",
    ],
    excludes: [
      "Beverages during meals",
      "Fees for sites not in itinerary",
      "Optional activity fees",
      "Tips and porterage",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Airport / Negombo / Marawila",
        activities: [
          "Welcome at airport by Fun Holidays representative",
          "Breakfast at hotel — Fishing Village Tour in Negombo",
          "Canal Boat Ride to a local house",
          "Cookery Demonstration and Sri Lankan homemade lunch",
          "Visit to a local Batik Factory",
          "Check-in at hotel — free time for leisure",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 2",
        title: "Marawila / Colombo / South Coast",
        activities: [
          "Breakfast at hotel — depart for South Coast",
          "City Tour in Colombo",
          "Lunch at a local restaurant",
          "Check-in at hotel — free time for leisure",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 3",
        title: "South Coast / Galle / South Coast",
        activities: [
          "Breakfast — depart for City Tour in Galle (UNESCO World Heritage Site)",
          "Mangrove Boat Ride",
          "Sea Turtle Hatchery visit",
          "Lunch at a local restaurant",
          "Return to hotel — free time for leisure",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 4",
        title: "South Coast",
        activities: [
          "Breakfast at hotel — free day by the beach",
          "Optional: Water Sports (surfing, snorkelling, paddleboarding)",
          "Lunch at hotel",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 5",
        title: "South Coast / Airport",
        activities: [
          "Breakfast at hotel",
          "Transfer to Bandaranaike International Airport for departure",
          "— End of Tour —",
        ],
      },
    ],
    price: { child: 299, adult: 599 },
  },

  "best-of-sri-lanka-tour": {
    title: "Best of Sri Lanka Tour",
    subtitle: "6 Nights / 7 Days",
    heroImage: "/images/tours/best-sri-lanka.jpg",
    thumbnailImage  : "/images/tours/tour-elephants.webp",
    tagline: "The Complete 7-Day Sri Lanka Holiday",
    keyword: "Sri Lanka 7 day tour itinerary",
    overview: [
      "The Best of Sri Lanka Tour is our most popular holiday package — and it is easy to understand why. In just 7 days, this tour takes you through the extraordinary breadth of Sri Lanka's greatest landscapes, history, culture, and wildlife. From the ancient ruins of Anuradhapura to the wildlife-rich grasslands of Yala National Park; from the cloud-kissed tea estates of Nuwara Eliya to the sun-soaked beaches of the south coast.",
      "The tour begins with one of Sri Lanka's most heartwarming experiences: a visit to the Pinnawala Elephant Orphanage, home to one of the world's largest concentrations of captive elephants. From Pinnawala, you travel to the Dambulla Cave Temple complex — a UNESCO World Heritage Site with 157 Buddha statues — before checking in near the iconic Sigiriya Rock Fortress.",
      "Day 2 takes you to Sigiriya itself, one of the most spectacular archaeological sites in Asia. The climb up the 200-metre ancient rock fortress, past remarkable 5th-century frescoes and landscaped water gardens, delivers panoramic views of the surrounding jungle. A Spice Garden lunch in Matale and a Kandyan cultural dance show precede your visit to the Temple of the Tooth Relic — Sri Lanka's most sacred Buddhist shrine.",
    ],
    highlights: [
      "Pinnawala Elephant Orphanage — world-famous elephant rehabilitation centre",
      "Dambulla Cave Temple — 157 Buddha statues (UNESCO World Heritage Site)",
      "Sigiriya Rock Fortress — 5th-century sky palace (UNESCO World Heritage Site)",
      "Spice Garden lunch in Matale",
      "Kandyan Cultural Dance Show",
      "Temple of the Tooth Relic — Kandy's most sacred site",
      "Tea plantation visit in Nuwara Eliya",
      "Afternoon Jeep Safari in Yala National Park",
      "Stilt fishermen photo stop on south coast",
      "City Tour in Galle (UNESCO World Heritage Site)",
      "Turtle Hatchery visit and Mangrove Boat Ride",
      "City Tour in Colombo",
    ],
    includes: [
      "Entrance fees to all itinerary sites",
      "All meals as specified",
      "City tours: Kandy, Nuwara Eliya, Galle, Colombo",
      "Air-conditioned vehicle",
      "Professional English-speaking guide",
      "Bottled water during tour",
    ],
    excludes: [
      "Beverages during meals",
      "Optional activity fees",
      "Tips and porterage",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Airport / Pinnawala / Dambulla",
        activities: [
          "Welcome at airport by Fun Holidays representative",
          "Breakfast at hotel — visit Pinnawala Elephant Orphanage",
          "Lunch at local restaurant — proceed to Dambulla",
          "Visit the Dambulla Cave Temple (UNESCO World Heritage Site)",
          "Check-in near Sigiriya — dinner and overnight stay",
        ],
      },
      {
        day: "Day 2",
        title: "Sigiriya / Matale / Kandy",
        activities: [
          "Breakfast — climb Sigiriya Rock Fortress (UNESCO World Heritage Site)",
          "Lunch at a Spice Garden in Matale",
          "Kandyan Cultural Dance Show",
          "Visit Temple of the Tooth Relic of the Buddha",
          "Dinner and overnight stay in Kandy",
        ],
      },
      {
        day: "Day 3",
        title: "Kandy / Nuwara Eliya",
        activities: [
          "Breakfast — City Tour in Kandy",
          "Scenic drive to Nuwara Eliya through tea estates",
          "Lunch at a local restaurant",
          "Tea Plantation visit",
          "City Tour in Nuwara Eliya",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 4",
        title: "Nuwara Eliya / Yala",
        activities: [
          "Breakfast — depart for Yala",
          "Check-in at hotel for lunch",
          "Afternoon Jeep Safari in Yala National Park",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 5",
        title: "Yala / Galle / South Coast",
        activities: [
          "Breakfast — depart for South Coast",
          "Stilt Fishermen photo stop en route",
          "Galle City Tour (UNESCO World Heritage Site)",
          "Turtle Hatchery visit and Mangrove Boat Ride",
          "Dinner and overnight stay on South Coast",
        ],
      },
      {
        day: "Day 6",
        title: "South Coast / Colombo",
        activities: [
          "Breakfast — free morning by the beach",
          "Depart for Colombo after lunch",
          "City Tour in Colombo",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 7",
        title: "Colombo / Airport",
        activities: [
          "Breakfast — transfer to airport for departure",
          "— End of Tour —",
        ],
      },
    ],
    price: { child: 499, adult: 899 },
  },

  "amazing-sri-lanka-tour": {
    title: "Amazing Sri Lanka Tour",
    subtitle: "6 Nights / 7 Days",
    heroImage: "/images/tours/amazing-sri-lanka.jpg",
    thumbnailImage: "/images/destination/kandy/kandy-perehara-2.jpg",
    tagline: "Discover Asia's Most Extraordinary Hidden Destinations",
    keyword: "hidden holiday destinations Asia",
    overview: [
      "Sri Lanka's east coast is one of the best-kept secrets in Asian travel — and the Amazing Sri Lanka Tour reveals it in extraordinary detail. Since the end of a 30-year civil war, the hidden treasures of Sri Lanka's eastern and north-eastern provinces have gradually opened their doors to curious travellers, offering a completely different side of the island that most visitors never see.",
      "The tour begins in Pinnawala before heading east to Trincomalee — a magnificent natural harbour city with a history stretching back over 2,500 years. Trincomalee's Koneshwaram Kovil temple, dramatically perched on Swami Rock above the ocean, is one of Sri Lanka's most sacred Hindu sites. The city's natural hot water springs at Kanniya offer a unique and memorable bathing experience.",
      "The most unforgettable morning arrives on Day 3: an early departure for whale and dolphin watching in the deep waters off Trincomalee — one of the world's most reliable locations for blue whale sightings. Day 4 takes you to the forests of Mahiyanganaya, where the Veddas — Sri Lanka's indigenous tribal people — still live according to traditional forest customs.",
    ],
    highlights: [
      "Pinnawala Elephant Orphanage",
      "Sigiriya Rock Fortress (UNESCO World Heritage Site)",
      "Trincomalee — Koneshwaram Kovil, hot water springs, city tour",
      "Whale and dolphin watching in the Bay of Bengal",
      "Passikudah — pristine east coast beach",
      "Meet the Veddas — Sri Lanka's indigenous people",
      "Royal Botanical Gardens in Kandy",
      "Temple of the Tooth Relic in Kandy",
      "Kandyan Cultural Dance Show",
      "Tea Plantation visit",
      "City Tour in Colombo",
    ],
    includes: [
      "Entrance fees to all itinerary sites",
      "All meals as specified",
      "City tours: Trincomalee, Kandy, Colombo",
      "Air-conditioned vehicle",
      "Professional English-speaking guide",
      "Bottled water during tour",
    ],
    excludes: [
      "Beverages during meals",
      "Optional activity fees",
      "Tips and porterage",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Airport / Pinnawala / Sigiriya",
        activities: [
          "Welcome at airport by Fun Holidays representative",
          "Breakfast at hotel — visit Pinnawala Elephant Orphanage",
          "Lunch at local restaurant — proceed to Sigiriya",
          "Visit Sigiriya Rock Fortress (UNESCO World Heritage Site)",
          "Dinner and overnight stay near Sigiriya",
        ],
      },
      {
        day: "Day 2",
        title: "Sigiriya / Trincomalee",
        activities: [
          "Breakfast — depart for Trincomalee (east coast)",
          "Lunch at local restaurant in Trinco",
          "Visit Koneshwaram Kovil, Kanniya Hot Water Springs",
          "Trincomalee City Tour",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 3",
        title: "Trincomalee / Passikudah",
        activities: [
          "Early morning whale and dolphin watching excursion",
          "Return for breakfast at hotel",
          "Proceed to Passikudah (stunning east coast beach)",
          "Lunch — free time for leisure by the beach",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 4",
        title: "Passikudah / Mahiyanganaya / Kandy",
        activities: [
          "Breakfast — depart for Kandy via Mahiyanganaya",
          "Visit the Veddas (Sri Lanka's indigenous tribal people)",
          "Lunch with Vedda community — experience traditional lifestyle",
          "Proceed to Kandy",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 5",
        title: "Kandy",
        activities: [
          "Breakfast — visit Royal Botanical Gardens at Peradeniya",
          "City Tour in Kandy",
          "Lunch at local restaurant",
          "Temple of the Tooth Relic of Buddha",
          "Kandyan Cultural Dance Show",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 6",
        title: "Kandy / Colombo",
        activities: [
          "Breakfast — depart for Colombo",
          "Tea Plantation visit en route",
          "Lunch at local restaurant",
          "City Tour in Colombo",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 7",
        title: "Colombo / Airport",
        activities: [
          "Breakfast — transfer to airport for departure",
          "— End of Tour —",
        ],
      },
    ],
    price: { child: 499, adult: 899 },
  },

  "culture-heritage-tour": {
    title: "Culture & Heritage Tour",
    subtitle: "7 Nights / 8 Days",
    heroImage: "/images/tours/culture-heritage.jpg",
    thumbnailImage: "/images/tours/ancient-tour.webp",
    tagline: "2,000 Years of History in 8 Days",
    keyword: "Sri Lanka culture and heritage tour",
    overview: [
      "Sri Lanka is one of the most historically rich destinations in Asia. With over 2,000 years of documented civilisation, the island's Cultural Triangle contains some of the most remarkable ancient cities, rock fortresses, and sacred temples to be found anywhere in the world. The Culture & Heritage Tour covers 5 of Sri Lanka's 8 UNESCO World Heritage Sites in a single 8-day journey — more than any other Fun Holidays package.",
      "The Sacred City of Anuradhapura — one of the oldest continuously inhabited cities in Asia and Sri Lanka's first ancient kingdom — sets the stage on Day 1. Day 2 introduces the Aukana Buddha, a perfectly carved 5th-century standing Buddha rising 12 metres from a single granite boulder, before the magnificent Dambulla Cave Temple complex with its 157 Buddha statues.",
      "Day 3 delivers the tour's most iconic moment: Sigiriya Rock Fortress, the 5th-century sky palace of King Kassapa, rising 200 metres from the flat jungle. The ancient city of Polonnaruwa — Sri Lanka's Medieval Capital — offers extraordinary ruins of palaces, temples, and colossal Buddha statues. The tour concludes with Kandy, the south coast, Galle, and Colombo.",
    ],
    highlights: [
      "Sacred City of Anuradhapura — UNESCO World Heritage Site",
      "Aukana Buddha — remarkable 5th-century standing Buddha",
      "Dambulla Cave Temple — 157 Buddha statues (UNESCO)",
      "Sigiriya Rock Fortress — 5th-century sky palace (UNESCO)",
      "Ancient City of Polonnaruwa — Sri Lanka's Medieval Capital (UNESCO)",
      "Spice Garden in Matale",
      "Kandyan Cultural Dance Show",
      "Temple of the Tooth Relic — Sacred City of Kandy (UNESCO)",
      "Old Town of Galle and its Fortifications (UNESCO)",
      "Turtle Hatchery and Mangrove Boat Ride",
      "Colombo City Tour",
    ],
    includes: [
      "Entrance fees to all itinerary sites",
      "All meals as specified",
      "City tours: Kandy, Galle, Colombo",
      "Air-conditioned vehicle",
      "Professional English-speaking guide",
      "Bottled water during tour",
    ],
    excludes: [
      "Beverages during meals",
      "Optional activity fees",
      "Tips and porterage",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Airport / Anuradhapura",
        activities: [
          "Welcome at airport",
          "Breakfast at hotel — proceed to Anuradhapura",
          "Lunch at local restaurant — visit Sacred City of Anuradhapura (UNESCO)",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 2",
        title: "Anuradhapura / Aukana / Dambulla / Habarana",
        activities: [
          "Breakfast — visit Aukana Buddha",
          "Lunch at local restaurant",
          "Visit Dambulla Cave Temple (UNESCO World Heritage Site)",
          "Dinner and overnight stay at Habarana",
        ],
      },
      {
        day: "Day 3",
        title: "Habarana / Sigiriya / Polonnaruwa",
        activities: [
          "Breakfast — visit Sigiriya Rock Fortress (UNESCO World Heritage Site)",
          "Lunch at local restaurant",
          "Visit Ancient City of Polonnaruwa — Medieval Capital (UNESCO)",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 4",
        title: "Habarana / Matale / Kandy",
        activities: [
          "Breakfast — proceed to Kandy via Matale",
          "Visit Spice Garden in Matale",
          "Kandyan Cultural Dance Show",
          "Visit Temple of the Tooth Relic of Buddha (UNESCO — Sacred City of Kandy)",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 5",
        title: "Kandy / Galle / South Coast",
        activities: [
          "Breakfast — depart for Galle",
          "Lunch at local restaurant",
          "City Tour in Galle — Old Town (UNESCO World Heritage Site)",
          "Dinner and overnight stay on South Coast",
        ],
      },
      {
        day: "Day 6",
        title: "South Coast",
        activities: [
          "Breakfast — free day by the beach",
          "Optional Water Sports",
          "Lunch at hotel",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 7",
        title: "South Coast / Colombo",
        activities: [
          "Breakfast — depart for Colombo",
          "Turtle Hatchery visit",
          "Mangrove Boat Ride",
          "Lunch at local restaurant",
          "City Tour in Colombo",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 8",
        title: "Colombo / Airport",
        activities: [
          "Breakfast — transfer to airport for departure",
          "— End of Tour —",
        ],
      },
    ],
    price: { child: 549, adult: 999 },
  },

  "honeymoon-tour": {
    title: "Honeymoon Tour",
    subtitle: "8 Nights / 9 Days",
    heroImage: "/images/tours/honeymoon.jpg",
    thumbnailImage: "/images/tours/honeymoon3.jpg",
    tagline: "Begin Your Forever on Asia's Most Romantic Island",
    keyword: "honeymoon in Sri Lanka",
    overview: [
      "Sri Lanka is one of Asia's most extraordinary honeymoon destinations — a fact that is still something of a well-kept secret among the world's romantic travellers. From the misty highland tea country and the iconic scenic train between Kandy and Ella, to the warm golden beaches of the south coast and the ancient cultural sites of Kandy, Sri Lanka offers honeymooners a rare combination: genuine adventure, breathtaking beauty, remarkable culture, and utter romance — all within a single island.",
      "The Fun Holidays Honeymoon Tour is a beautifully crafted 9-day journey designed to give newly married couples the perfect start to their life together. The tour balances excitement with relaxation, cultural discovery with beach bliss, and grand scenic moments with intimate private experiences — including a candlelit private dinner on the beach that you will remember for the rest of your lives.",
      "Your honeymoon in Sri Lanka begins with blessings from the elephants of Pinnawala — a wonderfully auspicious start. The scenic train ride through misty green tea plantations on the historic railway to Nuwara Eliya is one of the most romantic journeys in Asia. From Nuwara Eliya, the tour descends to Ella and the Small Adam's Peak hike before the south coast, Galle, and a private candlelit dinner by the ocean.",
    ],
    highlights: [
      "Elephant blessings at Pinnawala Elephant Orphanage",
      "Royal Botanical Gardens in Kandy",
      "Scenic train journey through tea plantations — Kandy to Nuwara Eliya",
      "Tea plantation visit and tasting in Nuwara Eliya",
      "Small Adam's Peak hike in Ella with panoramic views",
      "City Tour in Galle — UNESCO colonial fort city",
      "Private candlelit dinner by the beach",
      "Full beach day on Sri Lanka's south coast",
      "Sea Turtle Hatchery visit",
      "Mangrove Boat Ride",
      "City Tour in Colombo",
    ],
    includes: [
      "Entrance fees to all itinerary sites",
      "All meals as specified",
      "City tours: Kandy, Nuwara Eliya, Galle, Colombo",
      "Air-conditioned vehicle",
      "Professional English-speaking guide",
      "Bottled water during tour",
      "Private candlelit beach dinner",
    ],
    excludes: [
      "Beverages during meals",
      "Optional activity fees",
      "Tips and porterage",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Airport / Kandy",
        activities: [
          "Welcome at airport — visit Pinnawala Elephant Orphanage",
          "Check-in and lunch at hotel in Kandy",
          "PM — free time for leisure",
          "Optional: Kandyan Cultural Dance Show / Temple of the Tooth Relic",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 2",
        title: "Kandy",
        activities: [
          "Breakfast — visit Royal Botanical Gardens at Peradeniya",
          "Lunch at local restaurant",
          "City Tour in Kandy",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 3",
        title: "Kandy / Nuwara Eliya",
        activities: [
          "Breakfast at hotel",
          "Scenic train ride to Nuwara Eliya — through tea plantations, waterfalls & misty hills",
          "Packed lunch or lunch on board",
          "Check-in at hotel in Nuwara Eliya — free time",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 4",
        title: "Nuwara Eliya",
        activities: [
          "Breakfast — Tea Plantation visit and tasting",
          "City Tour in Nuwara Eliya — Gregory Lake, Victoria Park",
          "Lunch at local restaurant",
          "PM — free time for leisure",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 5",
        title: "Nuwara Eliya / Ella / Wellawaya",
        activities: [
          "Breakfast — scenic drive to Wellawaya via Ella",
          "Hike Small Adam's Peak — panoramic views across the southern plains",
          "Check-in at hotel for lunch",
          "PM — free time",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 6",
        title: "Wellawaya / Galle / South Coast",
        activities: [
          "Breakfast — depart for South Coast",
          "Lunch at local restaurant",
          "City Tour in Galle (UNESCO World Heritage Site)",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 7",
        title: "South Coast",
        activities: [
          "Breakfast at hotel",
          "Full day leisure by the beach",
          "Lunch at hotel",
          "Private candlelit dinner on the beach",
          "Overnight stay",
        ],
      },
      {
        day: "Day 8",
        title: "South Coast / Colombo",
        activities: [
          "Breakfast — depart for Colombo",
          "Turtle Hatchery visit",
          "Mangrove Boat Ride",
          "Lunch at local restaurant",
          "City Tour in Colombo",
          "Dinner and overnight stay",
        ],
      },
      {
        day: "Day 9",
        title: "Colombo / Airport",
        activities: [
          "Breakfast — transfer to airport for departure",
          "— End of Tour —",
        ],
      },
    ],
    price: { child: 699, adult: 1199 },
  },
};

const TourDetailPage = () => {
  const { slug } = useParams();
  const data = tourData[slug];

  const overviewRef = useRef(null);
  const highlightsRef = useRef(null);
  const itineraryRef = useRef(null);
  const sidebarRef = useRef(null);

  useScrollReveal(overviewRef, 100);
  useScrollReveal(highlightsRef, 150);
  useScrollReveal(itineraryRef, 200);
  useScrollReveal(sidebarRef, 250);

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Tour not found.</p>
        <Link to="/tours" className="text-orange-500 underline text-sm">
          Back to Tour Packages
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero
        title={data.title}
        image={data.thumbnailImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tour Packages", href: "/tours" },
          { label: data.title },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Title + tagline */}
        <div className="mb-8 text-center">
          <p className="text-orange-500 text-sm font-semibold mb-1">
            {data.subtitle}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900">
            {data.tagline}
          </h1>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ── Left: Main Content ───────────────────────────── */}
          <div className="flex-1 flex flex-col gap-10">

            {/* Overview */}
            <div
              ref={overviewRef}
              style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
            >
              <h2 className="text-gray-900 font-bold text-2xl mb-4 pb-2 border-b border-gray-100">
                Overview
              </h2>
              <div className="flex flex-col gap-3">
                {data.overview.map((para, i) => (
                  <p key={i} className="text-gray-500 text-sm leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div
              ref={highlightsRef}
              style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
            >
              <h2 className="text-gray-900 font-bold text-2xl mb-4 pb-2 border-b border-gray-100">
                Tour Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <FaCheck className="text-orange-500 text-xs mt-1 shrink-0" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Includes / Excludes */}
            <div
              style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div>
                <h2 className="text-gray-900 font-bold text-2xl mb-4 pb-2 border-b border-gray-100">
                  Includes
                </h2>
                <div className="flex flex-col gap-2">
                  {data.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <FaCheck className="text-green-500 text-xs mt-1 shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-gray-900 font-bold text-2xl mb-4 pb-2 border-b border-gray-100">
                  Excludes
                </h2>
                <div className="flex flex-col gap-2">
                  {data.excludes.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <FaTimes className="text-red-400 text-xs mt-1 shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div
              ref={itineraryRef}
              style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
            >
              <h2 className="text-gray-900 font-bold text-2xl mb-6 pb-2 border-b border-gray-100">
                Day-by-Day Itinerary
              </h2>
              <div className="flex flex-col gap-0">
                {data.itinerary.map((day, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                        <FaCalendarAlt className="text-white text-xs" />
                      </div>
                      {i < data.itinerary.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 my-1" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-8 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-orange-500 font-bold text-sm">
                          {day.day}
                        </span>
                        <span className="text-gray-900 font-semibold text-sm">
                          — {day.title}
                        </span>
                      </div>
                      <ul className="flex flex-col gap-1">
                        {day.activities.map((act, j) => (
                          <li
                            key={j}
                            className="text-gray-500 text-xs leading-relaxed flex items-start gap-1.5"
                          >
                            <span className="text-gray-300 mt-1">·</span>
                            {act}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-xs italic mt-2">
                * Itinerary flow may vary according to your flight schedule.
              </p>
            </div>
          </div>

          {/* ── Right: Sidebar ───────────────────────────────── */}
          <div
            ref={sidebarRef}
            style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
            className="w-full lg:w-72 shrink-0"
          >
            <div className="sticky top-24 flex flex-col gap-4">
              {/* Price card */}
              <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-5">
                <h3 className="text-gray-900 font-bold text-base">
                  Book This Tour
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {data.subtitle} · Expert guided · All inclusive
                </p>

                <div className="flex items-center justify-center border-t border-gray-100 pt-4">
                  {/* <div>
                    <p className="text-gray-400 text-xs mb-1">Per Child</p>
                    <p className="text-gray-900 text-2xl font-bold">
                      ${data.price.child}
                    </p>
                  </div> */}
                  <div className="flex flex-col items-center">
                    <p className="text-gray-400 text-xs mb-1">Starting From</p>
                    <p className="text-gray-900 text-2xl font-bold">
                      ${data.price.adult}
                    </p>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold text-sm py-3 rounded-xl text-center"
                >
                  Book Now
                </Link>
                <Link
                  to="/tailor-made"
                  className="w-full border border-gray-200 hover:border-orange-400 transition-colors text-gray-700 font-semibold text-sm py-3 rounded-xl text-center"
                >
                  Tailor Make This Package
                </Link>
                <p className="text-gray-400 text-xs text-center">
                  Need some help?{" "}
                  <Link to="/contact" className="text-orange-500 underline">
                    Contact Us
                  </Link>
                </p>
              </div>

              {/* Quick info card */}
              <div className="bg-gray-50 rounded-2xl p-5 flex flex-col gap-3">
                <h4 className="text-gray-700 font-semibold text-sm">
                  Quick Info
                </h4>
                {[
                  { label: "Duration", value: data.subtitle },
                  { label: "Type", value: "Guided Group / Private" },
                  { label: "Difficulty", value: "Easy to Moderate" },
                  // { label: "Departure", value: "Daily, Year Round" },
                  { label: "Language", value: "Multilingual" },
                ].map((info, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-xs border-b border-gray-200 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-gray-400">{info.label}</span>
                    <span className="text-gray-700 font-medium">
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourDetailPage;