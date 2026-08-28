/**
 * SeedData — push existing hardcoded site content into Firestore.
 * Run each section once. After seeding, edit content through the other admin pages.
 */
import { useState } from "react";
import { db } from "../../firebase/config";
import { setDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";
import { blogs } from "../../data/blogData";

/** Returns true if a URL points to Firebase Storage (not a local /images/ path) */
function isStorageUrl(url) {
  return typeof url === "string" && url.startsWith("https://firebasestorage");
}

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
  {
    slug: "the-kandy-perahera",
    title: "The Kandy Perahera",
    subtitle: "Sri Lanka's Most Spectacular Festival",
    heroImage: "/images/destination/kandy-perahera-hero.jpg",
    thumbnail: "/images/destination/kandy-perahera.jpg",
    gallery: [],
    overview: [
      "The Kandy Esala Perahera is one of Asia's oldest and most spectacular religious festivals, performed without interruption in the city of Kandy for over 400 years. Held each year over 10 consecutive nights in July or August, it draws hundreds of thousands of visitors and is listed as a UNESCO Intangible Cultural Heritage of Humanity.",
      "The pageant features dozens of magnificently decorated elephants, Kandyan dancers, fire performers, and whip crackers — all processing through the historic streets of Kandy in a river of light, colour, and sound that is unlike anything else in the world.",
    ],
    highlights: [
      "400+ years of unbroken tradition",
      "Dozens of elaborately adorned elephants",
      "Traditional Kandyan dancers and fire performers",
      "Sacred Tooth Relic procession — Sri Lanka's holiest artifact",
      "Held annually in July / August over 10 nights",
      "Grandstand seating arranged by Fun Holidays",
    ],
    article: [
      { heading: "What is the Kandy Perahera?", body: "The Esala Perahera is Sri Lanka's most dazzling religious festival — a grand procession that has been performed without interruption in the city of Kandy for over 400 years. Held each year over 10 consecutive nights in July or August, it is one of the longest-running living pageants in Asia and a UNESCO Intangible Cultural Heritage of Humanity." },
      { heading: "What to Expect on the Night", body: "Each evening the streets of Kandy transform into a river of light and colour. Dozens of magnificently decorated elephants — adorned with LED-lit costumes, gilded tusks, and flashing headpieces — parade through the city. Kandyan dancers in elaborate red and gold costumes perform traditional routines, while fire performers, whip crackers, and torch bearers create an atmosphere of pure spectacle." },
      { heading: "The Sacred Tooth Relic", body: "At the heart of the festival is the Golden Casket said to contain the Sacred Tooth Relic of the Lord Buddha, housed in Kandy's Temple of the Tooth. The relic — Sri Lanka's most venerated Buddhist artifact — is paraded through the city on the back of the Maligawa Tusker, the most prestigious elephant in the procession." },
      { heading: "Tips for Attending", body: "Tickets are sold in tiers — grandstand seats directly on the route offer the best views and should be booked well in advance. The final night (Randoli Perahera) is the most spectacular and the most crowded. Smart, respectful dress is appreciated as this is a deeply religious occasion. Fun Holidays arranges comfortable grandstand seating and hotel transfers as part of our Perahera experience packages." },
    ],
    toChild: 150, toAdult: 250, showPrice: true, published: true,
  },
  {
    slug: "the-elephant-gathering",
    title: "The Elephant Gathering",
    subtitle: "World's Largest Wild Elephant Congregation",
    heroImage: "/images/destination/elephant-gathering-hero.jpg",
    thumbnail: "/images/destination/elephant-gathering.jpg",
    gallery: [],
    overview: [
      "Each year between August and October, hundreds of wild Asian elephants gather in and around Minneriya National Park in one of the greatest wildlife spectacles on earth. Known as \"The Gathering\", this extraordinary natural event draws wildlife photographers and nature lovers from around the globe.",
      "Up to 400 elephants converge around the receding Minneriya Tank — an ancient man-made reservoir — to graze on the lush seasonal grassland and drink from the shallower waters. It is entirely wild, entirely natural, and utterly unforgettable.",
    ],
    highlights: [
      "Up to 400 wild elephants in one place",
      "Best viewed August to October",
      "Minneriya National Park open jeep safari",
      "Combine with Sigiriya and Dambulla nearby",
      "Unforgettable photographic opportunity",
      "World's largest temporary Asian elephant congregation",
    ],
    article: [
      { heading: "The World's Greatest Wildlife Spectacle", body: "Each year between August and October, hundreds of wild Asian elephants gather in and around Minneriya National Park in Sri Lanka's North Central Province — forming the world's largest temporary congregation of Asian elephants. This extraordinary event draws wildlife photographers and nature lovers from around the globe." },
      { heading: "Why Do They Gather?", body: "As Sri Lanka's dry season peaks, the ancient Minneriya Tank — a vast reservoir dating from the 3rd century — begins to recede, exposing rich grasslands along its banks. Elephants from across the surrounding forest converge to graze on the lush new grass and drink from the shallower waters. At peak season, up to 400 wild elephants may gather in a single afternoon." },
      { heading: "What You Will See", body: "The Gathering is far more than numbers. Watch elephant families interact, young bulls engage in playful sparring, mothers guard their calves in the water, and entire herds splash and play as the sun sets behind the ancient tank. These are fully wild animals behaving naturally in their own habitat — not domesticated elephants, not a performance." },
      { heading: "Planning Your Visit", body: "The Gathering is best experienced from an open-sided jeep with a knowledgeable naturalist guide. The peak period is September, when elephant numbers are typically highest. Mornings and late afternoons offer the best light for photography. Fun Holidays combines the Elephant Gathering with visits to Sigiriya Rock Fortress and Dambulla Cave Temple for a complete Cultural Triangle experience." },
    ],
    toChild: 120, toAdult: 220, showPrice: true, published: true,
  },
  {
    slug: "into-the-wild",
    title: "Into the Wild",
    subtitle: "Sri Lanka's Premier Safari Experience",
    heroImage: "/images/destination/into-the-wild-hero.jpg",
    thumbnail: "/images/destination/into-the-wild.jpg",
    gallery: [],
    overview: [
      "Despite being one of Asia's smallest countries, Sri Lanka packs an extraordinary density of wildlife into its 26 national parks and nature reserves. The island is one of the world's biodiversity hotspots, earning that status through its remarkable concentration of endemic species and varied habitats.",
      "From Yala's leopards to Udawalawe's elephant herds and Wilpattu's undisturbed wilderness, each of Sri Lanka's national parks offers a genuinely different safari experience. Fun Holidays arranges half-day and full-day safaris with expert naturalist guides.",
    ],
    highlights: [
      "Yala National Park — world's highest leopard density",
      "Udawalawe — 500+ resident wild elephants",
      "Wilpattu — Sri Lanka's largest, most pristine park",
      "Minneriya & Wasgamuwa for the Elephant Gathering",
      "Half and full-day safari options",
      "Expert naturalist guides in open jeeps",
    ],
    article: [
      { heading: "Yala — Sri Lanka's Most Famous Park", body: "Yala National Park in the island's deep south is the most visited of Sri Lanka's parks — and for good reason. Yala has the world's highest density of leopards, with Block 1 of the park offering excellent leopard sightings year-round. The park also hosts large populations of elephants, sloth bears, crocodiles, water buffalo, and hundreds of bird species. Afternoon safaris typically offer the best wildlife sightings." },
      { heading: "Udawalawe — Sri Lanka's Best Elephant Park", body: "For elephant lovers, Udawalawe National Park is unrivalled. Located around the Udawalawe Reservoir on the border of Sabaragamuwa and Uva provinces, this open grassland park is home to a resident population of over 500 wild elephants. Unlike Yala, where elephants move through dense forest, Udawalawe offers clear, open views of herds at close range — making it ideal for photography and families." },
      { heading: "Wilpattu — Sri Lanka's Largest Wilderness", body: "Wilpattu in Sri Lanka's north-west is the largest and arguably most pristine of the island's national parks. Characterised by its unique 'Villus' — natural lake-like basins filled with rainwater — Wilpattu is famous for leopard sightings and offers a genuine wilderness experience far removed from the crowds of Yala. Because it re-opened only after the end of the civil war in 2009, its wildlife populations have remained virtually undisturbed." },
      { heading: "Planning Your Safari", body: "All Fun Holidays safaris use comfortable, open-sided 4WD jeeps with professional naturalist guides who know the parks intimately. We recommend combining Yala with a south coast beach stay, or pairing Minneriya with the Cultural Triangle sites of Sigiriya and Dambulla. Early morning and late afternoon game drives offer the best wildlife activity and the most comfortable temperatures." },
    ],
    toChild: 150, toAdult: 280, showPrice: true, published: true,
  },
  {
    slug: "witness-dolphins-whales",
    title: "Witness Dolphins & Whales",
    subtitle: "Blue Whales Off Sri Lanka's Coast",
    heroImage: "/images/destination/dolphins-whales-hero.jpg",
    thumbnail: "/images/destination/dolphins-whales.jpg",
    gallery: [],
    overview: [
      "Sri Lanka's south coast, particularly around Mirissa, offers world-class blue whale and dolphin watching from November to April. Blue whales — the largest animals ever to have lived on earth, reaching up to 30 metres in length — surface regularly in these deep waters, often within sight of the shore.",
      "Large pods of spinner dolphins are also resident year-round, and sperm whales, Bryde's whales, and occasional orca are reported during the season. Responsible, licensed whale watching boats operate daily from Mirissa Harbour.",
    ],
    highlights: [
      "Blue whales — largest animals on earth",
      "Resident spinner dolphin pods",
      "Sperm whales and Bryde's whales also common",
      "Best season: November to April",
      "Morning departures from Mirissa Harbour",
      "Near-certain blue whale sightings at peak season",
    ],
    article: [
      { heading: "Blue Whales Off Sri Lanka's Coast", body: "Sri Lanka is one of the very best places in the world to see blue whales — the largest animals ever to have lived on earth. These magnificent creatures pass through the waters off Sri Lanka's south coast between November and April, drawn by the rich upwelling currents that follow the northeast monsoon. A typical whale watching trip from Mirissa offers sightings at distances that still seem impossibly close for an animal of this scale." },
      { heading: "Where to Watch", body: "Mirissa, a small beach town on the southern tip of Sri Lanka, is the island's whale watching capital. Boats depart from Mirissa Harbour most mornings from November to April. The whale watching grounds lie around 10-15 nautical miles offshore, where the ocean floor drops sharply into deep water — ideal habitat for blue whales. A typical trip lasts 4-5 hours and offers near-certain blue whale sightings during peak season (January to March)." },
      { heading: "Spinner Dolphins", body: "Sri Lanka is also home to large resident pods of spinner dolphins, named for their spectacular spinning leaps above the water's surface. Pods of hundreds of spinner dolphins are regularly encountered on whale watching trips, often surrounding the boat and bow-riding. These encounters alone are worth the trip. Sperm whales, Bryde's whales, and occasional orca sightings are also reported throughout the season." },
      { heading: "What to Bring", body: "Morning departures are recommended to make the most of calm sea conditions and peak wildlife activity. Bring sunscreen, sunglasses, a light jacket for the open ocean, and a camera with a zoom lens. Anti-seasickness tablets are available at the harbour. Fun Holidays works exclusively with licensed, responsible whale watching operators who follow Sri Lanka's marine wildlife viewing guidelines to protect the animals and ensure a quality experience." },
    ],
    toChild: 100, toAdult: 180, showPrice: true, published: true,
  },
  {
    slug: "sun-and-fun",
    title: "Sun & Fun",
    subtitle: "Sri Lanka's Finest Beach Experiences",
    heroImage: "/images/destination/sun-fun-hero.jpg",
    thumbnail: "/images/destination/sun-fun.jpg",
    gallery: [],
    overview: [
      "Sri Lanka is blessed with over 1,600 kilometres of stunning coastline — ranging from the calm, golden-sand bays of the west and south to the pristine, lagoon-fringed shores of the east. Because the island's two coastlines face opposite monsoons, there is always a beach somewhere in Sri Lanka enjoying perfect sunshine.",
      "From the accessible west coast resorts near Colombo airport to the picture-perfect south coast coves and the untouched eastern lagoons of Passikudah and Arugam Bay, Sri Lanka's beaches cater to every taste.",
    ],
    highlights: [
      "West coast: Negombo, Marawila, Kalutara, Beruwela",
      "South coast: Unawatuna, Mirissa, Weligama, Tangalle",
      "East coast: Passikudah, Arugam Bay — pristine lagoons",
      "Water sports at multiple locations",
      "West & south best Nov–Apr / East best May–Oct",
      "Safe swimming beaches for families",
    ],
    article: [
      { heading: "Sri Lanka's 1,600km of Coastline", body: "Sri Lanka is blessed with over 1,600 kilometres of stunning coastline — an extraordinary variety of beaches ranging from the calm, golden-sand bays of the west and south to the pristine, lagoon-fringed shores of the east. Because the island's two coastlines face opposite monsoons, there is always a beach somewhere in Sri Lanka enjoying perfect conditions, no matter when you visit." },
      { heading: "West Coast — Easy Access from Colombo", body: "The west coast beaches — Negombo, Marawila, Kalutara, and Beruwela — are the most accessible from Colombo and Bandaranaike International Airport, making them ideal for arrivals and departures. Calm seas, good hotel infrastructure, and a relaxed beach atmosphere make the west coast perfect for first and last nights in Sri Lanka. The best season here is November to April." },
      { heading: "South Coast — Sri Lanka's Beach Capital", body: "Unawatuna, Mirissa, Weligama, and Tangalle on the south coast form the heart of Sri Lanka's beach holiday scene. Unawatuna's sheltered bay is ideal for swimming and snorkelling, while Weligama is famous for its gentle surf and the iconic image of stilted fishermen at sunrise. Mirissa combines a perfect crescent beach with world-class whale watching just offshore. The south coast is at its best from November to April." },
      { heading: "East Coast — Sri Lanka's Best-Kept Secret", body: "Passikudah and Arugam Bay on the east coast are among Sri Lanka's most beautiful and least-visited beaches. Passikudah's shallow turquoise lagoon — stretching for nearly a kilometre with barely a ripple — is one of the safest swimming beaches in Asia, perfect for families. Arugam Bay combines world-class surf with a laid-back village atmosphere. The east coast season runs May to October, making it the perfect complement when the west and south are in monsoon." },
    ],
    toChild: 80, toAdult: 150, showPrice: true, published: true,
  },
  {
    slug: "nature-trails-trekking",
    title: "Nature Trails & Trekking",
    subtitle: "Trek Sri Lanka's Highlands and Forests",
    heroImage: "/images/destination/trekking-hero.jpg",
    thumbnail: "/images/destination/trekking.jpg",
    gallery: [],
    overview: [
      "Sri Lanka's central highlands, rising to over 2,500 metres, are home to some of the finest short and multi-day trekking in South Asia. Cloud forests, cascading waterfalls, tea estate pathways, and dramatic ridge-top viewpoints reward walkers with scenery that surprises most visitors who associate Sri Lanka primarily with beaches and wildlife.",
      "From the eerie plateau landscape of Horton Plains to the biodiverse cloud forests of the Knuckles Range and the accessible trails around Ella, Sri Lanka's highlands offer memorable walking experiences for all fitness levels.",
    ],
    highlights: [
      "Horton Plains — World's End escarpment (870m drop)",
      "Knuckles Mountain Range — UNESCO World Heritage Site",
      "Little Adam's Peak, Ella — accessible panoramic walk",
      "Sinharaja Rainforest — endemic flora and fauna trails",
      "Tea estate pathways and waterfall walks",
      "Guided treks for all fitness levels",
    ],
    article: [
      { heading: "Horton Plains — World's End", body: "Horton Plains National Park in the island's central highlands is Sri Lanka's most dramatic plateau landscape, sitting at over 2,100 metres above sea level. Its main attraction is World's End — a sheer escarpment that drops over 870 metres to the lowland jungle far below. The 9.5km loop trail takes around 3 hours and passes through cloud forest, open grassland, and the beautiful Baker's Falls waterfall. An early morning start is essential before cloud rolls in and obscures the view." },
      { heading: "The Knuckles Mountain Range", body: "The Knuckles Conservation Forest — a UNESCO World Heritage Site — is Sri Lanka's most biodiverse trekking destination. Named for the mountain peaks that resemble the knuckles of a clenched fist, this dramatic highland area features cloud forest trails, over 34 endemic bird species, and cascading mountain streams. Guided half-day and multi-day treks explore traditional villages, hidden waterfalls, and ridgeline viewpoints with sweeping views across the island." },
      { heading: "Ella — Sri Lanka's Trekking Hub", body: "The cool hill town of Ella has become Sri Lanka's most popular base for independent trekkers. Little Adam's Peak offers a straightforward 3km hike through tea bushes and jungle with panoramic views of the surrounding valley — ideal for all fitness levels and families. The more challenging Ella Rock trek climbs through forest to a spectacular summit. Just a 10-minute walk from town, the Nine Arch Bridge — a colonial-era railway viaduct draped in green — is one of Sri Lanka's most photographed sights." },
      { heading: "Sinharaja Rainforest", body: "Sinharaja Forest Reserve in Sri Lanka's lowland wet zone is the island's last viable area of primary tropical rainforest and a UNESCO World Heritage Site. Guided nature walks here enter a world of towering trees, endemic birds, purple-faced langur monkeys, and extraordinary plant life found nowhere else on earth. The forest receives high rainfall year-round, making it a true rainforest experience in every sense. Early morning walks offer the richest wildlife encounters." },
    ],
    toChild: 100, toAdult: 200, showPrice: true, published: true,
  },
  {
    slug: "surfing-the-coast",
    title: "Surfing the Coast",
    subtitle: "World-Class Surf at Arugam Bay",
    heroImage: "/images/destination/surfing-hero.jpg",
    thumbnail: "/images/destination/surfing.jpg",
    gallery: [],
    overview: [
      "Arugam Bay on Sri Lanka's east coast is consistently ranked among the top surf destinations in Asia and one of the best right-hand point breaks in the world. A laid-back fishing village that transforms each May into a thriving surf town, Arugam Bay offers long, peeling right-handers that work reliably from May to October.",
      "Beyond Arugam Bay, Sri Lanka's south and west coasts offer surf for every level from November to April — from Hikkaduwa's classic reef break to Weligama's gentle beach break that is ideal for complete beginners.",
    ],
    highlights: [
      "Arugam Bay — consistently ranked world top-10 surf spot",
      "Hikkaduwa classic reef break (west coast)",
      "Weligama — best beginner surf in Sri Lanka",
      "Two surf seasons cover the whole year",
      "Surf schools, board hire, and lessons at all locations",
      "Combined surf and beach holiday packages",
    ],
    article: [
      { heading: "Arugam Bay — A World Top-10 Surf Spot", body: "Arugam Bay on Sri Lanka's east coast is consistently ranked among the top surf destinations in Asia and one of the best right-hand point breaks in the world. A sleepy fishing village that transforms each May into a thriving surf hub, Arugam Bay offers long, peeling right-handers at the main point that work reliably from May to October when the Indian Ocean swell is consistent. The vibe is relaxed, the accommodation affordable, and the waves genuinely world-class for intermediate and advanced surfers." },
      { heading: "West Coast Surf", body: "Hikkaduwa on the south-west coast is Sri Lanka's original surf destination, with a reef break that has been pulling surfers since the 1970s. The surf here runs from November to April — the opposite season to Arugam Bay — making it ideal for visitors arriving in the peak beach holiday season. Nearby Midigama and Ahangama offer additional reef and point breaks. The breaks around Hikkaduwa suit intermediate surfers, with sections suitable for more experienced riders." },
      { heading: "Weligama — Perfect for Beginners", body: "For those new to surfing, Weligama on the south coast is widely regarded as the best learn-to-surf destination in Sri Lanka. The bay's wide, gentle beach break is ideal for lessons — the waves are consistent but forgiving, and the sandy bottom makes it far more beginner-friendly than reef breaks. Dozens of surf schools in Weligama offer board hire and professional instruction from qualified local instructors. Most first-time surfers are standing on waves within two hours." },
      { heading: "Planning Your Surf Trip", body: "Boards can be hired cheaply at all Sri Lanka surf spots, so there is no need to travel with equipment. Rash vests are recommended to protect against sunburn. The west and south coasts are best from November to April; the east coast from May to October. Fun Holidays can arrange surf-focused itineraries that combine the best waves with beach stays, wildlife safaris, and cultural visits — getting the most out of your time in Sri Lanka." },
    ],
    toChild: 100, toAdult: 180, showPrice: true, published: true,
  },
  {
    slug: "whitewater-rafting",
    title: "Whitewater Rafting",
    subtitle: "Kitulgala Rafting on the Kelani River",
    heroImage: "/images/destination/rafting-hero.jpg",
    thumbnail: "/images/destination/rafting.jpg",
    gallery: [],
    overview: [
      "Kitulgala, a small town nestled in the lush rainforest of Sabaragamuwa Province, is Sri Lanka's whitewater rafting capital. The Kelani River here offers an exhilarating 8-kilometre rafting run with a series of Grade 3 and 4 rapids — challenging enough to be genuinely exciting, but accessible to most fit adults with no prior experience required.",
      "The surrounding jungle setting — the area was famously used as the filming location for the 1957 film The Bridge on the River Kwai — adds drama and beauty to what is already one of the most exciting outdoor activities in Sri Lanka.",
    ],
    highlights: [
      "Grade 3-4 rapids on the Kelani River",
      "8km rafting run through rainforest gorge",
      "Professional guides and full safety equipment",
      "Optional: waterfall abseiling nearby",
      "Combine with jungle trekking",
      "Filming location of The Bridge on the River Kwai",
    ],
    article: [
      { heading: "Sri Lanka's Premier Rafting Destination", body: "Kitulgala, a small town set in the lush rainforest of Sabaragamuwa Province, is Sri Lanka's whitewater rafting capital. The Kelani River here offers an exhilarating 8-kilometre rafting run with a series of Grade 3 and 4 rapids — challenging enough to be genuinely exciting, but accessible to most fit adults with no prior rafting experience required. Professional guides lead every raft, and full safety equipment is provided." },
      { heading: "The Kelani River Experience", body: "The rafting run at Kitulgala takes approximately 2 hours on the water. The route passes through a series of named rapids — including Spice Garden, Final Frontier, and Hell's Gate — interspersed with calmer stretches that allow you to absorb the extraordinary river gorge scenery. The surrounding rainforest, draped in vines and ferns, is home to endemic birds, monitor lizards, and the occasional mugger crocodile basking on the rocks." },
      { heading: "Combined Adventures at Kitulgala", body: "Kitulgala offers more than just rafting. The surrounding forest is excellent for guided jungle trekking, and waterfall abseiling experiences are available nearby. The area was famously used as the filming location for the 1957 Oscar-winning film The Bridge on the River Kwai — the original bridge supports are still visible in the river. Most visitors combine Kitulgala with a day visit to the Sinharaja Rainforest, just over an hour's drive south." },
      { heading: "Safety and Practicalities", body: "All rafting operators in Kitulgala provide safety helmets, life jackets, and paddles, with experienced guides leading each raft. No swimming ability is required — you stay in the raft throughout. The rafting season runs year-round, though the river runs fastest and most excitingly during the wet season (May–September). Bring dry clothes in a sealed bag, leave valuables in the vehicle, and wear secure footwear. Fun Holidays works exclusively with licensed, safety-certified rafting operators." },
    ],
    toChild: 80, toAdult: 150, showPrice: true, published: true,
  },
  {
    slug: "bird-watching",
    title: "Bird Watching",
    subtitle: "Sri Lanka's 400+ Bird Species",
    heroImage: "/images/destination/birdwatching-hero.jpg",
    thumbnail: "/images/destination/birdwatching.jpg",
    gallery: [],
    overview: [
      "Sri Lanka is one of Asia's premier birdwatching destinations, recognised worldwide for its extraordinary combination of endemic species, accessible birding habitats, and remarkable year-round diversity. The island's 400+ recorded bird species include 33 endemics — species found nowhere else on earth.",
      "From the lowland rainforests of Sinharaja to the coastal wetlands of Bundala and the cloud forests of the Knuckles Range, Sri Lanka offers world-class birding experiences within compact, easily accessible distances.",
    ],
    highlights: [
      "33 endemic bird species — found nowhere else",
      "Sinharaja Rainforest — best endemic site in Asia",
      "Bundala National Park — Ramsar wetland with flamingos",
      "Knuckles Range cloud forest birds",
      "400+ total species including winter migrants",
      "Expert naturalist guides for all levels",
    ],
    article: [
      { heading: "A Global Birdwatching Hotspot", body: "Sri Lanka is one of Asia's premier birdwatching destinations, recognised worldwide for its extraordinary combination of endemic species, accessible habitats, and remarkable year-round diversity. The island's 400+ recorded bird species include 33 endemics — species found nowhere else on earth — making Sri Lanka an essential destination for serious listers and a magical one for casual bird enthusiasts. Almost all key birding sites are within a few hours' drive of each other." },
      { heading: "Sinharaja — Sri Lanka's Endemic Bird Capital", body: "The Sinharaja Forest Reserve in Sri Lanka's wet zone lowlands is the undisputed heart of the island's endemic bird zone. This UNESCO World Heritage Site rainforest is the single best location to see the majority of Sri Lanka's endemic species, including the stunning Sri Lanka Blue Magpie, the Sri Lanka Junglefowl (national bird), the Green-billed Coucal, and the Red-faced Malkoha. Early morning guided walks with a local naturalist dramatically increase sighting success." },
      { heading: "Bundala — For Waders and Water Birds", body: "Bundala National Park on the south coast is Sri Lanka's premier wetland birding site and a Ramsar-listed internationally important wetland. The park's lagoons and mudflats attract vast numbers of migratory waders from central Asia and Siberia between September and March. Greater Flamingos feed in the shallow lagoons during peak season. Resident species include Painted Storks, Open-billed Storks, Spot-billed Pelicans, and a wide variety of herons and egrets." },
      { heading: "Planning Your Birding Visit", body: "The best all-round birding season in Sri Lanka is December to March, when resident species are most active and winter migrants from the north are present. The Knuckles Mountain Range offers exceptional highland birding for species such as the Dull-blue Flycatcher and Sri Lanka Whistling Thrush. Fun Holidays arranges personalised birding itineraries with specialist naturalist guides for all levels — from first-time bird enthusiasts to expert listers targeting their 33 endemics." },
    ],
    toChild: 80, toAdult: 150, showPrice: true, published: true,
  },
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
        // Preserve any Firebase Storage URLs the admin already uploaded
        const existing = (await getDoc(doc(db, "tours", t.slug))).data() || {};
        await setDoc(doc(db, "tours", t.slug), {
          ...t,
          // Keep Storage URLs; fall back to seed path only if none uploaded yet
          image:         isStorageUrl(existing.image)         ? existing.image         : t.image,
          heroImage:     isStorageUrl(existing.heroImage)     ? existing.heroImage     : t.heroImage,
          thumbnailImage: isStorageUrl(existing.thumbnailImage) ? existing.thumbnailImage : t.thumbnailImage,
          createdAt:     existing.createdAt || serverTimestamp(),
          updatedAt:     serverTimestamp(),
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
        // Preserve any Firebase Storage URLs the admin already uploaded
        const existing = (await getDoc(doc(db, "destinations", d.slug))).data() || {};
        const gallery = existing.gallery?.length > 0 &&
          existing.gallery.some(isStorageUrl)
          ? existing.gallery   // keep uploaded gallery
          : d.gallery;
        await setDoc(doc(db, "destinations", d.slug), {
          ...d,
          heroImage:  isStorageUrl(existing.heroImage)  ? existing.heroImage  : d.heroImage,
          thumbnail:  isStorageUrl(existing.thumbnail)  ? existing.thumbnail  : d.thumbnail,
          gallery,
          createdAt:  existing.createdAt || serverTimestamp(),
          updatedAt:  serverTimestamp(),
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
