import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Clock,
  Calendar,
  Thermometer,
  Languages,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Map,
} from "lucide-react";

const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface Attraction {
  name: string;
  desc: string;
  location: string;
  image: string;
}

interface Itinerary {
  title: string;
  subtitle: string;
  daysText: string;
  location: string;
  image: string;
}

interface DestinationDetails {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  aboutImage: string;
  tags: string[];
  quickInfo: {
    bestTime: string;
    avgTemp: string;
    travelTime: string;
    languages: string;
  };
  stats: {
    history: string;
    elevation: string;
    relicInfo: string;
  };
  attractions: Attraction[];
  itineraries: Itinerary[];
  popularActivities: string[];
  travelTips: string[];
  whyVisit: string[];
}

// Complete Mocked Fallback Dataset for all 9 destinations (Kandy, Sigiriya, Ella, Colombo, Nuwara Eliya, Galle, Jaffna, Anuradhapura, Trincomalee)
const DESTINATIONS_DATA: Record<string, DestinationDetails> = {
  kandy: {
    slug: "kandy",
    name: "Kandy",
    tagline: "A city of culture, history and natural beauty",
    description: "Nestled in the hills of central Sri Lanka, Kandy is a city where heritage, spirituality and nature come together in perfect harmony.",
    heroImage: "/images/Kandy.jpg",
    aboutImage: "/images/Kandy.jpg",
    tags: ["Cultural Heritage", "Nature & Scenic Beauty", "Temples & Sacred Sites"],
    quickInfo: { bestTime: "Dec – Apr", avgTemp: "20°C – 28°C", travelTime: "3–4 hours from Colombo", languages: "Sinhala, Tamil, English" },
    stats: { history: "500+ Years", relicInfo: "Sacred Tooth Relic", elevation: "500 m ASL" },
    attractions: [
      { name: "Temple of the Tooth Relic", desc: "A sacred Buddhist temple with a rich history and cultural value.", location: "Kandy", image: "/images/Kandy.jpg" },
      { name: "Kandy Lake", desc: "A beautiful man-made lake in the heart of the city.", location: "Kandy", image: "/images/Kandy.jpg" },
    ],
    itineraries: [{ title: "1 Day in Kandy", subtitle: "Temple, Lake & City Tour", daysText: "1 Day", location: "Kandy", image: "/images/Kandy.jpg" }],
    popularActivities: ["Visit the Temple of the Tooth", "Explore Kandy Lake"],
    travelTips: ["Dress modestly when visiting temples (cover shoulders and knees)."],
    whyVisit: ["Rich cultural heritage and ancient kingdom history"]
  },
  sigiriya: {
    slug: "sigiriya",
    name: "Sigiriya",
    tagline: "An Ancient Marvel in the Heart of Sri Lanka",
    description: "Explore the legendary rock fortress of Sigiriya, a UNESCO World Heritage Site known for its breathtaking views, ancient history and unique architecture.",
    heroImage: "/images/sigiriya.jpg",
    aboutImage: "/images/sigiriya.jpg",
    tags: ["UNESCO Heritage", "Ancient Rock Fortress", "Stunning Views"],
    quickInfo: { bestTime: "Jan – Apr", avgTemp: "25°C – 32°C", travelTime: "2–4 hours duration", languages: "Sinhala, Tamil, English" },
    stats: { history: "5th Century", relicInfo: "World Heritage Site", elevation: "200 m Rock Height" },
    attractions: [
      { name: "Sigiriya Rock Fortress", desc: "Climb the iconic rock and explore ancient palace ruins.", location: "Sigiriya", image: "/images/sigiriya.jpg" }
    ],
    itineraries: [{ title: "Day Trip to Sigiriya", subtitle: "Sigiriya Climb & Tour", daysText: "1 Day", location: "Sigiriya", image: "/images/sigiriya.jpg" }],
    popularActivities: ["Climb the Sigiriya Rock", "Explore the Ancient Frescoes"],
    travelTips: ["Wear comfortable shoes for climbing."],
    whyVisit: ["A UNESCO World Heritage Site with rich history"]
  },
  ella: {
    slug: "ella",
    name: "Ella",
    tagline: "Mountains, Waterfalls and Endless Adventures",
    description: "Ella is a peaceful hill town in the heart of Sri Lanka's tea country, known for its breathtaking views, lush green landscapes, and relaxed atmosphere.",
    heroImage: "/images/ella.jpg",
    aboutImage: "/images/ella.jpg",
    tags: ["Scenic Views & Hikes", "Waterfalls & Nature", "Iconic Railway"],
    quickInfo: { bestTime: "Jan – Apr", avgTemp: "12°C – 25°C", travelTime: "6–7 hours from Colombo", languages: "Sinhala, Tamil, English" },
    stats: { history: "Hill Capital", relicInfo: "Nine Arch Bridge", elevation: "1,041 m ASL" },
    attractions: [
      { name: "Nine Arch Bridge", desc: "An iconic railway bridge surrounded by lush greenery.", location: "Ella", image: "/images/ella.jpg" },
      { name: "Ravana Falls", desc: "A beautiful waterfall with a legendary story.", location: "Ella", image: "/images/ella.jpg" }
    ],
    itineraries: [{ title: "1 Day in Ella", subtitle: "Nine Arch Bridge & Peaks", daysText: "1 Day", location: "Ella", image: "/images/ella.jpg" }],
    popularActivities: ["Hike Little Adam's Peak", "Visit Ravana Falls"],
    travelTips: ["Wear comfortable shoes for hiking.", "Carry a light jacket as evenings get chilly."],
    whyVisit: ["Breathtaking mountain views and scenic landscapes"]
  },
  colombo: {
    slug: "colombo",
    name: "Colombo",
    tagline: "Where city life meets the Indian Ocean",
    description: "Colombo, Sri Lanka's commercial capital, is a dynamic blend of modern city life and timeless heritage.",
    heroImage: "/images/colombo.jpg",
    aboutImage: "/images/colombo.jpg",
    tags: ["Coastal City", "Culture & Heritage", "Food & Nightlife"],
    quickInfo: { bestTime: "Dec – Mar", avgTemp: "30°C", travelTime: "Capital Hub", languages: "Sinhala, Tamil, English" },
    stats: { history: "200+ Years", relicInfo: "Commercial Capital", elevation: "Sea Level" },
    attractions: [
      { name: "Gangaramaya Temple", desc: "A historic temple with a unique blend of architecture.", location: "Colombo", image: "/images/colombo.jpg" }
    ],
    itineraries: [{ title: "1 Day in Colombo", subtitle: "City Highlights", daysText: "1 Day", location: "Colombo", image: "/images/colombo.jpg" }],
    popularActivities: ["Visit Gangaramaya Temple", "Walk along Galle Face Green"],
    travelTips: ["Carry light clothing for tropical climate."],
    whyVisit: ["Vibrant urban culture and dining"]
  },
  "nuwara-eliya": {
    slug: "nuwara-eliya",
    name: "Nuwara Eliya",
    tagline: "Where misty mountains and timeless charm meet",
    description: "Escape to the cool hills of Nuwara Eliya, a colonial-era town surrounded by lush tea estates.",
    heroImage: "/images/nuwaraeliya.webp",
    aboutImage: "/images/nuwaraeliya.webp",
    tags: ["Tea Plantations", "Scenic Mountains", "Cool Climate"],
    quickInfo: { bestTime: "Dec – Apr", avgTemp: "16°C – 20°C", travelTime: "4 hours from Colombo", languages: "Sinhala, Tamil, English" },
    stats: { history: "Little England", relicInfo: "Tea Estates", elevation: "1,868 m ASL" },
    attractions: [
      { name: "Gregory Lake", desc: "Boating, fishing and scenic lakeside views.", location: "Nuwara Eliya", image: "/images/nuwaraeliya.webp" }
    ],
    itineraries: [{ title: "1 Day in Nuwara Eliya", subtitle: "Lake, Gardens & Tea Estates", daysText: "1 Day", location: "Nuwara Eliya", image: "/images/nuwaraeliya.webp" }],
    popularActivities: ["Visit Tea Plantations", "Explore Gregory Lake"],
    travelTips: ["Carry a light jacket (it gets chilly)."],
    whyVisit: ["Cool climate and stunning tea hills"]
  },
  galle: {
    slug: "galle",
    name: "Galle",
    tagline: "Where History Meets the Ocean",
    description: "Galle is famous for its UNESCO World Heritage-listed fort, colonial architecture and beautiful beaches.",
    heroImage: "/images/galle.jpg",
    aboutImage: "/images/galle.jpg",
    tags: ["UNESCO Heritage", "Colonial Fort", "Beaches"],
    quickInfo: { bestTime: "Nov – Apr", avgTemp: "28°C", travelTime: "2.5 hours from Colombo", languages: "Sinhala, Tamil, English" },
    stats: { history: "Colonial Era", relicInfo: "Galle Fort", elevation: "Sea Level" },
    attractions: [
      { name: "Galle Fort", desc: "Historic ramparts and charming streets.", location: "Galle", image: "/images/galle.jpg" }
    ],
    itineraries: [{ title: "1 Day in Galle", subtitle: "Fort & Lighthouse", daysText: "1 Day", location: "Galle", image: "/images/galle.jpg" }],
    popularActivities: ["Walk Around the Galle Fort", "Visit the Lighthouse"],
    travelTips: ["Wear comfortable shoes for walking."],
    whyVisit: ["UNESCO World Heritage Site with rich history"]
  },
  jaffna: {
    slug: "jaffna",
    name: "Jaffna",
    tagline: "Culture, History and Untouched Beauty",
    description: "Jaffna, the cultural heart of the North, is a land of proud heritage, ancient temples and pristine beaches.",
    heroImage: "/images/jaffna.jpg",
    aboutImage: "/images/jaffna.jpg",
    tags: ["Cultural Heritage", "Historic Temples", "Local Cuisine"],
    quickInfo: { bestTime: "Jan – Apr", avgTemp: "30°C", travelTime: "6 hours from Colombo", languages: "Tamil, Sinhala, English" },
    stats: { history: "Ancient Era", relicInfo: "Nallur Temple", elevation: "Northern Tip" },
    attractions: [
      { name: "Nallur Kandaswamy Temple", desc: "A sacred Hindu temple.", location: "Nallur", image: "/images/jaffna.jpg" }
    ],
    itineraries: [{ title: "1 Day in Jaffna", subtitle: "Temple & Fort", daysText: "1 Day", location: "Jaffna", image: "/images/jaffna.jpg" }],
    popularActivities: ["Visit Nallur Temple", "Try local Jaffna cuisine"],
    travelTips: ["Dress modestly when visiting temples."],
    whyVisit: ["Rich Tamil culture and heritage"]
  },
  anuradhapura: {
    slug: "anuradhapura",
    name: "Anuradhapura",
    tagline: "The Ancient Kingdom of কালের",
    description: "Anuradhapura is one of the world's oldest continuously inhabited cities, rich in history and spirituality.",
    heroImage: "/images/anuradhapura.jpg",
    aboutImage: "/images/anuradhapura.jpg",
    tags: ["UNESCO Heritage", "Ancient City", "Sacred Stupas"],
    quickInfo: { bestTime: "Jan – Apr", avgTemp: "31°C", travelTime: "4 hours from Colombo", languages: "Sinhala, Tamil, English" },
    stats: { history: "First Capital", relicInfo: "Sri Maha Bodhi", elevation: "North Central" },
    attractions: [
      { name: "Ruwanwelisaya", desc: "Magnificent ancient stupa.", location: "Anuradhapura", image: "/images/anuradhapura.jpg" }
    ],
    itineraries: [{ title: "1 Day in Anuradhapura", subtitle: "Ruins tour", daysText: "1 Day", location: "Anuradhapura", image: "/images/anuradhapura.jpg" }],
    popularActivities: ["Visit Sacred Ruins", "See Sri Maha Bodhi"],
    travelTips: ["Wear modest clothing covering shoulders and knees."],
    whyVisit: ["Ancient kingdom with sacred stupas"]
  },
  trincomalee: {
    slug: "trincomalee",
    name: "Trincomalee",
    tagline: "Beaches, Diving and Coastal Wonder",
    description: "Trincomalee features natural harbors, beautiful beaches and wonderful diving spots.",
    heroImage: "/images/Trincomalee.jpg",
    aboutImage: "/images/Trincomalee.jpg",
    tags: ["Beaches", "Diving", "Coastal Wonder"],
    quickInfo: { bestTime: "May – Oct", avgTemp: "30°C", travelTime: "5 hours from Colombo", languages: "Sinhala, Tamil, English" },
    stats: { history: "Coastal Hub", relicInfo: "Nilaveli Beach", elevation: "East Coast" },
    attractions: [
      { name: "Nilaveli Beach", desc: "White sand beach.", location: "Trincomalee", image: "/images/Trincomalee.jpg" }
    ],
    itineraries: [{ title: "1 Day in Trincomalee", subtitle: "Beach & Diving", daysText: "1 Day", location: "Trincomalee", image: "/images/Trincomalee.jpg" }],
    popularActivities: ["Relax at Nilaveli Beach", "Snorkeling"],
    travelTips: ["Use sunscreen and stay hydrated."],
    whyVisit: ["Stunning east coast beaches"]
  }
};

