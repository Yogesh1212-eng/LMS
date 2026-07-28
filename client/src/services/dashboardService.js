import api from "./api";

export const getDashboard = async () => {
  const res = await api.get("/dashboard/student");
  return res.data;
};