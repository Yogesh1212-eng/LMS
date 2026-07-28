import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

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

      alert(res.data.message);

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#0B1120] flex justify-center items-center px-5 py-10">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-white">
          Create Account
        </h1>

        <p className="text-slate-400 text-center mt-3">
          Join our LMS Platform
        </p>

        {/* Role Selection */}

        <div className="mt-8">

          <h3 className="text-white mb-4 font-semibold">
            Signup As
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <button
              type="button"
              onClick={() => handleRole("student")}
              className={`rounded-xl p-4 border transition ${
                formData.role === "student"
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "bg-slate-800 border-slate-700 text-slate-300"
              }`}
            >
              🎓
              <br />
              Student
            </button>

            <button
              type="button"
              onClick={() => handleRole("teacher")}
              className={`rounded-xl p-4 border transition ${
                formData.role === "teacher"
                  ? "bg-cyan-600 border-cyan-600 text-white"
                  : "bg-slate-800 border-slate-700 text-slate-300"
              }`}
            >
              👨‍🏫
              <br />
              Teacher
            </button>

          </div>

        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-indigo-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-indigo-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none border border-slate-700 focus:border-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl text-white font-bold transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-slate-400 mt-8">
          Already have an account?
          <Link
            to="/login"
            className="text-cyan-400 ml-2 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </section>
  );
}

export default Signup;