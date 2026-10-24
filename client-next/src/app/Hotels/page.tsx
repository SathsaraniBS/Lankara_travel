import React from "react";
import { cookies } from "next/headers";
import HotelsClient, { HotelItem } from "./HotelsClient";

// const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// >>> FIX 1: strip trailing "/" and a trailing "/api" so we never build ".../api/api/hotels"
const FASTAPI_URL = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000")
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");
 
// >>> FIX 2: paths to try, in order. A 404 moves on to the next one.
// Trailing slash first, because FastAPI routers are usually declared as "/".
const HOTEL_PATHS = ["/api/hotels/", "/api/v1/hotels/", "/api/hotels", "/hotels/"];

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getHotels(queryParams: Record<string, string>): Promise<HotelItem[]> {
  try {
    const cookieStore = await cookies();
    // const token = cookieStore.get("token")?.value;
    const token =
      cookieStore.get("token")?.value ?? cookieStore.get("access_token")?.value;
 
    const queryString = new URLSearchParams(queryParams).toString();

     // >>> FIX 4: build the headers only when a token exists (an empty "Bearer" header can cause 401/422)
    const headers: Record<string, string> = { Accept: "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
 
    // >>> FIX 5: try each candidate path until one does not return 404
    let lastStatus = 0;
    for (const path of HOTEL_PATHS) {
      const url = `${FASTAPI_URL}${path}${queryString ? `?${queryString}` : ""}`;
      const res = await fetch(url, { headers, cache: "no-store" });
 
      if (res.status === 404) {
        lastStatus = 404;
        console.warn(`Hotels: ${url} returned 404, trying next path...`);
        continue;
      }
 
      if (!res.ok) {
        throw new Error(`Failed to fetch hotels: ${res.status} ${res.statusText} (${url})`);
      }
 
      const data = await res.json();
      return Array.isArray(data) ? data : data.results || [];
    }
 
    throw new Error(
      `Failed to fetch hotels: no hotels route found (last status ${lastStatus}). Tried: ${HOTEL_PATHS.join(", ")} on ${FASTAPI_URL}`
    );
  } catch (error) {
    console.error("Error fetching hotels from FastAPI:", error);
    return [];
  }
}



export default async function HotelsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  
  const queryMap: Record<string, string> = {};
  Object.keys(resolvedParams).forEach((key) => {
    const val = resolvedParams[key];
    if (typeof val === "string") {
      queryMap[key] = val;
    }
  });

  const hotels = await getHotels(queryMap);

  return (
    <main className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans flex flex-col justify-between">
      <HotelsClient initialHotels={hotels} />
    </main>
  );
}