"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // API integration / async call simulation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form Submitted:", formData);
    setLoading(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-16 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
            Get in Touch
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Have questions or need help planning your trip to Sri Lanka? Send us a message and we will respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Information */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-emerald-400 mb-6">
                Contact Details
              </h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-300">Location</h3>
                    <p className="text-slate-400 text-sm">Colombo, Sri Lanka</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-300">Email</h3>
                    <p className="text-slate-400 text-sm">info@lankaratravel.com</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-300">Phone</h3>
                    <p className="text-slate-400 text-sm">+94 11 234 5678</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <p className="text-xs text-slate-400 leading-relaxed">
                Operating Hours: Mon - Fri (8:00 AM - 6:00 PM IST)
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            {submitted && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm flex items-center gap-3">
                <CheckCircle2 size={20} className="shrink-0" />
                <span>Thank you for your message! We will get back to you soon.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Type your message here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition duration-200 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}