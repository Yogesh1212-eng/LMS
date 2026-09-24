import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { PlusCircle, Edit, Trash2, Video, Eye, HelpCircle, IndianRupee } from "lucide-react";

function TeacherCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/course/my-courses");
      setCourses(res.data.courses || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/course/${id}`);
      alert("Course Deleted Successfully");
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            My Created Courses
          </h1>
          <p className="text-sm text-slate-400 mt-1">Manage syllabus, add video lectures and attach quizzes</p>
        </div>

        <Link
          to="/teacher/create-course"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white font-bold px-5 py-3 rounded-xl shadow-lg transition-all text-sm shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Course</span>
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          No courses published yet. Click 'Create Course' to start.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="group bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/95 border border-slate-800 hover:border-blue-700/60 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    <span>{course.price}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                    {course.title}
                  </h2>
                </div>
              </div>

              {/* Action Buttons Panel with distinct colorful badges */}
              <div className="p-5 pt-0">
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
                  <Link
                    to={`/teacher/edit-course/${course._id}`}
                    className="inline-flex items-center gap-1 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>

                  <button
                    onClick={() => handleDelete(course._id)}
                    className="inline-flex items-center gap-1 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>

                  <Link
                    to={`/teacher/course/${course._id}/lectures`}
                    className="inline-flex items-center gap-1 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Lectures</span>
                  </Link>

                  <Link
                    to={`/teacher/course/${course._id}`}
                    className="inline-flex items-center gap-1 bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </Link>

                  <Link
                    to={`/teacher/quiz/create?courseId=${course._id}`}
                    className="inline-flex items-center gap-1 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Quiz</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherCourses;