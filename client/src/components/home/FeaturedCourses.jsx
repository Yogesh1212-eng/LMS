import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom"; // <-- Yeh import zaroori hai
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles, Star } from "lucide-react";

function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses();
  }, []);

  async function getCourses() {
    try {
      const res = await api.get("/course");
      setCourses(res.data.courses || []);
      console.log("courses:", res.data.courses);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative bg-[#070A12] py-20 sm:py-24 overflow-hidden border-b border-slate-800/80">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-950/20 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/60 backdrop-blur-md mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
              Top Rated Cohorts
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-300 bg-clip-text text-transparent">
              Courses
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Gain production experience and learn end-to-end architectures from industry leaders.
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-14 sm:mt-16">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-52 bg-slate-800/60" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-slate-800 rounded w-3/4" />
                  <div className="h-4 bg-slate-800/70 rounded w-full" />
                  <div className="h-4 bg-slate-800/70 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-14 sm:mt-16">
            {courses.map((course, index) => (
              <motion.div
                key={course._id || index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/95 border border-slate-800 hover:border-blue-700/60 rounded-2xl overflow-hidden backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_45px_rgba(29,78,216,0.18)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Certified Track</span>
                    </div>

                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-semibold text-amber-300 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>4.9 (Top Rated)</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight line-clamp-1 group-hover:text-blue-300 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-slate-400 mt-2.5 text-sm leading-relaxed line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 block font-medium">
                        Total Price
                      </span>
                      <span className="text-emerald-400 font-extrabold text-2xl tracking-tight">
                        ₹{course.price}
                      </span>
                    </div>

                    {/* Ab yeh direct course detail page par le jayega */}
                    <Link
                      to={`/course/${course._id}`}
                      className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl border border-blue-500/30 transition-all duration-300 shadow-[0_4px_16px_rgba(29,78,216,0.3)] hover:shadow-[0_6px_22px_rgba(29,78,216,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                      <span>View</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedCourses;