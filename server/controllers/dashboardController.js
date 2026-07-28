import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";

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

    res.status(200).json({
      success: true,
      enrolledCourses,
      completedCourses,
      progress: averageProgress,
      certificates: completedCourses,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const teacherDashboard = async (req, res) => {
    try {
    const courses = await Course.find({ teacher: req.user.id });

    const totalCourses = courses.length;

    let totalStudents = 0;

    courses.forEach((course) => {
        totalStudents += course.studentsEnrolled.length;
    });

    res.status(200).json({
        success: true,
        totalCourses,
        totalStudents,
        courses,
    });

    } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
  }
};