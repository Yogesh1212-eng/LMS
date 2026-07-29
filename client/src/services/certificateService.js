import api from "./api";

export const getMyCertificates = async () => {
  const res = await api.get("/certificate");
  return res.data;
};

export const downloadCertificate = async (courseId) => {
  window.open(
    `https://lms-kjen.onrender.com/api/certificate/${courseId}`,
    "_blank"
  );
};
