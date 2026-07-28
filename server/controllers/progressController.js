import Progress from "../models/Progress.js";
import Course from "../models/Course.js";
import Lecture from "../models/Lecture.js";

// ================= MARK LECTURE COMPLETE =================

export const markLectureComplete = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const studentId = req.user.id;

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    const course = await Course.findById(lecture.course);

    let progress = await Progress.findOne({
      student: studentId,
      course: course._id,
    });

    if (!progress) {
      progress = await Progress.create({
        student: studentId,
        course: course._id,
        completedLectures: [],
      });
    }

    if (
      progress.completedLectures.includes(lectureId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Lecture already completed",
      });
    }

    progress.completedLectures.push(lectureId);

    progress.percentage = Math.round(
      (progress.completedLectures.length /
        course.lectures.length) *
        100
    );

    await progress.save();

    res.status(200).json({
      success: true,
      message: "Lecture Completed",
      progress,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getProgress = async (req, res) => {
  try {

    const progress = await Progress.findOne({
      student: req.user.id,
      course: req.params.courseId,
    });

    if (!progress) {

      return res.status(200).json({
        success: true,
        progress: {
          percentage: 0,
          completedLectures: [],
        },
      });

    }

    res.status(200).json({
      success: true,
      progress,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};