import Course from "../models/Course.js";

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