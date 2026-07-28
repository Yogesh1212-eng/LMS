import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function TeacherCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

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

  const fetchCourses = async () => {
    try {
      const res = await api.get("/course/my-courses");
      setCourses(res.data.courses);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl text-white font-bold">
          My Courses
        </h1>

        <Link
          to="/teacher/create-course"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl"
        >
          + Create Course
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">

        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <h2 className="text-white text-2xl font-semibold">
                {course.title}
              </h2>

              <p className="text-slate-400 mt-3">
                ₹ {course.price}
              </p>

              <div className="flex gap-3 mt-6">

                <Link
                  to={`/teacher/edit-course/${course._id}`}
                  className="bg-cyan-600 px-4 py-2 rounded-lg text-white"
                >
                  Edit
                </Link>

                <button
    onClick={() => handleDelete(course._id)}
    className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-white"
  >
    Delete
  </button>
                <Link
  to={`/teacher/course/${course._id}/lectures`}
  className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-white"
>
  Lectures
</Link>

                <Link
                  to={`/teacher/course/${course._id}`}
                  className="bg-indigo-600 px-4 py-2 rounded-lg text-white"
                >
                  View
                </Link>
                

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default TeacherCourses;