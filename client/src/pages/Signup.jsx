import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  User,
  Mail,
  Lock,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRole = (role) => {
    setFormData({
      ...formData,
      role,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/register", formData);
      alert(res.data.message || "Registration Successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#070A12] flex justify-center items-center px-4 py-16 relative overflow-hidden">
      {/* Colorful Accent Lights */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Glass Box */}
      <div className="w-full max-w-lg bg-gradient-to-b from-slate-900/95 via-slate-900/75 to-slate-950/95 border border-slate-800/90 rounded-3xl p-8 sm:p-10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative z-10">
        
        {/* Heading */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/60 shadow-[0_0_20px_rgba(37,99,235,0.25)] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-semibold text-blue-200">Get Started Today</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Create Your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">
              Account
            </span>
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
            Join thousands of developers and educators worldwide
          </p>
        </div>

        {/* Role Selector with Vibrant Neon Border Highlights */}
        <div className="mt-8">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 text-center sm:text-left">
            Choose Your Profile Type
          </label>

          <div className="grid grid-cols-2 gap-4">
            {/* Student Card */}
            <button
              type="button"
              onClick={() => handleRole("student")}
              className={`p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col items-center ${
                formData.role === "student"
                  ? "bg-gradient-to-b from-blue-600/20 to-indigo-600/20 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)] text-white"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                  formData.role === "student"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                    : "bg-slate-900 text-slate-500"
                }`}
              >
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm">Student</span>
              <span className="text-[11px] text-slate-400 mt-0.5">Learn & Upskill</span>
              {formData.role === "student" && (
                <CheckCircle2 className="w-4 h-4 text-cyan-400 absolute top-3 right-3" />
              )}
            </button>

            {/* Teacher Card */}
            <button
              type="button"
              onClick={() => handleRole("teacher")}
              className={`p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col items-center ${
                formData.role === "teacher"
                  ? "bg-gradient-to-b from-purple-600/20 to-pink-600/20 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.25)] text-white"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                  formData.role === "teacher"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-400/40"
                    : "bg-slate-900 text-slate-500"
                }`}
              >
                <User className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm">Instructor</span>
              <span className="text-[11px] text-slate-400 mt-0.5">Teach & Mentor</span>
              {formData.role === "teacher" && (
                <CheckCircle2 className="w-4 h-4 text-purple-400 absolute top-3 right-3" />
              )}
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-slate-500 absolute left-4 pointer-events-none" />
              <input
                type="text"
                name="name"
                placeholder="Yogesh Maurya"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-500 absolute left-4 pointer-events-none" />
              <input
                type="email"
                name="email"
                placeholder="name@domain.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Create Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-500 absolute left-4 pointer-events-none" />
              <input
                type="password"
                name="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-60"
          >
            <span>{loading ? "Registering Account..." : "Create Free Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs sm:text-sm mt-7">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 font-bold hover:text-cyan-300 transition ml-1"
          >
            Login Here
          </Link>
        </p>

        <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Zero Spam • Instant Dashboard Access</span>
        </div>
      </div>
    </section>
  );
}

export default Signup;