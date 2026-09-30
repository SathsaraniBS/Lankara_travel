"use client";

import React, { useState } from "react";
import { MapPin, Calendar, Users, ArrowRight, Compass } from "lucide-react";

export default function TripPlannerForm() {
  const [fromLocation, setFromLocation] = useState("Colombo");
  const [toLocation, setToLocation] = useState("Sigiriya");
  const [travelDates, setTravelDates] = useState("12 Apr 2025 - 16 Apr 2025");
  const [travelType, setTravelType] = useState("Family Trip");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${apiUrl}/api/v1/planner/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_location: fromLocation,
          to_location: toLocation,
          dates: travelDates,
          travel_type: travelType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate plan");
      }

      const data = await response.json();
      console.log("Generated Plan:", data);
      // Optional: Redirect or update store
    } catch (error) {
      console.error("Error generating trip plan:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="mb-4">
        <div className="flex items-center gap-2 text-emerald-900 font-serif font-bold text-lg">
          <Compass className="w-5 h-5 text-emerald-700" />
          <h2>Plan Your Trip</h2>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">
          Choose your preferences and let us help you create the perfect itinerary.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* From */}
        <div className="md:col-span-3 bg-gray-50/70 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
          <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] uppercase font-semibold text-gray-400">From</label>
            <input
              type="text"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-gray-800 outline-none"
            />
          </div>
        </div>

        {/* To */}
        <div className="md:col-span-3 bg-gray-50/70 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
          <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] uppercase font-semibold text-gray-400">To</label>
            <input
              type="text"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-gray-800 outline-none"
            />
          </div>
        </div>

        {/* Travel Dates */}
        <div className="md:col-span-3 bg-gray-50/70 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
          <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] uppercase font-semibold text-gray-400">Travel Dates</label>
            <input
              type="text"
              value={travelDates}
              onChange={(e) => setTravelDates(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-gray-800 outline-none"
            />
          </div>
        </div>

        {/* Travel Type */}
        <div className="md:col-span-2 bg-gray-50/70 border border-gray-200 rounded-xl p-3 flex items-center gap-3">
          <Users className="w-4 h-4 text-emerald-700 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] uppercase font-semibold text-gray-400">Travel Type</label>
            <select
              value={travelType}
              onChange={(e) => setTravelType(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-gray-800 outline-none cursor-pointer"
            >
              <option value="Family Trip">Family Trip</option>
              <option value="Solo Trip">Solo Trip</option>
              <option value="Honeymoon">Honeymoon</option>
              <option value="Friends Trip">Friends Trip</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-900 hover:bg-emerald-950 text-white p-3 rounded-xl flex items-center justify-center transition shadow-md group disabled:opacity-50"
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </section>
  );
}