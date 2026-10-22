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
    const token = cookieStore.get("token")?.value || cookieStore.get("access_token")?.value;

    // FIXED: Updated endpoint to match FastAPI planner.py route (/api/v1/planner/overview)
    const res = await fetch(`${FASTAPI_URL}/api/v1/planner/overview`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`Planner API returned status ${res.status}, using fallback data.`);
      return getFallbackData();
    }

    const data = await res.json();
    
    // Map FastAPI response keys to frontend expected types safely
    return {
      destinations: data.districts || data.destinations || [],
      initialItinerary: data.initialTripPlan ? { days: data.initialTripPlan } : (data.itinerary || null),
    };
  } catch (error) {
    console.error("Error fetching trip planner data from FastAPI, using fallback:", error);
    return getFallbackData();
  }
}

// Fallback data to prevent page crashes if backend is unreachable
function getFallbackData() {
  return {
    destinations: [
      { id: "colombo", name: "Colombo", region: "Western Province", image: "/images/colombo.jpg" },
      { id: "kandy", name: "Kandy", region: "Central Province", image: "/images/Kandy.jpg" },
      { id: "sigiriya", name: "Sigiriya", region: "Central Province", image: "/images/sigiriya.jpg" },
      { id: "ella", name: "Ella", region: "Uva Province", image: "/images/ella.jpg" },
      { id: "galle", name: "Galle", region: "Southern Province", image: "/images/unawatuna.jpg" }
    ],
    initialItinerary: {
      days: [
        { day: 1, activity: "Arrival and City Tour in Colombo" },
        { day: 2, activity: "Travel to Sigiriya Rock Fortress" },
        { day: 3, activity: "Explore Kandy Temple of the Tooth" },
        { day: 4, activity: "Scenic Train Ride to Ella" }
      ]
    } as TripItineraryData,
  };
}

export default async function PlanningTripPage() {
  const { destinations, initialItinerary } = await getInitialPlannerData();

  return (
    <main className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans flex flex-col justify-between">
      <PlanningTripClient initialDestinations={destinations} initialItinerary={initialItinerary} />
    </main>
  );
}