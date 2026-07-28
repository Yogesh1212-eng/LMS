import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/course/${id}`);

      setFormData({
        title: res.data.course.title,
        description: res.data.course.description,
        category: res.data.course.category,
        price: res.data.course.price,
      });

    } catch (err) {
      alert(err.response?.data?.message || "Failed to load course");
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
      data.append("category", formData.category);
      data.append("price", formData.price);

      if (thumbnail) {
        data.append("thumbnail", thumbnail);
      }

      await api.put(`/course/${id}`, data);

      alert("Course Updated Successfully");

      navigate("/teacher/courses");

    } catch (err) {
      alert(err.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#0B1120] p-10 text-white">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Edit Course
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-slate-800 p-4 rounded-xl"
          />

          <textarea
            rows="5"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-slate-800 p-4 rounded-xl"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-slate-800 p-4 rounded-xl"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full bg-slate-800 p-4 rounded-xl"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="w-full bg-slate-800 p-4 rounded-xl"
          />

          <button
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-xl"
          >
            {loading ? "Updating..." : "Update Course"}
          </button>

        </form>

      </div>

    </section>
  );
}

export default EditCourse;