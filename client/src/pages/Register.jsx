import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // TODO: connect to a backend /register endpoint once it exists.
    // fetch("http://127.0.0.1:8000/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });

    console.log("Register form submitted:", formData);
  };

  return (
    <div
      className="relative min-h-screen w-full flex justify-center items-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/images/backimage2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20
        rounded-2xl p-8 w-full max-w-[420px] flex flex-col gap-4 shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-white text-center">
          Create Account
        </h1>
        <p className="text-center text-white/70 mb-2">
          Join Ceylon Compass and start planning your trip
        </p>

        {error && (
          <p className="text-red-400 text-sm text-center -mt-2">{error}</p>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="fullName" className="text-sm text-white/90 font-medium">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="bg-white/10 border border-white/30 text-white placeholder-white/50
            rounded-lg px-4 py-2 outline-none
            focus:border-[#79a7c5] focus:bg-white/20 transition-all duration-200"
            placeholder="Your full name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm text-white/90 font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-white/10 border border-white/30 text-white placeholder-white/50
            rounded-lg px-4 py-2 outline-none
            focus:border-[#79a7c5] focus:bg-white/20 transition-all duration-200"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm text-white/90 font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            className="bg-white/10 border border-white/30 text-white placeholder-white/50
            rounded-lg px-4 py-2 outline-none
            focus:border-[#79a7c5] focus:bg-white/20 transition-all duration-200"
            placeholder="At least 8 characters"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="text-sm text-white/90 font-medium">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={8}
            className="bg-white/10 border border-white/30 text-white placeholder-white/50
            rounded-lg px-4 py-2 outline-none
            focus:border-[#79a7c5] focus:bg-white/20 transition-all duration-200"
            placeholder="Re-enter your password"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-full py-2.5 text-lg font-semibold cursor-pointer
          bg-[#79a7c5] text-white border-2 border-[#79a7c5]
          transition-all duration-300 ease-in-out
          hover:bg-white hover:text-[#79a7c5]"
        >
          Register
        </button>

        <p className="text-center text-sm text-white/70 mt-2">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-[#79a7c5] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;