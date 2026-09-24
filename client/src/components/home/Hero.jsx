import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  BrainCircuit,
  Rocket,
  CheckCircle2,
  Star,
  Terminal,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#070A12] text-slate-100 min-h-[calc(100vh-5rem)] flex items-center py-8 sm:py-12 lg:py-14">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -right-28 w-[480px] h-[480px] bg-blue-900/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[420px] h-[420px] bg-indigo-950/30 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle Micro-Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Compact Viewport Typography & Action Buttons */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-blue-950/80 border border-blue-700/40 backdrop-blur-xl shadow-[0_0_20px_rgba(29,78,216,0.25)]">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <Rocket className="w-3 h-3 text-amber-400" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold tracking-wide text-blue-200">
                Industry-Grade Engineering Cohorts
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mt-4 tracking-tight leading-[1.12] text-white">
              Master Modern Tech. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(6,182,212,0.35)]">
                Build Production Systems.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3.5 sm:mt-4 text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal">
              Skip surface-level tutorials. Learn full-stack system architecture, scalable backend microservices, and AI integrations with 1:1 expert code reviews.
            </p>

            {/* Feature Checkpoints */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-4 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5 bg-slate-900/70 border border-slate-800/80 px-2.5 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Capstone Projects</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/70 border border-slate-800/80 px-2.5 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verified Credentials</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/70 border border-slate-800/80 px-2.5 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Industry Mentors</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 mt-6 w-full sm:w-auto">
              <Link
                to="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 border border-blue-400/30 transition-all duration-300 shadow-[0_0_25px_rgba(29,78,216,0.45)] hover:shadow-[0_0_35px_rgba(29,78,216,0.6)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore All Tracks</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <Link
                to="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/60 backdrop-blur-md transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                Start Learning Free
              </Link>
            </div>

            {/* Social Proof Trust Badge */}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-slate-800/80">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                  Y
                </div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 border border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                  A
                </div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-600 border border-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                  R
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-white ml-1">4.9/5</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Trusted by developers from top tech campuses
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Terminal Card with Dark Red Border */}
          <div className="lg:col-span-5 w-full flex justify-center items-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-blue-700/15 to-indigo-800/10 rounded-3xl blur-2xl transform rotate-2 scale-95 pointer-events-none" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-full max-w-md bg-gradient-to-b from-[#0D1322]/95 to-[#070A12]/95 border-2 border-red-600/80 rounded-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(220,38,38,0.2)] backdrop-blur-xl relative z-10"
            >
              {/* Terminal Window Header with Subtle Dark Red Separator */}
              <div className="flex items-center justify-between pb-4 border-b border-red-950/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Code className="w-4 h-4 text-cyan-400" />
                  <span>bash — dev-session</span>
                </div>
              </div>

              {/* Code Snippet Mockup */}
              <div className="mt-5 font-mono text-xs sm:text-sm space-y-2.5 leading-relaxed text-slate-400">
                <p>
                  <span className="text-purple-400">const</span> developer ={" "}
                  <span className="text-amber-300">new Engineer</span>();
                </p>
                <p className="text-slate-500">// Mastering scalable modules...</p>
                <p>
                  <span className="text-purple-400">await</span> developer.
                  <span className="text-cyan-300">deploy</span>([
                  <span className="text-emerald-300">"MERN"</span>,{" "}
                  <span className="text-pink-300">"AI"</span>,{" "}
                  <span className="text-blue-300">"System-Design"</span>]);
                </p>
                <p className="text-emerald-400 pt-1 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Status: Ready for Production</span>
                </p>
              </div>

              {/* Status Widget */}
              <div className="mt-6 pt-5 border-t border-slate-800/90 flex items-center justify-between bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xs font-semibold text-slate-200">Core Track:</h2>
                    <p className="text-[11px] text-slate-400 mt-0.5">Distributed Architecture</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-300 bg-blue-950/80 px-3 py-1.5 rounded-md border border-blue-800/70">
                  Enrolling
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;