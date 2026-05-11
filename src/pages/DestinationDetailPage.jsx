import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import PageHero from "../common/PageHero";
import RelatedDestinations from "../destination/RelatedDestination";
import useScrollReveal from "../hooks/useScrollReveal";
import { FaCheck } from "react-icons/fa";

// In a real app this would come from an API/DB
// Each activity from the grid maps to a slug
const destinationData = {
  "climb-sigiriya": {
    title: "Destination Details",
    subtitle: "Sigiriya",
    heroImage: "/images/destination/sigiriya-aerial.jpg",
    gallery: [
      "/images/destination/sigiriya-aerial.jpg",
      "/images/destination/sigiriya-sign.jpg",
      "/images/destination/sigiriya-ocean.jpg",
      "/images/destination/sigiriya-peacock.jpg",
      "/images/destination/sigiriya-hills.jpg",
      "/images/destination/sigiriya-lighthouse.jpg",
      "/images/destination/sigiriya-beach.jpg",
    ],
    overview: [
      "Sigiriya, known as Lion Rock, is one of Sri Lanka's most iconic landmarks, blending ancient engineering with breathtaking natural beauty. Rising 200 metres above the surrounding plains, its summit reveals the ruins of a 5th-century palace complex.",
      "Visitors can walk across the high-level pathways for panoramic views of the surrounding jungle, reservoirs, and distant mountains. The climb itself takes you past ancient frescoes of celestial maidens painted on the rock face.",
      "Standing proudly above the Matale Valley, Sigiriya is a masterpiece of ancient Sri Lankan heritage and innovation. Whether you admire it from below or conquer its summit, it is one of the most unforgettable experiences on the island.",
    ],
    highlights: [
      "Explore the ancient Lion Rock fortress and palace ruins.",
      "Admire the famous Sigiriya frescoes painted on the rock face.",
      "Discover the mirror wall with ancient graffiti dating back centuries.",
      "Hike to the summit for breathtaking 360° panoramic views.",
      "Experience the surrounding water gardens and landscaped grounds.",
      "Visit the Sigiriya Museum to learn about the site's rich history.",
    ],
    toChild: 138,
    toAdult: 399,
  },
  "adams-peak": {
    title: "Destination Details",
    subtitle: "Adam's Peak",
    heroImage: "/images/destination/adams-peak.jpg",
    gallery: [
      "/images/destination/adams-peak.jpg",
      "/images/destination/adams-peak-2.jpg",
      "/images/destination/adams-peak-3.jpg",
      "/images/destination/adams-peak-4.jpg",
      "/images/destination/adams-peak-5.jpg",
      "/images/destination/adams-peak-6.jpg",
      "/images/destination/adams-peak-7.jpg",
    ],
    overview: [
      "Adam's Peak, known locally as Sri Pada, is Sri Lanka's most sacred mountain and one of the most remarkable pilgrimage sites in Asia. The conical peak rises 2,243 metres above sea level.",
      "The climb is traditionally done overnight to reach the summit before dawn, where pilgrims and travellers are rewarded with a spectacular sunrise and the famous shadow of the peak cast across the misty hills below.",
      "Revered by four religions — Buddhism, Hinduism, Islam, and Christianity — the site holds a sacred footprint at its summit, making it a truly unique spiritual destination unlike any other in the world.",
    ],
    highlights: [
      "Climb overnight to witness the magical sunrise from the summit.",
      "See the sacred Sri Pada footprint revered by four religions.",
      "Watch the iconic triangular shadow cast across the misty valleys.",
      "Experience the vibrant atmosphere of pilgrims and fellow trekkers.",
      "Pass through lush rainforest filled with endemic flora and fauna.",
      "Visit the surrounding tea country for a complete highland experience.",
    ],
    toChild: 99,
    toAdult: 279,
  },
  "witness-dolphins-whales": {
    title: "Destination Details",
    subtitle: "Dolphins & Whales",
    heroImage: "/images/destination/dolphins.jpg",
    gallery: [
      "/images/destination/dolphins.jpg",
      "/images/destination/dolphins-2.jpg",
      "/images/destination/dolphins-3.jpg",
      "/images/destination/dolphins-4.jpg",
      "/images/destination/dolphins-5.jpg",
      "/images/destination/dolphins-6.jpg",
      "/images/destination/dolphins-7.jpg",
    ],
    overview: [
      "The waters off Mirissa and Trincomalee are among the best places in the world to witness blue whales and spinner dolphins in their natural habitat.",
      "Early morning boat tours take you out into the deep Indian Ocean where you can spot the world's largest animal — the blue whale — alongside playful pods of spinner dolphins leaping through the bow waves.",
      "The experience is both humbling and exhilarating, offering a rare window into the ocean's most magnificent creatures in an ethical and sustainable setting.",
    ],
    highlights: [
      "Spot blue whales — the largest animals ever to have lived on Earth.",
      "Watch spinner dolphins leap and spin in the vessel's bow waves.",
      "Enjoy an early morning boat tour across calm Indian Ocean waters.",
      "Look out for sperm whales and orcas during peak season.",
      "Combine with a visit to Mirissa Beach for a full coastal day.",
      "Choose certified eco-friendly whale watching operators.",
    ],
    toChild: 79,
    toAdult: 199,
  },
  "into-the-wild": {
    title: "Destination Details",
    subtitle: "Yala Wild Safari",
    heroImage: "/images/destination/leopard-tree.jpg",
    gallery: [
      "/images/destination/leopard-tree.jpg",
      "/images/destination/yala-2.jpg",
      "/images/destination/yala-3.jpg",
      "/images/destination/yala-4.jpg",
      "/images/destination/yala-5.jpg",
      "/images/destination/yala-6.jpg",
      "/images/destination/yala-7.jpg",
    ],
    overview: [
      "Yala National Park is Sri Lanka's most visited and second largest national park, famous for having one of the highest densities of leopards in the world.",
      "Open jeep safaris take you deep into the scrub jungle, lagoons, and rocky outcrops where leopards lounge in trees, elephants roam freely, and sloth bears forage along the forest floor.",
      "Beyond leopards, Yala is home to elephants, crocodiles, water buffalo, and over 200 species of birds, making every game drive a unique and thrilling wildlife encounter.",
    ],
    highlights: [
      "Track leopards — Yala has the world's highest leopard density.",
      "Spot wild elephants, sloth bears, and water buffalo on safari.",
      "Explore diverse ecosystems from jungle to lagoon and coastline.",
      "Enjoy sunrise and sunset game drives in open-top jeeps.",
      "Birdwatch with over 200 species including painted storks.",
      "Stay at luxury eco-lodges on the edge of the national park.",
    ],
    toChild: 120,
    toAdult: 349,
  },
  "sun-and-fun": {
    title: "Destination Details",
    subtitle: "Beach Escapes",
    heroImage: "/images/destination/sunset-beach.jpg",
    gallery: [
      "/images/destination/sunset-beach.jpg",
      "/images/destination/beach-2.jpg",
      "/images/destination/beach-3.jpg",
      "/images/destination/beach-4.jpg",
      "/images/destination/beach-5.jpg",
      "/images/destination/beach-6.jpg",
      "/images/destination/beach-7.jpg",
    ],
    overview: [
      "Sri Lanka's coastline stretches over 1,600 kilometres, offering some of Asia's most beautiful and diverse beaches. From the golden sands of the south to the calm turquoise bays of the east, every stretch is stunning.",
      "Whether you're looking for lively beach towns with surf schools and beach bars, or secluded coves with nothing but palm trees and birdsong, Sri Lanka's coastline has it all.",
      "The island's position in the Indian Ocean means that there's always a beach in season — the south and west shine from November to April, while the east coast sparkles from May to September.",
    ],
    highlights: [
      "Relax on golden beaches along the south and east coastlines.",
      "Try surfing, snorkelling, or kitesurfing in crystal clear waters.",
      "Watch spectacular sunsets from Galle, Mirissa, or Tangalle.",
      "Explore vibrant beach towns with fresh seafood and nightlife.",
      "Visit secluded coves accessible only by boat or jungle trail.",
      "Swim with sea turtles at Hikkaduwa Marine Sanctuary.",
    ],
    toChild: 89,
    toAdult: 229,
  },
  "witness-the-elephant-gathering": {
    title: "Destination Details",
    subtitle: "Elephant Gathering",
    heroImage: "/images/destination/elephants-gather.jpg",
    gallery: [
      "/images/destination/elephants-gather.jpg",
      "/images/destination/elephant-2.jpg",
      "/images/destination/elephant-3.jpg",
      "/images/destination/elephant-4.jpg",
      "/images/destination/elephant-5.jpg",
      "/images/destination/elephant-6.jpg",
      "/images/destination/elephant-7.jpg",
    ],
    overview: [
      "Every year between June and September, Minneriya National Park hosts the world's largest gathering of wild Asian elephants — a phenomenon known simply as The Gathering.",
      "As the ancient Minneriya reservoir recedes during the dry season, hundreds of elephants converge on the exposed grasslands to graze, bathe, and socialise in an awe-inspiring spectacle.",
      "Watching over 300 wild elephants interact in their natural habitat, with calves playing in the shallows and bulls sparring on the plains, is one of the greatest wildlife experiences on the planet.",
    ],
    highlights: [
      "Witness up to 300+ wild elephants gathered at one location.",
      "Watch elephant families bathe and play in the reservoir shallows.",
      "Observe young calves and sparring bulls up close from open jeeps.",
      "Combine with Kaudulla and Eco Park for maximum elephant sightings.",
      "Best visited between August and October at peak gathering season.",
      "Enjoy the stunning backdrop of the ancient Minneriya reservoir.",
    ],
    toChild: 110,
    toAdult: 299,
  },
  "surfing-the-coast": {
    title: "Destination Details",
    subtitle: "Arugam Bay Surfing",
    heroImage: "/images/destination/surfing.jpg",
    gallery: [
      "/images/destination/surfing.jpg",
      "/images/destination/surf-2.jpg",
      "/images/destination/surf-3.jpg",
      "/images/destination/surf-4.jpg",
      "/images/destination/surf-5.jpg",
      "/images/destination/surf-6.jpg",
      "/images/destination/surf-7.jpg",
    ],
    overview: [
      "Arugam Bay on Sri Lanka's east coast is consistently ranked among the top surfing destinations in Asia. Its main point break delivers long, consistent right-handers that suit surfers of all levels.",
      "The laid-back fishing village atmosphere, warm Indian Ocean waters, and reliable May–September surf season make Arugam Bay the perfect base for days filled with waves and nights by the beach.",
      "Beyond surfing, the surrounding area offers incredible wildlife watching at Kumana National Park, ancient temples, and some of the most beautiful and uncrowded beaches in Sri Lanka.",
    ],
    highlights: [
      "Surf the famous Arugam Bay main point — one of Asia's best breaks.",
      "Take lessons with certified local surf instructors.",
      "Explore quieter breaks at Pottuvil Point and Whisky Point.",
      "Combine surfing with wildlife safaris at Kumana National Park.",
      "Enjoy fresh seafood and a vibrant backpacker beach atmosphere.",
      "Best surf season runs from May through to September.",
    ],
    toChild: 95,
    toAdult: 249,
  },
  "whitewater-rafting": {
    title: "Destination Details",
    subtitle: "Kitulgala Rafting",
    heroImage: "/images/destination/rafting.jpg",
    gallery: [
      "/images/destination/rafting.jpg",
      "/images/destination/raft-2.jpg",
      "/images/destination/raft-3.jpg",
      "/images/destination/raft-4.jpg",
      "/images/destination/raft-5.jpg",
      "/images/destination/raft-6.jpg",
      "/images/destination/raft-7.jpg",
    ],
    overview: [
      "Kitulgala, nestled in Sri Lanka's lush rainforest, is the adventure capital of the island and the go-to destination for whitewater rafting on the Kelani River.",
      "The river offers exciting grade 3–4 rapids with names like School Master, Killer Falls, and The Destroyer, weaving through dense tropical jungle for an adrenaline rush surrounded by breathtaking nature.",
      "Kitulgala is also the filming location of the Academy Award-winning film 'The Bridge on the River Kwai', adding a fascinating historical layer to your adventure day out.",
    ],
    highlights: [
      "Tackle grade 3–4 rapids on the wild Kelani River.",
      "Raft through lush tropical rainforest and stunning gorges.",
      "Visit the filming location of 'The Bridge on the River Kwai'.",
      "Combine rafting with canyoning, abseiling, and cliff jumping.",
      "Suitable for beginners and experienced rafters alike.",
      "Enjoy a riverside picnic lunch after your rafting adventure.",
    ],
    toChild: 85,
    toAdult: 219,
  },
  "bird-watching": {
    title: "Destination Details",
    subtitle: "Bird Watching",
    heroImage: "/images/destination/peacock.png",
    gallery: [
      "/images/destination/peacock.png",
      "/images/destination/bird-2.jpg",
      "/images/destination/bird-3.jpg",
      "/images/destination/bird-4.jpg",
      "/images/destination/bird-5.jpg",
      "/images/destination/bird-6.jpg",
      "/images/destination/bird-7.jpg",
    ],
    overview: [
      "Sri Lanka is a world-class birdwatching destination, home to over 230 species including 33 endemics found nowhere else on Earth. From vibrant kingfishers to majestic eagles, the island is a paradise for birders.",
      "The country's diverse ecosystems — rainforest, dry zone scrub, highlands, wetlands, and coast — each harbour distinct bird communities, making Sri Lanka a rewarding destination year-round.",
      "Key birding hotspots include Sinharaja Rainforest, Horton Plains, Bundala National Park, and Victoria-Randenigala Sanctuary, where endemic species like the Sri Lanka blue magpie and the Serendib scops owl can be found.",
    ],
    highlights: [
      "Spot 33 endemic bird species found only in Sri Lanka.",
      "Visit Sinharaja Rainforest for the greatest endemic diversity.",
      "Watch flocks of painted storks and pelicans at Bundala wetlands.",
      "Look for the elusive Serendib scops owl on guided night walks.",
      "Explore Horton Plains for endemic highland species.",
      "Join expert local birding guides for the best possible sightings.",
    ],
    toChild: 75,
    toAdult: 189,
  },
};

