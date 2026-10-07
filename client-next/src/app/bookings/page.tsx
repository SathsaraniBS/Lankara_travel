import React from "react";
import { cookies } from "next/headers";
import BookingsClient, { BookingItem } from "./BookingsClient";

const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function getUserBookings(): Promise<BookingItem[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${FASTAPI_URL}/api/bookings/my-bookings`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      cache: "no-store", // Real-time user bookings
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch bookings: ${res.statusText}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.results || [];
  } catch (error) {
    console.error("Error fetching bookings from FastAPI:", error);
    return [];
  }
}

export default async function BookingsPage() {
  const bookings = await getUserBookings();

  return (
    <main className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans flex flex-col justify-between">
      <BookingsClient initialBookings={bookings} />
    </main>
  );
}