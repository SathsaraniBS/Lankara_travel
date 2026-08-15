"use client";

import React, { useState } from "react";
import { Star, MessageSquare, ThumbsUp, User } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Kasun Perera",
    rating: 5,
    date: "2026-02-10",
    comment:
      "Ella and Sigiriya trip was well-organized! The local insights helped us find incredible non-touristy food spots.",
    likes: 12,
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    rating: 5,
    date: "2026-01-28",
    comment:
      "Amazing resource for first-time travelers to Sri Lanka. The community reviews made planning effortless.",
    likes: 8,
  },
  {
    id: 3,
    name: "Dilshan Silva",
    rating: 4,
    date: "2026-01-15",
    comment:
      "Great recommendations for coastal spots! Mirissa beach tips were spot on.",
    likes: 5,
  },
];

export default function CommunityAndReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newReview: Review = {
      id: Date.now(),
      name,
      rating,
      date: new Date().toISOString().split("T")[0],
      comment,
      likes: 0,
    };

    setReviews([newReview, ...reviews]);
    setName("");
    setComment("");
    setRating(5);
  };

  const handleLike = (id: number) => {
    setReviews(
      reviews.map((rev) =>
        rev.id === id ? { ...rev, likes: rev.likes + 1 } : rev
      )
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-16 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
            Community & Reviews
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            See what fellow travelers are saying about their Sri Lankan adventures and share your own experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Add Review Form */}
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl h-fit">
            <h2 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
              <MessageSquare size={24} /> Leave a Review
            </h2>

            <form onSubmit={handleAddReview} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={24}
                        className={
                          star <= rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-600"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Experience
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  placeholder="Share your trip details..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition duration-200 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg transition duration-300"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Review List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-slate-200">
              Community Experiences ({reviews.length})
            </h2>

            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-200">
                        {review.name}
                      </h3>
                      <p className="text-xs text-slate-500">{review.date}</p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={
                          index < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-700"
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {review.comment}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <button
                    onClick={() => handleLike(review.id)}
                    className="flex items-center gap-1.5 hover:text-emerald-400 transition"
                  >
                    <ThumbsUp size={16} />
                    <span>Helpful ({review.likes})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}