import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";
import { loginSuccess } from "../redux/slices/authSlice";

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
    <div className="min-h-screen bg-[#0B1120] flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-[400px]"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-5 p-3 rounded-lg bg-slate-800 text-white outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-lg bg-slate-800 text-white outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-slate-400 text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-cyan-400 hover:underline"
          >
            Signup
          </Link>
        </p>
      </form>

    </div>
  );
}

export default Login;