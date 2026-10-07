"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Users,
  CreditCard,
  Building2,
  Smartphone,
  ShieldCheck,
  Headphones,
  Lock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Hotel,
  Star,
  Coffee,
  Bed,
} from "lucide-react";

export interface CheckoutSummaryData {
  id: string;
  type: string;
  title: string;
  location: string;
  rating: number;
  review_count: number;
  date_range: string;
  guests_text: string;
  room_text: string;
  meal_text: string;
  image_url: string;
  room_price: number;
  taxes_fees: number;
  service_charge: number;
  total_amount: number;
}

interface CheckoutClientProps {
  initialData: CheckoutSummaryData | null;
}

const DEFAULT_SUMMARY: CheckoutSummaryData = {
  id: "chk-101",
  type: "Hotel",
  title: "Cinnamon Grand Colombo",
  location: "Colombo · Sri Lanka",
  rating: 4.8,
  review_count: 1240,
  date_range: "12 Apr 2026 - 16 Apr 2026 (4 Nights)",
  guests_text: "2 Adults",
  room_text: "Deluxe Room",
  meal_text: "Breakfast Included",
  image_url: "/images/colombo.jpg",
  room_price: 68000,
  taxes_fees: 12400,
  service_charge: 5600,
  total_amount: 85000,
};

