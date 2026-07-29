import PDFDocument from "pdfkit";
import Course from "../models/Course.js";
import Progress from "../models/Progress.js";
import User from "../models/User.js";
import Quiz from "../models/Quiz.js";
import QuizAttempt from "../models/QuizAttempt.js";

// ================= DOWNLOAD CERTIFICATE =================

export const downloadCertificate = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { courseId } = req.params;

    // Course Progress Check
    const progress = await Progress.findOne({
      student: studentId,
      course: courseId,
    });

    if (!progress || progress.percentage < 100) {
      return res.status(400).json({
        success: false,
        message: "Complete the course first",
      });
    }

    // Quiz Pass Check
    const quiz = await Quiz.findOne({
      course: courseId,
    });

    if (quiz) {
      const attempt = await QuizAttempt.findOne({
        student: studentId,
        quiz: quiz._id,
        passed: true,
      });

      if (!attempt) {
        return res.status(400).json({
          success: false,
          message: "Pass the quiz first",
        });
      }
    }

    const student = await User.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({
        success: false,
        message: "Student or Course not found",
      });
    }

    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${course.title}-certificate.pdf`
    );

    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(32).text("Certificate of Completion", {
      align: "center",
    });

    doc.moveDown(2);

    doc.fontSize(20).text("This certifies that", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(28).text(student.name, {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(20).text("has successfully completed", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(26).text(course.title, {
      align: "center",
    });

    doc.moveDown(2);

    doc.fontSize(16).text(
      `Date: ${new Date(progress.updatedAt).toLocaleDateString()}`,
      {
        align: "center",
      }
    );

    doc.end();

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET MY CERTIFICATES =================

export const getMyCertificates = async (req, res) => {
  try {
    const studentId = req.user.id;

    const progress = await Progress.find({
      student: studentId,
      percentage: 100,
    }).populate("course", "title");

    const certificates = [];

    for (const item of progress) {
      if (!item.course) continue;

      const quiz = await Quiz.findOne({
        course: item.course._id,
      });

      if (!quiz) continue;

      const passedAttempt = await QuizAttempt.findOne({
        student: studentId,
        quiz: quiz._id,
        passed: true,
      });

      if (!passedAttempt) continue;

      certificates.push({
        courseId: item.course._id,
        courseTitle: item.course.title,
        completedAt: passedAttempt.updatedAt,
      });
    }

    res.status(200).json({
      success: true,
      certificates,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
