import api from "./api";

export const addReview = async (courseId, reviewData) => {
  const { data } = await api.post(
    `/review/${courseId}`,
    reviewData
  );

  return data;
};