// Convert activity title to URL slug
export const toSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const DestinationDetailPage = () => {
  const { slug } = useParams();
  const data = destinationData[slug];

  const galleryRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);

  useScrollReveal(galleryRef, 100);
  useScrollReveal(contentRef, 200);
  useScrollReveal(sidebarRef, 300);

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Destination not found.</p>
        <Link to="/destinations" className="text-orange-500 underline text-sm">
          Back to Destinations
        </Link>
      </div>
    );
  }

  // Gallery layout: row1 = first 4, row2 = last 3
  const galleryRow1 = data.gallery.slice(0, 4);
  const galleryRow2 = data.gallery.slice(4, 7);

  return (
    <>
      <PageHero
        title={`${data.title}`}
        image={data.heroImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Destinations", href: "/destinations" },
          { label: data.subtitle },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            {data.title} <br /> {data.subtitle}
          </h1>
        </div>

        {/* Gallery */}
        <div
          ref={galleryRef}
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
          className="flex flex-col gap-2 mb-10"
        >
          {/* Row 1 — 4 equal images */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {galleryRow1.map((src, i) => (
              <div key={i} className="h-36 sm:h-44 rounded-xl overflow-hidden">
                <img
                  src={src}
                  alt={`gallery-${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* Row 2 — 3 images, first one wider */}
          <div className="grid grid-cols-2 sm:grid-cols-[2fr_1fr_1fr] gap-2">
            {galleryRow2.map((src, i) => (
              <div key={i} className="h-36 sm:h-44 rounded-xl overflow-hidden">
                <img
                  src={src}
                  alt={`gallery-r2-${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Overview + Highlights */}
          <div
            ref={contentRef}
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
            className="flex-1"
          >
            <h2 className="text-gray-900 font-bold text-lg mb-3">Overview</h2>
            <div className="flex flex-col gap-3 mb-8">
              {data.overview.map((para, i) => (
                <p key={i} className="text-gray-500 text-sm leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            <h2 className="text-gray-900 font-bold text-lg mb-3">
              Top-highlight
            </h2>
            <ul className="flex flex-col gap-2">
              {data.highlights.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <FaCheck className="text-orange-500 text-xs mt-1 shrink-0" />
                  <span className="text-gray-600 text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Sidebar */}
          <div
            ref={sidebarRef}
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
            className="w-full lg:w-64 shrink-0"
          >
            <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-5">
              <h3 className="text-gray-900 font-bold text-base">
                Top Travel Destinations
              </h3>

              {/* Pricing */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-gray-400 text-xs mb-1">To Child</p>
                  <p className="text-gray-900 text-2xl font-bold">
                    {data.toChild}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-1">To Adult</p>
                  <p className="text-gray-900 text-2xl font-bold">
                    ${data.toAdult}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold text-sm py-3 rounded-xl">
                Learn More Us
              </button>

              {/* Help */}
              <p className="text-gray-400 text-xs text-center">
                Need some help?{" "}
                <Link
                  to="/contact"
                  className="text-orange-500 underline hover:text-orange-600"
                >
                  Contact Us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    <RelatedDestinations currentSlug={slug} />
    </>
  );
};

export default DestinationDetailPage;