import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { enrollCourse } from "../services/enrollmentService";
import { toast } from "react-hot-toast";

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    loadCourse();
  }, []);

  async function loadCourse() {
    try {
      const res = await api.get(`/course/${id}`);
      setCourse(res.data.course);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load course");
    }
  }

  const handleEnroll = async () => {
    try {
      const res = await enrollCourse(course._id);

      toast.success(res.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Enrollment Failed"
      );
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0B1120] py-16">
      <div className="max-w-6xl mx-auto px-6">

        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-[420px] object-cover rounded-2xl"
        />

        <div className="mt-8">

          <h1 className="text-5xl font-bold text-white">
            {course.title}
          </h1>

          <p className="text-slate-400 mt-6 text-lg leading-8">
            {course.description}
          </p>

          <div className="mt-8 flex items-center gap-8">

            <h2 className="text-cyan-400 text-3xl font-bold">
              ₹ {course.price}
            </h2>

            <button
  onClick={handleEnroll}
  className="mt-10 bg-green-600 hover:bg-green-500 px-8 py-4 rounded-xl"
>
  Enroll Now
</button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default CourseDetails;