async function getDestinationDetails(slug: string): Promise<DestinationDetails | null> {
  try {
    const cleanSlug = slug.toLowerCase().trim();
    const res = await fetch(`${FASTAPI_URL}/api/v1/destinations/${cleanSlug}`, {
      cache: "no-store",
    });
    if (!res.ok) return DESTINATIONS_DATA[cleanSlug] || null;
    const data = await res.json();
    return data || DESTINATIONS_DATA[cleanSlug] || null;
  } catch (err) {
    const cleanSlug = slug.toLowerCase().trim();
    return DESTINATIONS_DATA[cleanSlug] || null;
  }
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = await getDestinationDetails(slug);

  if (!dest) {
    notFound();
  }

  return (
    <div className="bg-[#faf9f6] text-slate-800 font-sans min-h-screen pb-16">
      <section className="relative w-full h-[420px] sm:h-[480px] bg-slate-900 overflow-hidden">
        <Image
          src={dest.heroImage || "/images/sigiriya.jpg"}
          alt={dest.name}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-end pb-10">
          <div className="space-y-3">
            <nav className="text-xs text-amber-300 font-medium flex items-center gap-2">
              <Link href="/" className="hover:underline">Home</Link>
              <ChevronRight size={12} />
              <Link href="/destinations" className="hover:underline">Destinations</Link>
              <ChevronRight size={12} />
              <span className="text-white font-bold">{dest.name}</span>
            </nav>

            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-wide">
              {dest.name}
            </h1>
            <p className="text-lg sm:text-xl font-serif italic text-amber-200">
              {dest.tagline}
            </p>
            <p className="text-xs sm:text-sm text-gray-200 max-w-2xl font-light leading-relaxed">
              {dest.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {dest.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5"
                >
                  <Sparkles size={12} className="text-amber-400" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
              🏛️ About {dest.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {dest.description}
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-b border-gray-100 py-4 text-center">
              <div>
                <span className="text-lg font-bold text-emerald-800 block">{dest.stats.history}</span>
                <span className="text-[10px] text-gray-400 font-medium uppercase">History</span>
              </div>
              <div className="border-x border-gray-100">
                <span className="text-lg font-bold text-emerald-800 block">{dest.stats.relicInfo}</span>
                <span className="text-[10px] text-gray-400 font-medium uppercase">Highlight</span>
              </div>
              <div>
                <span className="text-lg font-bold text-emerald-800 block">{dest.stats.elevation}</span>
                <span className="text-[10px] text-gray-400 font-medium uppercase">Elevation</span>
              </div>
            </div>

            <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden group">
              <Image
                src={dest.aboutImage || "/images/sigiriya.jpg"}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-xs font-bold bg-emerald-800 px-3 py-1 rounded-full">
                  Featured Landmark →
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-gray-900 text-base flex items-center gap-2">
                🧩 Quick Info
              </h3>

              <div className="space-y-3.5 text-xs text-gray-700">
                <div className="flex items-start gap-3">
                  <Calendar className="text-emerald-800 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Best Time to Visit</span>
                    <span className="font-semibold">{dest.quickInfo.bestTime}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Thermometer className="text-emerald-800 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Average Temperature</span>
                    <span className="font-semibold">{dest.quickInfo.avgTemp}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="text-emerald-800 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Travel Time</span>
                    <span className="font-semibold">{dest.quickInfo.travelTime}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Languages className="text-emerald-800 shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Main Language</span>
                    <span className="font-semibold">{dest.quickInfo.languages}</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/explore-3d`}
                className="w-full py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs rounded-2xl transition shadow flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Map size={14} /> View on Interactive 3D Map
              </Link>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <h3 className="font-serif font-bold text-gray-900 text-base flex items-center gap-2">
                ⭐ Popular Activities
              </h3>
              <ul className="space-y-2 text-xs text-gray-700 font-medium">
                {dest.popularActivities.map((act) => (
                  <li
                    key={act}
                    className="p-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50 hover:text-emerald-900 transition flex items-center justify-between cursor-pointer group"
                  >
                    <span>{act}</span>
                    <ChevronRight size={14} className="text-gray-400 group-hover:text-emerald-800" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
              🏛️ Top Attractions in {dest.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dest.attractions.map((att) => (
              <div
                key={att.name}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition group"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={att.image}
                    alt={att.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-800 transition">
                    {att.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                    {att.desc}
                  </p>
                  <p className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1 pt-1">
                    <MapPin size={10} /> {att.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-xl font-serif font-bold text-gray-900">
              🗺️ Suggested Itineraries
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {dest.itineraries.map((itin) => (
                <div
                  key={itin.title}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm p-3 space-y-2 hover:shadow-md transition"
                >
                  <div className="relative h-28 w-full rounded-xl overflow-hidden">
                    <Image src={itin.image} alt={itin.title} fill className="object-cover" />
                  </div>
                  <h3 className="text-xs font-bold text-gray-900">{itin.title}</h3>
                  <p className="text-[10px] text-gray-500">{itin.subtitle}</p>
                  <div className="flex items-center justify-between text-[10px] text-emerald-800 font-bold border-t border-gray-50 pt-2">
                    <span>⏱️ {itin.daysText}</span>
                    <span>📍 {itin.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-emerald-950 text-white p-6 rounded-3xl space-y-4 shadow-lg">
            <h3 className="font-serif font-bold text-base flex items-center gap-2 text-amber-400">
              💡 Travel Tips for {dest.name}
            </h3>
            <ul className="space-y-3 text-xs text-gray-200">
              {dest.travelTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Image
            src={dest.heroImage}
            alt="Plan Trip"
            fill
            className="object-cover opacity-25"
          />
          <div className="relative z-10 space-y-2 max-w-xl text-center sm:text-left">
            <span className="text-amber-300 text-xs font-serif italic">Experience the culture, nature and warmth of Sri Lanka ♡</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">Plan Your {dest.name} Adventure</h3>
            <p className="text-xs sm:text-sm text-gray-300">Create a personalized smart itinerary for your journey in seconds.</p>
          </div>
          <Link
            href="/planning-a-trip"
            className="relative z-10 px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold text-xs rounded-2xl transition shadow-lg shrink-0 flex items-center gap-2 cursor-pointer"
          >
            Plan Your Trip →
          </Link>
        </div>
      </main>
    </div>
  );
}