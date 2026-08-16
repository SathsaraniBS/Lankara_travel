"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {Check,Lock,AlertTriangle,Info,CreditCard,Building,HelpCircle,ShieldCheck,
  Headphones,CheckCircle,ChevronDown,} from "lucide-react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "property">("card");
  const [promoCode, setPromoCode] = useState("TRAVEL10");
  const [isPromoApplied, setIsPromoApplied] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Form State
  const [cardNumber, setCardNumber] = useState("1234 5678 9012 3456");
  const [cardError, setCardError] = useState("Enter a valid card number.");

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-800 font-sans pb-16">
      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-900">
            <span className="text-2xl">🌴</span> Lankara Travel
          </Link>

          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <Link href="#" className="hover:text-blue-600">Stays</Link>
            <Link href="#" className="hover:text-blue-600">Flights</Link>
            <Link href="#" className="hover:text-blue-600">Car Rental</Link>
            <Link href="#" className="hover:text-blue-600">Attractions</Link>
          </nav>

          <div className="flex items-center gap-4 text-sm">
            <button className="flex items-center gap-1 border rounded px-2 py-1 text-slate-700 bg-slate-50 text-xs font-semibold">
              LKR <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-1 text-slate-600 hover:text-black">
              <HelpCircle size={18} /> Help
            </button>
            <button className="flex items-center gap-1 text-slate-600 hover:text-black font-medium">
              Sign in
            </button>
          </div>
        </div>
      </header>

      {/* Stepper Wizard */}
      <div className="bg-white border-b border-slate-200 py-4 mb-6">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between text-xs sm:text-sm font-medium text-slate-500">
          <div className="flex items-center gap-2 text-blue-900 font-bold">
            <span className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs">
              <Check size={14} />
            </span>
            1. Review
          </div>
          <div className="h-[2px] bg-blue-900 flex-1 mx-2 sm:mx-4"></div>
          <div className="flex items-center gap-2 text-blue-900 font-bold">
            <span className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs">
              <Check size={14} />
            </span>
            2. Guest Details
          </div>
          <div className="h-[2px] bg-blue-900 flex-1 mx-2 sm:mx-4"></div>
          <div className="flex items-center gap-2 text-blue-600 font-bold">
            <span className="w-6 h-6 rounded-full border-2 border-blue-600 text-blue-600 flex items-center justify-center text-xs">
              3
            </span>
            3. Payment
          </div>
          <div className="h-[2px] bg-slate-200 flex-1 mx-2 sm:mx-4"></div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-6 h-6 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center text-xs">
              4
            </span>
            4. Confirmation
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Forms (2 cols on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Review and pay</h1>
            <p className="text-slate-600 text-sm mt-1">
              You're one step away from confirming your stay.
            </p>
            <p className="text-slate-500 text-xs flex items-center gap-1.5 mt-2">
              <Lock size={14} className="text-slate-600" /> Secure payment. Your card details are encrypted.
            </p>
          </div>

          {/* Alert Banners */}
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 text-amber-800 text-xs sm:text-sm flex items-center gap-2.5">
              <AlertTriangle size={18} className="shrink-0 text-amber-600" />
              <span><strong>This room is almost sold out.</strong> Complete payment to secure your stay.</span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3.5 text-blue-900 text-xs sm:text-sm flex items-center gap-2.5">
              <Info size={18} className="shrink-0 text-blue-600" />
              <span>The price was updated due to availability. Your new total is <strong>LKR 50,200</strong>.</span>
            </div>
          </div>

          {/* Section 1: Guest Details */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
              <span className="w-6 h-6 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center">1</span>
              Guest details
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-600 font-medium mb-1">First name</label>
                <input
                  type="text"
                  defaultValue="Nimal"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Last name</label>
                <input
                  type="text"
                  defaultValue="Perera"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-slate-600 font-medium mb-1">Email address</label>
                <input
                  type="email"
                  defaultValue="nimal.perera@email.com"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-slate-600 font-medium mb-1">Special requests (optional)</label>
                <input
                  type="text"
                  placeholder="For example: late check-in, airport pickup request."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-2">
                <input type="checkbox" id="mainGuest" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="mainGuest" className="text-slate-700 font-medium">I am the main guest</label>
              </div>
            </div>
          </div>

          {/* Section 2: Payment Options */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
              <span className="w-6 h-6 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center">2</span>
              How would you like to pay?
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3 border rounded-xl flex items-center gap-2 text-xs sm:text-sm font-semibold transition ${
                  paymentMethod === "card"
                    ? "border-blue-600 bg-blue-50/50 text-blue-900"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <input type="radio" checked={paymentMethod === "card"} readOnly className="accent-blue-600" />
                <CreditCard size={18} /> Credit or Debit Card
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("paypal")}
                className={`p-3 border rounded-xl flex items-center gap-2 text-xs sm:text-sm font-semibold transition ${
                  paymentMethod === "paypal"
                    ? "border-blue-600 bg-blue-50/50 text-blue-900"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <input type="radio" checked={paymentMethod === "paypal"} readOnly className="accent-blue-600" />
                <span>PayPal / Digital Wallet</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("property")}
                className={`p-3 border rounded-xl flex items-center gap-2 text-xs sm:text-sm font-semibold transition ${
                  paymentMethod === "property"
                    ? "border-blue-600 bg-blue-50/50 text-blue-900"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <input type="radio" checked={paymentMethod === "property"} readOnly className="accent-blue-600" />
                <Building size={18} /> Pay at Property
              </button>
            </div>

            {/* Card Inputs */}
            {paymentMethod === "card" && (
              <div className="space-y-4 pt-2 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Cardholder name</label>
                    <input
                      type="text"
                      defaultValue="Nimal Perera"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Card number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${
                        cardError ? "border-red-400 bg-red-50/20 text-red-900" : "border-slate-300"
                      }`}
                    />
                    {cardError && <p className="text-red-500 text-[11px] mt-1">{cardError}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Expiry date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">CVV</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600"
                      />
                      <HelpCircle size={16} className="absolute right-3 top-2.5 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input type="checkbox" id="saveCard" defaultChecked className="rounded border-slate-300 text-blue-600" />
                  <label htmlFor="saveCard" className="text-slate-600 text-xs">Save this card securely for faster future bookings</label>
                </div>

                {/* Card Brands */}
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-blue-900 border px-2 py-0.5 rounded">VISA</span>
                  <span className="text-xs font-bold text-red-600 border px-2 py-0.5 rounded">MasterCard</span>
                  <span className="text-xs font-bold text-blue-500 border px-2 py-0.5 rounded">AMEX</span>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Promo Code */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
              <span className="w-6 h-6 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center">3</span>
              Have a promo code?
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-full max-w-xs uppercase font-medium focus:outline-none focus:border-blue-600"
              />
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2 rounded-lg transition"
              >
                Apply
              </button>
            </div>

            {isPromoApplied && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-600" />
                <span>TRAVEL10 applied — You saved LKR 2,500</span>
              </div>
            )}
          </div>

          {/* Section 4: Policies */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
              <span className="w-6 h-6 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center">4</span>
              Cancellation and payment policy
            </div>

            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded">
              Free cancellation until 25 Aug 2026, 11:59 PM
            </span>

            <p className="text-slate-600 text-xs leading-relaxed">
              After this time, a cancellation fee of LKR 12,000 may apply. Your card will be charged today.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              <label htmlFor="terms" className="text-xs text-slate-700">
                I have read and agree to the <Link href="#" className="text-blue-600 underline">cancellation policy</Link>, <Link href="#" className="text-blue-600 underline">property rules</Link>, and <Link href="#" className="text-blue-600 underline">terms and conditions</Link>.
              </label>
            </div>
          </div>

          {/* Section 5: Pay Button */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
              <span className="w-6 h-6 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center">5</span>
              Final step
            </div>

            <button
              type="button"
              disabled={!agreedTerms}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base sm:text-lg rounded-xl shadow-md transition disabled:opacity-50"
            >
              🔒 Pay LKR 49,000 and confirm booking
            </button>

            <p className="text-center text-xs text-slate-500">
              By selecting this button, you agree to the <Link href="#" className="text-blue-600 underline">booking conditions and payment terms</Link>.
            </p>
          </div>

        </div>

        {/* Right Column - Booking Summary Sidebar */}
        <div className="space-y-6">
          
          {/* Booking Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-900 text-lg">Your booking</h2>

            {/* Hotel Info */}
            <div className="flex gap-3">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                <Image src="/images/backimage.jpg" alt="Mountain View Hotel" fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Mountain View Hotel</h3>
                <p className="text-xs text-slate-500">Ella, Sri Lanka</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="bg-blue-900 text-white text-xs font-bold px-1.5 py-0.5 rounded">8.9</span>
                  <span className="text-xs font-bold text-slate-800">Excellent</span>
                  <span className="text-[11px] text-slate-400">(426 reviews)</span>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Stay Details */}
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Check-in</span>
                <span className="font-medium text-right">Thu, 27 Aug 2026 · From 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Check-out</span>
                <span className="font-medium text-right">Sat, 29 Aug 2026 · Until 11:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Stay duration</span>
                <span className="font-medium">2 nights</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Room</span>
                <span className="font-medium">1 Deluxe Double Room</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Guests</span>
                <span className="font-medium">2 adults</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Meal plan</span>
                <span className="font-medium text-slate-900">Breakfast included</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cancellation</span>
                <span className="font-bold text-emerald-600">Free cancellation</span>
              </div>
            </div>

            <button className="text-xs text-blue-600 font-semibold underline w-full text-right block pt-1">
              Change selection
            </button>

            <hr className="border-slate-100" />

            {/* Price Breakdown */}
            <div className="space-y-2 text-xs sm:text-sm">
              <h3 className="font-bold text-slate-900 text-base mb-2">Price details</h3>
              <div className="flex justify-between text-slate-600">
                <span>Room price for 2 nights</span>
                <span>LKR 45,000</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Taxes and service charges</span>
                <span>LKR 6,500</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Discount</span>
                <span>- LKR 2,500</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Travel insurance</span>
                <span>LKR 0</span>
              </div>

              <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                <span className="font-bold text-slate-900 text-base">Total</span>
                <span className="font-extrabold text-slate-900 text-lg">LKR 49,000</span>
              </div>

              <div className="flex justify-between items-baseline text-blue-900 font-bold bg-blue-50/60 p-2.5 rounded-lg border border-blue-100">
                <span>Due today</span>
                <span className="text-xl">LKR 49,000</span>
              </div>
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-emerald-600 shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-slate-800">Secure payment</h4>
                <p className="text-slate-500">Your information is protected</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-emerald-600 shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-slate-800">No hidden fees</h4>
                <p className="text-slate-500">What you see is what you pay</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Headphones className="text-emerald-600 shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-slate-800">24/7 customer support</h4>
                <p className="text-slate-500">We're here to help anytime</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}