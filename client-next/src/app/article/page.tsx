"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Eye,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Heart,
  Compass,
  Camera,
  Layers,
  ArrowRight,
  Search,
  User,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function ArticlePage() {
  return (
    <>
      <div className="min-h-screen bg-[#faf9f6] text-gray-800 font-sans">
        {/* Header / Navbar */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-lg">
                🌴
              </div>
              <span className="text-xl font-serif font-bold text-emerald-950 tracking-wide">
                Lankara
                <span className="block text-[9px] font-sans tracking-widest text-emerald-700 uppercase">
                  Travels
                </span>
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
              <Link href="/" className="hover:text-emerald-700 transition">
                Home
              </Link>
              <Link href="#" className="hover:text-emerald-700 transition">
                Explore
              </Link>
              <Link href="#" className="hover:text-emerald-700 transition">
                Destinations
              </Link>
              <Link href="#" className="hover:text-emerald-700 transition">
                Art & Culture
              </Link>
              <Link href="#" className="hover:text-emerald-700 transition">
                Plan Trip
              </Link>
              <Link href="#" className="hover:text-emerald-700 transition">
                Experiences
              </Link>
              <Link
                href="#"
                className="text-emerald-700 font-semibold border-b-2 border-emerald-700 pb-1"
              >
                Journal
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-emerald-700 transition">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-emerald-700 transition">
                <Heart className="w-5 h-5" />
              </button>
              <button className="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2 rounded-full text-sm font-medium transition flex items-center gap-1">
                Plan My Trip <ArrowRight className="w-4 h-4 ml-1" />
              </button>
              <button className="p-2 text-gray-600 hover:text-emerald-700 transition">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Banner Section */}
        <section className="relative w-full h-[480px] bg-slate-900 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1600&auto=format&fit=crop"
            alt="Sri Lanka Coast Banner"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-end pb-12">
            <div className="mb-3">
              <span className="bg-emerald-700/80 text-white text-xs uppercase tracking-wider px-3 py-1 rounded-full font-medium">
                Travel Guides
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white max-w-2xl leading-tight">
              The Ultimate 7-Day Sri Lanka Itinerary
            </h1>

            <p className="text-gray-200 text-sm md:text-base mt-3 max-w-xl">
              From ancient cities to misty mountains and golden beaches —
              here’s the perfect 7-day journey through the best of Sri Lanka.
            </p>

            {/* Meta Bar */}
            <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-white/20 text-xs text-gray-300">
              <div className="flex items-center space-x-3">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                  alt="Author"
                  width={36}
                  height={36}
                  className="rounded-full object-cover ring-2 ring-emerald-500"
                />
                <div>
                  <p className="font-semibold text-white">By Sanduni Sathsarani</p>
                  <p className="text-[11px] text-gray-400">Travel Writer</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>12 Apr 2025</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>5 min read</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>12.4K views</span>
              </div>
            </div>
          </div>

          {/* Decorative Badge */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block text-right text-white/90">
            <p className="font-serif italic text-2xl font-light tracking-wide">
              Small island <br /> Big adventures ♡
            </p>
          </div>
        </section>

        {/* Main Content & Sidebar Layout */}
        <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column - Main Article Body */}
          <div className="lg:col-span-8 space-y-10">
            {/* Breadcrumb */}
            <nav className="flex items-center text-xs text-gray-500 space-x-2">
              <Link href="/" className="hover:text-emerald-700">
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="#" className="hover:text-emerald-700">
                Journal
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="#" className="hover:text-emerald-700">
                Travel Guides
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-800 font-medium truncate max-w-[200px]">
                The Ultimate 7-Day Sri Lanka Itinerary
              </span>
            </nav>

            {/* Intro Paragraph */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Sri Lanka is a small island with a big heart. In just 7 days, you
              can experience pristine beaches, lush tea plantations, ancient
              temples, and incredible wildlife. This itinerary is designed for
              first-time visitors or anyone who wants to experience the best of
              Sri Lanka in a week — with a perfect mix of adventure, culture and
              relaxation.
            </p>

            {/* Featured Main Destination Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <div className="relative h-80 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1200&auto=format&fit=crop"
                  alt="Sigiriya Fortress"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-emerald-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Day 1
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sigiriya</span>
                </div>
              </div>
            </div>

            {/* Day 1 Section Details */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-900 text-white font-serif text-lg font-bold rounded-full flex flex-col items-center justify-center leading-none">
                  <span className="text-[10px] font-sans font-normal uppercase tracking-tight">
                    Day
                  </span>
                  <span>1</span>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900">
                    Colombo — Sigiriya
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                    <span>⏱ 4.5 hrs (200 km)</span>
                    <span>📍 Culture & History</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Start your journey in Colombo and head towards Sigiriya. On the
                way, you can stop at a spice garden in Matale. In the afternoon,
                climb the iconic Sigiriya Rock Fortress and enjoy the
                breathtaking views. End the day with a relaxing dinner at a
                local restaurant.
              </p>

              {/* Highlights Block */}
              <div className="bg-emerald-50/60 rounded-xl p-5 border border-emerald-100">
                <h3 className="text-sm font-semibold text-emerald-950 mb-3 flex items-center gap-1.5">
                  🔸 Highlights
                </h3>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Visit the Sigiriya Rock Fortress</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Explore a spice garden</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Enjoy a traditional Sri Lankan dinner</span>
                  </li>
                </ul>

                {/* Sub Images Grid */}
                <div className="grid grid-cols-2 gap-4 mt-5">
                  <div className="relative h-28 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=400&auto=format&fit=crop"
                      alt="Sigiriya Rock Fortress"
                      fill
                      className="object-cover"
                    />
                    <span className="absolute bottom-2 left-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded">
                      Sigiriya Rock Fortress
                    </span>
                  </div>
                  <div className="relative h-28 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=400&auto=format&fit=crop"
                      alt="Spice Garden"
                      fill
                      className="object-cover"
                    />
                    <span className="absolute bottom-2 left-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded">
                      Spice Garden
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Why This Itinerary Works */}
            <div className="pt-4">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Why This Itinerary Works
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-xs text-gray-900">
                    Balanced Experience
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1">
                    A perfect mix of nature, culture, and beach.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-xs text-gray-900">
                    Easy Travel
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Well-planned routes with short travel times.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Camera className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-xs text-gray-900">
                    Great for First-Timers
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Covers the must-see highlights of Sri Lanka.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-xs text-gray-900">
                    Flexible
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1">
                    You can customize it based on interests and budget.
                  </p>
                </div>
              </div>
            </div>

            {/* Banner Promo Card */}
            <div className="relative rounded-2xl overflow-hidden p-8 text-white bg-slate-900 flex flex-col md:flex-row items-center justify-between">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop"
                alt="Beach Banner"
                fill
                className="object-cover opacity-40"
              />
              <div className="relative z-10 max-w-md">
                <h3 className="text-2xl font-serif font-bold italic">
                  Your Sri Lanka Journey Awaits ♡
                </h3>
              </div>
              <div className="relative z-10 mt-4 md:mt-0">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-6 py-3 rounded-full transition flex items-center gap-1">
                  Plan Your Trip <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            {/* Author Box */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                alt="Sanduni Sathsarani"
                width={80}
                height={80}
                className="rounded-full object-cover shrink-0"
              />
              <div className="flex-1 text-center md:text-left">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                  About the Author
                </span>
                <h4 className="font-serif font-bold text-gray-900 text-base">
                  Sanduni Sathsarani
                </h4>
                <p className="text-xs text-emerald-700 font-medium mb-2">
                  Travel Writer & Sri Lanka Explorer
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  I'm a travel enthusiast who believes that the best stories
                  are found on the road. I share real experiences, practical
                  tips and hidden gems from around Sri Lanka.
                </p>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                {/* Instagram SVG */}
                <svg
                  className="w-4 h-4 hover:text-emerald-700 cursor-pointer fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                {/* Facebook SVG */}
                <svg
                  className="w-4 h-4 hover:text-emerald-700 cursor-pointer fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                {/* Twitter / X SVG */}
                <svg
                  className="w-4 h-4 hover:text-emerald-700 cursor-pointer fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Top Featured Guides Banner */}
            <div className="relative rounded-2xl overflow-hidden p-6 text-white min-h-[160px] flex flex-col justify-end">
              <Image
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop"
                alt="Featured Guide"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="relative z-10">
                <span className="bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded text-white font-medium">
                  Travel Guide
                </span>
              </div>
            </div>

            {/* More Travel Guides Section */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-gray-900 text-base">
                More Sri Lanka Travel Guides
              </h3>
              <p className="text-xs text-gray-500 -mt-2">
                Explore more articles to plan your perfect trip.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: "10 Hidden Beaches in Sri Lanka You Need to Visit",
                    time: "5 min read",
                    img: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=200&auto=format&fit=crop",
                  },
                  {
                    title: "Best Things to Do in Ella",
                    time: "6 min read",
                    img: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=200&auto=format&fit=crop",
                  },
                  {
                    title: "A Complete Guide to Nuwara Eliya",
                    time: "7 min read",
                    img: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=200&auto=format&fit=crop",
                  },
                  {
                    title: "Sri Lankan Food You Must Try",
                    time: "5 min read",
                    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=200&auto=format&fit=crop",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-gray-800 line-clamp-2 group-hover:text-emerald-700 transition">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-gray-400 mt-0.5 block">
                        {item.time}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-700 transition shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Box */}
            <div className="bg-emerald-950 p-6 rounded-2xl text-white space-y-3">
              <h3 className="font-serif font-bold text-base flex items-center gap-2">
                🌱 Get Travel Tips & Exclusive Updates
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Join our community and receive the latest travel guides, special
                offers and Sri Lanka inspiration.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border border-white/20 text-white text-xs placeholder-gray-400 rounded-lg px-3 py-2 flex-1 outline-none focus:border-emerald-400"
                />
                <button className="bg-amber-400 hover:bg-amber-500 text-gray-900 text-xs font-semibold px-4 py-2 rounded-lg transition shrink-0">
                  Subscribe →
                </button>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-gray-900 text-base">
                  Related Articles
                </h3>
                <Link
                  href="#"
                  className="text-[11px] text-emerald-700 hover:underline"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-4 pt-1">
                {[
                  {
                    title: "Best Time to Visit Sri Lanka (Season Guide)",
                    time: "6 min read",
                    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=200&auto=format&fit=crop",
                  },
                  {
                    title: "Packing Checklist for Sri Lanka",
                    time: "5 min read",
                    img: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=200&auto=format&fit=crop",
                  },
                  {
                    title: "Top 5 Travel Apps for Sri Lanka",
                    time: "4 min read",
                    img: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=200&auto=format&fit=crop",
                  },
                  {
                    title: "How to Plan a Budget Trip to Sri Lanka",
                    time: "7 min read",
                    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=200&auto=format&fit=crop",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <div className="relative w-14 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-gray-800 line-clamp-2 group-hover:text-emerald-700 transition">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-gray-400 block mt-0.5">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore Destinations Card */}
            <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-100 flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-emerald-950 text-sm">
                  Explore Destinations
                </h4>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Discover all the amazing places Sri Lanka has to offer.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 mt-2 hover:underline"
                >
                  View Destinations →
                </Link>
              </div>
              <MapPin className="w-8 h-8 text-emerald-600/60 shrink-0" />
            </div>
          </aside>
        </main>
      </div>
      <Footer />
    </>
  );
}