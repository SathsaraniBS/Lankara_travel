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
  Bus,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
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

// Full Mocked Fallback Dataset matching all UI designs provided (Kandy, Sigiriya, Ella, Colombo, Nuwara Eliya, Mirissa)
const DESTINATIONS_DATA: Record<string, DestinationDetails> = {
  kandy: {
    slug: "kandy",
    name: "Kandy",
    tagline: "A city of culture, history and natural beauty",
    description:
      "Nestled in the hills of central Sri Lanka, Kandy is a city where heritage, spirituality and nature come together in perfect harmony.",
    heroImage: "/images/Kandy.jpg",
    aboutImage: "/images/Kandy.jpg",
    tags: ["Cultural Heritage", "Nature & Scenic Beauty", "Temples & Sacred Sites"],
    quickInfo: {
      bestTime: "Dec – Apr",
      avgTemp: "20°C – 28°C",
      travelTime: "3–4 hours from Colombo",
      languages: "Sinhala, Tamil, English",
    },
    stats: {
      history: "500+ Years",
      relicInfo: "Sacred Tooth Relic",
      elevation: "500 m ASL",
    },
    attractions: [
      { name: "Temple of the Tooth Relic", desc: "A sacred Buddhist temple with a rich history and cultural value.", location: "Kandy", image: "/images/Kandy.jpg" },
      { name: "Kandy Lake", desc: "A beautiful man-made lake in the heart of the city.", location: "Kandy", image: "/images/Kandy.jpg" },
      { name: "Royal Botanical Gardens", desc: "Home to over 4,000 species of plants and trees.", location: "Peradeniya (5 km)", image: "/images/ella.jpg" },
      { name: "Arthur's Seat", desc: "Enjoy breathtaking panoramic views of Kandy city.", location: "Kandy", image: "/images/sigiriya.jpg" },
    ],
    itineraries: [
      { title: "1 Day in Kandy", subtitle: "Temple, Lake & City Tour", daysText: "1 Day", location: "Kandy", image: "/images/Kandy.jpg" },
      { title: "2 Days in Kandy", subtitle: "Culture + Nature", daysText: "2 Days", location: "Kandy", image: "/images/ella.jpg" },
      { title: "3 Days in Kandy", subtitle: "Kandy → Ella (Train Journey)", daysText: "3 Days", location: "Kandy – Ella", image: "/images/unawatuna.jpg" },
    ],
    popularActivities: [
      "Visit the Temple of the Tooth",
      "Explore Kandy Lake",
      "Take a scenic train ride",
      "Discover local cuisine",
      "Shop for traditional handicrafts",
    ],
    travelTips: [
      "Dress modestly when visiting temples (cover shoulders and knees).",
      "Carry a light jacket (cooler in the evenings).",
      "Try local food like kottu, rice and curry.",
      "Use public transport or tuk-tuks for short distances.",
    ],
    whyVisit: [
      "Rich cultural heritage and ancient kingdom history",
      "Breathtaking mountain views and lush greenery",
      "Vibrant street food culture and local markets",
    ],
  },
  sigiriya: {
    slug: "sigiriya",
    name: "Sigiriya",
    tagline: "An Ancient Marvel in the Heart of Sri Lanka",
    description:
      "Explore the legendary rock fortress of Sigiriya, a UNESCO World Heritage Site known for its breathtaking views, ancient history and unique architecture.",
    heroImage: "/images/sigiriya.jpg",
    aboutImage: "/images/sigiriya.jpg",
    tags: ["UNESCO Heritage", "Ancient Rock Fortress", "Stunning Views", "Nature & Wildlife"],
    quickInfo: {
      bestTime: "Jan – Apr",
      avgTemp: "25°C – 32°C",
      travelTime: "2–4 hours duration",
      languages: "Sinhala, Tamil, English",
    },
    stats: {
      history: "5th Century",
      relicInfo: "World Heritage Site",
      elevation: "200 m Rock Height",
    },
    attractions: [
      { name: "Sigiriya Rock Fortress", desc: "Climb the iconic rock and explore ancient palace ruins.", location: "Sigiriya", image: "/images/sigiriya.jpg" },
      { name: "Frescoes", desc: "Admire the world-famous ancient paintings.", location: "Sigiriya", image: "/images/sigiriya.jpg" },
      { name: "Mirror Wall", desc: "See the polished wall with ancient inscriptions.", location: "Sigiriya", image: "/images/sigiriya.jpg" },
      { name: "Royal Gardens", desc: "Beautiful gardens with water features and ruins.", location: "Sigiriya", image: "/images/sigiriya.jpg" },
    ],
    itineraries: [
      { title: "Day Trip to Sigiriya", subtitle: "Sigiriya Climb & Tour", daysText: "1 Day", location: "Sigiriya", image: "/images/sigiriya.jpg" },
      { title: "Sigiriya & Dambulla", subtitle: "Cave Temple + Rock Fortress", daysText: "2 Days", location: "Sigiriya • Dambulla", image: "/images/Kandy.jpg" },
      { title: "Cultural Triangle Tour", subtitle: "Sigiriya • Polonnaruwa • Dambulla", daysText: "3 Days", location: "Cultural Triangle", image: "/images/ella.jpg" },
    ],
    popularActivities: [
      "Climb the Sigiriya Rock",
      "Explore the Ancient Frescoes",
      "Visit the Royal Gardens",
      "See the Mirror Wall",
      "Discover the Lion's Paw Staircase",
    ],
    travelTips: [
      "Wear comfortable shoes for climbing.",
      "Bring water and a hat (it can be hot).",
      "Visit early in the morning for cooler weather.",
      "Respect the cultural and historical significance of the site.",
    ],
    whyVisit: [
      "A UNESCO World Heritage Site with rich history",
      "Breathtaking panoramic views from the top",
      "Unique ancient art and architecture",
      "A must-visit for culture and nature lovers",
    ],
  },
};

async function getDestinationDetails(slug: string): Promise<DestinationDetails | null> {
  try {
    const res = await fetch(`${FASTAPI_URL}/api/v1/destinations/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return DESTINATIONS_DATA[slug] || null;
    const data = await res.json();
    return data || DESTINATIONS_DATA[slug] || null;
  } catch (err) {
    return DESTINATIONS_DATA[slug] || null;
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
      
      {/* 1. HERO HEADER BANNER */}
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
            {/* Breadcrumbs */}
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

            {/* Badges Strip */}
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

      {/* 2. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        
        {/* TOP GRID: ABOUT & QUICK INFO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ABOUT CARD */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
              🏛️ About {dest.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {dest.description}
            </p>

            {/* Stats counter strip */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-b border-gray-100 py-4 text-center">
              <div>
                <span className="text-lg font-bold text-emerald-800 block">{dest.stats.history}</span>
                <span className="text-[10px] text-gray-400 font-medium uppercase">Years of History</span>
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

            {/* Featured Highlight Banner Image */}
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

          {/* QUICK INFO SIDEBAR */}
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

            {/* POPULAR ACTIVITIES CARD */}
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

        {/* TOP ATTRACTIONS SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
              🏛️ Top Attractions in {dest.name}
            </h2>
            <span className="text-xs text-emerald-800 font-bold hover:underline cursor-pointer">
              View All →
            </span>
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

        {/* SUGGESTED ITINERARIES & TRAVEL TIPS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SUGGESTED ITINERARIES */}
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

          {/* TRAVEL TIPS */}
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

        {/* BOTTOM CTA BANNER */}
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