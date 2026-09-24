import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  GraduationCap,
  LogOut,
} from "lucide-react";

function TeacherSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/teacher/dashboard",
      icon: <LayoutDashboard size={20} className="text-cyan-400 group-hover:scale-110 transition-transform" />,
    },
    {
      name: "My Courses",
      path: "/teacher/courses",
      icon: <BookOpen size={20} className="text-purple-400 group-hover:scale-110 transition-transform" />,
    },
    {
      name: "Create Course",
      path: "/teacher/create-course",
      icon: <PlusCircle size={20} className="text-emerald-400 group-hover:scale-110 transition-transform" />,
    },
  ];

  return (
    <aside className="w-72 bg-[#070A12] border-r border-slate-800/80 min-h-screen flex flex-col justify-between relative shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      {/* Background Soft Ambient Glow */}
      <div className="absolute top-10 left-0 w-36 h-36 bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-36 h-36 bg-indigo-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header / Brand */}
        <div className="p-6 border-b border-slate-800/80">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.25)]">
              <GraduationCap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight leading-none">
                LMS<span className="text-blue-500">.</span>
              </h1>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
                Instructor Hub
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 mt-2">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-blue-700 text-white font-semibold shadow-[0_0_20px_rgba(29,78,216,0.45)] border border-blue-500/40"
                    : "text-slate-300 hover:text-white hover:bg-slate-900/70 border border-transparent hover:border-slate-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="tracking-tight">{item.name}</span>

                  {/* Active Pip */}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.9)]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-slate-800/80 relative z-10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-rose-400 hover:text-white hover:bg-rose-500/15 border border-transparent hover:border-rose-500/30 font-medium text-sm transition-all duration-200 cursor-pointer"
        >
          <LogOut size={20} className="text-rose-400" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default TeacherSidebar;