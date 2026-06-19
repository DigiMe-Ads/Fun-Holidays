import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import PageHero from "../common/PageHero";
import RelatedDestinations from "../destination/RelatedDestination";
import useScrollReveal from "../hooks/useScrollReveal";
import { FaCheck } from "react-icons/fa";

// In a real app this would come from an API/DB
// Each activity from the grid maps to a slug
const destinationData = {
  "the-kandy-perahera": {
    title: "Destination Details",
    subtitle: "The Kandy Perahera",
    heroImage: "/images/destination/kandy-perehara.webp",
    gallery: [
      "/images/destination/kandy/kandy-perehara-1.jpg",
      "/images/destination/kandy/kandy-perehara-2.jpg",
      "/images/destination/kandy/kandy-perehara-3.jpg",
      "/images/destination/kandy/kandy-perehara-4.webp",
      "/images/destination/kandy/kandy-perehara-6.jpg",
      "/images/destination/kandy/kandy-perehara-7.webp",
    ],
    overview: [
      "The Kandy Perahera is one of the most extraordinary spectacles in all of Asia — a living, breathing festival that has been performed without interruption for over 400 years. Formally known as the Esala Perahera, it is a magnificent coalescence of two ancient processions: the Esala Perahera, dating back to the 3rd century BC, and the Dalada Perahera, established in the 4th century CE to honour the Sacred Tooth Relic of the Buddha, housed in the revered Sri Dalada Maligawa (Temple of the Tooth).",
      "The procession fills the night with extraordinary sensory richness. Traditional Kandyan dancers — including the celebrated fire dancers who spin flaming torches inches from their bodies, and the fearsome whip dancers whose cracks echo across the hillsides — lead the procession with centuries-old choreography. The beating of traditional drums, the low resonance of the udekki, and the powerful thump of the yak bera creates a rhythm that seems to come from the very earth itself.",
      "The undisputed centrepiece is the Maligawa Tusker — a magnificently adorned elephant draped in intricate gold-embroidered costume, carrying the golden casket that houses the Sacred Tooth Relic. Accompanied by dozens of equally splendid elephants and illuminated by thousands of lights, this is one of the most profoundly moving sights in Asian travel. Kandy itself offers much more: the Royal Botanical Gardens at Peradeniya, the legendary Kandy Lake, and the historic Gadaladenia and Lankathilaka temples all await exploration.",
    ],
    highlights: [
      "Witness the Esala Perahera — performed without interruption for over 400 years.",
      "Watch celebrated fire dancers spin flaming torches in centuries-old choreography.",
      "See the fearsome whip dancers whose cracks echo dramatically across the hillsides.",
      "Experience the Maligawa Tusker carrying the Sacred Tooth Relic in golden splendour.",
      "Held across ten nights every July and August in the cultural capital of Kandy.",
      "Combine the Perahera with the Royal Botanical Gardens, Kandy Lake, and ancient temples.",
    ],
    toChild: 138,
    toAdult: 399,
  },

  "nature-trails-trekking": {
    title: "Destination Details",
    subtitle: "Nature Trails & Trekking",
    heroImage: "/images/destination/nature-trail.jpg",
    gallery: [
      "/images/destination/nature-trail.jpg",
      "/images/destination/trekking/nature-trail-3.jpg",
      "/images/destination/trekking/nature-trail-4.jpg",
      "/images/destination/trekking/nature-trail-5.webp",
      "/images/destination/trekking/nature-trail-6.webp",
      "/images/destination/trekking/nature-trail-7.jpeg",
    ],
    overview: [
      "Sri Lanka's landscapes were made for exploration on foot. From the misty highlands of the central mountains to the ancient rainforests of the south-west and the dramatic escarpments of the hill country, trekking in Sri Lanka offers some of the most rewarding and visually breathtaking nature experiences in all of Asia. At Horton Plains National Park, you can walk to World's End — a sheer, 900-metre escarpment that drops suddenly from the plateau, revealing a view of seemingly limitless depth on a clear morning.",
      "Adam's Peak — Sri Pada — is Sri Lanka's most sacred mountain, revered by all four of the island's major religions. The pre-dawn climb up thousands of stone steps through cool jungle air, following chains of pilgrims' lanterns, is one of the most extraordinary trekking experiences in Asia. At the summit, a sacred footprint and a sunrise so spectacular that pilgrims have been making this climb for over a thousand years await you.",
      "The Knuckles Mountain Range offers multi-day trekking through mist-covered peaks, cloud forest, and traditional villages. Sinharaja Forest Reserve — one of Asia's last primary tropical rainforests and a UNESCO World Heritage Site — offers guided jungle trails through extraordinary biodiversity. Fun Holidays offers tailor-made nature tour packages for individuals, couples, families, and groups, customised to your fitness level, timeframe, and interests.",
    ],
    highlights: [
      "Walk to World's End — a sheer 900-metre escarpment at Horton Plains National Park.",
      "Climb Adam's Peak before dawn to witness a legendary Himalayan sunrise.",
      "Trek the remote Knuckles Mountain Range through cloud forest and traditional villages.",
      "Explore Sinharaja Forest Reserve — a UNESCO World Heritage primary rainforest.",
      "Walk rolling tea estates and scenic viewpoints in Ella and Haputale.",
      "Choose from guided group treks or fully customised private nature trail packages.",
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
      "/images/destination/dolphins/dolphins-2.webp",
      "/images/destination/dolphins/dolphins-3.jpg",
      "/images/destination/dolphins/dolphins-4.jpg",
      "/images/destination/dolphins/dolphins-5.jfif",
      "/images/destination/dolphins/dolphins-6.webp",
      "/images/destination/dolphins/dolphins-7.jpg",
    ],
    overview: [
      "The waters off Mirissa and Dondra Point on Sri Lanka's south coast are among the world's most reliable locations for blue whale sightings between November and April. These magnificent animals — the largest creatures ever to have lived on Earth — surface, blow, and occasionally breach within sight of small boats, creating moments of pure, breathtaking awe.",
      "Early morning boat tours take you out into the deep Indian Ocean, where playful pods of spinner dolphins often accompany the vessel through the bow waves. Sperm whales, humpback whales, and bottlenose dolphins are also regularly encountered in these extraordinarily rich and biodiverse waters.",
      "Sri Lanka's whale watching is among the finest in the world — not merely as a spectacle, but as an ethical experience operated by responsible, certified guides who place the animals' welfare first. An encounter with a blue whale in these waters is something you will carry with you for the rest of your life.",
    ],
    highlights: [
      "Spot blue whales — the largest animals ever to have lived on Earth.",
      "Watch spinner dolphins leap and spin playfully through the vessel's bow waves.",
      "Look out for sperm whales, humpback whales, and bottlenose dolphins.",
      "Enjoy expert-guided early morning boat tours across calm Indian Ocean waters.",
      "Combine with beautiful Mirissa Beach for a perfect full coastal day.",
      "Travel only with certified, responsible, eco-friendly whale watching operators.",
    ],
    toChild: 79,
    toAdult: 199,
  },

  "into-the-wild": {
    title: "Destination Details",
    subtitle: "Sri Lanka Wildlife Safaris",
    heroImage: "/images/destination/leopard-tree.jpg",
    gallery: [
      "/images/destination/leopard-tree.jpg",
      "/images/destination/yala/yala-2.jpg",
      "/images/destination/yala/yala-3.png",
      "/images/destination/yala/yala-4.jpg",
      "/images/destination/yala/yala-5.jpg",
      "/images/destination/yala/yala-6.webp",
      "/images/destination/yala/yala-7.webp",
    ],
    overview: [
      "For wildlife lovers, Sri Lanka is one of the most rewarding destinations in Asia — perhaps the world. Despite its compact size, this island's biodiversity is extraordinary, its national parks are remarkably accessible, and the quality of wildlife encounters consistently exceeds expectations. Yala National Park is home to the world's highest density of wild leopards. Your safari jeep slows to a stop — a female leopard regards you with magnificent calm from 15 metres. Elephants cross the road. A sloth bear shuffles through the undergrowth. Around every corner, the unexpected becomes reality.",
      "Beyond Yala, Udawalawe National Park offers some of the most reliable elephant viewing in Asia, with herds often numbering 30 or more moving across open grassland in full view. The park is also home to the Elephant Transit Home — a rehabilitation centre for orphaned elephant calves offering genuinely moving encounters. Wilpattu, Sri Lanka's largest national park, provides a wilder, more remote safari in a landscape of natural lakes and ancient forest.",
      "Sri Lanka's wildlife extends to the ocean. The waters off Mirissa and Dondra Point are among the world's most reliable locations for blue whale sightings between November and April — the largest creatures ever to have lived on Earth, surfacing and occasionally breaching within sight of small boats. Fun Holidays offers wildlife safari packages from our 7-day Best of Sri Lanka Tour to fully customised wildlife itineraries combining Yala, Minneriya, Udawalawe, and whale watching.",
    ],
    highlights: [
      "Track leopards at Yala — the park with the world's highest wild leopard density.",
      "See reliable elephant herds at Udawalawe, often numbering 30 or more.",
      "Visit the Elephant Transit Home — a rehabilitation centre for orphaned calves.",
      "Explore the remote wilds of Wilpattu — Sri Lanka's largest national park.",
      "Watch blue whales and spinner dolphins off Mirissa and Dondra Point.",
      "Choose from guided packages or fully customised wildlife safari itineraries.",
    ],
    toChild: 120,
    toAdult: 349,
  },

  "sun-and-fun": {
    title: "Destination Details",
    subtitle: "Sri Lanka Beach Holidays",
    heroImage: "/images/destination/sunset-beach.jpg",
    gallery: [
      "/images/destination/sunset-beach.jpg",
      "/images/destination/beach/beach-2.webp",
      "/images/destination/beach/beach-3.jpg",
      "/images/destination/beach/beach-8.jpg",
      "/images/destination/beach/beach-4.jpg",
      "/images/destination/beach/beach-6.jpg",
      "/images/destination/beach/beach-7.jpg",
    ],
    overview: [
      "When travellers think of Asian beach holidays, they think of Bali, Phuket, or the Maldives. But Sri Lanka's beaches are equally extraordinary — and far less crowded. With over 1,300 kilometres of stunning coastline, this compact island offers some of the finest beaches in Asia, with the added bonus of remarkable culture, wildlife, and cuisine within easy reach of every beach destination.",
      "Sri Lanka's beach calendar is one of its great advantages. The south and west coasts — Negombo, Hikkaduwa, Unawatuna, and Mirissa — are at their brilliant best between November and April. The east coast beaches of Trincomalee, Passikudah, and Arugam Bay come alive between May and September, offering pristine and uncrowded swimming conditions. Sri Lanka has outstanding beach conditions virtually all year round — a rarity among Asian destinations.",
      "Fun Holidays' Golden Beach Tour takes you from Negombo to the south coast in 5 days — including a canal boat ride through mangroves, a visit to a sea turtle hatchery, a traditional cookery demonstration with a Sri Lankan family, and city tours of Colombo and Galle. The perfect introduction to Sri Lanka's extraordinary beach holiday scene. Contact us today and let us design your perfect Sri Lanka beach holiday.",
    ],
    highlights: [
      "Relax on golden beaches from Negombo and Hikkaduwa to Mirissa and Unawatuna.",
      "Snorkel Hikkaduwa's coral reef and swim with sea turtles at the marine sanctuary.",
      "Explore the UNESCO-listed Galle Fort — one of Asia's finest preserved colonial towns.",
      "Discover Trincomalee's Marble Beach and Passikudah's translucent shallow lagoon.",
      "Surf Arugam Bay on the east coast — one of Asia's most celebrated surf destinations.",
      "Combine beach relaxation with whale watching, cultural day trips, and wildlife safaris.",
    ],
    toChild: 89,
    toAdult: 229,
  },

  "the-elephant-gathering": {
    title: "Destination Details",
    subtitle: "The Elephant Gathering",
    heroImage: "/images/destination/elephants-gather.jpg",
    gallery: [
      "/images/destination/elephants-gather.jpg",
      "/images/destination/elephants/elephant-2.jpg",
      "/images/destination/elephants/elephant-3.jfif",
      "/images/destination/elephants/elephant-4.jpg",
      "/images/destination/elephants/elephant-5.jpg",
      "/images/destination/elephants/elephant-6.jpg",
      "/images/destination/elephants/elephant-7.jpg",
    ],
    overview: [
      "As the dry season descends on Sri Lanka's North Central Province, something extraordinary begins to happen. From the jungle surrounding the ancient Minneriya Tank — a reservoir built by King Mahasena in the 3rd century AD — shadows emerge. One by one, then in groups, then in vast herds, wild elephants make their way onto the sun-baked grasslands. Over 300 elephants converge on Minneriya between May and September in what is known as The Gathering: the largest congregation of wild Asian elephants on Earth.",
      "There is nothing else like it in Asia. The Elephant Gathering at Minneriya National Park is one of the most astonishing wildlife spectacles on the planet — comparable in its drama and scale to the great wildebeest migration of the Serengeti, yet almost entirely unknown outside of Sri Lanka. Giant bulls compete for dominance at the water's edge. Females protect their calves. Young elephants splash and chase each other in the shallows in a display of complex elephant society that is endlessly fascinating to observe.",
      "The best time to visit is late afternoon, when elephants arrive in greater numbers and golden hour light creates scenes of breathtaking beauty. Fun Holidays can incorporate a Minneriya Elephant Gathering safari into any of our Sri Lanka tour packages, or design a custom itinerary around the gathering season. The Amazing Sri Lanka Tour also begins in Anuradhapura, where the world-famous Pinnawala Elephant Orphanage offers a very different but equally moving elephant experience.",
    ],
    highlights: [
      "Witness over 300 wild Asian elephants — the largest gathering of its kind on Earth.",
      "Watch giant bulls compete for dominance at the ancient reservoir's edge.",
      "Observe calves and family herds bathe, play, and socialise in the shallows.",
      "Best visited between May and September, with peak numbers occurring in August.",
      "Combine with Kaudulla National Park for maximum elephant sightings in the region.",
      "Also visit Pinnawala Elephant Orphanage for a very different but equally moving encounter.",
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
      "/images/destination/surfing/surf-2.jpg",
      "/images/destination/surfing/surf-3.jfif",
      "/images/destination/surfing/surf-4.jpeg",
      "/images/destination/surfing/surf-5.webp",
      "/images/destination/surfing/surf-6.jpg",
      "/images/destination/surfing/surf-7.webp",
    ],
    overview: [
      "Arugam Bay on Sri Lanka's east coast is consistently ranked among the top surfing destinations in Asia — and celebrated globally for its world-class waves and authentic atmosphere. The main point break delivers long, consistent right-handers that suit every level, from first-timers to seasoned professionals.",
      "The laid-back fishing village atmosphere, warm Indian Ocean waters, and reliable May–September surf season make Arugam Bay the perfect base for days filled with waves and evenings by the beach. Fresh seafood, sunset sessions, and a genuine community of international and local surfers create an atmosphere that keeps travellers returning year after year.",
      "Beyond surfing, the surrounding region offers extraordinary wildlife watching at Kumana National Park, ancient Vedda cultural sites, and some of the most beautiful and uncrowded beaches in Sri Lanka — all within easy reach of this remarkable coastal village.",
    ],
    highlights: [
      "Surf the famous Arugam Bay main point — consistently ranked among Asia's best breaks.",
      "Take lessons or refine your technique with certified local surf instructors.",
      "Explore quieter, uncrowded breaks at Pottuvil Point and Whisky Point.",
      "Combine surfing with jeep safaris at the extraordinary Kumana National Park.",
      "Enjoy the freshest seafood and a vibrant, genuine backpacker beach culture.",
      "Best surf season runs reliably from May through to September each year.",
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
      "/images/destination/rafting/raft-2.jpg",
      "/images/destination/rafting/raft-3.jpg",
      "/images/destination/rafting/raft-4.jfif",
      "/images/destination/rafting/raft-5.jpg",
      "/images/destination/rafting/raft-6.jfif",
      "/images/destination/rafting/raft-7.webp",
    ],
    overview: [
      "Kitulgala, nestled deep in Sri Lanka's lush central rainforest, is the island's undisputed adventure capital and the go-to destination for whitewater rafting on the Kelani River. The river offers thrilling grade 3–4 rapids with legendary names — School Master, Killer Falls, and The Destroyer — weaving through dense tropical jungle for an adrenaline rush set against breathtaking natural scenery.",
      "Kitulgala is also the filming location of the Academy Award-winning film 'The Bridge on the River Kwai' — adding a fascinating layer of cinematic history to your adventure day. Between rapids, the river calms into beautiful green pools surrounded by towering rainforest.",
      "Fun Holidays offers rafting as a standalone day experience or as part of a broader adventure package combining canyoning, abseiling, and cliff jumping — all guided by our certified, experienced local adventure team.",
    ],
    highlights: [
      "Tackle exciting grade 3–4 rapids — School Master, Killer Falls, and The Destroyer.",
      "Raft through stunning tropical rainforest gorges on the wild Kelani River.",
      "Visit the filming location of the Oscar-winning 'The Bridge on the River Kwai'.",
      "Combine rafting with canyoning, abseiling, and cliff jumping for a full adventure day.",
      "Suitable for complete beginners and experienced whitewater rafters alike.",
      "Enjoy a riverside jungle lunch after your rafting adventure with Fun Holidays.",
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
      "/images/destination/birds/bird-2.webp",
      "/images/destination/birds/bird-3.jfif",
      "/images/destination/birds/bird-4.jpg",
      "/images/destination/birds/bird-5.jfif",
      "/images/destination/birds/bird-6.jfif",
      "/images/destination/birds/bird-7.jpg",
    ],
    overview: [
      "Sri Lanka is a world-class birdwatching destination — home to over 230 species, including 33 endemics found nowhere else on Earth. From vibrant kingfishers and iridescent sunbirds to the majestic grey hornbill and the extraordinarily rare Sri Lanka blue magpie, the island's biodiversity rewards birders of every level.",
      "Sri Lanka's diverse ecosystems — primary rainforest, highland cloud forest, dry zone scrub, ancient wetlands, and coastline — each harbour distinct and remarkable bird communities. This ecological variety, compressed into a relatively small island, makes Sri Lanka one of the most rewarding birdwatching destinations in all of Asia, and one that can be enjoyed year-round.",
      "Key birding hotspots include Sinharaja Forest Reserve — a UNESCO World Heritage Site and home to the greatest concentration of endemics — Horton Plains for highland species, and Bundala National Park where vast flocks of painted storks, pelicans, and lesser flamingos gather at the lagoons. Fun Holidays offers expert-guided birding tours tailored to your interests and experience level.",
    ],
    highlights: [
      "Spot 33 endemic bird species found only in Sri Lanka — nowhere else on Earth.",
      "Explore Sinharaja Forest Reserve for the greatest density of endemic birdlife.",
      "Watch extraordinary flocks of painted storks and pelicans at Bundala wetlands.",
      "Search for the rare and elusive Serendib scops owl on expert night walks.",
      "Visit Horton Plains for endemic highland species in cloud forest habitat.",
      "Travel with expert local birding guides for the highest quality sightings.",
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
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
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
            <h2 className="text-gray-900 font-bold text-2xl mb-3">Overview</h2>
            <div className="flex flex-col gap-3 mb-8">
              {data.overview.map((para, i) => (
                <p key={i} className="text-gray-500 text-sm leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            <h2 className="text-gray-900 font-bold text-2xl mb-3">
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