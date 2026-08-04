"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Flight, FlightListResponse } from "@/types/flight";
import { Plane, Search } from "lucide-react";

export default function FlightsPage() {
  const [departureCity, setDepartureCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [flights, setFlights] = useState<Flight[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchFlights = async () => {
    setLoading(true);
    setError("");

    try {
      const params: Record<string, string> = {};
      if (departureCity) params.departure_city = departureCity;
      if (destinationCity) params.destination_city = destinationCity;
      if (minPrice) params.min_price = minPrice;
      if (maxPrice) params.max_price = maxPrice;

      const response = await api.get<FlightListResponse>("/flights/", { params });
      setFlights(response.data.results);
      setTotal(response.data.total);
    } catch (err) {
      setError("Could not load flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchFlights();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchFlights();
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-gradient-to-br from-orange-50 to-cyan-50 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Search Flights
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-5 gap-4"
          >
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                From
              </label>
              <input
                type="text"
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                placeholder="Colombo"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                To
              </label>
              <input
                type="text"
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                placeholder="Dubai"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Min Price
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Max Price
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {loading && (
          <p className="text-center text-gray-500 py-10">Loading flights...</p>
        )}

        {error && (
          <p className="text-center text-red-500 py-10">{error}</p>
        )}

        {!loading && !error && (
          <>
            <p className="text-gray-500 mb-4 text-sm">
              {total} flight{total !== 1 ? "s" : ""} found
            </p>

            <div className="space-y-4">
              {flights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                      <Plane className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {flight.airline}
                      </p>
                      <p className="text-sm text-gray-500">
                        {flight.flight_number}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">
                        {flight.departure_city}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDateTime(flight.departure_time)}
                      </p>
                    </div>
                    <div className="text-gray-300">-&gt;</div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">
                        {flight.destination_city}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDateTime(flight.arrival_time)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-500">
                      ${flight.price}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">
                      {flight.seats_available} seats left
                    </p>
                    <button className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                      Select
                    </button>
                  </div>
                </div>
              ))}

              {flights.length === 0 && (
                <p className="text-center text-gray-400 py-16">
                  No flights found. Try different search criteria.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}