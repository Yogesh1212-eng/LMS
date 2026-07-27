import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";
import Courses from "../pages/Courses";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CourseDetails from "../pages/CourseDetails";

import DashboardHome from "../pages/student/DashboardHome";
import MyCourses from "../pages/student/MyCourses";
import Profile from "../pages/student/Profile";
import Settings from "../pages/student/Settings";
import Learning from "../pages/student/Learning";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Student Dashboard */}
      <Route path="/student" element={<DashboardLayout />}>
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="courses" element={<MyCourses />} />
        <Route path="learn/:id" element={<Learning />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    

    </Routes>
  );
}

export default AppRoutes;