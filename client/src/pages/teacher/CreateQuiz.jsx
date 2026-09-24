import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createQuiz } from "../../services/quizService";
import { toast } from "react-hot-toast";
import { HelpCircle, ArrowRight } from "lucide-react";

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
      toast.error(err.response?.data?.message || "Failed to create quiz");
    }
  };

  return (
    <div className="max-w-xl mx-auto my-12 bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 p-6 sm:p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Create Course Quiz
          </h1>
          <p className="text-xs text-slate-400">Define the assessment title and pass threshold</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
            Course ID
          </label>
          <input
            type="text"
            name="courseId"
            value={form.courseId}
            readOnly
            className="w-full p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-400 text-sm font-mono cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
            Quiz Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Final Certification Test"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
            Pass Percentage (%)
          </label>
          <input
            type="number"
            name="passPercentage"
            value={form.passPercentage}
            onChange={handleChange}
            className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition text-sm"
            required
          />
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 py-3.5 rounded-xl text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <span>Continue to Add Questions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateQuiz;