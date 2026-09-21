"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star, Users, Camera, Heart, MessageCircle, ArrowRight, ShieldCheck, Compass,
  PenSquare, Lightbulb, Image as ImageIcon, UserCheck,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function CommunityAndReviewsPage() {
  return (
    <>

      <div className="min-h-screen bg-[#F8F9FA] text-[#1A202C] font-sans">
        {/* 1. HERO SECTION */}
        <section className="relative w-full h-[520px] bg-slate-900 text-white overflow-hidden flex items-center">
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000"
            alt="Sri Lanka Community"
            fill
            className="object-cover opacity-40"
            priority
          />

          <div className="relative max-w-7xl mx-auto px-6 w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
                <Users className="w-4 h-4" />
                Community & Reviews
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                Real People. <br />
                Real Stories. <br />
                <span className="text-amber-400">Sri Lanka.</span>
              </h1>
              <p className="text-slate-200 text-sm md:text-base max-w-md mb-8 leading-relaxed">
                Join our travel community, read honest reviews, share your
                experiences and get inspired by fellow explorers who have discovered
                the real Sri Lanka.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4 max-w-lg bg-black/30 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <div className="flex flex-col items-center text-center">
                  <Users className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="font-bold text-base text-white">12K+</span>
                  <span className="text-[11px] text-slate-300">Happy Travellers</span>
                </div>
                <div className="flex flex-col items-center text-center border-l border-white/10">
                  <Star className="w-5 h-5 text-amber-400 mb-1 fill-amber-400" />
                  <span className="font-bold text-base text-white">4.8/5</span>
                  <span className="text-[11px] text-slate-300">Average Rating</span>
                </div>
                <div className="flex flex-col items-center text-center border-l border-white/10">
                  <Camera className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="font-bold text-base text-white">8K+</span>
                  <span className="text-[11px] text-slate-300">Photos & Stories</span>
                </div>
                <div className="flex flex-col items-center text-center border-l border-white/10">
                  <Compass className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="font-bold text-base text-white">3K+</span>
                  <span className="text-[11px] text-slate-300">Active Members</span>
                </div>
              </div>
            </div>

            {/* Decorative Tagline Overlay */}
            <div className="hidden md:flex justify-end items-center">
              <div className="text-right italic font-serif text-amber-200/80 text-2xl max-w-xs leading-snug">
                "Same island, Different stories ♡"
              </div>
            </div>
          </div>
        </section>

        {/* 2. TRAVELLER REVIEWS SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                TRAVELLER REVIEWS
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-1">
                What Our Travellers Say
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Real feedback from real people who explored Sri Lanka with Lankara Travels.
              </p>
            </div>
            <button className="bg-[#124E3F] hover:bg-[#0E3D31] text-white font-medium text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-sm">
              <PenSquare className="w-3.5 h-3.5" />
              Write a Review →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Rating Summary Box */}
            <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
                  <div>
                    <div className="text-3xl font-extrabold text-slate-800">4.8<span className="text-lg text-slate-400 font-normal">/5</span></div>
                    <div className="text-xs text-slate-500">Based on 2,340+ reviews</div>
                  </div>
                </div>

                {/* Rating Breakdown Bars */}
                <div className="mt-6 space-y-2.5">
                  {[
                    { stars: 5, pct: "78%" },
                    { stars: 4, pct: "16%" },
                    { stars: 3, pct: "4%" },
                    { stars: 2, pct: "1%" },
                    { stars: 1, pct: "1%" },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="w-3 text-right font-medium">{row.stars}★</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full"
                          style={{ width: row.pct }}
                        />
                      </div>
                      <span className="w-7 text-right text-slate-400 text-[11px]">{row.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Individual Review Cards Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Review 1 */}
              <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="p-4">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                      alt="Emma Wilson"
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Emma Wilson</h4>
                      <span className="text-[10px] text-slate-400 block">United Kingdom</span>
                      <div className="flex text-amber-400 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed italic">
                    "Lankara Travels made our Sri Lanka trip unforgettable! The itinerary was perfectly planned."
                  </p>
                </div>
                <div className="relative h-24 w-full mt-2">
                  <Image
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600"
                    alt="Mirissa Beach"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[9px] flex items-center justify-between">
                    <span>📍 Mirissa Beach</span>
                    <span className="opacity-75">12 Apr 2025</span>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="p-4">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                      alt="James Carter"
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">James Carter</h4>
                      <span className="text-[10px] text-slate-400 block">Australia</span>
                      <div className="flex text-amber-400 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed italic">
                    "Amazing experience! The app was super easy to use and customer support was always there."
                  </p>
                </div>
                <div className="relative h-24 w-full mt-2">
                  <Image
                    src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80&w=600"
                    alt="Sigiriya"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[9px] flex items-center justify-between">
                    <span>📍 Sigiriya</span>
                    <span className="opacity-75">5 Apr 2025</span>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="p-4">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                      alt="Sophia Lee"
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Sophia Lee</h4>
                      <span className="text-[10px] text-slate-400 block">Canada</span>
                      <div className="flex text-amber-400 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed italic">
                    "We loved the cultural experiences and local food recommendations. Every moment felt special!"
                  </p>
                </div>
                <div className="relative h-24 w-full mt-2">
                  <Image
                    src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=600"
                    alt="Kandy"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[9px] flex items-center justify-between">
                    <span>📍 Kandy</span>
                    <span className="opacity-75">28 Mar 2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Your Travel Story Sidebar Card */}
            <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center gap-2 text-emerald-800 mb-2">
                  <PenSquare className="w-4 h-4" />
                  <h3 className="font-bold text-sm text-slate-800">Share Your Travel Story</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  Have you explored Sri Lanka with Lankara Travels? Tell us about your journey, share photos and help other travellers.
                </p>

                {/* Star Rating Picker */}
                <div className="flex justify-center gap-1.5 text-slate-300 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 hover:text-amber-400 cursor-pointer transition-colors" />
                  ))}
                </div>

                <button className="w-full bg-[#124E3F] hover:bg-[#0E3D31] text-white font-medium text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
                  Write a Review <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-6 text-right font-serif italic text-slate-400 text-xs">
                Your story matters ♡
              </div>
            </div>
          </div>
        </section>

        {/* 3. TRAVEL STORIES SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                TRAVEL STORIES
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-1">
                From Our Community
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Explore real travel stories, photos and tips shared by fellow Lankara travellers.
              </p>
            </div>
            <Link
              href="#"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 group"
            >
              View More Stories{" "}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Story 1 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=600"
                    alt="Ella"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-1.5 rounded-full hover:bg-white text-slate-600 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
                      alt="Nethmi Perera"
                      width={24}
                      height={24}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-[11px] font-bold text-slate-800">Nethmi Perera</h5>
                      <p className="text-[9px] text-slate-400">Sri Lanka</p>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">
                    Ella - A 2 Day Getaway
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    From hikes to tea fields, Ella never gets old. Here's my short guide to making the most of 2 days!
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> 286</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> 24</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium text-[10px]">
                  Hiking
                </span>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600"
                    alt="Mirissa"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-1.5 rounded-full hover:bg-white text-slate-600 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100"
                      alt="Ravi Silva"
                      width={24}
                      height={24}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-[11px] font-bold text-slate-800">Ravi Silva</h5>
                      <p className="text-[9px] text-slate-400">Sri Lanka</p>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">
                    Unforgettable Mirissa
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    Whale watching, beach vibes and great food. Mirissa is a must-visit for every traveller!
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> 412</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> 36</span>
                </div>
                <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium text-[10px]">
                  Beaches
                </span>
              </div>
            </div>

            {/* Story 3 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=600"
                    alt="Yala Safari"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-1.5 rounded-full hover:bg-white text-slate-600 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=100"
                      alt="Chamara Wijesinghe"
                      width={24}
                      height={24}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-[11px] font-bold text-slate-800">Chamara Wijesinghe</h5>
                      <p className="text-[9px] text-slate-400">Sri Lanka</p>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">
                    Wildlife Safari at Yala
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    Saw so many elephants and leopards! It was an incredible experience and totally worth it.
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> 358</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> 18</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium text-[10px]">
                  Wildlife
                </span>
              </div>
            </div>

            {/* Story 4 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=600"
                    alt="Kandy"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-1.5 rounded-full hover:bg-white text-slate-600 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
                      alt="Isuru Fernando"
                      width={24}
                      height={24}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-[11px] font-bold text-slate-800">Isuru Fernando</h5>
                      <p className="text-[9px] text-slate-400">Sri Lanka</p>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">
                    Kandy Cultural Vibes
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    The Temple of the Tooth and the cultural show were highlights of our trip. Truly magical!
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> 271</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> 15</span>
                </div>
                <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium text-[10px]">
                  Culture
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHY CHOOSE LANKARA COMMUNITY? SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Why Choose Lankara Community?
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              More than just a travel platform — we're a community of explorers, dreamers and Sri Lanka lovers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Feature Cards Grid */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800 mb-4">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-1">Real Reviews</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Honest feedback from fellow travellers.
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-800 mb-4">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-1">Travel Tips</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Practical advice from local experts.
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800 mb-4">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-1">Photo Gallery</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Inspiring moments from around the island.
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-800 mb-4">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-1">Active Community</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Connect with like-minded explorers.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="lg:col-span-4 relative rounded-2xl overflow-hidden min-h-[160px] flex items-center justify-center p-6 text-white text-center shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80&w=800"
                alt="Community Banner"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px]" />
              <div className="relative z-10">
                <span className="italic text-amber-300 text-sm font-serif block mb-1">
                  Good people <br /> Better journeys ♡
                </span>
                <p className="text-[11px] text-slate-200 max-w-xs mx-auto italic mt-2">
                  "The best travel decisions come from real experiences, not just search results."
                </p>
                <span className="text-[9px] text-slate-400 block mt-2">— Lankara Community</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CTA SECTION */}
        <section className="relative w-full h-[300px] bg-slate-900 text-white flex items-center justify-center overflow-hidden my-8">
          <Image
            src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80&w=2000"
            alt="Plan Next Adventure"
            fill
            className="object-cover opacity-30"
          />
          <div className="relative z-10 text-center max-w-xl px-6">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
              READY TO EXPLORE WITH US?
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-2">
              Plan Your Next Adventure
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mb-6 leading-relaxed">
              Get inspired by our community, read authentic reviews, and start planning your Sri Lankan journey today.
            </p>
            <Link
              href="/plan-trip"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs px-6 py-3 rounded-full transition-colors shadow-lg"
            >
              Plan My Trip <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}