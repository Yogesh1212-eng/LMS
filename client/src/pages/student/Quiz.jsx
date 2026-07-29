import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getQuizByCourse,
  getQuizQuestions,
} from "../../services/quizService";

import { submitQuiz } from "../../services/quizService";
import { toast } from "react-hot-toast";

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
      console.log(q);
      setQuestions(q.questions);

    } catch (err) {
      console.log(err);
    }
  };

  if (!quiz) {
    return (
      <div className="p-10 text-white">
        Loading Quiz...
      </div>
    );
  }

  const handleOptionChange = (questionId, selectedAnswer) => {
  const filtered = answers.filter(
    (a) => a.questionId !== questionId
  );

  setAnswers([
    ...filtered,
    {
      questionId,
      selectedAnswer,
    },
  ]);
};

const handleSubmit = async () => {
  try {

    const res = await submitQuiz(
      quiz._id,
      answers
    );

    toast.success(
      `Score : ${res.score}/${questions.length}`
    );

    if (res.passed) {
      toast.success("🎉 Quiz Passed");
    } else {
      toast.error("Quiz Failed");
    }

  } catch (err) {

    toast.error(
      err.response?.data?.message || "Error"
    );

  }
};



  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-white">
        {quiz.title}
      </h1>

      <p className="text-slate-400 mt-2">
        Pass Percentage : {quiz.passPercentage}%
      </p>

      <div className="mt-10 space-y-8">

        {questions.map((q, index) => (

          <div
            key={q._id}
            className="bg-slate-900 p-6 rounded-xl"
          >

            <h2 className="text-xl text-white font-semibold">
              {index + 1}. {q.question}
            </h2>

            <div className="mt-5 space-y-3">

              {q.options.map((option, i) => (

                <label
                  key={i}
                  className="flex items-center gap-3 text-white"
                >
                  <input
  type="radio"
  name={q._id}
  value={i}
  onChange={() =>
    handleOptionChange(q._id, i)
  }
/>


                  {option}

                </label>

              ))}

            </div>

          </div>

        ))}

      </div>

      <button
  onClick={handleSubmit}
  className="mt-10 bg-green-600 hover:bg-green-500 px-8 py-4 rounded-xl text-white"
>
  Submit Quiz
</button>
      

    </div>
  );
}


export default Quiz;