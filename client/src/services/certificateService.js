import api from "./api";

export const downloadCertificate = async (courseId) => {
  const response = await api.get(`/certificate/${courseId}`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(
    new Blob([response.data], { type: "application/pdf" })
  );

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "certificate.pdf");

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
};

export const getMyCertificates = async () => {
  const res = await api.get("/certificate/my");
  return res.data;
};