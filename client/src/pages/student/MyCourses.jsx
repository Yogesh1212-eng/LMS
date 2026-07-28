import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyCourses } from "../../services/enrollmentService";

function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const res = await getMyCourses();
      setCourses(res.courses || []);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">
        My Courses
      </h1>

      {courses.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
          <h2 className="text-2xl text-white">
            No Courses Enrolled
          </h2>

          <p className="text-slate-400 mt-3">
            Start learning by enrolling in a course.
          </p>

          <Link
            to="/courses"
            className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl text-white"
          >
            Browse Courses
          </Link>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-white text-xl font-bold">
                  {course.title}
                </h2>

                <p className="text-slate-400 mt-3">
                  {course.description}
                </p>

                <div className="mt-5 bg-slate-700 rounded-full h-3">
                  <div className="bg-cyan-400 h-3 rounded-full w-[40%]"></div>
                </div>

                <p className="text-cyan-400 mt-2">
                  40% Completed
                </p>
                <br></br>
                <Link
                  to={`/student/learn/${course._id}`}
                  className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg">
                  Start Learning
                </Link>

                <Link
                to={`/student/learn/${course._id}`}
                className="block text-center mt-5 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl text-white">
                  Continue Learning
                </Link>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;