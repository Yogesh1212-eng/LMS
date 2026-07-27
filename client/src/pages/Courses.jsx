import { useEffect, useState } from "react";
import { getAllCourses } from "../services/courseService";
import api from "../services/api";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const res = await api.get("/course");
      setCourses(res.data.courses);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="min-h-screen bg-[#0B1120] py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-white mb-10">
          All Courses
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500 transition"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">
                <h2 className="text-white text-xl font-bold">
                  {course.title}
                </h2>

                <p className="text-slate-400 mt-3 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex justify-between mt-6 items-center">
                  <span className="text-indigo-400 text-xl font-bold">
                    ₹{course.price}
                  </span>

                <Link
                    to={`/course/${course._id}`}
                    className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg"
                >
                    View Details
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