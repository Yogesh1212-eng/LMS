import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

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
    <section className="min-h-screen bg-[#0B1120] text-white p-10">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Edit Lecture
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-slate-800 p-4 rounded-xl"
          />

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-slate-800 p-4 rounded-xl"
          />

          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full bg-slate-800 p-4 rounded-xl"
          />

          <button className="bg-blue-600 px-8 py-3 rounded-xl">
            Update Lecture
          </button>

        </form>

      </div>
    </section>
  );
}

export default EditLecture;