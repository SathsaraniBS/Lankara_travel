"use client";

import axios, { AxiosError } from "axios";
import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // ← adjust path to your Next.js project structure

interface RegisterResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
  };
}

interface ErrorResponse {
  message?: string;
}

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth(); // ← gets the login function from context

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Register the user
      const res = await axios.post<RegisterResponse>(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      // 2. Automatically log the user in after successful signup
      login(res.data.token, res.data.user);

      // 3. Redirect based on role
      if (res.data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/user/dashboard");
      }
    } catch (err) {
      const axiosErr = err as AxiosError<ErrorResponse>;
      setError(
        axiosErr.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: "#000000",
      color: "#ffffff",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1.5rem",
    }}>
      <div style={{
        border: "2px solid #f97316",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        padding: "2rem",
        borderRadius: "0.5rem",
        width: "100%",
        maxWidth: "28rem",
        backgroundColor: "#111827",
      }}>
        <h2 style={{
          fontSize: "2.25rem",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "2rem",
        }}>
          Create Account
        </h2>

        {error && (
          <div style={{
            backgroundColor: "#7f1d1d",
            color: "#ffffff",
            padding: "0.75rem",
            borderRadius: "0.375rem",
            marginBottom: "1rem",
            textAlign: "center",
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{
              display: "block",
              fontSize: "1.125rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "0.5rem",
                color: "#ffffff",
                outline: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#ef4444")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#374151")}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label style={{
              display: "block",
              fontSize: "1.125rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "0.5rem",
                color: "#ffffff",
                outline: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#ef4444")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#374151")}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label style={{
              display: "block",
              fontSize: "1.125rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "0.5rem",
                color: "#ffffff",
                outline: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#ef4444")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#374151")}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: loading ? "#991b1b" : "#dc2626",
              color: "#ffffff",
              fontWeight: 700,
              padding: "1rem",
              borderRadius: "0.5rem",
              fontSize: "1.25rem",
              transition: "background-color 0.2s",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#b91c1c";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#dc2626";
            }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#9ca3af" }}>
          Already have an account?{" "}
          <Link
            href="/login"
            style={{ color: "#ef4444", fontWeight: 700, textDecoration: "none" }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}