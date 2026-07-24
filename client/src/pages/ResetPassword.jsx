// src/pages/ResetPassword.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { Lock, Eye, EyeOff, Mail, ArrowLeft } from "lucide-react";
import axios from "axios";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    const { addToast } = useToast();
    const navigate = useNavigate();

    // ── Step 1: Verify Email ──────────────────
    const handleSendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(
                "http://localhost:5000/api/auth/forgot-password",
                { email }
            );
            addToast("Email verified! Enter your new password.", "success");
            setStep(2);
        } catch (err) {
            const errorData = err.response?.data?.detail;
            const message = typeof errorData === 'string'
                ? errorData
                : "No account found with this email.";
            addToast(message, "error");
        } finally {
            setLoading(false);
        }
    };

    // ── Step 2: Reset Password ────────────────
    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword.length < 6) {
            addToast("Password must be at least 6 characters", "error");
            return;
        }

        if (newPassword !== confirmPassword) {
            addToast("Passwords do not match", "error");
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                `http://localhost:5000/api/auth/reset-password`,
                {
                    email: email,
                    new_password: newPassword
                }
            );
            addToast("Password reset successful! Please login.", "success");
            navigate("/login");
        } catch (err) {
            const errorData = err.response?.data?.detail;
            const message = typeof errorData === 'string'
                ? errorData
                : "Reset failed. Please try again.";
            addToast(message, "error");
            console.error("Reset Error:", err.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
            <div className="border-2 border-orange-500 shadow-2xl rounded-xl bg-gray-900/80 backdrop-blur-sm p-8 max-w-md w-full relative z-10">

                {/* ── Logo & Title ── */}
                <h1 className="text-3xl font-bold text-center mb-2 tracking-wide text-white">
                    FitTrack
                </h1>
                <h2 className="text-2xl font-bold text-center mt-2 text-orange-500">
                    Reset Password
                </h2>
                <p className="text-center text-gray-400 mt-2 text-sm">
                    {step === 1
                        ? "Enter your email to verify your account."
                        : "Enter your new password below."}
                </p>

                {/* ── Step Indicator ── */}
                <div className="flex items-center justify-center gap-3 mt-6 mb-8">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${step === 1
                            ? 'bg-orange-500 text-white'
                            : 'bg-orange-500/30 text-orange-400'}`}>
                        1
                    </div>
                    <div className="w-12 h-0.5 bg-gray-700">
                        <div className={`h-full transition-all duration-500
                            ${step === 2 ? 'bg-orange-500 w-full' : 'w-0'}`}
                        />
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${step === 2
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-800 text-gray-500'}`}>
                        2
                    </div>
                </div>

                {/* ── STEP 1: Email Form ── */}
                {step === 1 && (
                    <form onSubmit={handleSendEmail} className="space-y-6">
                        <div>
                            <label className="block text-lg font-medium mb-2">Email</label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-3.5 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition placeholder-gray-500"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl rounded-lg transition transform hover:scale-105 disabled:opacity-60 disabled:transform-none flex justify-center items-center"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Checking...
                                </span>
                            ) : "Verify Email"}
                        </button>
                    </form>
                )}

                {/* ── STEP 2: New Password Form ── */}
                {step === 2 && (
                    <form onSubmit={handleResetPassword} className="space-y-5">
                        {/* Back button */}
                        <button
                            type="button"
                            onClick={() => {
                                setStep(1);
                                setNewPassword('');
                                setConfirmPassword('');
                                setShowPassword(false);
                            }}
                            className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition text-sm mb-2"
                        >
                            <ArrowLeft size={16} /> Back
                        </button>

                        <div>
                            <label className="block text-lg font-medium mb-2">New Password</label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-3.5 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition placeholder-gray-500"
                                    placeholder="Min. 6 characters"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-medium mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-3.5 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition placeholder-gray-500"
                                    placeholder="Repeat new password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 mt-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl rounded-lg transition transform hover:scale-105 disabled:opacity-60 disabled:transform-none flex justify-center items-center"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Resetting...
                                </span>
                            ) : "Reset Password"}
                        </button>
                    </form>
                )}

                {/* ── Back to Login ── */}
                <p className="text-center text-gray-400 mt-6">
                    Remember your password?{" "}
                    <Link
                        to="/login"
                        className="text-orange-400 font-semibold hover:underline"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;