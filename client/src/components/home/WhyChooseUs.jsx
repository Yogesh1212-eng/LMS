import React from "react";
import {
  GraduationCap,
  Users,
  BadgeCheck,
  Infinity,
  Briefcase,
  Laptop,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <GraduationCap className="w-8 h-8 text-purple-400" />,
    box: "bg-purple-500/15 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.25)]",
    title: "Expert Mentors",
    desc: "Learn from experienced industry professionals.",
  },
  {
    icon: <Laptop className="w-8 h-8 text-cyan-400" />,
    box: "bg-cyan-500/15 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.25)]",
    title: "Live + Recorded",
    desc: "Attend live classes or learn anytime with recordings.",
  },
  {
    icon: <Infinity className="w-8 h-8 text-pink-400" />,
    box: "bg-pink-500/15 border-pink-500/30 shadow-[0_0_20px_rgba(244,63,94,0.25)]",
    title: "Lifetime Access",
    desc: "One purchase, unlimited learning forever.",
  },
  {
    icon: <BadgeCheck className="w-8 h-8 text-emerald-400" />,
    box: "bg-emerald-500/15 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    title: "Certificates",
    desc: "Get verified certificates after course completion.",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-amber-400" />,
    box: "bg-amber-500/15 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.25)]",
    title: "Placement Support",
    desc: "Resume review, interview prep & career guidance.",
  },
  {
    icon: <Users className="w-8 h-8 text-blue-400" />,
    box: "bg-blue-500/15 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.25)]",
    title: "Community",
    desc: "Connect with thousands of learners and mentors.",
  },
];

function WhyChooseUs() {
  return (
    <section className="relative bg-[#070A12] py-20 sm:py-24 overflow-hidden border-b border-slate-800/80">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-blue-950/20 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/60 backdrop-blur-md mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
              Core Advantages
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-300 bg-clip-text text-transparent">
              LMS?
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Everything you need to master modern skills and become industry-ready from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-14 sm:mt-16">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/95 border border-slate-800 hover:border-blue-700/60 rounded-2xl p-7 sm:p-8 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_45px_rgba(29,78,216,0.18)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Colorful Neon Icon Box */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-300 mb-6 ${item.box}`}>
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-sm sm:text-base mt-2.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 group-hover:text-blue-400 transition-colors">
                  Included in all plans
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;