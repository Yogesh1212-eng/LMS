import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#070A12] text-slate-100 relative overflow-x-hidden selection:bg-blue-600/30 selection:text-blue-200">
      {/* Ambient Radial Lights across public pages */}
      <div className="fixed -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-900/15 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-20 right-10 w-[400px] h-[400px] bg-pink-950/15 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Fixed Header */}
      <Navbar />

      {/* Page Body with proper spacing for fixed navbar */}
      <main className="flex-1 pt-20 relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MainLayout;