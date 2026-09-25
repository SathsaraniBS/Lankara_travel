"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Eye,
  ShieldCheck,
  Heart,
  Leaf,
  Headphones,
  MapPin,
  ArrowRight,
  Linkedin,
  Instagram,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function AboutUsPage() {
  const teamMembers = [
    {
      name: "Sanduni Perera",
      role: "Founder & Travel Expert",
      quote: '"I believe the best stories are found on the road."',
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Nuwan Silva",
      role: "Tour Coordinator",
      quote: '"Every journey is a new story."',
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Chathuri Fernando",
      role: "Guest Relations",
      quote: '"Happy travellers make us happy."',
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Kasun Jayawardhana",
      role: "Travel Guide",
      quote: '"Local routes, real stories."',
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const features = [
    {
      icon: <Compass className="w-5 h-5 text-emerald-800" />,
      title: "Local Expertise",
      desc: "Real insights from locals who know Sri Lanka best.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-800" />,
      title: "Trusted & Safe",
      desc: "Your safety and peace of mind are our priority.",
    },
    {
      icon: <Heart className="w-5 h-5 text-emerald-800" />,
      title: "Personalised Trips",
      desc: "Tailored itineraries to match your interests and budget.",
    },
    {
      icon: <Leaf className="w-5 h-5 text-emerald-800" />,
      title: "Sustainable Travel",
      desc: "Supporting local communities and protecting nature.",
    },
    {
      icon: <Headphones className="w-5 h-5 text-emerald-800" />,
      title: "24/7 Support",
      desc: "We're always here to help, before and during your trip.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-800 font-sans flex flex-col justify-between">
      <div>
        {/* 1. Hero Banner Section */}
        <section className="relative w-full h-[420px] bg-slate-900 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1600&auto=format&fit=crop"
            alt="Sigiriya Rock & Sri Lanka Landscape"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1">
                👥 ABOUT US
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white max-w-xl leading-tight">
              More Than Just <br /> a Travel Company
            </h1>

            <p className="text-gray-200 text-xs md:text-sm mt-3 max-w-md leading-relaxed">
              We are Lankara Travels – a team of passionate travellers,
              storytellers and local experts, dedicated to helping you explore the
              real Sri Lanka.
            </p>
          </div>

          <div className="absolute right-10 bottom-12 hidden lg:block text-right text-white/90">
            <p className="font-serif italic text-2xl font-light tracking-wide">
              Same island <br />
              Bigger dreams ♡
            </p>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
          {/* 2. Our Story Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-semibold text-amber-600 uppercase tracking-widest">
                OUR STORY
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
                Born from a Love <br /> for Sri Lanka
              </h2>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Lankara Travels began with a simple idea – to show the world the
                true beauty of Sri Lanka. What started as a passion for travel
                and a deep love for our island has grown into a trusted travel
                platform, helping thousands of travellers create unforgettable
                journeys.
              </p>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                We believe that travel is not just about visiting places, but about
                experiencing new cultures, meeting amazing people and collecting
                memories that last a lifetime.
              </p>
              <div className="pt-2">
                <p className="font-serif italic text-emerald-900 font-medium text-sm">
                  Discover Sri Lanka <br /> with Lankara Travels ♡
                </p>
              </div>
            </div>

            {/* Collage Grid */}
            <div className="lg:col-span-7 grid grid-cols-12 gap-3 relative">
              <div className="col-span-6 relative h-72 md:h-80 rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=800&auto=format&fit=crop"
                  alt="Nine Arch Bridge Train"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-[11px] font-serif italic">
                  Real places. <br /> Real experiences. ♡
                </div>
              </div>

              <div className="col-span-3 space-y-3">
                <div className="relative h-36 md:h-38 rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop"
                    alt="Beach view"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-32 md:h-38 rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1566296531481-5800d3992084?q=80&w=600&auto=format&fit=crop"
                    alt="Sri Lanka Stupa"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="col-span-3 bg-emerald-950 text-white rounded-2xl p-5 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-full bg-emerald-800/60 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-emerald-300" />
                </div>
                <p className="font-serif text-sm md:text-base leading-snug text-emerald-100">
                  Sri Lanka is not just a destination, it&apos;s a feeling.
                </p>
                <div className="h-2" />
              </div>
            </div>
          </section>

          {/* 3. Mission & Vision Section */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Mission Card */}
            <div className="md:col-span-4 bg-emerald-50/50 p-6 md:p-8 rounded-2xl border border-emerald-100/60 space-y-3">
              <div className="w-9 h-9 rounded-full bg-emerald-900 text-white flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-emerald-800 uppercase tracking-widest block">
                OUR MISSION
              </span>
              <h3 className="text-xl font-serif font-bold text-gray-900">
                To make Sri Lanka accessible to every traveller
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We aim to provide reliable, personalised and unforgettable travel
                experiences while supporting local communities and promoting
                sustainable tourism.
              </p>
            </div>

            {/* Vision Card */}
            <div className="md:col-span-4 bg-emerald-50/50 p-6 md:p-8 rounded-2xl border border-emerald-100/60 space-y-3">
              <div className="w-9 h-9 rounded-full bg-emerald-900 text-white flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold text-emerald-800 uppercase tracking-widest block">
                OUR VISION
              </span>
              <h3 className="text-xl font-serif font-bold text-gray-900">
                To be the most trusted Sri Lanka travel platform in the world
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Inspiring a global community to explore, respect and fall in love
                with the island&apos;s natural beauty, rich culture and warm
                people.
              </p>
            </div>

            {/* Quote Image Box */}
            <div className="md:col-span-4 relative rounded-2xl overflow-hidden min-h-[220px] flex items-end p-6">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
                alt="Tropical Coast"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10 text-white">
                <p className="font-serif italic text-lg leading-snug">
                  Explore <br /> Support <br /> Preserve ♡
                </p>
              </div>
            </div>
          </section>

          {/* 4. Why Choose Us Section */}
          <section className="space-y-8">
            <div>
              <span className="text-[10px] font-semibold text-amber-600 uppercase tracking-widest">
                WHY CHOOSE US
              </span>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mt-1">
                Your Journey, Our Priority
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                We go beyond bookings — we&apos;re here to make your Sri Lanka
                adventure smooth, safe and meaningful.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-gray-900 mb-1">
                      {feat.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right">
              <span className="font-serif italic text-emerald-900/80 text-xs">
                Travel with confidence ♡
              </span>
            </div>
          </section>

          {/* 5. Meet The Team Section */}
          <section className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-8 space-y-2">
                <span className="text-[10px] font-semibold text-emerald-800 uppercase tracking-widest">
                  MEET THE TEAM
                </span>
                <h2 className="text-3xl font-serif font-bold text-gray-900">
                  Passionate People. <br />
                  Real Experiences.
                </h2>
                <p className="text-xs text-gray-500 max-w-xl">
                  Our team is made up of travel enthusiasts, local guides and
                  experts who live and breathe Sri Lanka. We&apos;re here to make
                  your journey special, every step of the way.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-xs px-5 py-2.5 rounded-full transition shadow-sm"
                >
                  Get to Know Us <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Team Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-56 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-[11px] text-emerald-700 font-medium">
                        {member.role}
                      </p>
                    </div>
                    <p className="text-[11px] text-gray-400 italic">
                      {member.quote}
                    </p>
                    <div className="pt-2 border-t border-gray-50 flex items-center space-x-2 text-gray-400">
                      <Link
                        href="#"
                        className="hover:text-emerald-800 transition"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href="#"
                        className="hover:text-emerald-800 transition"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Call to Action Banner */}
          <section className="relative rounded-2xl overflow-hidden p-8 md:p-12 text-white bg-slate-900 flex flex-col md:flex-row items-center justify-between">
            <Image
              src="https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200&auto=format&fit=crop"
              alt="Sri Lanka Panoramic"
              fill
              className="object-cover opacity-40"
            />
            <div className="relative z-10 space-y-2 max-w-lg">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
                START YOUR JOURNEY
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold">
                Ready for Your Next Adventure?
              </h3>
              <p className="text-xs text-gray-200">
                Explore Sri Lanka with Lankara Travels and create memories that
                last a lifetime.
              </p>
            </div>
            <div className="relative z-10 mt-6 md:mt-0 flex flex-col items-end gap-2">
              <Link
                href="/plantrip"
                className="bg-amber-400 hover:bg-amber-500 text-gray-900 text-xs font-semibold px-6 py-3 rounded-full transition flex items-center gap-1 shadow-md"
              >
                Plan Your Trip <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <span className="font-serif italic text-xs text-white/80">
                Sri Lanka awaits ♡
              </span>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}