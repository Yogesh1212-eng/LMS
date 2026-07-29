import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addQuestion } from "../../services/quizService";
import { toast } from "react-hot-toast";

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

      toast.success("Question Added");

      setForm({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: 0,
      });

    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-slate-900 p-8 rounded-xl">

      <h1 className="text-3xl font-bold text-white mb-8">
        Add Question
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <textarea
          name="question"
          placeholder="Question"
          value={form.question}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800 text-white"
          required
        />

        <input
          name="option1"
          placeholder="Option 1"
          value={form.option1}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800 text-white"
          required
        />

        <input
          name="option2"
          placeholder="Option 2"
          value={form.option2}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800 text-white"
          required
        />

        <input
          name="option3"
          placeholder="Option 3"
          value={form.option3}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800 text-white"
          required
        />

        <input
          name="option4"
          placeholder="Option 4"
          value={form.option4}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800 text-white"
          required
        />

        <select
          name="correctAnswer"
          value={form.correctAnswer}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-800 text-white"
        >
          <option value={0}>Correct Answer : Option 1</option>
          <option value={1}>Correct Answer : Option 2</option>
          <option value={2}>Correct Answer : Option 3</option>
          <option value={3}>Correct Answer : Option 4</option>
        </select>

        <div className="flex gap-4">

          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-3 rounded text-white"
          >
            Add Question
          </button>

          <button
            type="button"
            onClick={() => navigate("/teacher/courses")}
            className="flex-1 bg-green-600 hover:bg-green-500 py-3 rounded text-white"
          >
            Finish Quiz
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddQuestion;