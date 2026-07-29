import { Link } from "react-router-dom";

function RecentCourses({ courses }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-10">

      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-slate-400">
          No Courses Found
        </p>
      ) : (
        <div className="space-y-5">

          {courses.map((course) => (
            <div
              key={course._id}
              className="flex justify-between items-center bg-slate-800 p-4 rounded-xl"
            >
              <div>
                <h3 className="text-white text-lg font-semibold">
                  {course.title}
                </h3>

                <p className="text-slate-400 mt-1">
                  ₹ {course.price}
                </p>
              </div>

              <Link
                to={`/teacher/course/${course._id}`}
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white"
              >
                View
              </Link>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default RecentCourses;