import api from "./api";

export const createQuiz = async (data) => {
  const res = await api.post("/quiz/create", data);
  return res.data;
};

export const addQuestion = async (quizId, data) => {
  const res = await api.post(`/quiz/${quizId}/question`, data);
  return res.data;
};

export const getQuizByCourse = async (courseId) => {
  const res = await api.get(`/quiz/course/${courseId}`);
  return res.data;
};

export const getQuizQuestions = async (quizId) => {
  const res = await api.get(`/quiz/${quizId}/questions`);
  return res.data;
};

export const submitQuiz = async (quizId, answers) => {
  const res = await api.post(`/quiz/${quizId}/submit`, {
    answers,
  });

  return res.data;
};


