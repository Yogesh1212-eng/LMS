import { useEffect, useState } from "react";
import api from "../../services/api";

function FeaturedCourses() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  async function getCourses() {
    try {
      const res = await api.get("/course");

      setCourses(res.data.courses);
      console.log("courses:", res.data.courses);
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="bg-[#0B1120] py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-white text-center">
          Featured Courses
        </h2>

        <p className="text-slate-400 text-center mt-3 mb-12">
          Learn from industry experts
        </p>

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

                <h3 className="text-white text-xl font-bold">
                  {course.title}
                </h3>

                <p className="text-slate-400 mt-3 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex justify-between items-center mt-6">

                  <span className="text-indigo-400 font-bold text-xl">

                    ₹{course.price}

                  </span>

                  <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg">

                    View

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedCourses;