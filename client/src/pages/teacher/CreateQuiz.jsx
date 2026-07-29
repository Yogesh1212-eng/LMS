import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createQuiz } from "../../services/quizService";
import { toast } from "react-hot-toast";

function CreateQuiz() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    courseId: searchParams.get("courseId") || "",
    title: "",
    passPercentage: 60,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createQuiz(form);

      toast.success("Quiz Created Successfully");

      navigate(`/teacher/quiz/${res.quiz._id}/questions`);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create quiz"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-slate-900 p-6 rounded-xl">

      <h1 className="text-3xl font-bold text-white mb-6">
        Create Quiz
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          name="courseId"
          value={form.courseId}
          readOnly
          className="w-full p-3 rounded bg-slate-800 text-white"
        />

        <input
          type="text"
          name="title"
          placeholder="Quiz Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800 text-white"
          required
        />

        <input
          type="number"
          name="passPercentage"
          value={form.passPercentage}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800 text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg text-white font-semibold"
        >
          Create Quiz
        </button>

      </form>

    </div>
  );
}

export default CreateQuiz;