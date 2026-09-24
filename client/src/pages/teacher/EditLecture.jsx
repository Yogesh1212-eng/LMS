import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { Video, Clock } from "lucide-react";

function EditLecture() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
  });

  useEffect(() => {
    fetchLecture();
  }, []);

  const fetchLecture = async () => {
    try {
      const res = await api.get(`/lecture/single/${id}`);
      setFormData({
        title: res.data.lecture.title,
        description: res.data.lecture.description,
        duration: res.data.lecture.duration,
      });
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
      await api.put(`/lecture/${id}`, formData);
      alert("Lecture Updated Successfully");
      navigate(-1);
    } catch (err) {
      alert(err.response?.data?.message || "Update Failed");
    }
  };

  return (
    <section className="w-full">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Edit Lecture
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">Modify video title and lesson overview</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-5"
        >
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
              Lecture Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white focus:outline-none focus:border-blue-600 transition text-sm"
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
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white focus:outline-none focus:border-blue-600 transition text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
              Duration (Minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white focus:outline-none focus:border-blue-600 transition text-sm"
              required
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button className="bg-blue-700 hover:bg-blue-600 px-8 py-3.5 rounded-xl font-bold text-white text-sm shadow-[0_0_20px_rgba(29,78,216,0.35)] transition cursor-pointer">
              Update Lecture
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditLecture;