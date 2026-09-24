import React from "react";
import {
  Code2,
  BrainCircuit,
  Cloud,
  Database,
  Smartphone,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    title: "Development",
    count: "120+ courses",
    icon: <Code2 className="w-6 h-6 text-purple-400" />,
    iconBg: "bg-purple-500/15 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.25)]",
    glow: "group-hover:bg-purple-500/10",
  },
  {
    title: "Data Science",
    count: "95+ courses",
    icon: <Database className="w-6 h-6 text-emerald-400" />,
    iconBg: "bg-emerald-500/15 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.25)]",
    glow: "group-hover:bg-emerald-500/10",
  },
  {
    title: "AI & ML",
    count: "80+ courses",
    icon: <BrainCircuit className="w-6 h-6 text-pink-400" />,
    iconBg: "bg-pink-500/15 border-pink-500/30 shadow-[0_0_15px_rgba(244,63,94,0.25)]",
    glow: "group-hover:bg-pink-500/10",
  },
  {
    title: "Design & UI",
    count: "70+ courses",
    icon: <Sparkles className="w-6 h-6 text-amber-400" />,
    iconBg: "bg-amber-500/15 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.25)]",
    glow: "group-hover:bg-amber-500/10",
  },
  {
    title: "Business",
    count: "60+ courses",
    icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
    iconBg: "bg-blue-500/15 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.25)]",
    glow: "group-hover:bg-blue-500/10",
  },
  {
    title: "Cloud Computing",
    count: "65+ courses",
    icon: <Cloud className="w-6 h-6 text-cyan-400" />,
    iconBg: "bg-cyan-500/15 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.25)]",
    glow: "group-hover:bg-cyan-500/10",
  },
  {
    title: "Mobile Dev",
    count: "45+ courses",
    icon: <Smartphone className="w-6 h-6 text-teal-400" />,
    iconBg: "bg-teal-500/15 border-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.25)]",
    glow: "group-hover:bg-teal-500/10",
  },
  {
    title: "Cyber Security",
    count: "50+ courses",
    icon: <ShieldCheck className="w-6 h-6 text-rose-400" />,
    iconBg: "bg-rose-500/15 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.25)]",
    glow: "group-hover:bg-rose-500/10",
  },
];

function Categories() {
  return (
    <section className="relative bg-[#070A12] py-16 sm:py-20 border-b border-slate-800/80 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-28 bg-blue-950/20 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Explore Top Categories
              </h2>
              <ChevronRight className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Discover in-demand skills and grow your career.
            </p>
          </div>

          <button className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5">
          {categories.map((item, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800 hover:border-blue-700/60 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(29,78,216,0.18)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group overflow-hidden"
            >
              <div
                className={`absolute -top-10 -right-10 w-20 h-20 rounded-full blur-xl transition-all duration-500 pointer-events-none ${item.glow}`}
              />

              <div
                className={`w-13 h-13 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border mb-3.5 transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}
              >
                {item.icon}
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors line-clamp-1">
                {item.title}
              </h3>

              <p className="text-[11px] text-slate-400 mt-1 font-medium">
                {item.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;