"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post("/auth/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      router.push("/");
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Incorrect email or password");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat px-4 py-12"
      style={{
        // Place your background image (e.g. scenic Ella train image) in public/images/bg.jpg
        backgroundImage: "url('/images/backimage1.jpg')",
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/30 backdrop-brightness-90" />

      {/* Glassmorphic Form Container */}
      <div className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl text-white">
        <h1 className="text-3xl font-bold text-center mb-1 drop-shadow-md">
          Welcome Back
        </h1>
        <p className="text-center text-gray-200 text-sm mb-6">
          Login to Lankara Travel and start planning your trip
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white/20 transition"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-200 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-sky-500 w-4 h-4 rounded" />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-sky-300 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2.5 rounded-xl transition shadow-lg disabled:opacity-50 mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-sky-300 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}