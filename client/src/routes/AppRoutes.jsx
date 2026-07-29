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
import ProtectedRoute from "../components/protected/ProtectedRoute";
import TeacherLayout from "../layouts/TeacherLayout";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import TeacherCourses from "../pages/teacher/TeacherCourses";
import CreateCourse from "../pages/teacher/CreateCourse";
import EditCourse from "../pages/teacher/EditCourse";
import UploadLecture from "../pages/teacher/UploadLecture";
import EditLecture from "../pages/teacher/EditLecture";
import Certificates from "../pages/student/Certificates";
import CreateQuiz from "../pages/teacher/CreateQuiz";
import AddQuestion from "../pages/teacher/AddQuestion";
import TeacherCourseDetails from "../pages/teacher/TeacherCourseDetails";
import Quiz from "../pages/student/Quiz";

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
      <Route
  path="/student"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <DashboardLayout />
    </ProtectedRoute>
  }
>
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="courses" element={<MyCourses />} />
        <Route path="learn/:id" element={<Learning />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="certificates" element={<Certificates />}/>
        <Route path="quiz/:courseId" element={<Quiz />} />

        
      </Route>
    
    <Route
  path="/teacher"
  element={
    <ProtectedRoute allowedRoles={["teacher"]}>
      <TeacherLayout />
    </ProtectedRoute>
  }
>
  <Route path="dashboard" element={<TeacherDashboard />} />
  <Route path="courses" element={<TeacherCourses />} />
  <Route path="create-course" element={<CreateCourse />} />
  <Route path="edit-course/:id" element={<EditCourse />} />
  <Route path="course/:id/lectures" element={<UploadLecture />} />
  <Route path="lecture/edit/:id" element={<EditLecture />}/>
  <Route path="quiz/create" element={<CreateQuiz />} />
  <Route
  path="quiz/:quizId/questions"
  element={<AddQuestion />}/>
<Route
  path="course/:id"
  element={<TeacherCourseDetails />}
/>

</Route>

    </Routes>
  );
}

export default AppRoutes;