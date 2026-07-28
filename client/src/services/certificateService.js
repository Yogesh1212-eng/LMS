import api from "./api";

export const getMyCertificates = async () => {
  const res = await api.get("/certificate");
  return res.data;
};

export const downloadCertificate = async (courseId) => {
  window.open(
    `http://localhost:5000/api/certificate/${courseId}`,
    "_blank"
  );
};