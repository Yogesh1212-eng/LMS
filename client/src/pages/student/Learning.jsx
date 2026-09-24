import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";
import {
  markLectureComplete,
  getProgress,
} from "../../services/progressService";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  FileQuestion,
  Sparkles,
} from "lucide-react";

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
      setLectures(res.data.lectures || []);
      if (res.data.lectures?.length > 0) {
        setCurrentLecture((prev) => prev || res.data.lectures[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProgress = async () => {
    try {
      const res = await getProgress(id);
      setProgress(res.progress.percentage);
      setCompletedLectures(res.progress.completedLectures || []);
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
    <section className="w-full">
      {/* Progress Bar Widget */}
      <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800 rounded-2xl p-5 mb-8 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Course Progress
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            {progress}% Completed
          </span>
        </div>

        <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden p-0.5 border border-slate-800">
          <div
            style={{ width: `${progress}%` }}
            className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Lecture List Sidebar */}
        <div className="lg:col-span-4 bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-2xl p-5 max-h-[650px] overflow-y-auto">
          <h2 className="text-lg font-bold text-white mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
            <span>Course Syllabus</span>
            <span className="text-xs font-medium text-slate-400">
              {lectures.length} Lectures
            </span>
          </h2>

          <div className="space-y-2">
            {lectures.map((lecture, idx) => {
              const isCompleted = completedLectures.includes(lecture._id);
              const isActive = currentLecture?._id === lecture._id;

              return (
                <button
                  key={lecture._id}
                  onClick={() => setCurrentLecture(lecture)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                    isActive
                      ? "bg-blue-700 text-white font-semibold shadow-[0_0_15px_rgba(29,78,216,0.4)] border border-blue-500/40"
                      : "bg-slate-950/60 hover:bg-slate-800/80 text-slate-300 border border-slate-800/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span className="text-sm line-clamp-1">{lecture.title}</span>
                  </div>

                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <PlayCircle className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Video & Player Section */}
        <div className="lg:col-span-8 bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-2xl p-6 sm:p-7 backdrop-blur-xl">
          {currentLecture ? (
            <>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-5">
                {currentLecture.title}
              </h1>

              {/* Video Player */}
              <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl aspect-video">
                <video
                  src={currentLecture.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <p className="mt-6 text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentLecture.description}
              </p>

              {/* Mark Complete Action */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <button
                  disabled={completedLectures.includes(currentLecture._id)}
                  onClick={async () => {
                    try {
                      await markLectureComplete(currentLecture._id);
                      await fetchProgress();
                      if (currentIndex < lectures.length - 1) {
                        setCurrentLecture(lectures[currentIndex + 1]);
                      }
                      alert("Lecture Completed!");
                    } catch (err) {
                      alert(
                        err.response?.data?.message || "Something went wrong"
                      );
                    }
                  }}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                    completedLectures.includes(currentLecture._id)
                      ? "bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {completedLectures.includes(currentLecture._id)
                      ? "Completed"
                      : "Mark as Complete"}
                  </span>
                </button>

                {/* Prev & Next Navigation Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                      currentIndex === 0
                        ? "bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed"
                        : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentIndex === lectures.length - 1}
                    className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                      currentIndex === lectures.length - 1
                        ? "bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed"
                        : "bg-blue-700 hover:bg-blue-600 text-white shadow-md"
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quiz Banner once 100% completed */}
              {progress === 100 && (
                <div className="mt-8 border-t border-slate-800 pt-6 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent p-6 rounded-2xl border border-amber-500/20">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xl">
                    <Sparkles className="w-5 h-5" />
                    <span>Course Completed!</span>
                  </div>
                  <p className="text-slate-300 text-sm mt-1">
                    You have finished every lecture. Take the final test to claim your certificate.
                  </p>
                  <Link
                    to={`/student/quiz/${id}`}
                    className="inline-flex items-center gap-2 mt-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-sm"
                  >
                    <FileQuestion className="w-4 h-4" />
                    <span>Start Final Quiz</span>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 text-slate-500">
              Select a lecture from the list to start watching.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Learning;