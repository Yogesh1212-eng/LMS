import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B1120] text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#4f46e540,transparent_45%)]"></div>

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center relative">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >

          <span className="bg-indigo-500/20 text-indigo-300 px-5 py-2 rounded-full">
            🚀 India's Modern Learning Platform
          </span>

          <h1 className="text-6xl font-black mt-8 leading-tight">

            Learn

            <span className="text-cyan-400"> Skills</span>

            <br />

            Build Your

            <br />

            Dream Career

          </h1>

          <p className="mt-8 text-slate-400 text-xl leading-9 max-w-xl">

            Master MERN Stack, AI, Python, Cloud Computing and
            build industry-ready projects with expert mentors.

          </p>

          <div className="flex gap-5 mt-10">

            <Link
              to="/courses"
              className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-xl font-semibold transition shadow-lg"
            >
              Explore Courses
            </Link>

            <Link
              to="/signup"
              className="border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 px-8 py-4 rounded-xl transition"
            >
              Get Started
            </Link>

          </div>

        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4
          }}
          className="flex justify-center"
        >

          <img
            src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
            className="w-[420px]"
          />

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;