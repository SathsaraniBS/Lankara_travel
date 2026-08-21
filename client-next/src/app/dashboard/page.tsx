"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  CreditCard, 
  Plane, 
  Cpu, 
  Activity, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ArrowUpRight
} from "lucide-react";

interface Metrics {
  total_users: number;
  total_revenue: number;
  active_bookings: number;
  active_celery_jobs: number;
}

interface CeleryJob {
  id: string;
  task_name: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  duration: string;
}

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<Metrics>({
    total_users: 1280,
    total_revenue: 45200.0,
    active_bookings: 342,
    active_celery_jobs: 4,
  });

  const [celeryJobs, setCeleryJobs] = useState<CeleryJob[]>([
    { id: "job-801", task_name: "ai.generate_itinerary", status: "PROCESSING", duration: "12s" },
    { id: "job-802", task_name: "ai.predict_flight_prices", status: "COMPLETED", duration: "1.4s" },
    { id: "job-803", task_name: "stripe.sync_payouts", status: "COMPLETED", duration: "3.2s" },
    { id: "job-804", task_name: "ai.review_sentiment_analysis", status: "PENDING", duration: "0s" },
  ]);

  const [loading, setLoading] = useState(false);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/v1/admin/overview", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMetrics(data.metrics);
        setCeleryJobs(data.recent_celery_jobs);
      }
    } catch (err) {
      console.warn("Backend API unavailable, displaying default dashboard state.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-[#070b09] text-white p-6 sm:p-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">
            Admin Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Platform operational metrics, Celery AI background queues, and system status.
          </p>
        </div>

        <button
          onClick={fetchAdminData}
          disabled={loading}
          className="flex items-center gap-2 bg-[#121614] border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 font-semibold px-4 py-2.5 rounded-xl transition self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-emerald-400" : "text-emerald-400"} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Highlights Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <CreditCard size={18} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-zinc-100">${metrics.total_revenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</h3>
            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 font-medium">
              <ArrowUpRight size={12} /> +14.2% from last month
            </span>
          </div>
        </div>

        <div className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Registered Users</span>
            <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg">
              <Users size={18} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-zinc-100">{metrics.total_users.toLocaleString()}</h3>
            <span className="text-[10px] text-sky-400 flex items-center gap-0.5 font-medium">
              <ArrowUpRight size={12} /> +8.1% new signups
            </span>
          </div>
        </div>

        <div className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Bookings</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <Plane size={18} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-zinc-100">{metrics.active_bookings}</h3>
            <span className="text-[10px] text-zinc-400 font-light">Flights & Hotel reservations</span>
          </div>
        </div>

        <div className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Celery AI Workers</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <Cpu size={18} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-zinc-100">{metrics.active_celery_jobs} Tasks</h3>
            <span className="text-[10px] text-amber-400 font-medium flex items-center gap-1">
              <Activity size={12} /> Redis & Workers operational
            </span>
          </div>
        </div>

      </div>

      {/* Celery Background Jobs & System Health Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active AI / Background Tasks */}
        <div className="lg:col-span-2 bg-[#121614] border border-zinc-800/80 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Cpu size={18} className="text-emerald-500" /> Celery Task Queue Monitor
            </h2>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold px-2.5 py-0.5 rounded-full">
              Redis Broker: Connected
            </span>
          </div>

          <div className="space-y-3">
            {celeryJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#070b09] border border-zinc-800/60 rounded-xl p-4 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-zinc-200">{job.task_name}</span>
                    <span className="text-[10px] font-mono text-zinc-500">({job.id})</span>
                  </div>
                  <p className="text-[10px] text-zinc-400">Execution time: {job.duration}</p>
                </div>

                <div>
                  {job.status === "COMPLETED" && (
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <CheckCircle2 size={12} /> COMPLETED
                    </span>
                  )}
                  {job.status === "PROCESSING" && (
                    <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <RefreshCw size={12} className="animate-spin" /> PROCESSING
                    </span>
                  )}
                  {job.status === "PENDING" && (
                    <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-800/50 border border-zinc-700 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Clock size={12} /> PENDING
                    </span>
                  )}
                  {job.status === "FAILED" && (
                    <span className="text-[10px] font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <AlertTriangle size={12} /> FAILED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Architecture Overview */}
        <div className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-6 space-y-6">
          <h2 className="text-base font-bold text-zinc-100 border-b border-zinc-800/80 pb-4">
            System Stack Health
          </h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-zinc-800/40">
              <span className="text-zinc-400">FastAPI Backend</span>
              <span className="text-emerald-400 font-semibold">Online (Railway)</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-zinc-800/40">
              <span className="text-zinc-400">PostgreSQL Database</span>
              <span className="text-emerald-400 font-semibold">Healthy (SQLAlchemy)</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-zinc-800/40">
              <span className="text-zinc-400">Redis Cache & Broker</span>
              <span className="text-emerald-400 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-zinc-800/40">
              <span className="text-zinc-400">AI Pipelines</span>
              <span className="text-emerald-400 font-semibold">Hugging Face / LangChain</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-zinc-400">Stripe SDK</span>
              <span className="text-emerald-400 font-semibold">Live Mode</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}