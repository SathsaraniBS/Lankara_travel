"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, MapPin, Smile, Users, Award, MessageSquareQuote } from "lucide-react";

interface Review {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  isMain?: boolean;
}

const reviewsData: Review[] = [
  {
    id: 1,
    name: "Dilini Perera",
    location: "Colombo, Sri Lanka",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
    rating: 5,
    quote:
      "Our trip to Ella and Nuwara Eliya was absolutely amazing! Everything was well organized and the hotels were fantastic. Lankara Travel made our vacation stress-free and memorable. Highly recommend!",
    isMain: true,
  },
  {
    id: 2,
    name: "Tharindu Silva",
    location: "Galle, Sri Lanka",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    quote: "Amazing experience from start to finish.",
  },
  {
    id: 3,
    name: "Nadeesha Karunaratne",
    location: "Kandy, Sri Lanka",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80",
    rating: 5,
    quote: "Great service and best holiday ever!",
  },
  {
    id: 4,
    name: "Supun De Silva",
    location: "Negombo, Sri Lanka",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
    quote: "Super friendly team and well planned tours.",
  },
  {
    id: 5,
    name: "Kasun Madushanka",
    location: "Jaffna, Sri Lanka",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80",
    rating: 5,
    quote: "Very reliable and trustworthy service.",
  },
  {
    id: 6,
    name: "Heshani Rathnayake",
    location: "Batticaloa, Sri Lanka",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    rating: 5,
    quote: "Loved the itinerary and hotel choices.",
  },
  {
    id: 7,
    name: "Isuru Jayawardena",
    location: "Anuradhapura, Sri Lanka",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    rating: 5,
    quote: "Excellent customer service and amazing trip!",
  },
  {
    id: 8,
    name: "Amandi Fernando",
    location: "Matara, Sri Lanka",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80",
    rating: 5,
    quote: "Smooth bookings and wonderful support!",
  },
];

export default function TestimonialsPage() {
  const [selectedReview, setSelectedReview] = useState<Review>(
    reviewsData.find((r) => r.isMain) || reviewsData[0]
  );

  return (
    <div className="relative min-h-screen text-slate-800 pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/backimage1.jpg"
          alt="Travel Background"
          fill={true}
          priority={true}
          className="object-cover object-center"
        />
        {/* Soft white overlay to ensure content readability */}
        <div className="absolute inset-0 bg-slate-70/80" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Loved By Over <span className="text-blue-600">Thousand Travelers</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Real stories from real travelers who explored, experienced, and created
            unforgettable memories with Lankara Travel.
          </p>
        </div>

        {/* Circular Testimonials Layout */}
        <div className="relative min-h-[520px] flex items-center justify-center py-8">
          
          {/* Main Featured Center Review */}
          <div className="z-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-slate-100 max-w-lg text-center flex flex-col items-center space-y-3 transition-all duration-300">
            <div className="relative">
              <Image
                src={selectedReview.avatar}
                alt={selectedReview.name}
                width={110}
                height={110}
                className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-500/20"
              />
              <div className="absolute bottom-1 right-1 bg-emerald-500 text-white rounded-full p-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">{selectedReview.name}</h3>
              <p className="text-xs text-slate-500 flex items-center justify-center gap-1 mt-0.5">
                <MapPin size={12} className="text-blue-500" /> {selectedReview.location}
              </p>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed italic px-2">
              &ldquo;{selectedReview.quote}&rdquo;
            </p>

            <div className="flex gap-1 text-amber-400">
              {Array.from({ length: selectedReview.rating }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
          </div>

          {/* Left Side Small Reviews */}
          <div className="hidden lg:flex flex-col justify-between absolute left-0 h-full py-4 space-y-6">
            {reviewsData.slice(1, 4).map((review) => (
              <div
                key={review.id}
                onClick={() => setSelectedReview(review)}
                className={`flex items-center gap-3 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 max-w-xs cursor-pointer hover:shadow-md transition ${
                  selectedReview.id === review.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="text-left text-xs">
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-0.5">
                    <MapPin size={10} className="text-blue-500" /> {review.location}
                  </p>
                  <div className="flex text-amber-400 my-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-slate-600 line-clamp-1">{review.quote}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side Small Reviews */}
          <div className="hidden lg:flex flex-col justify-between absolute right-0 h-full py-4 space-y-6">
            {reviewsData.slice(4, 7).map((review) => (
              <div
                key={review.id}
                onClick={() => setSelectedReview(review)}
                className={`flex items-center gap-3 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 max-w-xs cursor-pointer hover:shadow-md transition ${
                  selectedReview.id === review.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="text-left text-xs">
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-0.5">
                    <MapPin size={10} className="text-blue-500" /> {review.location}
                  </p>
                  <div className="flex text-amber-400 my-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-slate-600 line-clamp-1">{review.quote}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Center Small Review */}
          <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2">
            {reviewsData.slice(7, 8).map((review) => (
              <div
                key={review.id}
                onClick={() => setSelectedReview(review)}
                className={`flex items-center gap-3 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 max-w-xs cursor-pointer hover:shadow-md transition ${
                  selectedReview.id === review.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="text-left text-xs">
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-0.5">
                    <MapPin size={10} className="text-blue-500" /> {review.location}
                  </p>
                  <div className="flex text-amber-400 my-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-slate-600 line-clamp-1">{review.quote}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Stats Metrics Bar */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/70 p-6 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex items-center gap-3 justify-center md:border-r border-slate-100 pr-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Smile size={24} />
            </div>
            <div className="text-left">
              <p className="text-lg font-extrabold text-slate-900">4.8/5</p>
              <p className="text-xs text-slate-500">Average Rating</p>
              <p className="text-[10px] text-slate-400">Based on 2,350+ reviews</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:border-r border-slate-100 pr-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Users size={24} />
            </div>
            <div className="text-left">
              <p className="text-lg font-extrabold text-slate-900">10,000+</p>
              <p className="text-xs text-slate-500">Happy Travelers</p>
              <p className="text-[10px] text-slate-400">Joined with us</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:border-r border-slate-100 pr-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <Award size={24} />
            </div>
            <div className="text-left">
              <p className="text-lg font-extrabold text-slate-900">15,000+</p>
              <p className="text-xs text-slate-500">Trips Completed</p>
              <p className="text-[10px] text-slate-400">Successful journeys</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center">
            <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl">
              <MessageSquareQuote size={24} />
            </div>
            <div className="text-left">
              <p className="text-lg font-extrabold text-slate-900">98%</p>
              <p className="text-xs text-slate-500">Recommendation Rate</p>
              <p className="text-[10px] text-slate-400">Would recommend us</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}