import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyCourses } from "../../services/enrollmentService";
import { BookOpen, ArrowRight, User } from "lucide-react";

function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await getMyCourses();
      setCourses(res.courses || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          My Enrolled Courses
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-1">
          Pick up where you left off and finish your learning paths.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          You haven't enrolled in any courses yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="group bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/95 border border-slate-800 hover:border-blue-700/60 rounded-2xl overflow-hidden backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_45px_rgba(29,78,216,0.18)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                    {course.title}
                  </h2>

                  <div className="flex items-center gap-2 text-slate-400 text-xs mt-2.5">
                    <User className="w-3.5 h-3.5 text-purple-400" />
                    <span>{course.teacher?.name || "Verified Instructor"}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/student/learn/${course._id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold text-sm py-3 rounded-xl border border-blue-500/30 transition-all duration-200 shadow-md hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Continue Learning</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyCourses;