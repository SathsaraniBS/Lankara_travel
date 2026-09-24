"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Search,
  Heart,
  User,
  ArrowRight,
  Upload,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Share2,
  Globe,
  MessageCircle,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const envUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const cleanBaseUrl = envUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");

      const response = await fetch(`${cleanBaseUrl}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || "Failed to submit message. Please try again."
        );
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: "How do I book a trip with Lankara Travels?",
      answer:
        "You can easily book a trip by selecting a pre-designed itinerary on our website or clicking 'Plan My Trip' to request a customized itinerary tailored to your preferences.",
    },
    {
      question: "Can I customise a travel package?",
      answer:
        "Yes, absolutely! All our itineraries can be fully customized according to your interests, budget, and travel schedule.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit/debit cards (Visa, MasterCard, American Express), bank wire transfers, and online payment gateways.",
    },
    {
      question: "Do you offer travel insurance?",
      answer:
        "While we do not directly issue insurance policies, we strongly recommend purchasing travel insurance and can assist in recommending trusted providers.",
    },
    {
      question: "How can I get travel updates and offers?",
      answer:
        "Subscribe to our newsletter at the bottom of the page or follow our social media channels to get the latest travel tips and special offers.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-800 font-sans flex flex-col justify-between">
      <div>
      

        {/* Hero Banner Section */}
        <section className="relative w-full h-[380px] bg-slate-900 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1600&auto=format&fit=crop"
            alt="Sri Lanka Coastline Banner"
            fill
            className="object-cover opacity-65"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1">
                📍 GET IN TOUCH
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white max-w-xl leading-tight">
              Contact Us
            </h1>

            <p className="text-gray-200 text-xs md:text-sm mt-3 max-w-md leading-relaxed">
              Have a question, need help with your booking, or want to share your travel experience? We&apos;d love to hear from you!
            </p>

            <p className="font-serif italic text-white/90 text-sm mt-4">
              Let&apos;s plan your next adventure together ♡
            </p>
          </div>

          {/* Decorative Text Badge */}
          <div className="absolute right-12 bottom-12 hidden lg:block text-right text-white/80">
            <p className="font-serif italic text-2xl font-light tracking-wide">
              Good Vibes <br /> Better Journeys ♡
            </p>
          </div>
        </section>

        {/* Contact Info & Form Section */}
        <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column - Contact Information */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <span className="text-[10px] font-semibold text-emerald-800 uppercase tracking-widest">
                  CONTACT INFORMATION
                </span>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mt-1">
                  We&apos;re Here to Help
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Reach out to us through any of the following channels. Our team will get back to you as soon as possible.
                </p>
              </div>

              {/* Info Cards */}
              <div className="space-y-4">
                {/* Phone Card */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-1">
                    <h3 className="font-semibold text-gray-900 text-sm">Phone</h3>
                    <p className="text-emerald-700 font-semibold">+94 11 234 5678</p>
                    <p className="text-gray-400 text-[11px]">
                      Mon - Fri: 9:00 AM - 6:00 PM (SLT)
                    </p>
                    <p className="text-gray-400 text-[11px]">
                      Sat: 9:00 AM - 1:00 PM (SLT)
                    </p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-1">
                    <h3 className="font-semibold text-gray-900 text-sm">Email</h3>
                    <p className="text-emerald-700 font-semibold">info@lankaratravel.com</p>
                    <p className="text-gray-400 text-[11px]">
                      We usually respond within 24 hours.
                    </p>
                  </div>
                </div>

                {/* Office Location Card */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-1">
                    <h3 className="font-semibold text-gray-900 text-sm">Our Office</h3>
                    <p className="text-gray-600">
                      No. 123, Galle Road,
                      <br />
                      Colombo 03, Sri Lanka
                    </p>
                  </div>
                </div>

                {/* Social Media Links Card */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center shrink-0">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-2">
                    <h3 className="font-semibold text-gray-900 text-sm">Follow Us</h3>
                    <p className="text-emerald-700 font-medium">@lankaratravels</p>
                    <p className="text-gray-400 text-[11px]">
                      Stay updated with our latest offers, travel tips and stories.
                    </p>
                    <div className="flex items-center space-x-3 text-emerald-800 pt-1">
                      <Link href="#" className="hover:text-emerald-600 transition">
                        <Globe className="w-4 h-4" />
                      </Link>
                      <Link href="#" className="hover:text-emerald-600 transition">
                        <MessageCircle className="w-4 h-4" />
                      </Link>
                      <Link href="#" className="hover:text-emerald-600 transition">
                        <Share2 className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative">
              <div className="absolute top-6 right-8 hidden sm:block text-right">
                <span className="font-serif italic text-emerald-800/60 text-xs">
                  We&apos;re just a message away ♡
                </span>
              </div>

              <div className="mb-6">
                <span className="text-[10px] font-semibold text-amber-600 uppercase tracking-widest">
                  ✉ SEND US A MESSAGE
                </span>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mt-1">
                  Get in Touch
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
              </div>

              {/* Status Notifications */}
              {submitted && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  <span>Thank you for your message! We will get back to you soon.</span>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-3">
                  <AlertCircle size={18} className="text-rose-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full pl-9 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-600 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="w-full pl-9 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-600 focus:bg-white transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-gray-700">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+94 77 123 4567"
                        className="w-full pl-9 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-600 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-semibold text-gray-700">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        className="w-full pl-4 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-600 focus:bg-white transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-gray-700">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    required
                    className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-lg text-xs outline-none focus:border-emerald-600 focus:bg-white transition resize-none"
                  />
                </div>

                {/* Attach Files */}
                <div className="border border-dashed border-gray-200 rounded-lg p-4 bg-gray-50/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-emerald-700" />
                    <div>
                      <p className="text-xs font-medium text-gray-700">
                        Attach Files (Optional)
                      </p>
                      <p className="text-[10px] text-gray-400">
                        You can upload images or documents (max 5MB).
                      </p>
                    </div>
                  </div>
                  <label className="cursor-pointer bg-white border border-gray-200 hover:border-emerald-600 text-gray-700 text-xs px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5 text-gray-500" /> Choose File
                    <input type="file" className="hidden" />
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-900 hover:bg-emerald-950 text-white font-semibold py-3 px-6 rounded-lg text-xs transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Map & FAQ Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
            {/* Map Block */}
            <div className="lg:col-span-5 bg-emerald-50/40 rounded-2xl p-4 border border-emerald-100/60 overflow-hidden relative min-h-[360px] flex flex-col justify-between">
              {/* Map Visual */}
              <div className="relative w-full h-80 rounded-xl overflow-hidden bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
                  alt="Colombo Map Location"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-emerald-900/10" />

                {/* Map Pin Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-900 text-white text-xs px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 border border-emerald-700">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="font-bold text-[11px] leading-tight">Our Office</p>
                    <p className="text-[9px] text-emerald-100">
                      No. 123, Galle Road, Colombo 03
                    </p>
                  </div>
                </div>

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-serif italic text-emerald-900 shadow">
                  Find us on the map ♡
                </div>
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-gray-900 text-lg">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-xs text-gray-500">
                    Quick answers to common questions.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-100 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-4 flex items-center justify-between text-xs font-semibold text-gray-800 hover:bg-gray-50 transition"
                    >
                      <span>{faq.question}</span>
                      <ChevronRight
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          openFaq === idx ? "rotate-90 text-emerald-700" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-50 pt-2 bg-gray-50/30">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="#"
                  className="text-xs text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  View All FAQs →
                </Link>
              </div>
            </div>
          </div>

          {/* Banner Promo Card */}
          <div className="relative rounded-2xl overflow-hidden p-8 md:p-12 text-white bg-slate-900 flex flex-col md:flex-row items-center justify-between">
            <Image
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
              alt="Beach Sri Lanka"
              fill
              className="object-cover opacity-40"
            />
            <div className="relative z-10 space-y-2 max-w-lg">
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">
                READY FOR YOUR NEXT ADVENTURE?
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold">
                Discover the Beauty of Sri Lanka
              </h3>
              <p className="text-xs text-gray-200">
                Explore breathtaking destinations, rich culture and unforgettable experiences with Lankara Travels.
              </p>
            </div>
            <div className="relative z-10 mt-6 md:mt-0 flex flex-col items-end gap-2">
              <Link
                href="#"
                className="bg-amber-400 hover:bg-amber-500 text-gray-900 text-xs font-semibold px-6 py-3 rounded-full transition flex items-center gap-1 shadow-md"
              >
                Plan Your Trip <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <span className="font-serif italic text-xs text-white/80">
                Same island. Different stories ♡
              </span>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}