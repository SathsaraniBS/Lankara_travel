import React from "react";
import { cookies } from "next/headers";
import HotelsClient, { HotelItem } from "./HotelsClient";

const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getHotels(queryParams: Record<string, string>): Promise<HotelItem[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${FASTAPI_URL}/api/hotels${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch hotels: ${res.statusText}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.results || [];
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