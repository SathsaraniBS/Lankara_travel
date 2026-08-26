"use client";

import React, { useState } from "react";
import { 
  Users, 
  CreditCard, 
  Calendar, 
  Cpu, 
  TrendingUp, 
  Search, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  RefreshCw
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"users" | "bookings">("users");

  const stats = [
    { title: "Total Users", value: "2,845", change: "+12.5%", icon: Users, color: "text-sky-400", bg: "bg-sky-500/10" },
    { title: "Total Revenue", value: "$84,230", change: "+18.2%", icon: CreditCard, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "Active Bookings", value: "312", change: "+4.1%", icon: Calendar, color: "text-purple-400", bg: "bg-purple-500/10" },
    { title: "AI/Background Tasks", value: "8 Active", change: "Celery Healthy", icon: Cpu, color: "text-amber-400", bg: "bg-amber-500/10" },
  ];

  const recentUsers = [
    { id: "usr_1", name: "Alex Morgan", email: "alex@example.com", role: "Customer", status: "Active", joined: "2026-08-20" },
    { id: "usr_2", name: "Sarah Chen", email: "sarah@example.com", role: "Customer", status: "Active", joined: "2026-08-22" },
    { id: "usr_3", name: "David Miller", email: "david@example.com", role: "Admin", status: "Active", joined: "2026-08-15" },
  ];

  const recentBookings = [
    { id: "bk_101", user: "Alex Morgan", type: "Holiday Package", item: "Ella & Hill Country Express", amount: "$350", status: "Confirmed" },
    { id: "bk_102", user: "Sarah Chen", type: "Hotel Stay", item: "Heritance Kandalama", amount: "$540", status: "Pending" },
    { id: "bk_103", user: "Michael Scott", type: "Holiday Package", item: "Southern Coastal Sunset", amount: "$480", status: "Confirmed" },
  ];

  return (
    <div className="min-h-screen bg-[#070b09] text-white p-6 sm:p-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">
            System Administration
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Monitor platform metrics, user accounts, celery queues, and real-time bookings.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-[#121614] border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 font-semibold px-4 py-2.5 rounded-xl transition self-start sm:self-auto">
          <RefreshCw size={14} className="text-emerald-400" />
          <span>Sync Realtime Data</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{stat.title}</span>
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={18} />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-zinc-100">{stat.value}</h3>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                <TrendingUp size={12} /> {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Data Section */}
      <div className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-6 space-y-6">
        
        {/* Navigation Tabs & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("users")}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
                activeTab === "users"
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-[#070b09] text-zinc-400 border border-zinc-800 hover:border-zinc-700"
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
                activeTab === "bookings"
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-[#070b09] text-zinc-400 border border-zinc-800 hover:border-zinc-700"
              }`}
            >
              Recent Bookings
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-3 text-zinc-500" />
            <input
              type="text"
              placeholder="Search records..."
              className="w-full bg-[#070b09] border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Tab 1: Users Table */}
        {activeTab === "users" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800/60 text-zinc-500 uppercase tracking-wider font-semibold">
                  <th className="pb-3 px-2">User</th>
                  <th className="pb-3 px-2">Role</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2">Joined Date</th>
                  <th className="pb-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
                {recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-800/20 transition">
                    <td className="py-3 px-2">
                      <div>
                        <p className="font-bold text-zinc-100">{user.name}</p>
                        <p className="text-[10px] text-zinc-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-medium">{user.role}</td>
                    <td className="py-3 px-2">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md text-[10px] font-bold">
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-zinc-400">{user.joined}</td>
                    <td className="py-3 px-2 text-right">
                      <button className="text-zinc-500 hover:text-white p-1">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Bookings Table */}
        {activeTab === "bookings" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800/60 text-zinc-500 uppercase tracking-wider font-semibold">
                  <th className="pb-3 px-2">Booking ID</th>
                  <th className="pb-3 px-2">Customer</th>
                  <th className="pb-3 px-2">Type / Package</th>
                  <th className="pb-3 px-2">Amount</th>
                  <th className="pb-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
                {recentBookings.map((bk) => (
                  <tr key={bk.id} className="hover:bg-zinc-800/20 transition">
                    <td className="py-3 px-2 font-mono text-zinc-400">{bk.id}</td>
                    <td className="py-3 px-2 font-bold text-zinc-100">{bk.user}</td>
                    <td className="py-3 px-2">
                      <div>
                        <p className="font-medium text-zinc-200">{bk.item}</p>
                        <p className="text-[10px] text-zinc-500">{bk.type}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-black text-emerald-400">{bk.amount}</td>
                    <td className="py-3 px-2">
                      {bk.status === "Confirmed" ? (
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 w-fit">
                          <CheckCircle2 size={10} /> Confirmed
                        </span>
                      ) : (
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 w-fit">
                          <Clock size={10} /> Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}