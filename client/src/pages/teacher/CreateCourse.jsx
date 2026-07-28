import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

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
    <section className="min-h-screen bg-[#0B1120] text-white p-8">

      <h1 className="text-4xl font-bold">
        Create New Course
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 max-w-3xl space-y-6"
      >

        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-slate-800"
          required
        />

        <textarea
          rows="5"
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-slate-800"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-slate-800"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-slate-800"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="w-full p-4 rounded-xl bg-slate-800"
          required
        />

        <button
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-xl font-semibold"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>

      </form>

    </section>
  );
}

export default CreateCourse;