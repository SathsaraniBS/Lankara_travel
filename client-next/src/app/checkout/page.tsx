import React from "react";
import { cookies } from "next/headers";
import CheckoutClient, { CheckoutSummaryData } from "./CheckoutClient";

const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getCheckoutItemDetails(bookingId?: string): Promise<CheckoutSummaryData | null> {
  if (!bookingId) return null;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${FASTAPI_URL}/api/checkout/summary?booking_id=${bookingId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch checkout summary: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching checkout details from FastAPI:", error);
    return null;
  }
}

export default async function CheckoutPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const bookingId = typeof resolvedParams.bookingId === "string" ? resolvedParams.bookingId : undefined;

  const checkoutData = await getCheckoutItemDetails(bookingId);

  return (
    <main className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans flex flex-col justify-between">
      <CheckoutClient initialData={checkoutData} />
    </main>
  );
}