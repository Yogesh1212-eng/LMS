import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, IndianRupee } from "lucide-react";

function RecentCourses({ courses = [] }) {
  return (
    <div className="relative bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950/90 border border-slate-800/90 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.5)] mt-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-32 bg-blue-950/20 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400">
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Recent Courses
            </h2>
            <p className="text-xs text-slate-400">Manage and preview published tracks</p>
          </div>
        </div>

        {courses.length > 0 && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-blue-300">
            {courses.length} Total
          </span>
        )}
      </div>

      {courses.length === 0 ? (
        <div className="py-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500 mb-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <p className="text-slate-400 text-sm font-medium">No Courses Found</p>
          <p className="text-slate-500 text-xs mt-1">Start by creating your first course syllabus.</p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {courses.map((course) => (
            <div
              key={course._id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/70 hover:bg-slate-900/80 border border-slate-800/80 hover:border-blue-700/60 p-4 sm:p-5 rounded-xl transition-all duration-200"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white text-base font-bold tracking-tight group-hover:text-blue-300 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-1 text-emerald-400 text-xs sm:text-sm font-semibold mt-1">
                    <IndianRupee className="w-3.5 h-3.5" />
                    <span>{course.price}</span>
                  </div>
                </div>
              </div>

              <Link
                to={`/teacher/course/${course._id}`}
                className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl border border-blue-500/40 transition-all duration-200 shadow-[0_4px_16px_rgba(29,78,216,0.3)] hover:shadow-[0_6px_22px_rgba(29,78,216,0.45)] hover:-translate-y-0.5 cursor-pointer shrink-0"
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentCourses;