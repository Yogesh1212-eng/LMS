import React from "react";
import { Bell, Search, Sparkles } from "lucide-react";

function Topbar() {
  return (
    <header className="h-20 bg-[#070A12]/90 backdrop-blur-xl border-b border-slate-800/80 flex items-center justify-between px-6 sm:px-8 relative z-20">
      {/* Bottom Glowing Subtle Accent Line */}
      <div className="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-600/40 to-transparent pointer-events-none" />

      {/* Left Title with Sparkle Indicator */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-950/70 border border-blue-800/60 flex items-center justify-center text-blue-400 hidden sm:flex shadow-inner">
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
            Student Dashboard
          </h2>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            Welcome back! Track your daily learning & modules.
          </p>
        </div>
      </div>

      {/* Right Controls: Notifications & User Avatar */}
      <div className="flex items-center gap-4">
        {/* Quick Search Shortcut Mock */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span>Quick search...</span>
          <kbd className="ml-2 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300">
            ⌘K
          </kbd>
        </div>

        {/* Bell Icon with Red Alert Dot */}
        <button className="relative w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer">
          <Bell className="w-4 h-4 text-amber-400" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#070A12] animate-pulse" />
        </button>

        {/* User Profile Avatar with Blue Glow */}
        <div className="relative group cursor-pointer">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 border border-blue-400/40 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-[0_0_18px_rgba(29,78,216,0.4)] group-hover:scale-105 transition-transform">
            Y
          </div>
          {/* Active Status Badge */}
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#070A12]" />
        </div>
      </div>
    </header>
  );
}

export default Topbar;