import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { PlusCircle, UploadCloud, BookOpen } from "lucide-react";

function CreateCourse() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

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
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("thumbnail", thumbnail);

      await api.post("/course", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Course Created Successfully");
      navigate("/teacher/courses");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Create New Course
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">Publish syllabus and start onboarding learners</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-5"
        >
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Master Full-Stack MERN Architecture"
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
              rows="4"
              name="description"
              placeholder="What will students learn in this track?"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
                Category
              </label>
              <input
                type="text"
                name="category"
                placeholder="e.g. Web Development"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                placeholder="e.g. 2999"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
              Course Thumbnail
            </label>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <UploadCloud className="w-5 h-5 text-cyan-400 ml-1" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600/20 file:text-blue-300 hover:file:bg-blue-600/30 cursor-pointer"
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              disabled={loading}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 px-8 py-3.5 rounded-xl font-bold text-white text-sm shadow-[0_0_20px_rgba(29,78,216,0.35)] transition-all cursor-pointer disabled:opacity-60"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{loading ? "Creating Track..." : "Create Course"}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateCourse;