import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";
import QuizAttempt from "../models/QuizAttempt.js";


// ---------------- CREATE QUIZ ----------------

export const createQuiz = async (req, res) => {
  try {
    const { courseId, title, passPercentage } = req.body;

    if (!courseId || !title) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if quiz already exists
    const existingQuiz = await Quiz.findOne({
      course: courseId,
    });

    if (existingQuiz) {
      return res.status(400).json({
        success: false,
        message: "Quiz already exists for this course",
      });
    }

    const quiz = await Quiz.create({
      course: courseId,
      title,
      passPercentage,
    });

    res.status(201).json({
      success: true,
      quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ---------------- ADD QUESTION ----------------

export const addQuestion = async (req, res) => {
  try {
    console.log(req.body);

    const { quizId } = req.params;

    const {
      question,
      options,
      correctAnswer,
    } = req.body;

    if (
      !question ||
      !options ||
      options.length !== 4 ||
      correctAnswer === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Question Data",
      });
    }

    const newQuestion = await Question.create({
      quiz: quizId,
      question,
      options,
      correctAnswer,
    });
     console.log("Saved:", newQuestion);

    res.status(201).json({
      success: true,
      message: "Question Added Successfully",
      question: newQuestion,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getQuizByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const quiz = await Quiz.findOne({
      course: courseId,
    }).sort({ createdAt: -1 });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getQuizQuestions = async (req, res) => {
  try {
    const { quizId } = req.params;

    console.log("Quiz ID:", quizId);

    const questions = await Question.find({ quiz: quizId });

    console.log("Questions:", questions);

    res.status(200).json({
      success: true,
      questions,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;

    const quiz = await Quiz.findById(quizId);

    const questions = await Question.find({
      quiz: quizId,
    });

    let score = 0;

    questions.forEach((question) => {

      const answer = answers.find(
        (a) => a.questionId === question._id.toString()
      );

      if (
        answer &&
        answer.selectedAnswer === question.correctAnswer
      ) {
        score++;
      }

    });

    const percentage = Math.round(
      (score / questions.length) * 100
    );

    const passed =
      percentage >= quiz.passPercentage;

    await QuizAttempt.create({
      student: req.user.id,
      quiz: quizId,
      score,
      totalQuestions: questions.length,
      percentage,
      passed,
      answers,
    });

    res.status(200).json({
      success: true,
      score,
      percentage,
      passed,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

