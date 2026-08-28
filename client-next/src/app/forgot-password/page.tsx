"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/forgot-password", { email });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat px-4 py-12"
      style={{
        backgroundImage: "url('/images/backimage1.jpg')",
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 backdrop-brightness-90" />

      {/* Glassmorphic Form Container */}
      <div className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl text-white">
        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
          <Mail className="w-6 h-6 text-sky-300" />
        </div>

        <h1 className="text-3xl font-bold mb-1 drop-shadow-md">
          Forgot your password?
        </h1>
        <p className="text-gray-200 text-sm mb-6">
          Enter your email and we will send you a reset link.
        </p>

        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-sm flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-300 mb-1">Email Sent!</p>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                If an account with that email exists, a password reset link has been sent.
                Please check your inbox or developer terminal during testing.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/20 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2.5 rounded-xl transition shadow-lg disabled:opacity-50 mt-2 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-300 mt-6">
          Remembered your password?{" "}
          <Link href="/login" className="text-sky-300 font-semibold hover:underline cursor-pointer">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}