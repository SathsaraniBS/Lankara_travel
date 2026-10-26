import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Compass, Sparkles } from "lucide-react";

const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface Destination {
  slug: string;
  name: string;
  tagline: string;
  region: string;
  heroImage: string;
  category: string;
}

const FALLBACK_DESTINATIONS: Destination[] = [
  {
    slug: "kandy",
    name: "Kandy",
    tagline: "A city of culture, history and natural beauty",
    region: "Central Province",
    heroImage: "/images/Kandy.jpg",
    category: "Cultural Heritage",
  },
  {
    slug: "sigiriya",
    name: "Sigiriya",
    tagline: "An Ancient Marvel in the Heart of Sri Lanka",
    region: "Central Province",
    heroImage: "/images/sigiriya.jpg",
    category: "Ancient Rock Fortress",
  },
  {
    slug: "ella",
    name: "Ella",
    tagline: "Mountains, Waterfalls and Endless Adventures",
    region: "Uva Province",
    heroImage: "/images/ella.jpg",
    category: "Nature & Adventure",
  },
  {
    slug: "colombo",
    name: "Colombo",
    tagline: "Where city life meets the Indian Ocean",
    region: "Western Province",
    heroImage: "/images/colombo.jpg",
    category: "Coastal City",
  },
  {
    slug: "nuwara-eliya",
    name: "Nuwara Eliya",
    tagline: "Where misty mountains and timeless charm meet",
    region: "Central Province",
    heroImage: "/images/ella.jpg",
    category: "Tea Plantations",
  },
  {
    slug: "mirissa",
    name: "Mirissa",
    tagline: "Golden beaches and whale watching vibes",
    region: "Southern Province",
    heroImage: "/images/unawatuna.jpg",
    category: "Beaches & Surfing",
  },
];

async function getDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch(`${FASTAPI_URL}/api/v1/destinations`, { cache: "no-store", }); if (!res.ok) return FALLBACK_DESTINATIONS; const data = await res.json(); return Array.isArray(data) && data.length > 0 ? data : FALLBACK_DESTINATIONS; } catch (err) { console.warn("Could not fetch destinations from backend, using fallback data:", err); return FALLBACK_DESTINATIONS; } }  export default async function DestinationsPage() { const destinations = await getDestinations();  return ( <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans pb-16"> {/* Hero Banner */} <section className="relative w-full h-[360px] bg-slate-900 overflow-hidden"> <Image src="/images/unawatuna.jpg" alt="Explore Destinations" fill className="object-cover opacity-40" priority /> <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-transparent to-black/60" /> <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center items-center text-center"> <span className="text-amber-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2"> <Compass size={14} /> DISCOVER SRI LANKA </span> <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-3"> Explore Destinations </h1> <p className="text-gray-200 text-sm sm:text-base max-w-2xl font-light leading-relaxed"> From ancient kingdoms hidden in misty mountains to sun-kissed golden beaches, explore the wonder of Sri Lanka. </p> </div> </section>  {/* Destination Grid */} <main className="max-w-7xl mx-auto px-6 -mt-10 relative z-20"> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {destinations.map((dest) => ( <Link key={dest.slug} href={`/destinations/${dest.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={dest.heroImage || "/images/sigiriya.jpg"}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-emerald-900/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {dest.category}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                    <MapPin size={13} />
                    <span>{dest.region}</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-emerald-800 transition">
                    {dest.name}
                  </h2>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {dest.tagline}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-emerald-800 border-t border-gray-50 mt-4">
                <span>Explore {dest.name}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}