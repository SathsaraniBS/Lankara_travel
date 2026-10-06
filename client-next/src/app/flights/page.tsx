import React from "react";
import FlightsClient, { DestinationItem } from "./FlightsClient";

const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function getPopularDestinations(): Promise<DestinationItem[]> {
  try {
    const res = await fetch(`${FASTAPI_URL}/api/flights/destinations`, {
      next: { revalidate: 60 }, // Revalidates cache every 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch flight destinations: ${res.statusText}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.results || [];
  } catch (error) {
    console.error("Error fetching destinations from FastAPI:", error);
    return [];
  }
}

export default async function FlightsPage() {
  const destinations = await getPopularDestinations();

  return (
    <main className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans flex flex-col justify-between">
      <FlightsClient initialDestinations={destinations} />
    </main>
  );
}