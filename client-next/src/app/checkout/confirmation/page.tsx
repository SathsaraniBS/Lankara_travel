import React from "react";
import { cookies } from "next/headers";
import ConfirmationClient, { OrderConfirmationData } from "./ConfirmationClient";

const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getBookingConfirmation(bookingRef?: string): Promise<OrderConfirmationData | null> {
  if (!bookingRef) return null;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${FASTAPI_URL}/api/checkout/confirmation?ref=${bookingRef}`, {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to load confirmation details");
    return await res.json();
  } catch (error) {
    console.error("Error fetching confirmation from FastAPI:", error);
    return null;
  }
}

export default async function ConfirmationPage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const ref = typeof resolved.ref === "string" ? resolved.ref : undefined;
  const data = await getBookingConfirmation(ref);

  return (
    <main className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans flex flex-col justify-between">
      <ConfirmationClient confirmationData={data} />
    </main>
  );
}