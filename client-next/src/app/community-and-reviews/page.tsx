"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star, Users, Camera, Heart, MessageCircle, ArrowRight, ShieldCheck, Compass,
  PenSquare, Lightbulb, Image as ImageIcon, UserCheck, X, Loader2, Send
} from "lucide-react";
import Footer from "@/components/layout/Footer";

// Data interfaces matching FastAPI / Pydantic schemas
interface ReviewUser {
  id: string;
  full_name: string;
  country?: string;
  avatar_url?: string;
}

interface Review {
  id: string;
  rating: int;
  comment: string;
  location_name?: string;
  image_url?: string;
  created_at: string;
  user: ReviewUser;
}

interface RatingBreakdown {
  stars: number;
  count: number;
  percentage: string;
}

interface CommunityStats {
  total_travellers: number;
  average_rating: number;
  total_reviews: number;
  total_photos_stories: number;
  active_members: number;
  breakdown: RatingBreakdown[];
}

interface Story {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  cover_image_url?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  author: ReviewUser;
  is_liked_by_me?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function CommunityAndReviewsPage() {
  // States for backend data
  const [stats, setStats] = useState<CommunityStats | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // States for review modal & form
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [locationName, setLocationName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  // Fetch initial data from FastAPI backend
  useEffect(() => {
    async function fetchCommunityData() {
      try {
        setLoading(true);
        const [statsRes, reviewsRes, storiesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/v1/community/stats`),
          fetch(`${API_BASE_URL}/api/v1/community/reviews?limit=3`),
          fetch(`${API_BASE_URL}/api/v1/community/stories?limit=4`),
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData);
        }
        if (storiesRes.ok) {
          const storiesData = await storiesRes.json();
          setStories(storiesData);
        }
      } catch (error) {
        console.error("Error loading community data from backend:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCommunityData();
  }, []);

  // Handle Review Submission
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setSubmitError("Please write a short comment about your trip.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const token = localStorage.getItem("token"); // Auth JWT
      const res = await fetch(`${API_BASE_URL}/api/v1/community/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          rating: selectedRating,
          comment: comment,
          location_name: locationName || null,
          image_url: imageUrl || null,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to post review. Please make sure you are logged in.");
      }

      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev.slice(0, 2)]);
      setIsModalOpen(false);
      setComment("");
      setLocationName("");
      setImageUrl("");
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Story Like Toggle
  const handleToggleLike = async (storyId: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/v1/community/stories/${storyId}/like`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (res.ok) {
        const data = await res.json();
        setStories((prev) =>
          prev.map((s) =>
            s.id === storyId
              ? { ...s, likes_count: data.likes_count, is_liked_by_me: data.liked }
              : s
          )
        );
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F8F9FA] text-[#1A202C] font-sans">
        {/* 1. HERO SECTION */}
        <section className="relative w-full h-[520px] bg-slate-900 text-white overflow-hidden flex items-center">
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

              {/* Dynamic Stats Row */}
              <div className="grid grid-cols-4 gap-4 max-w-lg bg-black/30 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <div className="flex flex-col items-center text-center">
                  <Users className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="font-bold text-base text-white">
                    {stats ? `${(stats.total_travellers / 1000).toFixed(0)}K+` : "12K+"}
                  </span>
                  <span className="text-[11px] text-slate-300">Happy Travellers</span>
                </div>
                <div className="flex flex-col items-center text-center border-l border-white/10">
                  <Star className="w-5 h-5 text-amber-400 mb-1 fill-amber-400" />
                  <span className="font-bold text-base text-white">
                    {stats ? `${stats.average_rating}/5` : "4.8/5"}
                  </span>
                  <span className="text-[11px] text-slate-300">Average Rating</span>
                </div>
                <div className="flex flex-col items-center text-center border-l border-white/10">
                  <Camera className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="font-bold text-base text-white">
                    {stats ? `${(stats.total_photos_stories / 1000).toFixed(0)}K+` : "8K+"}
                  </span>
                  <span className="text-[11px] text-slate-300">Photos & Stories</span>
                </div>
                <div className="flex flex-col items-center text-center border-l border-white/10">
                  <Compass className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="font-bold text-base text-white">
                    {stats ? `${(stats.active_members / 1000).toFixed(0)}K+` : "3K+"}
                  </span>
                  <span className="text-[11px] text-slate-300">Active Members</span>
                </div>
              </div>
            </div>

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
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#124E3F] hover:bg-[#0E3D31] text-white font-medium text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-sm"
            >
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
                    <div className="text-3xl font-extrabold text-slate-800">
                      {stats?.average_rating || 4.8}
                      <span className="text-lg text-slate-400 font-normal">/5</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Based on {stats?.total_reviews || "2,340+"} reviews
                    </div>
                  </div>
                </div>

                {/* Rating Breakdown Bars */}
                <div className="mt-6 space-y-2.5">
                  {(stats?.breakdown || [
                    { stars: 5, percentage: "78%" },
                    { stars: 4, percentage: "16%" },
                    { stars: 3, percentage: "4%" },
                    { stars: 2, percentage: "1%" },
                    { stars: 1, percentage: "1%" },
                  ]).map((row) => (
                    <div key={row.stars} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="w-3 text-right font-medium">{row.stars}★</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full transition-all duration-500"
                          style={{ width: row.percentage }}
                        />
                      </div>
                      <span className="w-7 text-right text-slate-400 text-[11px]">{row.percentage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Individual Review Cards Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {reviews.length > 0 ? (
                reviews.map((rev) => (
                  <div key={rev.id} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div className="p-4">
                      <div className="flex items-center gap-2.5 mb-3">
                        <Image
                          src={rev.user.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"}
                          alt={rev.user.full_name}
                          width={36}
                          height={36}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{rev.user.full_name}</h4>
                          <span className="text-[10px] text-slate-400 block">{rev.user.country || "Explorer"}</span>
                          <div className="flex text-amber-400 mt-0.5">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed italic line-clamp-3">
                        "{rev.comment}"
                      </p>
                    </div>
                    <div className="relative h-24 w-full mt-2">
                      <Image
                        src={rev.image_url || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600"}
                        alt={rev.location_name || "Sri Lanka"}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[9px] flex items-center justify-between">
                        <span>📍 {rev.location_name || "Sri Lanka"}</span>
                        <span className="opacity-75">{new Date(rev.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  {/* Default Static Fallbacks when DB is empty */}
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
                </>
              )}
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

                <div className="flex justify-center gap-1.5 text-slate-300 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onClick={() => {
                        setSelectedRating(star);
                        setIsModalOpen(true);
                      }}
                      className={`w-6 h-6 cursor-pointer transition-colors ${
                        star <= selectedRating ? "text-amber-400 fill-amber-400" : "hover:text-amber-400"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#124E3F] hover:bg-[#0E3D31] text-white font-medium text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
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
            {stories.length > 0 ? (
              stories.map((story) => (
                <div key={story.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
                  <div>
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={story.cover_image_url || "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=600"}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={() => handleToggleLike(story.id)}
                        className={`absolute top-3 right-3 bg-white/80 backdrop-blur-md p-1.5 rounded-full hover:bg-white transition-colors ${
                          story.is_liked_by_me ? "text-red-500" : "text-slate-600 hover:text-red-500"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${story.is_liked_by_me ? "fill-red-500" : ""}`} />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Image
                          src={story.author.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"}
                          alt={story.author.full_name}
                          width={24}
                          height={24}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <h5 className="text-[11px] font-bold text-slate-800">{story.author.full_name}</h5>
                          <p className="text-[9px] text-slate-400">{story.author.country || "Sri Lanka"}</p>
                        </div>
                      </div>
                      <h3 className="font-bold text-sm text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-4 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {story.likes_count}</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {story.comments_count}</span>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium text-[10px]">
                      {story.category}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <>
                {/* Fallback Static Cards */}
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
              </>
            )}
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

      {/* WRITE A REVIEW MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-800 mb-1">Write a Review</h3>
            <p className="text-xs text-slate-500 mb-5">
              Share your experience to help other travellers discover Sri Lanka!
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Rating
                </label>
                <div className="flex gap-1 text-slate-300">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      className={`w-6 h-6 cursor-pointer transition-colors ${
                        star <= selectedRating ? "text-amber-400 fill-amber-400" : "hover:text-amber-400"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Location (e.g., Mirissa Beach, Sigiriya)
                </label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="Where did you go?"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Story / Review
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder="Tell us about your trip, guide, or experience..."
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {submitError && (
                <p className="text-red-500 text-xs font-medium">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#124E3F] hover:bg-[#0E3D31] text-white font-medium text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Review
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}