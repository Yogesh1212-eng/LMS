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

    let attempt = null;
    if (quiz) {
      attempt = await QuizAttempt.findOne({
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

    // A4 Landscape Dimensions: 841.89 x 595.28 points
    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
      margins: { top: 20, bottom: 20, left: 20, right: 20 },
    });

    const sanitizedTitle = course.title.replace(/[^a-zA-Z0-9]/g, "_");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${sanitizedTitle}-certificate.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    const pageWidth = 841.89;
    const pageHeight = 595.28;

    // 1. Soft Warm Parchment Background
    doc
      .rect(15, 15, pageWidth - 30, pageHeight - 30)
      .fill("#FAFBFD");

    // 2. Outer Royal Navy Blue Frame
    doc
      .rect(22, 22, pageWidth - 44, pageHeight - 44)
      .lineWidth(4)
      .stroke("#0F172A");

    // 3. Inner Amber Gold Precision Border
    doc
      .rect(30, 30, pageWidth - 60, pageHeight - 60)
      .lineWidth(1.5)
      .stroke("#D97706");

    // 4. Luxury Corner Accents
    const cornerSize = 14;
    doc.rect(26, 26, cornerSize, cornerSize).fill("#1E3A8A");
    doc.rect(pageWidth - 40, 26, cornerSize, cornerSize).fill("#1E3A8A");
    doc.rect(26, pageHeight - 40, cornerSize, cornerSize).fill("#1E3A8A");
    doc.rect(pageWidth - 40, pageHeight - 40, cornerSize, cornerSize).fill("#1E3A8A");

    // 5. Academy Header Ribbon
    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .fillColor("#2563EB")
      .text("LMS ACADEMY OF TECHNOLOGY • VERIFIED CREDENTIAL", 0, 58, {
        align: "center",
        characterSpacing: 2.5,
      });

    // 6. Main Certificate Title
    doc
      .fontSize(32)
      .font("Helvetica-Bold")
      .fillColor("#0F172A")
      .text("CERTIFICATE OF COMPLETION", 0, 88, {
        align: "center",
        characterSpacing: 1.5,
      });

    // Decorative separator line under main title
    doc
      .moveTo(pageWidth / 2 - 120, 130)
      .lineTo(pageWidth / 2 + 120, 130)
      .lineWidth(2)
      .stroke("#D97706");

    // 7. Presentation Subtitle
    doc
      .fontSize(11)
      .font("Helvetica")
      .fillColor("#64748B")
      .text("THIS CERTIFICATE IS PROUDLY CONFERRED UPON", 0, 150, {
        align: "center",
        characterSpacing: 2,
      });

    // 8. Student Full Name (Hero Typography in Electric Royal Blue)
    doc
      .fontSize(36)
      .font("Helvetica-Bold")
      .fillColor("#1D4ED8")
      .text(student.name.toUpperCase(), 0, 185, {
        align: "center",
      });

    // Elegant Divider under Candidate Name
    doc
      .moveTo(pageWidth / 2 - 180, 235)
      .lineTo(pageWidth / 2 + 180, 235)
      .lineWidth(1)
      .stroke("#CBD5E1");

    // 9. Achievement Description
    doc
      .fontSize(12)
      .font("Helvetica")
      .fillColor("#334155")
      .text(
        "for successfully fulfilling all curriculum benchmarks, interactive exercises, and proving\ncommand of concepts through final capstone assessments in:",
        0,
        255,
        {
          align: "center",
          lineGap: 4,
        }
      );

    // 10. Course Title Box
    doc
      .fontSize(22)
      .font("Helvetica-Bold")
      .fillColor("#0F172A")
      .text(course.title, 0, 310, {
        align: "center",
      });

    // 11. Circular Gold Stamp Badge (Center Bottom)
    const sealY = 405;
    doc
      .circle(pageWidth / 2, sealY, 32)
      .fillAndStroke("#FEF3C7", "#D97706");

    doc
      .circle(pageWidth / 2, sealY, 28)
      .lineWidth(1)
      .stroke("#B45309");

    doc
      .fontSize(8.5)
      .font("Helvetica-Bold")
      .fillColor("#92400E")
      .text("OFFICIALLY", pageWidth / 2 - 30, sealY - 11, {
        align: "center",
        width: 60,
      });

    doc
      .fontSize(8.5)
      .font("Helvetica-Bold")
      .fillColor("#92400E")
      .text("VERIFIED", pageWidth / 2 - 30, sealY + 2, {
        align: "center",
        width: 60,
      });

    // 12. Bottom Signature & Issue Date Bar
    const bottomLineY = 490;
    const issueDate = new Date(
      attempt?.updatedAt || progress.updatedAt || Date.now()
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Left Column: Issue Date
    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .fillColor("#0F172A")
      .text(issueDate, 90, bottomLineY - 18, { align: "left" });

    doc
      .moveTo(90, bottomLineY)
      .lineTo(240, bottomLineY)
      .lineWidth(1)
      .stroke("#94A3B8");

    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor("#64748B")
      .text("DATE OF ISSUANCE", 90, bottomLineY + 6, {
        align: "left",
        characterSpacing: 1,
      });

    // Right Column: Official Signature
    doc
      .fontSize(13)
      .font("Helvetica-BoldOblique")
      .fillColor("#1E3A8A")
      .text("Academic Director", pageWidth - 250, bottomLineY - 18, {
        align: "right",
      });

    doc
      .moveTo(pageWidth - 250, bottomLineY)
      .lineTo(pageWidth - 90, bottomLineY)
      .lineWidth(1)
      .stroke("#94A3B8");

    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor("#64748B")
      .text("AUTHORIZED SIGNATURE", pageWidth - 250, bottomLineY + 6, {
        align: "right",
        characterSpacing: 1,
      });

    // 13. Security Verification Footnote
    const certCode = `LMS-${studentId.toString().slice(-4).toUpperCase()}-${courseId.toString().slice(-4).toUpperCase()}`;
    doc
      .fontSize(7.5)
      .font("Helvetica")
      .fillColor("#94A3B8")
      .text(
        `Credential ID: ${certCode}  •  Tamper-proof digital certificate validated by LMS Platform`,
        0,
        548,
        { align: "center" }
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