import Course from "../models/Course.js";

export const enrollCourse = async (req, res) => {
    try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
        return res.status(404).json({
        success: false,
        message: "Course not found",
        });
    }

    if (course.studentsEnrolled.includes(req.user.id)) {
        return res.status(400).json({
        success: false,
        message: "Already Enrolled",
        });
    }

    course.studentsEnrolled.push(req.user.id);

    await course.save();

    res.status(200).json({
        success: true,
        message: "Enrollment Successful",
        course,
    });
} catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
    }
};

export const getMyCourses = async (req, res) => {
    try {
    const courses = await Course.find({
        studentsEnrolled: req.user.id,
    }).populate("teacher", "name email");

    res.status(200).json({
        success: true,
        count: courses.length,
        courses,
    });

    } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
}
};

export const unenrollCourse = async (req, res) => {
    try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
        return res.status(404).json({
        success: false,
        message: "Course not found",
        });
    }

    course.studentsEnrolled = course.studentsEnrolled.filter(
        (student) => student.toString() !== req.user.id
    );

    await course.save();

    res.status(200).json({
        success: true,
        message: "Course Unenrolled Successfully",
        course,
    });

} catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
}
};

