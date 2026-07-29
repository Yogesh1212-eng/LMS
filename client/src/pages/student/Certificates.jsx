import { useEffect, useState } from "react";
import {
  getMyCertificates,
  downloadCertificate,
} from "../../services/certificateService";

function Certificates() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      const res = await getMyCertificates();
      setCertificates(res.certificates);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8 text-white">
        My Certificates
      </h1>

      {certificates.length === 0 ? (

        <div className="text-slate-400">
          No certificates yet.
        </div>

      ) : (

        <div className="space-y-5">

          {certificates.map((item) => (

            <div
              key={item.courseId}
              className="bg-slate-900 rounded-xl p-6 flex justify-between items-center"
            >

              <div>

                <h2 className="text-2xl font-bold text-white">
                  {item.courseTitle}
                </h2>

                <p className="text-slate-400 mt-2">
                  Completed :
                  {" "}
                  {new Date(item.completedAt).toLocaleDateString()}
                </p>

              </div>

              <button
                onClick={() =>
                  downloadCertificate(item.courseId)
                }
                className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg text-white"
              >
                Download PDF
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Certificates;
