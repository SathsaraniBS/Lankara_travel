import React from "react";
import { cookies } from "next/headers";
import PlanningTripClient, { DestinationSpot, TripItineraryData } from "./PlanningTripClient";

const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function getInitialPlannerData(): Promise<{
  destinations: DestinationSpot[];
  initialItinerary: TripItineraryData | null;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${FASTAPI_URL}/api/planner/initial-data`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch planner data: ${res.statusText}`);
    }

    const data = await res.json();
    return {
      destinations: data.destinations || [],
      initialItinerary: data.itinerary || null,
    };
  } catch (error) {
    console.error("Error fetching trip planner data from FastAPI:", error);
    return { destinations: [], initialItinerary: null };
  }
}

export default async function PlanningTripPage() {
  const { destinations, initialItinerary } = await getInitialPlannerData();

  return (
    <main className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans flex flex-col justify-between">
      <PlanningTripClient initialDestinations={destinations} initialItinerary={initialItinerary} />
    </main>
  );
}