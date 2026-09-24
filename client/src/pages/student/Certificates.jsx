import { useEffect, useState } from "react";
import {
  getMyCertificates,
  downloadCertificate,
} from "../../services/certificateService";
import { Award, Download, Calendar, Sparkles } from "lucide-react";

function Certificates() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      const res = await getMyCertificates();
      setCertificates(res.certificates || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Credentials
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            My Certificates
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Download and share your completed course qualifications.
          </p>
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Award className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">No certificates yet</h3>
          <p className="text-slate-400 text-sm mt-1">
            Complete all course lectures and pass the final quiz to unlock your certificate.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {certificates.map((item) => (
            <div
              key={item.courseId}
              className="group relative bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/95 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors">
                    {item.courseTitle}
                  </h2>
                  <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm mt-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span>
                      Completed on {new Date(item.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => downloadCertificate(item.courseId)}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm px-6 py-3 rounded-xl border border-emerald-400/30 transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 cursor-pointer shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Certificates;