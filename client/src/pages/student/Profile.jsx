import React from "react";
import { useSelector } from "react-redux";
import { User, Mail, Shield, Calendar } from "lucide-react";

function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-4xl mx-auto w-full">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-8">
        Student Profile
      </h1>

      <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-800">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 border border-blue-400/40 flex items-center justify-center text-white font-black text-3xl shadow-[0_0_25px_rgba(29,78,216,0.4)]">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {user?.name || "Student"}
            </h2>
            <p className="text-slate-400 text-sm mt-1">{user?.email}</p>
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              {user?.role || "Learner"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Full Name</p>
              <p className="text-sm font-semibold text-white">{user?.name || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Email Address</p>
              <p className="text-sm font-semibold text-white">{user?.email || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Account Type</p>
              <p className="text-sm font-semibold text-white capitalize">{user?.role || "Student"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Status</p>
              <p className="text-sm font-semibold text-emerald-400">Active Member</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;