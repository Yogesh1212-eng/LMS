import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import { UploadCloud, Play, Edit, Trash2, Video, Clock } from "lucide-react";

function UploadLecture() {
  const { id } = useParams();

  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
  });

  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const res = await api.get(`/lecture/${id}`);
      setLectures(res.data.lectures || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("duration", formData.duration);
      data.append("video", video);

      await api.post(`/lecture/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Lecture Uploaded Successfully");

      setFormData({
        title: "",
        description: "",
        duration: "",
      });

      setVideo(null);
      fetchLectures();
    } catch (err) {
      alert(err.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (lectureId) => {
    const confirmDelete = window.confirm("Delete this lecture?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/lecture/${lectureId}`);
      alert("Lecture Deleted Successfully");
      fetchLectures();
    } catch (err) {
      alert(err.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <section className="w-full">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Upload Form Container */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Upload New Lecture
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">Add lesson video and notes for enrolled students</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
                Lecture Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Introduction to Express Middleware"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
                Description
              </label>
              <textarea
                rows="3"
                name="description"
                placeholder="What concepts will this lecture cover?"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  name="duration"
                  placeholder="e.g. 15"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
                  Video File
                </label>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files[0])}
                    className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600/20 file:text-blue-300 hover:file:bg-blue-600/30 cursor-pointer"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                disabled={loading}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-7 py-3 rounded-xl font-bold text-white text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] transition cursor-pointer disabled:opacity-60"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{loading ? "Uploading Video..." : "Upload Lecture"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Existing Lectures List */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Uploaded Lectures
            </h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800 text-blue-300">
              {lectures.length} Total
            </span>
          </div>

          {lectures.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-sm">
              No lectures uploaded yet for this course.
            </div>
          ) : (
            <div className="space-y-3.5">
              {lectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className="group bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 hover:border-slate-700 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white line-clamp-1">
                        {lecture.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{lecture.duration} minutes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <a
                      href={lecture.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play</span>
                    </a>

                    <Link
                      to={`/teacher/lecture/edit/${lecture._id}`}
                      className="inline-flex items-center gap-1.5 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>

                    <button
                      onClick={() => handleDelete(lecture._id)}
                      className="inline-flex items-center gap-1.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default UploadLecture;