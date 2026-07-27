import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

function Learning() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    loadCourse();
  }, []);

  async function loadCourse() {
    try {
      const res = await api.get(`/course/${id}`);

      setCourse(res.data.course);

      if (res.data.course.lectures.length > 0) {
        setCurrentLecture(res.data.course.lectures[0]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] flex">

      {/* Lecture List */}
      <div className="w-80 border-r border-slate-800 bg-slate-900">

        <h2 className="text-white text-2xl p-6 font-bold">
          Lectures
        </h2>

        {course.lectures.map((lecture) => (
          <button
            key={lecture._id}
            onClick={() => setCurrentLecture(lecture)}
            className="w-full text-left px-6 py-4 border-b border-slate-800 hover:bg-slate-800 text-white"
          >
            {lecture.title}
          </button>
        ))}

      </div>

      {/* Video */}
      <div className="flex-1 p-8">

        <video
          controls
          className="w-full rounded-xl"
          src={currentLecture?.videoUrl}
        />

        <h2 className="text-white text-3xl mt-6 font-bold">
          {currentLecture?.title}
        </h2>

        <p className="text-slate-400 mt-3">
          {currentLecture?.description}
        </p>

        <button className="mt-8 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl text-white">
          Mark as Completed
        </button>

      </div>

    </div>
  );
}

export default Learning;