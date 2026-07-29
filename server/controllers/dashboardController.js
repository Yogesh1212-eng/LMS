import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";
import Quiz from "../models/Quiz.js";
import QuizAttempt from "../models/QuizAttempt.js";
import Lecture from "../models/Lecture.js";

// ================= STUDENT DASHBOARD =================

export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    const enrollments = await Enrollment.find({
      student: studentId,
    }).populate("course");

    const progress = await Progress.find({
      student: studentId,
    });

    const enrolledCourses = enrollments.length;

    const completedCourses = progress.filter(
      (item) => item.percentage === 100
    ).length;

    const totalPercentage = progress.reduce(
      (sum, item) => sum + item.percentage,
      0
    );

    const averageProgress =
      progress.length > 0
        ? Math.round(totalPercentage / progress.length)
        : 0;

    // ================= Certificate Count =================

    let certificates = 0;

    for (const item of progress) {
      if (item.percentage !== 100) continue;

      const quiz = await Quiz.findOne({
        course: item.course,
      });

      // Course me quiz nahi hai
      if (!quiz) continue;

      const passed = await QuizAttempt.findOne({
        student: studentId,
        quiz: quiz._id,
        passed: true,
      });

      if (passed) {
        certificates++;
      }
    }

    res.status(200).json({
      success: true,
      enrolledCourses,
      completedCourses,
      progress: averageProgress,
      certificates,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= TEACHER DASHBOARD =================

export const teacherDashboard = async (req, res) => {
  try {
    const teacherId = req.user.id;

    // Teacher Courses
    const courses = await Course.find({
      teacher: teacherId,
    });

    const courseIds = courses.map(course => course._id);

    // Total Courses
    const totalCourses = courses.length;

    // Total Students
    const totalStudents = await Enrollment.countDocuments({
      course: { $in: courseIds },
    });

    // Total Lectures
    const totalLectures = await Lecture.countDocuments({
      course: { $in: courseIds },
    });

    // Total Quizzes
    const totalQuizzes = await Quiz.countDocuments({
      course: { $in: courseIds },
    });

    // Total Revenue
    let totalRevenue = 0;

    courses.forEach(course => {
      totalRevenue +=
        course.price * course.studentsEnrolled.length;
    });

    res.json({
      success: true,
      totalCourses,
      totalStudents,
      totalLectures,
      totalQuizzes,
      totalRevenue,
      recentCourses: courses,
    });

  } catch (err) {

    res.status(500).json({
      success:false,
      message:err.message,
    });

  }
};