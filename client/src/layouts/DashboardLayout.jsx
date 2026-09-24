import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic Colorful Ambient Lighting */}
      <div className="fixed top-20 right-0 w-[450px] h-[450px] bg-purple-950/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-10 left-10 w-[400px] h-[400px] bg-blue-950/25 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/3 w-[300px] h-[300px] bg-emerald-950/15 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Persistent Glassy Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10 pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;