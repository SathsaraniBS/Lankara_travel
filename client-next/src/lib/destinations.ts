// src/lib/destinations.ts
// Single source of truth for destination content.
// getDestinations() / getDestination() are async so you can later swap the
// static data below for a FastAPI call (e.g. fetch(`${API_URL}/destinations`))
// without touching either page.

export type DestinationCategory =
  | "Cultural Heritage"
  | "Nature & Adventure"
  | "Coastal"
  | "City";

export const DESTINATION_CATEGORIES: DestinationCategory[] = [
  "Cultural Heritage",
  "Nature & Adventure",
  "Coastal",
  "City",
];

export interface Attraction {
  name: string;
  description: string;
  location: string;
}

export interface ItineraryPreview {
  days: number;
  theme: string;
}

export interface Destination {
  slug: string;
  name: string;
  category: DestinationCategory;
  tagline: string;
  intro: string;
  script: string; // handwritten note on the hero
  highlights: string[];
  about: string;
  stats: { label: string; value: string }[];
  quickInfo: {
    bestTime: string;
    temperature: string;
    travelTime: string;
    language: string;
  };
  attractions: Attraction[]; // 4
  activities: string[]; // 5
  itineraries: ItineraryPreview[]; // 3
  tips: string[]; // 4
  whyVisit: string[];
  map: { lat: number; lng: number };
  ctaText: string;
}

/**
 * Image convention (put files in client-next/public):
 *   /images/destinations/<slug>/hero.jpg          hero, about and CTA image
 *   /images/destinations/<slug>/attraction-1..4.jpg
 *   /images/destinations/<slug>/itinerary-1..3.jpg
 * Missing files fall back to a green gradient, so nothing breaks.
 */
export const destinationImage = (slug: string, file: string) =>
  `/images/destinations/${slug}/${file}.jpg`;

