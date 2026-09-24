import React from "react";
import { Star, Quote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "MERN Developer",
    avatarBg: "from-purple-600 to-indigo-600",
    review:
      "The MERN course completely changed my coding skills. The projects were amazing and interview-focused.",
  },
  {
    name: "Priya Singh",
    role: "AI Engineer",
    avatarBg: "from-pink-600 to-rose-600",
    review:
      "The AI roadmap was well structured. I landed my internship after completing the projects.",
  },
  {
    name: "Aman Verma",
    role: "Cloud Engineer",
    avatarBg: "from-cyan-600 to-blue-600",
    review:
      "Best learning platform! The mentors explained every concept clearly with real-world examples.",
  },
];

function Testimonials() {
  return (
    <section className="relative bg-[#070A12] py-20 sm:py-24 overflow-hidden border-b border-slate-800/80">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-blue-950/20 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/60 backdrop-blur-md mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
              Student Stories
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            What Our{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-300 bg-clip-text text-transparent">
              Students Say
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Trusted by thousands of learners accelerating their engineering careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-14 sm:mt-16">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/95 border border-slate-800 hover:border-blue-700/60 rounded-2xl p-7 sm:p-8 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_45px_rgba(29,78,216,0.18)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  {/* Warm Gold Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Colorful Quote Icon Tint */}
                  <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Quote className="w-4 h-4 rotate-180" />
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                  "{item.review}"
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${item.avatarBg} border border-white/20 flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h3 className="text-white font-bold text-sm sm:text-base tracking-tight group-hover:text-blue-200 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;