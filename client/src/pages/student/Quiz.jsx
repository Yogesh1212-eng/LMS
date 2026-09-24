import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getQuizByCourse,
  getQuizQuestions,
  submitQuiz,
} from "../../services/quizService";
import { toast } from "react-hot-toast";
import { HelpCircle, CheckCircle2, Award } from "lucide-react";

function Quiz() {
  const { courseId } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    try {
      const res = await getQuizByCourse(courseId);
      setQuiz(res.quiz);

      const q = await getQuizQuestions(res.quiz._id);
      setQuestions(q.questions || []);
    } catch (err) {
      console.log(err);
    }
  };

  if (!quiz) {
    return (
      <div className="p-10 text-center text-slate-400 text-sm">
        Loading Quiz...
      </div>
    );
  }

  const handleOptionChange = (questionId, selectedAnswer) => {
    const filtered = answers.filter((a) => a.questionId !== questionId);
    setAnswers([...filtered, { questionId, selectedAnswer }]);
  };

  const handleSubmit = async () => {
    try {
      const res = await submitQuiz(quiz._id, answers);
      toast.success(`Score : ${res.score}/${questions.length}`);

      if (res.passed) {
        toast.success("🎉 Quiz Passed! Certificate unlocked.");
      } else {
        toast.error("Quiz Failed. Please review and retry.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-16">
      {/* Quiz Banner */}
      <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800 p-6 sm:p-8 rounded-2xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <Award className="w-4 h-4" />
            <span>Final Assessment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {quiz.title}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Answer all questions carefully to secure your certificate.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-blue-950/60 border border-blue-800/60 text-blue-300 text-xs font-bold shrink-0 self-start sm:self-auto">
          Pass Threshold: {quiz.passPercentage}%
        </div>
      </div>

      {/* Questions Stack */}
      <div className="space-y-6">
        {questions.map((q, index) => (
          <div
            key={q._id}
            className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg"
          >
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-800/60 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {index + 1}
              </span>
              <h2 className="text-base sm:text-lg text-white font-bold tracking-tight">
                {q.question}
              </h2>
            </div>

            <div className="mt-5 space-y-3 pl-10">
              {q.options.map((option, i) => {
                const isChecked = answers.some(
                  (a) => a.questionId === q._id && a.selectedAnswer === i
                );

                return (
                  <label
                    key={i}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isChecked
                        ? "bg-blue-600/15 border-blue-500/60 text-white font-medium"
                        : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q._id}
                      value={i}
                      checked={isChecked}
                      onChange={() => handleOptionChange(q._id, i)}
                      className="accent-blue-600 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-10 flex justify-end">
        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-8 py-4 rounded-xl text-white font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Submit Quiz</span>
        </button>
      </div>
    </div>
  );
}

export default Quiz;