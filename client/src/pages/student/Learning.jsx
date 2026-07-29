import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";
import {
  markLectureComplete,
  getProgress,
} from "../../services/progressService";

function Learning() {

  const { id } = useParams();

  const [lectures, setLectures] = useState([]);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [progress, setProgress] = useState(0);
  const [completedLectures, setCompletedLectures] = useState([]);

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, [id]);


  const fetchLectures = async () => {

    try {

      const res = await api.get(`/lecture/${id}`);

      setLectures(res.data.lectures);

      if (res.data.lectures.length > 0) {
  setCurrentLecture((prev) => prev || res.data.lectures[0]);
}

    } catch(err){
      console.log(err);
    }

  };
  
  const fetchProgress = async () => {
  try {
    const res = await getProgress(id);

    setProgress(res.progress.percentage);

    setCompletedLectures(
      res.progress.completedLectures || []
    );

  } catch (err) {
    console.log(err);
  }
};

const currentIndex = lectures.findIndex(
  (lecture) => lecture._id === currentLecture?._id
);

const handlePrevious = () => {
  if (currentIndex > 0) {
    setCurrentLecture(lectures[currentIndex - 1]);
  }
};

const handleNext = () => {
  if (currentIndex < lectures.length - 1) {
    setCurrentLecture(lectures[currentIndex + 1]);
  }
};

  return (

    <section className="min-h-screen bg-[#0B1120] text-white p-10">

      <div className="mb-8">

  <h2 className="text-xl font-bold mb-2">
    Course Progress
  </h2>

  <div className="w-full bg-slate-700 rounded-full h-5">

    <div
      style={{
        width: `${progress}%`,
      }}
      className="bg-green-500 h-5 rounded-full"
    />

  </div>

  <p className="mt-2">
    {progress}% Completed
  </p>

</div>


      <div className="grid grid-cols-3 gap-6">


        {/* Lecture List */}

        <div className="bg-slate-900 p-5 rounded-xl">

          <h2 className="text-2xl font-bold mb-5">
            Lectures
          </h2>


          {lectures.map((lecture) => (

  <button
    key={lecture._id}
    onClick={() => setCurrentLecture(lecture)}
    className={`block w-full text-left p-3 rounded-lg mb-3 transition
      ${
        currentLecture?._id === lecture._id
          ? "bg-indigo-600"
          : "bg-slate-800 hover:bg-slate-700"
      }`}
  >

    <div className="flex justify-between items-center">

      <span>{lecture.title}</span>

      {completedLectures.includes(lecture._id) && (
        <span className="text-green-400 text-xl">
          ✓
        </span>
      )}

    </div>

  </button>

))}
          


        </div>



        {/* Video Section */}
        {/* Video Section */}

<div className="col-span-2 bg-slate-900 p-6 rounded-xl">

  {currentLecture && (
    <>

      <h1 className="text-3xl font-bold mb-5">
        {currentLecture.title}
      </h1>

      <video
        src={currentLecture.videoUrl}
        controls
        className="w-full rounded-xl"
      />

      <p className="mt-5 text-slate-300">
        {currentLecture.description}
      </p>

      <button
        disabled={completedLectures.includes(currentLecture._id)}
        onClick={async () => {
          try {
            await markLectureComplete(currentLecture._id);

            await fetchProgress();

            

            // Automatically move to next lecture
            if (currentIndex < lectures.length - 1) {
              setCurrentLecture(lectures[currentIndex + 1]);
            }
            alert("Lecture Completed");

          } catch (err) {
            alert(
              err.response?.data?.message ||
              "Something went wrong"
            );
          }
        }}
        className={`mt-5 px-6 py-3 rounded-lg ${
          completedLectures.includes(currentLecture._id)
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-500"
        }`}
      >
        {completedLectures.includes(currentLecture._id)
          ? "✓ Completed"
          : "✓ Mark as Complete"}
      </button>

      {/* Previous / Next */}

      <div className="flex justify-between mt-6">

        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`px-6 py-3 rounded-lg ${
            currentIndex === 0
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          ◀ Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === lectures.length - 1}
          className={`px-6 py-3 rounded-lg ${
            currentIndex === lectures.length - 1
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          Next ▶
        </button>




      </div>
      <div className="flex justify-between mt-6">

  <button
    onClick={handlePrevious}
    disabled={currentIndex === 0}
    className={`px-6 py-3 rounded-lg ${
      currentIndex === 0
        ? "bg-gray-600 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-500"
    }`}
  >
    ◀ Previous
  </button>

  <button
    onClick={handleNext}
    disabled={currentIndex === lectures.length - 1}
    className={`px-6 py-3 rounded-lg ${
      currentIndex === lectures.length - 1
        ? "bg-gray-600 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-500"
    }`}
  >
    Next ▶
  </button>

</div>

{/* Quiz */}

{progress === 100 && (
  <div className="mt-8 border-t border-slate-700 pt-6">

    <h2 className="text-2xl font-bold text-green-400">
      🎉 Course Completed
    </h2>

    <p className="text-slate-300 mt-2">
      You have completed all lectures.
      Now attempt the quiz to unlock your certificate.
    </p>

    <Link
      to={`/student/quiz/${id}`}
      className="inline-block mt-5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg"
    >
      📝 Start Quiz
    </Link>

  </div>
)}

      

    </>
  )}

</div>

      </div>


    </section>

  );

}


export default Learning;