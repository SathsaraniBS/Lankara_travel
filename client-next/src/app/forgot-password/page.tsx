"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { Mail } from "lucide-react";

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
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4">
          <Mail className="w-6 h-6 text-orange-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Forgot your password?
        </h1>
        <p className="text-gray-500 mb-6">
          Enter your email and we will send you a reset link.
        </p>

        {submitted ? (
          <div className="p-4 rounded-lg bg-green-50 text-green-700 text-sm">
            If an account with that email exists, a password reset link has
            been sent. Please check the developer console (backend terminal)
            for the reset link during testing.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white font-semibold py-2.5 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Remembered your password?{" "}
          <Link href="/login" className="text-orange-500 font-semibold hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}