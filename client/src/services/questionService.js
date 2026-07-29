import api from "./api";

export const addQuestion = async (quizId, data) => {
  const res = await api.post(`/quiz/${quizId}/question`, data);
  return res.data;
};