import React from "react";
import { Heart, Code2 } from "lucide-react";

function Footer() {
  return (
    <footer className="relative bg-[#070A12] border-t border-slate-800/80 text-slate-400 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-24 bg-blue-950/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              LMS<span className="text-blue-500">.</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 font-normal text-center">
            <span>© 2026 LMS | Built with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline shrink-0 animate-pulse" />
            <span>using MERN Stack</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
            <span>Active & Running</span>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;