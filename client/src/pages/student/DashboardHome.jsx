import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Trophy,
  Clock3,
  BarChart3,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { getMyCourses } from "../../services/enrollmentService";
import { getDashboard } from "../../services/dashboardService";

function DashboardHome() {
  const [courses, setCourses] = useState([]);

  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    progress: 0,
    certificates: 0,
  });

  useEffect(() => {
    loadCourses();
    loadDashboard();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await getMyCourses();
      setCourses(res.courses || []);
    } catch (err) {
      console.log(err);
    }
  };

  const loadDashboard = async () => {
    try {
      const dashboard = await getDashboard();
      setStats({
        enrolledCourses: dashboard.enrolledCourses,
        completedCourses: dashboard.completedCourses,
        progress: dashboard.progress,
        certificates: dashboard.certificates,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    {
      title: "Enrolled Courses",
      value: stats.enrolledCourses,
      icon: <BookOpen className="w-7 h-7 text-cyan-400" />,
      border: "hover:border-cyan-500/50",
      box: "bg-cyan-500/15 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.25)]",
    },
    {
      title: "Certificates Earned",
      value: stats.certificates,
      icon: <Trophy className="w-7 h-7 text-amber-400" />,
      border: "hover:border-amber-500/50",
      box: "bg-amber-500/15 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.25)]",
    },
    {
      title: "Completed Tracks",
      value: stats.completedCourses,
      icon: <Clock3 className="w-7 h-7 text-emerald-400" />,
      border: "hover:border-emerald-500/50",
      box: "bg-emerald-500/15 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    },
    {
      title: "Overall Progress",
      value: `${stats.progress}%`,
      icon: <BarChart3 className="w-7 h-7 text-pink-400" />,
      border: "hover:border-pink-500/50",
      box: "bg-pink-500/15 border-pink-500/30 shadow-[0_0_20px_rgba(244,63,94,0.25)]",
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Student Dashboard
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-1.5">
            Welcome back! Here's your learning progress & live analytics.
          </p>
        </div>

        <Link
          to="/student/certificates"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl border border-amber-300/40 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:-translate-y-0.5 transition-all text-sm shrink-0"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>View Certificates</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`group bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/95 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1.5 ${card.border}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                {card.title}
              </span>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${card.box}`}
              >
                {card.icon}
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white mt-5 tracking-tight">
              {card.value}
            </h2>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Synchronized</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Courses Section */}
      <div className="mt-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Recent Enrolled Courses
          </h2>
          <Link
            to="/student/courses"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-sm">
            No enrolled courses yet. Browse the catalog to start learning.
          </div>
        ) : (
          <div className="grid gap-4">
            {courses.map((course) => (
              <div
                key={course._id}
                className="group bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 hover:border-blue-700/60 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">
                      Instructor: {course.teacher?.name || "Senior Mentor"}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/student/learn/${course._id}`}
                  className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl border border-blue-500/40 transition-all duration-200 shadow-[0_4px_16px_rgba(29,78,216,0.3)] hover:-translate-y-0.5 shrink-0"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardHome;