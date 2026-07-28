import api from "./api";

export const markLectureComplete = async (lectureId) => {
  const { data } = await api.post(
    `/progress/complete/${lectureId}`
  );
  return data;
};

export const getProgress = async (courseId) => {
  const { data } = await api.get(
    `/progress/${courseId}`
  );
  return data;
};