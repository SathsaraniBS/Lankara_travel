// src/pages/Login.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios"; // ✅ centralized axios instance (no hardcoded localhost)

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", { email, password });

      // Backend returns { token, user: { role, ... } }
      login(res.data.token, res.data.user);

      if (res.data.user.role === "admin") {
        navigate("/admindashboard"); // ✅ Fixed: was "/admin" which has no route
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";
      setError(message);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
      <div className="border-2 border-orange-500 shadow-2xl rounded-xl bg-gray-900/80 backdrop-blur-sm p-8 max-w-md w-full">

        <h2 className="text-4xl font-bold text-center mb-8 text-orange-500">
          Login
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/80 border border-red-600 rounded-lg text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-800 disabled:cursor-not-allowed text-white font-bold text-xl rounded-lg transition transform hover:scale-105"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-400 font-semibold hover:underline">
            Register here
          </Link>
        </p>

        {/* Remember me & Forgot password */}
        <div className="flex justify-between items-center mt-5 text-sm text-gray-400 px-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" className="accent-orange-500 w-4 h-4" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-cyan-400 hover:text-cyan-300 transition">
            Forgot password?
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;