"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Calendar, Compass, ArrowLeft, Heart } from "lucide-react";
import Footer from "@/components/layout/Footer";

interface DestinationData {
  name: string;
  tagline: string;
  hero_image: string;
  description: string;
  best_time_to_visit: string;
  top_attractions?: { title: string; image: string; desc: string }[];
}

// Fallback data for testing when backend isn't connected
const localDestinationsData: Record<string, DestinationData> = {
  colombo: {
    name: "Colombo",
    tagline: "Urban & Nightlife",
    hero_image: "/images/colombo.jpg",
    description:
      "Sri Lanka's bustling commercial capital mixing colonial heritage, modern rooftop bars, vibrant street food, and oceanside walks along Galle Face Green.",
    best_time_to_visit: "November to April",
    top_attractions: [
      {
        title: "Lotus Tower",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop",
        desc: "Panoramic city skyline views from South Asia's tallest self-supported tower.",
      },
      {
        title: "Galle Face Green",
        image: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600&auto=format&fit=crop",
        desc: "Famous oceanfront urban park ideal for sunset walks and street food.",
      },
      {
        title: "Gangaramaya Temple",
        image: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=600&auto=format&fit=crop",
        desc: "Iconic Buddhist temple blending modern architecture and cultural artifacts.",
      },
    ],
  },
  galle: {
    name: "Galle",
    tagline: "Heritage & Beaches",
    hero_image: "/images/galle.jpg",
    description:
      "A UNESCO World Heritage Dutch fort city filled with charming cobblestone streets, boutique cafes, artisan shops, and golden palm beaches.",
    best_time_to_visit: "November to April",
    top_attractions: [
      {
        title: "Galle Fort",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600&auto=format&fit=crop",
        desc: "Historic 17th-century fortified city built by Portuguese and Dutch colonists.",
      },
      {
        title: "Galle Lighthouse",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
        desc: "Sri Lanka's oldest light station located at the ramparts of Galle Fort.",
      },
    ],
  },
  kandy: {
    name: "Kandy",
    tagline: "History & Culture",
    hero_image: "/images/Kandy.jpg",
    description:
      "The sacred hill capital surrounded by misty mountain peaks, lush tropical forest, and home to the revered Temple of the Sacred Tooth Relic.",
    best_time_to_visit: "January to April",
    top_attractions: [
      {
        title: "Temple of the Tooth",
        image: "https://images.unsplash.com/photo-1566296531481-5800d3992084?q=80&w=600&auto=format&fit=crop",
        desc: "World-famous Buddhist temple housing the sacred tooth relic of Lord Buddha.",
      },
    ],
  },
};

// MUST be exported as DEFAULT
export default function DestinationDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string)?.toLowerCase();

  const [data, setData] = useState<DestinationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchDestination() {
      try {
        const res = await fetch(`http://localhost:8000/api/destinations/${slug}`);
        if (res.ok) {
          const apiData = await res.json();
          setData(apiData);
        } else {
          // Fallback to local data if backend route is missing
          setData(localDestinationsData[slug] || null);
        }
      } catch (err) {
        // Fallback to local data on network error
        setData(localDestinationsData[slug] || null);
      } finally {
        setLoading(false);
      }
    }

    fetchDestination();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center text-emerald-900 font-semibold text-sm">
        Loading Destination Guide...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <Compass className="w-12 h-12 text-emerald-800 animate-bounce" />
        <h2 className="text-2xl font-serif font-bold text-gray-900">
          Destination Not Found
        </h2>
        <p className="text-xs text-gray-500 max-w-sm">
          We couldn&apos;t find any guide for dynamic slug &quot;{slug}&quot;.
        </p>
        <Link
          href="/destinations"
          className="bg-emerald-900 text-white text-xs px-5 py-2.5 rounded-full font-semibold hover:bg-emerald-950 transition flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-800 font-sans flex flex-col justify-between">
      <div>
        {/* Hero Section */}
        <section className="relative h-[480px] w-full bg-slate-900 overflow-hidden">
          <Image
            src={data.hero_image}
            alt={data.name}
            fill
            className="object-cover opacity-65"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

          <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-between py-8">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-white/90 hover:text-amber-400 text-xs font-semibold bg-black/40 backdrop-blur-md px-4 py-2 rounded-full w-fit transition border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Destinations
            </Link>

            <div className="space-y-2 mb-4">
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> SRI LANKA DESTINATION GUIDE
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-wide">
                {data.name}
              </h1>
              <p className="text-amber-200 text-sm md:text-base font-serif italic">
                {data.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
          {/* Overview */}
          <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              About {data.name}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {data.description}
            </p>
            <div className="pt-4 border-t border-gray-100 flex items-center gap-3 text-xs text-gray-600">
              <Calendar className="w-4 h-4 text-emerald-800" />
              <span>
                <strong>Best Time to Visit:</strong> {data.best_time_to_visit}
              </span>
            </div>
          </section>

          {/* Attractions */}
          {data.top_attractions && data.top_attractions.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Top Attractions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.top_attractions.map((spot, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={spot.image}
                        alt={spot.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="font-bold text-sm text-gray-900">
                        {spot.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {spot.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}