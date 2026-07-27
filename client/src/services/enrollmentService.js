import api from "./api";

export const enrollCourse = async (courseId) => {
  const { data } = await api.post(`/enroll/${courseId}`);
  return data;
};

export const getMyCourses = async () => {
  const { data } = await api.get("/enroll/my-courses");
  return data;
};