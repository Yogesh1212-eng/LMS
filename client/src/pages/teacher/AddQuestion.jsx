import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addQuestion } from "../../services/quizService";
import { toast } from "react-hot-toast";
import { PlusCircle, CheckCircle2, HelpCircle } from "lucide-react";

function AddQuestion() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: 0,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "correctAnswer"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addQuestion(quizId, {
        question: form.question,
        options: [
          form.option1,
          form.option2,
          form.option3,
          form.option4,
        ],
        correctAnswer: form.correctAnswer,
      });

      toast.success("Question Added Successfully");

      setForm({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: 0,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding question");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Add Quiz Question
          </h1>
          <p className="text-xs text-slate-400">Attach multi-choice questions to this quiz</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
            Question Text
          </label>
          <textarea
            name="question"
            placeholder="Type your question here..."
            value={form.question}
            onChange={handleChange}
            rows="3"
            className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition text-sm"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <input
            name="option1"
            placeholder="Option 1"
            value={form.option1}
            onChange={handleChange}
            className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition text-sm"
            required
          />
          <input
            name="option2"
            placeholder="Option 2"
            value={form.option2}
            onChange={handleChange}
            className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition text-sm"
            required
          />
          <input
            name="option3"
            placeholder="Option 3"
            value={form.option3}
            onChange={handleChange}
            className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition text-sm"
            required
          />
          <input
            name="option4"
            placeholder="Option 4"
            value={form.option4}
            onChange={handleChange}
            className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 transition text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
            Select Correct Option
          </label>
          <select
            name="correctAnswer"
            value={form.correctAnswer}
            onChange={handleChange}
            className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white focus:outline-none focus:border-blue-600 transition text-sm"
          >
            <option value={0}>Correct Answer : Option 1</option>
            <option value={1}>Correct Answer : Option 2</option>
            <option value={2}>Correct Answer : Option 3</option>
            <option value={3}>Correct Answer : Option 4</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
          <button
            type="submit"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 px-5 rounded-xl shadow-md transition-all cursor-pointer text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Question</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/teacher/courses")}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3 px-5 rounded-xl shadow-md transition-all cursor-pointer text-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Finish Quiz</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddQuestion;