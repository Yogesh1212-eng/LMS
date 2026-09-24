import React from "react";
import { BookOpenText, UsersRound, Award, Star } from "lucide-react";
import { motion } from "framer-motion";

function Stats() {
  const stats = [
    {
      icon: <BookOpenText className="w-7 h-7 text-purple-400" />,
      iconBox: "bg-purple-500/15 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.25)]",
      value: "50+",
      title: "Active Cohorts",
      desc: "Live mentor-led training",
    },
    {
      icon: <UsersRound className="w-7 h-7 text-cyan-400" />,
      iconBox: "bg-cyan-500/15 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.25)]",
      value: "2K+",
      title: "Tech Enrolled",
      desc: "Developing solutions",
    },
    {
      icon: <Award className="w-7 h-7 text-emerald-400" />,
      iconBox: "bg-emerald-500/15 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
      value: "200+",
      title: "Project Certs",
      desc: "Successfully validated",
    },
    {
      icon: <Star className="w-7 h-7 text-amber-400 fill-amber-400" />,
      iconBox: "bg-amber-500/15 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.25)]",
      value: "4.9",
      title: "Course Rating",
      desc: "From peer feedback",
    },
  ];

  return (
    <section className="relative bg-[#070A12] py-16 sm:py-20 overflow-hidden border-y border-slate-800/70">
      {/* Ambient Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-28 bg-blue-950/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative rounded-2xl p-6 sm:p-7 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950/80 border border-slate-800 hover:border-blue-700/60 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_45px_rgba(29,78,216,0.15)] transition-all duration-300 overflow-hidden"
            >
              {/* Colorful Glow on Hover */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-blue-800/0 group-hover:bg-blue-800/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

              {/* Colorful Neon Glass Icon Container */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-300 mb-6 ${item.iconBox}`}>
                {item.icon}
              </div>

              {/* Number */}
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-300 transition-all duration-300">
                {item.value}
              </h2>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-slate-200 mt-2 tracking-wide">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                {item.desc}
              </p>

              {/* Accent Line */}
              <div className="mt-5 w-8 h-1 rounded-full bg-slate-800 group-hover:w-16 group-hover:bg-blue-500 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;