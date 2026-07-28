import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyCourses } from "../../services/enrollmentService";

function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await getMyCourses();
      setCourses(res.courses);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="min-h-screen bg-[#0B1120] text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        My Courses
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {courses.map((course) => (

          <div
            key={course._id}
            className="bg-slate-900 rounded-xl overflow-hidden"
          >

            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">

              <h2 className="text-2xl font-bold">
                {course.title}
              </h2>

              <p className="text-slate-400 mt-3">
                {course.teacher?.name}
              </p>

              <Link
                to={`/student/learn/${course._id}`}
                className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-lg"
              >
                Continue Learning
              </Link>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default MyCourses;