export default function CheckoutClient({ initialData }: CheckoutClientProps) {
  const router = useRouter();
  const summary = initialData || DEFAULT_SUMMARY;

  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "mobile" | "paypal">("card");
  const [fullName, setFullName] = useState("bss");
  const [email, setEmail] = useState("bss@example.com");
  const [phone, setPhone] = useState("+94 77 123 4567");
  const [specialRequests, setSpecialRequests] = useState("");

  const [cardNumber, setCardNumber] = useState("1234 5678 9012 3456");
  const [expiryDate, setExpiryDate] = useState("08/28");
  const [cvc, setCvc] = useState("123");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/checkout/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: summary.id,
          payment_method: paymentMethod,
          traveler_info: { fullName, email, phone, specialRequests },
          card_details: paymentMethod === "card" ? { cardNumber, expiryDate, cvc } : null,
        }),
      });

      if (res.ok) {
        router.push("/bookings");
      } else {
        router.push("/bookings");
      }
    } catch {
      router.push("/bookings");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* 1. HERO HEADER */}
      <section className="relative w-full h-[240px] sm:h-[280px] bg-slate-900 overflow-hidden">
        <Image
          src="/images/unawatuna.jpg"
          alt="Checkout Banner"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">Checkout</h1>
              <p className="text-gray-200 text-xs sm:text-sm font-light">
                Complete your booking and get ready for an unforgettable journey in Sri Lanka!
              </p>
            </div>

            <div className="hidden md:block text-right text-amber-300 font-serif italic text-lg">
              <p>Same island</p>
              <p>More memories ♡</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STEP PROGRESS BAR */}
      <div className="max-w-7xl mx-auto px-6 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex items-center justify-between max-w-3xl mx-auto text-xs font-semibold text-gray-500">
          <div className="flex items-center gap-2 text-emerald-800">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[11px] font-bold">
              ✓
            </span>
            <span>Your Details</span>
          </div>
          <div className="h-[2px] w-12 bg-emerald-800 hidden sm:block" />

          <div className="flex items-center gap-2 text-emerald-800 font-bold">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[11px] font-bold">
              2
            </span>
            <span>Payment</span>
          </div>
          <div className="h-[2px] w-12 bg-gray-200 hidden sm:block" />

          <div className="flex items-center gap-2 opacity-50">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-[11px] font-bold">
              3
            </span>
            <span>Confirmation</span>
          </div>
          <div className="h-[2px] w-12 bg-gray-200 hidden sm:block" />

          <div className="flex items-center gap-2 opacity-50">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-[11px] font-bold">
              4
            </span>
            <span>Booking Complete</span>
          </div>
        </div>
      </div>

      {/* 3. MAIN CHECKOUT FORM & SUMMARY */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: DETAILS & PAYMENT */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* BOOKING DETAILS CARD */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-gray-900 border-b border-gray-100 pb-3">
                <Calendar className="text-emerald-800" size={18} />
                <h2 className="text-sm font-bold uppercase tracking-wider">Booking Details</h2>
                <span className="text-[10px] text-gray-400 font-normal">Review your booking information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-4 relative h-32 rounded-xl overflow-hidden">
                  <Image src={summary.image_url} alt={summary.title} fill className="object-cover" />
                  <span className="absolute top-2 left-2 bg-emerald-800 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                    + {summary.type}
                  </span>
                </div>

                <div className="sm:col-span-8 space-y-2">
                  <h3 className="text-base font-bold text-gray-900">{summary.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star size={13} className="fill-amber-400" />
                    <span>{summary.rating}</span>
                    <span className="text-gray-400 font-normal">({summary.review_count.toLocaleString()} reviews)</span>
                  </div>

                  <div className="space-y-1 text-xs text-gray-600 pt-1">
                    <p className="flex items-center gap-1.5 font-medium">
                      <Calendar size={13} className="text-emerald-800" /> {summary.date_range}
                    </p>
                    <div className="flex flex-wrap gap-3 text-gray-500 text-[11px] pt-0.5">
                      <span className="flex items-center gap-1">
                        <Users size={12} className="text-emerald-800" /> {summary.guests_text}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed size={12} className="text-emerald-800" /> {summary.room_text}
                      </span>
                      <span className="flex items-center gap-1">
                        <Coffee size={12} className="text-emerald-800" /> {summary.meal_text}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TRAVELER INFORMATION CARD */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-gray-900 border-b border-gray-100 pb-3">
                <Users className="text-emerald-800" size={18} />
                <h2 className="text-sm font-bold uppercase tracking-wider">Traveler Information</h2>
                <span className="text-[10px] text-gray-400 font-normal">Please make sure your details are correct</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Special Requests (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Early check-in, room preferences..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-800 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD CARD */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-gray-900 border-b border-gray-100 pb-3">
                <CreditCard className="text-emerald-800" size={18} />
                <h2 className="text-sm font-bold uppercase tracking-wider">Payment Method</h2>
                <span className="text-[10px] text-gray-400 font-normal">Choose your preferred payment method</span>
              </div>

              {/* Selection Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
                  { id: "bank", label: "Bank Transfer", icon: Building2 },
                  { id: "mobile", label: "Mobile Payment", icon: Smartphone },
                  { id: "paypal", label: "PayPal", icon: Lock },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = paymentMethod === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 cursor-pointer ${
                        isSelected
                          ? "bg-emerald-800 text-white border-emerald-800 shadow"
                          : "bg-gray-50 border-gray-100 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <Icon size={16} />
                      <span className="text-[11px] font-bold leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Card Inputs */}
              {paymentMethod === "card" && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Card Number *</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-medium focus:outline-none focus:border-emerald-800"
                      />
                      <span className="absolute right-3 top-3 text-[10px] font-bold text-gray-400">VISA / MC</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Expiry Date *</label>
                      <input
                        type="text"
                        required
                        placeholder="MM / YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-medium focus:outline-none focus:border-emerald-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">CVC *</label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-medium focus:outline-none focus:border-emerald-800"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-1.5 text-gray-400 text-[11px] pt-1">
                <Lock size={12} />
                <span>Your payment information is secure and encrypted.</span>
              </div>
            </div>

            <Link
              href="/Hotels"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-emerald-800 transition"
            >
              <ArrowLeft size={14} /> Back to Trip Details
            </Link>
          </div>

          {/* RIGHT COLUMN: PRICE SUMMARY & CONFIRM ACTION */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* ITEM SUMMARY CARD */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <div className="relative h-40 rounded-xl overflow-hidden">
                <Image src={summary.image_url} alt={summary.title} fill className="object-cover" />
                <span className="absolute top-2 left-2 bg-emerald-800 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                  + {summary.type}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900">{summary.title}</h3>
                <p className="text-xs text-gray-500">{summary.location}</p>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-1">
                  <Star size={12} className="fill-amber-400" />
                  <span>{summary.rating}</span>
                  <span className="text-gray-400 font-normal">({summary.review_count.toLocaleString()} reviews)</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-100 pt-3">
                <p className="flex items-center gap-1 font-medium">
                  <Users size={12} className="text-emerald-800" /> {summary.guests_text}
                </p>
                <p className="flex items-center gap-1 font-medium">
                  <Bed size={12} className="text-emerald-800" /> {summary.room_text}
                </p>
                <p className="flex items-center gap-1 font-medium">
                  <Coffee size={12} className="text-emerald-800" /> {summary.meal_text}
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-100 pt-3 space-y-2 text-xs">
                <h4 className="font-bold text-gray-900">Price Breakdown</h4>
                <div className="flex justify-between text-gray-600">
                  <span>Room Price (4 Nights)</span>
                  <span className="font-semibold text-gray-800">LKR {summary.room_price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Fees</span>
                  <span className="font-semibold text-gray-800">LKR {summary.taxes_fees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Charge</span>
                  <span className="font-semibold text-gray-800">LKR {summary.service_charge.toLocaleString()}</span>
                </div>
              </div>

              {/* Total Amount */}
              <div className="border-t border-gray-100 pt-3 flex items-baseline justify-between">
                <span className="text-sm font-bold text-gray-900">Total Amount</span>
                <span className="text-xl font-bold text-emerald-800">
                  LKR {summary.total_amount.toLocaleString()}
                </span>
              </div>

              {/* Free Cancellation Notice */}
              <div className="bg-emerald-50/60 rounded-xl p-3 flex items-start gap-2.5 text-[11px] text-emerald-900">
                <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Free cancellation</span>
                  <span className="text-emerald-700">Cancel up to 24 hours before check-in for a full refund.</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Confirm & Pay →"}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-gray-400 text-[10px]">
                <Lock size={12} />
                <span>Secure Payment</span>
              </div>
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-gray-500 font-semibold">
              <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex flex-col items-center gap-1">
                <ShieldCheck size={18} className="text-emerald-800" />
                <span>SSL Encrypted Payments</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex flex-col items-center gap-1">
                <Headphones size={18} className="text-emerald-800" />
                <span>24/7 Support</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex flex-col items-center gap-1">
                <CheckCircle2 size={18} className="text-emerald-800" />
                <span>Trusted & Safe</span>
              </div>
            </div>

          </div>

        </form>
      </main>
    </div>
  );
}