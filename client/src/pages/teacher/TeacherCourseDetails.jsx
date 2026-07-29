import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

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
      <div className="text-white p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 text-white">

      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-72 object-cover rounded-xl"
      />

      <h1 className="text-4xl font-bold mt-6">
        {course.title}
      </h1>

      <p className="mt-5 text-slate-300">
        {course.description}
      </p>

      <div className="mt-6 text-xl">
        Price : ₹{course.price}
      </div>

      <div className="mt-3">
        Students : {course.studentsEnrolled.length}
      </div>

      <div className="mt-3">
        Lectures : {course.lectures.length}
      </div>

    </div>
  );
}

export default TeacherCourseDetails;