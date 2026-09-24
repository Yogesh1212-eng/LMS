import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, IndianRupee, Sparkles } from "lucide-react";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const res = await api.get("/course");
      setCourses(res.data.courses || []);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="min-h-screen bg-[#070A12] py-16 sm:py-20 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Production-Grade Tracks
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Explore All Courses
          </h1>
          <p className="text-slate-400 text-base mt-2">
            Accelerate your engineering journey with structured mentorship, live code reviews, and industry certifications.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="group bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/95 border border-slate-800 hover:border-blue-700/60 rounded-2xl overflow-hidden backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_45px_rgba(29,78,216,0.18)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  <span className="absolute top-3 left-3 bg-blue-950/80 backdrop-blur-md border border-blue-800/60 text-blue-300 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    {course.category || "Full Track"}
                  </span>
                </div>

                <div className="p-6">
                  <h2 className="text-white text-xl font-bold tracking-tight line-clamp-1 group-hover:text-blue-300 transition-colors">
                    {course.title}
                  </h2>

                  <p className="text-slate-400 mt-2.5 text-sm leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Bottom Price & Action */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-800/80 flex justify-between items-center">
                  <div className="flex items-center text-emerald-400 text-2xl font-black tracking-tight">
                    <IndianRupee className="w-5 h-5" />
                    <span>{course.price}</span>
                  </div>

                  <Link
                    to={`/course/${course._id}`}
                    className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl border border-blue-500/40 transition-all duration-200 shadow-md hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Courses;