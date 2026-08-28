"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { Flight, FlightListResponse } from "@/types/flight";
import { Plane, Search, Loader2 } from "lucide-react";

export default function FlightsPage() {
  const [departureCity, setDepartureCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [flights, setFlights] = useState<Flight[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchFlights = useCallback(async () => {
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
    } catch {
      setError("Could not load flights. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [departureCity, destinationCity, minPrice, maxPrice]);

  useEffect(() => {
    searchFlights();
  }, []); // Initial load only

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
            className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
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
                Min Price ($)
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
                Max Price ($)
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[40px] flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Search
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            <p className="text-gray-500 text-sm">Searching for available flights...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-center my-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="text-gray-500 mb-4 text-sm font-medium">
              {total} flight{total !== 1 ? "s" : ""} found
            </p>

            <div className="space-y-4">
              {flights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
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

                  <div className="flex items-center gap-6 text-sm text-gray-600 w-full md:w-auto justify-between md:justify-center border-y md:border-y-0 py-3 md:py-0">
                    <div className="text-left md:text-center">
                      <p className="font-semibold text-gray-900">
                        {flight.departure_city}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDateTime(flight.departure_time)}
                      </p>
                    </div>
                    <div className="text-gray-300 font-bold">&rarr;</div>
                    <div className="text-right md:text-center">
                      <p className="font-semibold text-gray-900">
                        {flight.destination_city}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDateTime(flight.arrival_time)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right w-full md:w-auto flex md:flex-col justify-between items-center md:items-end">
                    <div>
                      <p className="text-2xl font-bold text-orange-500">
                        ${flight.price}
                      </p>
                      <p className="text-xs text-gray-400 mb-2">
                        {flight.seats_available} seats left
                      </p>
                    </div>
                    <button className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer">
                      Select
                    </button>
                  </div>
                </div>
              ))}

              {flights.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 text-center py-16 px-4">
                  <Plane className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-gray-700 font-semibold mb-1">No Flights Found</h3>
                  <p className="text-gray-400 text-sm">Try adjusting your search criteria or cities.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}