const DESTINATIONS: Destination[] = [
  {
    slug: "kandy",
    name: "Kandy",
    category: "Cultural Heritage",
    tagline: "A city of culture, history and natural beauty",
    intro:
      "Nestled in the hills of central Sri Lanka, Kandy is a city where heritage, spirituality and nature come together in perfect harmony.",
    script: "Kandy, the Heart of Sri Lanka",
    highlights: ["Cultural Heritage", "Nature & Scenic Beauty", "Temples & Sacred Sites"],
    about:
      "Kandy, the last capital of the Sinhalese kings, is a city rich in history and culture. Surrounded by misty hills and a beautiful lake, it offers a unique blend of tradition, spirituality and natural beauty. The sacred Temple of the Tooth Relic, colorful festivals and lush landscapes make Kandy a must-visit destination for every traveler.",
    stats: [
      { label: "Years of history", value: "500+" },
      { label: "Sacred Tooth Relic", value: "1" },
      { label: "Metres above sea level", value: "1,000 m" },
    ],
    quickInfo: {
      bestTime: "Dec – Apr",
      temperature: "20°C – 28°C",
      travelTime: "3–4 hours",
      language: "Sinhala, Tamil, English",
    },
    attractions: [
      { name: "Temple of the Tooth Relic", description: "A sacred Buddhist temple with a rich history and cultural value.", location: "Kandy" },
      { name: "Kandy Lake", description: "A beautiful man-made lake in the heart of the city.", location: "Kandy" },
      { name: "Royal Botanical Gardens", description: "Home to over 4,000 species of plants and trees.", location: "Peradeniya" },
      { name: "Arthur's Seat", description: "A lookout with breathtaking views of the surrounding hills.", location: "Kandy" },
    ],
    activities: [
      "Visit the Temple of the Tooth Relic",
      "Explore Kandy Lake",
      "Take a scenic train ride",
      "Discover local crafts and culture",
      "Shop for handicrafts",
    ],
    itineraries: [
      { days: 1, theme: "Temple & City Tour" },
      { days: 2, theme: "Culture & Nature" },
      { days: 3, theme: "Hills, Tea & Heritage" },
    ],
    tips: [
      "Dress modestly when visiting temples.",
      "Carry a light jacket (cooler in the evenings).",
      "Try local food like Kiri Bath and Kottu.",
      "Use public transport or tuk-tuks for short distances.",
    ],
    whyVisit: [
      "Home to the sacred Temple of the Tooth Relic",
      "Rich in culture, festivals and tradition",
      "Cool climate and lush hill scenery",
      "Gateway to tea country and the Cultural Triangle",
    ],
    map: { lat: 7.2906, lng: 80.6337 },
    ctaText: "Experience the culture, nature and spirit of Sri Lanka.",
  },
  {
    slug: "sigiriya",
    name: "Sigiriya",
    category: "Cultural Heritage",
    tagline: "An ancient marvel in the heart of Sri Lanka",
    intro:
      "Explore the legendary rock fortress of Sigiriya, a UNESCO World Heritage Site known for its breathtaking views, ancient history and unique architecture.",
    script: "Climb the past, see the beauty",
    highlights: ["UNESCO World Heritage Site", "Ancient Rock Fortress", "Stunning Views", "Nature & Wildlife"],
    about:
      "Sigiriya, also known as the Lion Rock, is one of the most famous historical sites in Sri Lanka. Built in the 5th century by King Kashyapa, this ancient rock fortress is a masterpiece of engineering and art. The site features royal gardens, ancient frescoes, mirror wall and the remains of a palace at the top, offering panoramic views of the surrounding jungle and countryside.",
    stats: [
      { label: "Built by King Kashyapa", value: "5th Century" },
      { label: "UNESCO World Heritage", value: "1982" },
      { label: "Rock height", value: "200 m" },
    ],
    quickInfo: {
      bestTime: "Jan – Apr",
      temperature: "25°C – 32°C",
      travelTime: "4–5 hours",
      language: "Sinhala, Tamil, English",
    },
    attractions: [
      { name: "Sigiriya Rock Fortress", description: "Climb the ancient palace ruins.", location: "Sigiriya" },
      { name: "Frescoes", description: "Admire the world-famous ancient paintings.", location: "Sigiriya" },
      { name: "Mirror Wall", description: "Beautiful wall polished with ancient inscriptions.", location: "Sigiriya" },
      { name: "Royal Gardens", description: "Beautiful gardens with water features and ancient engineering.", location: "Sigiriya" },
    ],
    activities: [
      "Climb the Sigiriya Rock",
      "Explore the ancient frescoes",
      "Visit the Royal Gardens",
      "See the Mirror Wall",
      "Discover the Lion's Paw",
    ],
    itineraries: [
      { days: 1, theme: "Day Trip to Sigiriya" },
      { days: 2, theme: "Sigiriya & Dambulla" },
      { days: 3, theme: "Cultural Triangle Tour" },
    ],
    tips: [
      "Wear comfortable shoes (for climbing).",
      "Bring water and a hat (it can be hot).",
      "Visit early in the morning (for cooler weather).",
      "Respect the cultural and historical significance of the site.",
    ],
    whyVisit: [
      "A UNESCO World Heritage Site with rich history",
      "Breathtaking panoramic views from the top",
      "Unique ancient art and architecture",
      "A must-visit for culture and nature lovers",
    ],
    map: { lat: 7.957, lng: 80.7603 },
    ctaText: "Discover history, beauty and views from Sri Lanka's iconic wonder.",
  },
  {
    slug: "ella",
    name: "Ella",
    category: "Nature & Adventure",
    tagline: "Mountains, waterfalls and endless adventures",
    intro:
      "Ella is a peaceful hill town in the heart of Sri Lanka's tea country, known for its breathtaking views, lush green landscapes and relaxed atmosphere.",
    script: "Little town, big adventures",
    highlights: ["Scenic Views & Hills", "Waterfalls & Nature", "Iconic Ella Railway", "Tea Plantations & Local Culture"],
    about:
      "Surrounded by green mountains and tea plantations, Ella offers a unique blend of natural beauty, adventure and local culture. From iconic hikes and waterfalls to charming cafes and breathtaking train rides, Ella is a place that leaves a lasting impression.",
    stats: [
      { label: "Elevation", value: "1,041 m" },
      { label: "Nearest town", value: "Nuwara Eliya (approx. 3 hrs)" },
      { label: "Climate", value: "17°C – 25°C" },
    ],
    quickInfo: {
      bestTime: "Jan – Apr (best weather)",
      temperature: "17°C – 25°C",
      travelTime: "6–7 hours",
      language: "Sinhala, Tamil, English",
    },
    attractions: [
      { name: "Nine Arch Bridge", description: "An iconic railway bridge surrounded by lush greenery.", location: "Ella" },
      { name: "Ravana Falls", description: "A beautiful waterfall with a legendary story.", location: "Ella" },
      { name: "Little Adam's Peak", description: "A short hike with stunning views of the valley.", location: "Ella" },
      { name: "Tea Plantations", description: "Explore the green tea estates and learn how tea is made.", location: "Ella" },
    ],
    activities: [
      "Hike Little Adam's Peak",
      "Visit Ravana Falls",
      "Take the scenic train ride",
      "Explore tea plantations",
      "Enjoy local coffee and food",
    ],
    itineraries: [
      { days: 1, theme: "Nine Arch, Falls & Hike" },
      { days: 2, theme: "Hills, Tea & Waterfalls" },
      { days: 3, theme: "Adventure & Local Culture" },
    ],
    tips: [
      "Wear comfortable shoes (for walking).",
      "Carry a light jacket (it can get cool in the evenings).",
      "Stay hydrated and bring snacks for hikes.",
      "Respect local culture and keep the area clean.",
    ],
    whyVisit: [
      "Breathtaking mountain views and landscapes",
      "Iconic train rides and photo spots",
      "Adventure activities: hiking, tea tours, waterfalls",
      "Rich culture and warm local people",
      "Perfect for nature lovers and photographers",
    ],
    map: { lat: 6.8667, lng: 81.0466 },
    ctaText: "Experience the magic of Ella with scenic hills, iconic train journeys and unforgettable moments.",
  },
  {
    slug: "colombo",
    name: "Colombo",
    category: "City",
    tagline: "Where city life meets the Indian Ocean",
    intro:
      "A vibrant city of culture, colonial heritage, ocean views and warm local life. Colombo blends the old and new, offering historic sites, modern attractions and a unique coastal charm.",
    script: "Discover Colombo",
    highlights: ["Coastal City", "Culture & Heritage", "Food & Nightlife"],
    about:
      "Colombo, Sri Lanka's commercial capital, is a dynamic blend of modern city life and timeless heritage. From colonial buildings and Buddhist temples to bustling markets and stunning ocean views, the city offers something for every traveler.",
    stats: [
      { label: "Years of history", value: "200+" },
      { label: "Average temperature", value: "30°C" },
      { label: "Setting", value: "Coastal City" },
    ],
    quickInfo: {
      bestTime: "Dec – Mar",
      temperature: "27°C – 31°C",
      travelTime: "Arrival city (airport 45 min)",
      language: "Sinhala, Tamil, English",
    },
    attractions: [
      { name: "Gangaramaya Temple", description: "A historic temple with eclectic architecture and a museum of cultural artifacts.", location: "Colombo" },
      { name: "Galle Face Green", description: "Sunny oceanfront promenade, perfect for a relaxing walk.", location: "Colombo" },
      { name: "Colombo Lotus Tower", description: "South Asia's tallest tower with city and ocean views.", location: "Colombo" },
      { name: "Pettah Market", description: "Experience the vibrant local market, culture and street food.", location: "Colombo" },
    ],
    activities: [
      "Visit Gangaramaya Temple",
      "Walk along Galle Face Green",
      "Ride a Local Tuk-Tuk",
      "Explore Pettah street food",
      "Shop at local markets",
    ],
    itineraries: [
      { days: 1, theme: "City Highlights" },
      { days: 2, theme: "Culture & Heritage" },
      { days: 3, theme: "Food, Markets & Beach" },
    ],
    tips: [
      "Carry light clothing for the tropical climate.",
      "Stay hydrated and use sunscreen.",
      "Use ride apps or tuk-tuks for short trips.",
      "Dress modestly when visiting temples.",
    ],
    whyVisit: [
      "A lively mix of modern and colonial architecture",
      "Excellent food, shopping and nightlife",
      "Easy base for the rest of the island",
      "Beautiful sunsets along the Indian Ocean",
    ],
    map: { lat: 6.9271, lng: 79.8612 },
    ctaText: "Ocean views, heritage and vibrant city life in the heart of Sri Lanka.",
  },
  {
    slug: "nuwara-eliya",
    name: "Nuwara Eliya",
    category: "Nature & Adventure",
    tagline: "Where misty mountains, tea gardens and timeless charm meet",
    intro:
      "Escape to the cool hills of Nuwara Eliya, a colonial-era town surrounded by lush tea estates, crystal-clear lakes and breathtaking mountain views.",
    script: "Cool vibes, bigger dreams",
    highlights: ["Tea Plantations", "Scenic Mountains", "Colonial Heritage", "Cool Climate"],
    about:
      "Nuwara Eliya, often called \"Little England\", is a charming hill town in the heart of Sri Lanka's tea country. Known for its cool climate, colonial architecture and scenic landscapes, it is a perfect getaway for nature lovers, adventure seekers and those looking for a peaceful retreat.",
    stats: [
      { label: "Elevation", value: "1,868 m" },
      { label: "Average temperature", value: "14°C – 20°C" },
      { label: "Region", value: "Central Province" },
    ],
    quickInfo: {
      bestTime: "Mar – May",
      temperature: "14°C – 20°C",
      travelTime: "3–4 hours from Kandy",
      language: "Sinhala, Tamil, English",
    },
    attractions: [
      { name: "Gregory Lake", description: "Boating, hiking and scenic lakeside views.", location: "Nuwara Eliya" },
      { name: "Pedro Tea Estate", description: "Tour the tea factory and taste fresh Ceylon tea.", location: "Pedro" },
      { name: "Victoria Park", description: "A beautiful park with colorful gardens and birdlife.", location: "Nuwara Eliya" },
      { name: "Ramboda Falls", description: "A stunning waterfall surrounded by greenery.", location: "Ramboda" },
    ],
    activities: [
      "Visit Tea Plantations",
      "Explore Gregory Lake",
      "Take a scenic train ride",
      "Hike to Horton Plains",
      "Visit colonial buildings",
    ],
    itineraries: [
      { days: 1, theme: "Tea Trails & Lake Views" },
      { days: 2, theme: "Hills, Tea & Waterfalls" },
      { days: 3, theme: "Hikes, Gardens & Heritage" },
    ],
    tips: [
      "Pack warm clothes — evenings are cold.",
      "Book Horton Plains hikes for early morning.",
      "Carry a rain jacket; mist and showers are common.",
      "Try fresh Ceylon tea straight from the estate.",
    ],
    whyVisit: [
      "Cool, refreshing climate year-round",
      "World-famous Ceylon tea estates",
      "Colonial charm and misty landscapes",
      "Gateway to Horton Plains and World's End",
    ],
    map: { lat: 6.9497, lng: 80.7891 },
    ctaText: "Discover the tea gardens, mountain air and calm of Sri Lanka's hill country.",
  },
  {
    slug: "mirissa",
    name: "Mirissa",
    category: "Coastal",
    tagline: "Golden beaches, whale watching and laid-back island vibes",
    intro:
      "Mirissa is a charming coastal town on Sri Lanka's southern coast, known for its golden beaches, crystal-clear waters and incredible whale watching opportunities.",
    script: "Meet the Giants, Bigger dreams",
    highlights: ["Beaches & Surfing", "Whale Watching", "Beach Town Vibes", "Tropical Climate"],
    about:
      "Mirissa is a laid-back beach town on the southern coast of Sri Lanka, perfect for travelers seeking sun, sea and adventure. Famous for whale watching, surfing and its stunning sunsets, Mirissa offers a unique mix of natural beauty, local culture and vibrant beach life.",
    stats: [
      { label: "From Galle", value: "~ 2 km" },
      { label: "Average temperature", value: "28°C" },
      { label: "Region", value: "Southern Province" },
    ],
    quickInfo: {
      bestTime: "Nov – Apr",
      temperature: "26°C – 31°C",
      travelTime: "3.5–4 hours",
      language: "Sinhala, Tamil, English",
    },
    attractions: [
      { name: "Whale Watching", description: "Spot blue whales and dolphins in their natural habitat.", location: "Mirissa" },
      { name: "Mirissa Beach", description: "A golden beach with calm waters and beachfront cafes.", location: "Mirissa" },
      { name: "Coconut Tree Hill", description: "Iconic hilltop with stunning ocean views.", location: "Mirissa" },
      { name: "Weligama Bay", description: "A popular bay for beginner surfers.", location: "Weligama" },
    ],
    activities: [
      "Take a whale watching tour",
      "Surf at Weligama Bay",
      "Relax at Mirissa Beach",
      "Visit Coconut Tree Hill",
      "Explore local seafood restaurants",
    ],
    itineraries: [
      { days: 1, theme: "Whales & Beach Day" },
      { days: 2, theme: "Surf, Sunsets & Seafood" },
      { days: 3, theme: "Beaches, Galle & Relaxation" },
    ],
    tips: [
      "Book whale watching in advance (Nov – Apr).",
      "Take motion-sickness tablets before boat trips.",
      "Carry reef-safe sunscreen and a hat.",
      "Try fresh seafood at a beachfront restaurant.",
    ],
    whyVisit: [
      "One of the best places in the world to see blue whales",
      "Golden beaches and relaxed island vibes",
      "Great surf, sunsets and seafood",
      "Easy to combine with Galle and Unawatuna",
    ],
    map: { lat: 5.9483, lng: 80.4716 },
    ctaText: "Join a whale watching tour and see the giants of the Indian Ocean.",
  },
  {
    slug: "jaffna",
    name: "Jaffna",
    category: "Cultural Heritage",
    tagline: "Culture, history and untouched beauty",
    intro:
      "Jaffna, the cultural heart of the North, is a land of proud heritage, ancient temples, pristine beaches and warm, welcoming people. Discover a unique blend of tradition, history and natural beauty.",
    script: "Jaffna, The Northern Gem",
    highlights: ["Historic Temples", "Beautiful Beaches", "Rich Culture", "Local Cuisine"],
    about:
      "Jaffna, located at the northern tip of Sri Lanka, is a city rich in history, culture and natural beauty. Known for its ancient temples, vibrant local life and untouched beaches, Jaffna offers a unique travel experience. From the iconic Nallur Kandaswamy Temple to the peaceful islands and traditional Tamil culture, this destination is truly special.",
    stats: [
      { label: "From Colombo", value: "~ 400 km" },
      { label: "Population", value: "~ 400,000" },
      { label: "Best time to visit", value: "Jan – Apr" },
    ],
    quickInfo: {
      bestTime: "Jan – Apr (pleasant weather)",
      temperature: "26°C – 32°C",
      travelTime: "~ 6–7 hours",
      language: "Tamil, English",
    },
    attractions: [
      { name: "Nallur Kandaswamy Temple", description: "A sacred Hindu temple and a symbol of Jaffna.", location: "Nallur" },
      { name: "Jaffna Fort", description: "A historic fort with colonial remnants and ocean views.", location: "Jaffna" },
      { name: "Point Pedro", description: "The northernmost point of Sri Lanka.", location: "Point Pedro" },
      { name: "Nagadeepa Temple", description: "A sacred Buddhist temple on an island.", location: "Nagadeepa" },
    ],
    activities: [
      "Visit Nallur Kandaswamy Temple",
      "Explore Jaffna Fort",
      "Relax at Casuarina Beach",
      "Take a boat trip to Nagadeepa",
      "Try local Jaffna cuisine",
    ],
    itineraries: [
      { days: 1, theme: "Temples, Fort & Local Food" },
      { days: 2, theme: "Islands, Beaches & Culture" },
      { days: 3, theme: "Heritage, Nature & Relaxation" },
    ],
    tips: [
      "Dress modestly when visiting temples.",
      "Carry cash (ATMs are limited).",
      "Try local Jaffna cuisine (especially crab curry).",
      "Respect local culture and traditions.",
    ],
    whyVisit: [
      "Iconic Hindu and Buddhist temples",
      "Rich Tamil culture and heritage",
      "Pristine beaches and islands",
      "Delicious local cuisine",
      "Warm and welcoming people",
    ],
    map: { lat: 9.6615, lng: 80.0255 },
    ctaText: "Experience the rich culture, beautiful beaches and warm hospitality of Jaffna.",
  },
  {
    slug: "galle",
    name: "Galle",
    category: "Coastal",
    tagline: "Where history meets the ocean",
    intro:
      "Galle, a charming coastal city in Sri Lanka, is famous for its UNESCO World Heritage-listed fort, colonial architecture, beautiful beaches and vibrant culture. It's a perfect blend of history, sea and local life.",
    script: "Galle Fort, Timeless Beauty",
    highlights: ["UNESCO World Heritage Site", "Colonial Architecture", "Beaches & Ocean Views", "Culture & Local Life"],
    about:
      "Galle is a picturesque coastal city on the southwest coast of Sri Lanka, known for its historic fort, colonial buildings and stunning ocean views. The Galle Fort, built by the Portuguese and later fortified by the Dutch, is a UNESCO World Heritage Site and a must-visit destination for history and culture lovers.",
    stats: [
      { label: "From Colombo", value: "~ 119 km" },
      { label: "Population", value: "~ 90,000" },
      { label: "Best time to visit", value: "Nov – Apr" },
    ],
    quickInfo: {
      bestTime: "Nov – Apr (pleasant weather)",
      temperature: "26°C – 30°C",
      travelTime: "~ 2.5–3 hours",
      language: "Sinhala, Tamil, English",
    },
    attractions: [
      { name: "Galle Fort", description: "A UNESCO World Heritage Site with historic ramparts and charming streets.", location: "Galle Fort" },
      { name: "Galle Lighthouse", description: "Iconic lighthouse with panoramic ocean views.", location: "Galle Fort" },
      { name: "Jungle Beach", description: "A hidden beach with golden sand and clear waters.", location: "Unawatuna" },
      { name: "Dutch Reformed Church", description: "A historic church with beautiful architecture.", location: "Galle Fort" },
    ],
    activities: [
      "Walk around the Galle Fort",
      "Visit the Lighthouse",
      "Relax at Jungle Beach",
      "Explore local markets",
      "Enjoy seafood and local cuisine",
    ],
    itineraries: [
      { days: 1, theme: "Fort, Lighthouse & Beaches" },
      { days: 2, theme: "Beaches & Culture" },
      { days: 3, theme: "Galle, Unawatuna & Bentota" },
    ],
    tips: [
      "Wear comfortable shoes (for walking).",
      "Carry a hat, sunscreen and water.",
      "Try local seafood and Sri Lankan cuisine.",
      "Respect local culture and heritage sites.",
    ],
    whyVisit: [
      "UNESCO World Heritage Site with rich history",
      "Stunning beaches and ocean views",
      "Colonial architecture and local culture",
      "Delicious seafood and Sri Lankan cuisine",
      "Perfect for couples, families and solo travellers",
    ],
    map: { lat: 6.0329, lng: 80.217 },
    ctaText: "From historic forts to golden beaches, Galle offers an unforgettable experience.",
  },
  {
    slug: "anuradhapura",
    name: "Anuradhapura",
    category: "Cultural Heritage",
    tagline: "The ancient kingdom of the sacred city",
    intro:
      "Anuradhapura, a UNESCO World Heritage Site, is one of the world's oldest continuously inhabited cities, rich in history, spirituality and ancient marvels. Explore sacred stupas, majestic ruins and timeless heritage.",
    script: "Step into 5,000 years of history",
    highlights: ["UNESCO World Heritage Site", "Ancient City", "Sacred Stupas", "Historical Ruins", "Nature & Biodiversity"],
    about:
      "Anuradhapura, the first capital of Sri Lanka, is a sacred city filled with ancient stupas, monasteries, ponds and ruins. It is considered one of the most important Buddhist pilgrimage sites in the world and a symbol of Sri Lanka's rich cultural and religious heritage.",
    stats: [
      { label: "From Colombo", value: "~ 205 km" },
      { label: "Population", value: "~ 52,000" },
      { label: "Best time to visit", value: "Jan – Apr" },
    ],
    quickInfo: {
      bestTime: "Jan – Apr (pleasant weather)",
      temperature: "26°C – 32°C",
      travelTime: "~ 4–5 hours",
      language: "Sinhala, Tamil, English",
    },
    attractions: [
      { name: "Ruwanwelisaya", description: "A magnificent stupa and a symbol of Anuradhapura.", location: "Anuradhapura" },
      { name: "Sri Maha Bodhi", description: "The sacred fig tree, grown from a sapling of the original tree.", location: "Anuradhapura" },
      { name: "Thuparamaya", description: "One of the oldest Buddhist stupas in the world.", location: "Anuradhapura" },
      { name: "Isurumuniya Vihara", description: "Famous for its rock carvings and stone sculptures.", location: "Anuradhapura" },
    ],
    activities: [
      "Visit the Sacred City Ruins",
      "Explore the Ancient Stupas",
      "See the Sri Maha Bodhi",
      "Discover Isurumuniya",
      "Enjoy local culture and cuisine",
    ],
    itineraries: [
      { days: 1, theme: "Key sites & ancient ruins" },
      { days: 2, theme: "Ruins, temples & local culture" },
      { days: 3, theme: "History, nature & nearby sites" },
    ],
    tips: [
      "Wear comfortable clothing (for walking).",
      "Carry a hat, sunscreen and water.",
      "Respect religious sites and local customs.",
      "Dress modestly when visiting temples.",
    ],
    whyVisit: [
      "UNESCO World Heritage Site",
      "Ancient ruins and sacred places",
      "Rich in history, culture and Buddhism",
      "Beautiful lakes and natural scenery",
      "A peaceful and spiritual experience",
    ],
    map: { lat: 8.3114, lng: 80.4037 },
    ctaText: "Discover the ancient city, its sacred stupas and the timeless beauty of Sri Lanka.",
  },
];

export async function getDestinations(): Promise<Destination[]> {
  return DESTINATIONS;
}

export async function getDestination(slug: string): Promise<Destination | undefined> {
  return DESTINATIONS.find((d) => d.slug === slug);
}