"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ChevronRight } from "lucide-react";

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            alert(`Thank you for subscribing with: ${email}`);
            setEmail("");
        }
    };

    return (
        <footer className="relative w-full bg-[#0d221a] text-stone-300 font-sans overflow-hidden border-t border-emerald-900/40">
            {/* Background Image Overlay with Sigiriya/Landscape backdrop */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1920&q=80"
                    alt="Sri Lanka Landscape Background"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-bottom opacity-15 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d221a]/90 via-[#0d221a]/95 to-[#081812]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-16 pb-12">
                {/* Main Footer Navigation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-emerald-800/40">

                    {/* Column 1: Brand & Bio */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Logo & Brand Name Link */}
                        <Link href="/" className="inline-flex items-center gap-3 shrink-0">
                            <Image 
                                src="/images/logo.png" 
                                alt="logo" 
                                width={70} 
                                height={70} 
                                className="h-[70px] w-auto rounded-full" 
                            />
                            <div className="flex flex-col">
                                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                                    Lankara
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-semibold mt-1">
                                    Travels
                                </span>
                            </div>
                        </Link>

                        <p className="text-amber-200/90 font-serif italic text-sm">
                            Travel Sri Lanka differently.
                        </p>

                        <p className="text-xs text-stone-300 font-light leading-relaxed max-w-sm">
                            Your intelligent travel companion for unforgettable journeys across Sri Lanka.
                            Discover, plan and experience the real island with Lankara Travels.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-2 pt-2">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="w-8 h-8 rounded-full bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-stone-300 hover:text-white hover:bg-emerald-800 transition"
                            >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                aria-label="Youtube"
                                className="w-8 h-8 rounded-full bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-stone-300 hover:text-white hover:bg-emerald-800 transition"
                            >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                aria-label="X (Twitter)"
                                className="w-8 h-8 rounded-full bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-stone-300 hover:text-white hover:bg-emerald-800 transition"
                            >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                aria-label="TikTok"
                                className="w-8 h-8 rounded-full bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-stone-300 hover:text-white hover:bg-emerald-800 transition"
                            >
                                <span className="text-xs font-bold font-mono">d</span>
                            </a>
                        </div>

                        {/* Tagline Graphic */}
                        <div className="pt-2">
                            <span className="font-serif italic text-amber-300/80 text-sm tracking-wide block transform -rotate-2">
                                Same island. <br />
                                <span className="underline decoration-amber-400/50 underline-offset-4">
                                    Different stories.
                                </span>{" "}
                                ♡
                            </span>
                        </div>
                    </div>

                    {/* Column 2: Explore */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                            Explore
                        </h3>
                        <ul className="space-y-2.5 text-xs text-stone-300">
                            <li>
                                <Link href="/#destinations" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>Destinations</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/ArtandCulture" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>Art & Culture</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/SafariTrip" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>Safari Trips</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/GroupTrip" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>Group Trips</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/FamilyTrip" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>Family Trips</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/AdventureTrip" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>Experiences</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Plan & Book */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                            Plan & Book
                        </h3>
                        <ul className="space-y-2.5 text-xs text-stone-300">
                            <li>
                                <Link href="/PlanTrip" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>Plan Trip</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/AiTripPlanner" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>AI Trip Planner</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/MyTrip" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>My Trip</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>Travel Guides</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>Travel Tips</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>Journal</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: About */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                            About
                        </h3>
                        <ul className="space-y-2.5 text-xs text-stone-300">
                            <li>
                                <Link href="#" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>About Lankara</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>Why Sri Lanka</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>Sustainability</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>Partners</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>Careers</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white flex items-center gap-1 group transition">
                                    <span>Contact Us</span>
                                    <ChevronRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 5: Stay Inspired */}
                    <div className="lg:col-span-2 space-y-6 border-t md:border-t-0 md:border-l border-emerald-800/40 pt-6 md:pt-0 md:pl-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                                <Mail size={14} />
                                <span>Stay Inspired</span>
                            </div>
                            <p className="text-[11px] text-stone-300 font-light leading-snug">
                                Get travel tips, exclusive offers and new destinations straight to your inbox.
                            </p>

                            <form onSubmit={handleSubscribe} className="space-y-2">
                                <div className="relative flex items-center">
                                    <Mail size={14} className="absolute left-3 text-emerald-400" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="Your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-emerald-950/70 border border-emerald-700/60 rounded-full py-2 pl-8 pr-3 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 transition"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs py-2 px-4 rounded-full transition shadow-md flex items-center justify-center gap-1"
                                >
                                    <span>Subscribe</span>
                                    <ChevronRight size={14} />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-400 font-light">
                    <p>© 2026 Lankara Travels. All rights reserved.</p>

                    <div className="flex flex-wrap items-center gap-4 text-stone-300">
                        <Link href="#" className="hover:text-white transition">
                            Privacy Policy
                        </Link>
                        <span className="text-emerald-800">|</span>
                        <Link href="#" className="hover:text-white transition">
                            Terms of Service
                        </Link>
                        <span className="text-emerald-800">|</span>
                        <Link href="#" className="hover:text-white transition">
                            Cookie Preferences
                        </Link>
                        <span className="text-emerald-800">|</span>
                        <Link href="#" className="hover:text-white transition">
                            Sitemap
                        </Link>
                    </div>

                    <div className="flex items-center gap-1.5 text-stone-200 font-serif italic text-xs">
                        <span>🌿 Sri Lanka</span>
                        <span className="text-amber-400">♡</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}