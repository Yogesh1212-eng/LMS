import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { Code2, LogOut, LayoutDashboard, BookOpen, Menu, X, Home } from "lucide-react";

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const dashboardLink =
    user?.role === "teacher"
      ? "/teacher/dashboard"
      : "/student/dashboard";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#070A12]/85 backdrop-blur-xl border-b border-red-900/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      {/* Bottom Glowing Blue Line */}
      <div className="absolute -bottom-[1px] left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.8)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Cyan/Blue Tint */}
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              LMS<span className="text-red-500">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4 text-cyan-400" />
              <span>Home</span>
            </Link>

            <Link to="/courses" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Courses</span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-5 pl-4 border-l border-slate-800">
                <Link to={dashboardLink} className="flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-blue-400 transition-colors">
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                  <span>Dashboard</span>
                </Link>

                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-xs font-semibold text-slate-200 max-w-[120px] truncate">
                    {user?.name}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 bg-rose-500/15 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl transition-colors">
                  Login
                </Link>

                <Link to="/signup" className="text-sm font-semibold text-white bg-blue-700 hover:bg-blue-600 px-5 py-2.5 rounded-xl border border-blue-500/40 transition-all duration-200 shadow-[0_0_20px_rgba(29,78,216,0.4)] hover:-translate-y-0.5 cursor-pointer">
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-rose-400" /> : <Menu className="w-6 h-6 text-blue-400" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070A12]/95 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 space-y-4">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-base font-medium text-slate-300 hover:text-blue-400">
            <Home className="w-4 h-4 text-cyan-400" />
            <span>Home</span>
          </Link>

          <Link to="/courses" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-base font-medium text-slate-300 hover:text-blue-400">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>Courses</span>
          </Link>

          {isAuthenticated ? (
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold text-sm flex items-center justify-center">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="font-semibold text-slate-200">{user?.name}</span>
              </div>

              <Link to={dashboardLink} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-base font-medium text-slate-300 hover:text-blue-400">
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                <span>Dashboard</span>
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2 bg-rose-600/15 border border-rose-500/30 text-rose-400 py-2.5 rounded-xl font-semibold text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl bg-slate-900 border border-slate-800 font-semibold text-slate-300">
                Login
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl bg-blue-700 font-semibold text-white shadow-lg">
                Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;