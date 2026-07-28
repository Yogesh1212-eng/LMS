import { useState, useEffect } from "react";
import { useParams, Link} from "react-router-dom";
import api from "../../services/api";

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
      setLectures(res.data.lectures);
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
    const confirmDelete = window.confirm(
      "Delete this lecture?"
    );

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
    <section className="min-h-screen bg-[#0B1120] text-white p-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Upload Lecture
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            name="title"
            placeholder="Lecture Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-slate-800 p-4 rounded-xl"
            required
          />

          <textarea
            rows="5"
            name="description"
            placeholder="Lecture Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-slate-800 p-4 rounded-xl"
            required
          />

          <input
            type="number"
            name="duration"
            placeholder="Duration (Minutes)"
            value={formData.duration}
            onChange={handleChange}
            className="w-full bg-slate-800 p-4 rounded-xl"
            required
          />

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="w-full bg-slate-800 p-4 rounded-xl"
            required
          />

          <button
            disabled={loading}
            className="bg-green-600 hover:bg-green-500 px-8 py-4 rounded-xl"
          >
            {loading ? "Uploading..." : "Upload Lecture"}
          </button>

        </form>

        {/* Lecture List */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-6">
            Uploaded Lectures
          </h2>

          {lectures.length === 0 ? (

            <p className="text-slate-400">
              No lectures uploaded yet.
            </p>

          ) : (

            <div className="space-y-4">

              {lectures.map((lecture) => (

                <div
                  key={lecture._id}
                  className="bg-slate-800 rounded-xl p-5 flex justify-between items-center"
                >

                  <div>

                    <h3 className="text-xl font-semibold">
                      {lecture.title}
                    </h3>

                    <p className="text-slate-400">
                      {lecture.duration} min
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <a
                      href={lecture.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg"
                    >
                      ▶ Play
                    </a>

                    <Link
  to={`/teacher/lecture/edit/${lecture._id}`}
  className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg"
>
  Edit
</Link>

                    <button
                      onClick={() =>
                        handleDelete(lecture._id)
                      }
                      className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
                    >
                      Delete
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