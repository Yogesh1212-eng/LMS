import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { loginSuccess } from "../redux/slices/authSlice";
import { Mail, Lock, LogIn, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      dispatch(loginSuccess(res.data));
      alert("Login Successful");

      const role = res.data.user.role;
      if (role === "student") {
        navigate("/student/dashboard");
      } else if (role === "teacher") {
        navigate("/teacher/dashboard");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] flex justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Vibrant Multi-Color Ambient Glow Spheres */}
      <div className="absolute -top-20 -left-20 w-80 sm:w-96 h-80 sm:h-96 bg-purple-600/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-80 sm:w-96 h-80 sm:h-96 bg-blue-600/20 rounded-full blur-[130px] pointer-events-none" />

      {/* Glass Card Container */}
      <div className="w-full max-w-md bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/95 border border-slate-800/80 rounded-3xl p-8 sm:p-10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative z-10">
        
        {/* Header Tag */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/60 shadow-[0_0_20px_rgba(37,99,235,0.25)] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-semibold text-blue-200">Welcome Back</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Account{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">
              Login
            </span>
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xs">
            Enter your credentials to continue your learning journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
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
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <a href="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition">
                Forgot?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-500 absolute left-4 pointer-events-none" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-[0_0_25px_rgba(29,78,216,0.4)] hover:shadow-[0_0_30px_rgba(29,78,216,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-60"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? "Authenticating..." : "Sign In to Account"}</span>
          </button>
        </form>

        {/* Footer */}
        <p className="text-slate-400 text-xs sm:text-sm text-center mt-7">
          Don't have an account yet?{" "}
          <Link
            to="/signup"
            className="text-cyan-400 font-bold hover:text-cyan-300 transition ml-1"
          >
            Create Free Account
          </Link>
        </p>

        {/* Trust Badges */}
        <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted Session • JWT Authenticated</span>
        </div>
      </div>
    </div>
  );
}

export default Login;