import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import { Users, Video, IndianRupee, ArrowLeft, BookOpen } from "lucide-react";

function TeacherCourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    try {
      const res = await api.get(`/course/${id}`);
      setCourse(res.data.course);
    } catch (err) {
      console.log(err);
    }
  };

  if (!course) {
    return (
      <div className="text-center py-20 text-slate-400 text-sm">
        Loading track details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full pb-12">
      <Link
        to="/teacher/courses"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to My Courses</span>
      </Link>

      <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        </div>

        <div className="p-6 sm:p-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {course.title}
          </h1>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {course.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Price</p>
                <p className="text-lg font-bold text-white">₹{course.price}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Students</p>
                <p className="text-lg font-bold text-white">
                  {course.studentsEnrolled?.length || 0}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Lectures</p>
                <p className="text-lg font-bold text-white">
                  {course.lectures?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseDetails;