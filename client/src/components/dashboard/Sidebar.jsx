import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";

import {
  LayoutDashboard,
  BookOpen,
  User,
  Settings,
  LogOut,
  Code2,
} from "lucide-react";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: <LayoutDashboard size={20} className="text-cyan-400 group-hover:scale-110 transition-transform" />,
    },
    {
      name: "My Courses",
      path: "/student/courses",
      icon: <BookOpen size={20} className="text-purple-400 group-hover:scale-110 transition-transform" />,
    },
    {
      name: "Profile",
      path: "/student/profile",
      icon: <User size={20} className="text-emerald-400 group-hover:scale-110 transition-transform" />,
    },
    {
      name: "Settings",
      path: "/student/settings",
      icon: <Settings size={20} className="text-amber-400 group-hover:scale-110 transition-transform" />,
    },
  ];

  return (
    <aside className="w-72 bg-[#070A12] border-r border-slate-800/80 min-h-screen flex flex-col justify-between relative shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      {/* Background Soft Blue Ambient Glow */}
      <div className="absolute top-10 left-0 w-36 h-36 bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-36 h-36 bg-indigo-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Logo / Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.25)]">
              <Code2 className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight leading-none">
                LMS<span className="text-blue-500">.</span>
              </h1>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
                Student Panel
              </p>
            </div>
          </Link>
        </div>

        {/* Menu Navigation */}
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

                  {/* Active Right Indicator Pip */}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.9)]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Section at Bottom */}
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

export default Sidebar;