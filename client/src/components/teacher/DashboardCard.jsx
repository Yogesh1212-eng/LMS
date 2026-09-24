import React from "react";
import { BookOpen, Users, Video, IndianRupee } from "lucide-react";

function DashboardCard({ title, value, color }) {
  // Colorful dynamic icon & ambient badge mapping based on title
  const getMeta = () => {
    switch (title?.toLowerCase()) {
      case "courses":
        return {
          icon: <BookOpen className="w-5 h-5 text-purple-400" />,
          badge: "bg-purple-500/15 border-purple-500/30 text-purple-300",
          glow: "hover:border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.15)]",
        };
      case "students":
        return {
          icon: <Users className="w-5 h-5 text-cyan-400" />,
          badge: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",
          glow: "hover:border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]",
        };
      case "lectures":
        return {
          icon: <Video className="w-5 h-5 text-emerald-400" />,
          badge: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
          glow: "hover:border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]",
        };
      case "revenue":
        return {
          icon: <IndianRupee className="w-5 h-5 text-amber-400" />,
          badge: "bg-amber-500/15 border-amber-500/30 text-amber-300",
          glow: "hover:border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)]",
        };
      default:
        return {
          icon: <BookOpen className="w-5 h-5 text-blue-400" />,
          badge: "bg-blue-500/15 border-blue-500/30 text-blue-300",
          glow: "hover:border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]",
        };
    }
  };

  const meta = getMeta();

  return (
    <div
      className={`group relative rounded-2xl p-6 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/95 border border-slate-800 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden ${meta.glow}`}
    >
      {/* Subtle Corner Glow */}
      <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none bg-blue-500" />

      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          {title}
        </span>
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${meta.badge}`}
        >
          {meta.icon}
        </div>
      </div>

      <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
        {value}
      </h2>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span>Updated live</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>
    </div>
  );
}

export default DashboardCard;