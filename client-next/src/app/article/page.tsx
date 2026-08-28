"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, Search } from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
}

const articlesData: Article[] = [
  {
    id: 1,
    title: "Top 10 Hidden Gems to Visit in Sri Lanka",
    excerpt:
      "Beyond the popular tourist spots lies a world of unexplored waterfalls, quiet beaches, and ancient ruins.",
    category: "Travel Guide",
    date: "2026-02-12",
    author: "BSS",
    image: "/images/hidden-places.avif",
  },
  {
    id: 2,
    title: "A Complete Guide to Sri Lankan Street Food",
    excerpt:
      "From Kottu Roti to Hopper stations, discover the vibrant flavors and spices of traditional Sri Lankan street cuisine.",
    category: "Food & Culture",
    date: "2026-02-05",
    author: "Admin",
    image: "/images/street-food.webp",
  },
  {
    id: 3,
    title: "Scenic Train Journeys: Kandy to Ella",
    excerpt:
      "Everything you need to know about booking tickets, best seats, and timings for the world's most beautiful train ride.",
    category: "Tips & Tricks",
    date: "2026-01-20",
    author: "Travel Desk",
    image: "/images/train-ride.avif",
  },
];

export default function ArticlePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Travel Guide", "Food & Culture", "Tips & Tricks"];

  const filteredArticles = articlesData.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-16 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
            Travel Articles & Guides
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Read expert insights, itineraries, and stories to inspire your next trip across Sri Lanka.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition duration-200"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition ${
                  selectedCategory === cat
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition duration-300"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-800">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-500/90 text-slate-950 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={14} /> {article.author}
                      </span>
                    </div>

                    <Link href={`/article/${article.id}`}>
                      <h2 className="text-xl font-bold text-slate-100 hover:text-emerald-400 transition cursor-pointer">
                        {article.title}
                      </h2>
                    </Link>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/article/${article.id}`}
                    className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-sm hover:gap-3 transition-all duration-300"
                  >
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-500">
              No articles found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}