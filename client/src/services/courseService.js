import api from "./api";

export const getAllCourses = async () => {
  const { data } = await api.get("/course");
  return data;
};

export const getSingleCourse = async (id) => {
  const { data } = await api.get(`/course/${id}`);
  return data;
};