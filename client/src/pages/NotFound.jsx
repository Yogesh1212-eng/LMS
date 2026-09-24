import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-[85vh] bg-[#070A12] flex flex-col justify-center items-center px-4 text-center relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute w-96 h-96 bg-blue-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-md">
        <h1 className="text-8xl sm:text-9xl font-black bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-slate-400 text-sm mt-2">
          The page you are looking for doesn't exist or has been relocated.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg transition hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;