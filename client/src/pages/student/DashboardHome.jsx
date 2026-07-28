import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Trophy,
  Clock3,
  BarChart3,
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

  // ---------------- Courses ----------------

  const loadCourses = async () => {
    try {
      const res = await getMyCourses();
      setCourses(res.courses);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- Dashboard Stats ----------------

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

  // ---------------- Cards ----------------

  const cards = [
    {
      title: "Enrolled Courses",
      value: stats.enrolledCourses,
      icon: <BookOpen size={35} />,
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Certificates",
      value: stats.certificates,
      icon: <Trophy size={35} />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Completed",
      value: stats.completedCourses,
      icon: <Clock3 size={35} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Progress",
      value: `${stats.progress}%`,
      icon: <BarChart3 size={35} />,
      color: "from-pink-500 to-purple-500",
    },
  ];

  return (
    <div>

      <h1 className="text-4xl font-bold text-white">
        Student Dashboard
      </h1>

      <p className="text-slate-400 mt-2">
        Welcome back! Here's your learning overview.
      </p>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-400 transition"
          >
            <div
              className={`w-16 h-16 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center`}
            >
              {card.icon}
            </div>

            <h2 className="text-3xl font-bold mt-6 text-white">
              {card.value}
            </h2>

            <p className="text-slate-400 mt-2">
              {card.title}
            </p>

          </div>
        ))}

      </div>

      {/* Certificates Button */}

      <div className="mt-8">
        <Link
          to="/student/certificates"
          className="inline-block bg-yellow-500 hover:bg-yellow-400 px-6 py-3 rounded-lg text-white font-semibold"
        >
          📜 View Certificates
        </Link>
      </div>

      {/* Recent Courses */}

      <div className="mt-14">

        <h2 className="text-3xl font-bold text-white mb-6">
          Recent Courses
        </h2>

        {courses.length === 0 ? (
          <div className="bg-slate-900 rounded-xl p-6 text-slate-400">
            No enrolled courses yet.
          </div>
        ) : (
          <div className="space-y-5">

            {courses.map((course) => (

              <div
                key={course._id}
                className="bg-slate-900 rounded-xl p-5 flex justify-between items-center"
              >

                <div>
                  <h3 className="text-xl font-bold text-white">
                    {course.title}
                  </h3>

                  <p className="text-slate-400 mt-1">
                    {course.teacher?.name}
                  </p>
                </div>

                <Link
                  to={`/student/learn/${course._id}`}
                  className="bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-lg text-white"
                >
                  Continue
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