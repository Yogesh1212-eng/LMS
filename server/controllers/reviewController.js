import Review from "../models/Review.js";
import Course from "../models/Course.js";

export const addReview = async (req, res) => {
    try {
    const { rating, comment } = req.body;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
        return res.status(404).json({
        success: false,
        message: "Course not found",
        });
    }

    // Student must be enrolled
    if (!course.studentsEnrolled.includes(req.user.id)) {
        return res.status(403).json({
        success: false,
        message: "Enroll in the course first",
        });
    }

    // Prevent duplicate reviews
    const alreadyReviewed = await Review.findOne({
        course: courseId,
        student: req.user.id,
    });

    if (alreadyReviewed) {
        return res.status(400).json({
        success: false,
        message: "You have already reviewed this course",
    });
    }

    const review = await Review.create({
        course: courseId,
        student: req.user.id,
        rating,
        comment,
    });

    course.reviews.push(review._id);

    const reviews = await Review.find({ course: courseId });

    const avgRating =
        reviews.reduce((sum, item) => sum + item.rating, 0) /
        reviews.length;

    course.ratings = avgRating;

    await course.save();

    res.status(201).json({
        success: true,
        message: "Review Added Successfully",
        review,
    });

} catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
    }
};

export const getCourseReviews = async (req, res) => {
    try {
    const reviews = await Review.find({
        course: req.params.courseId,
    })
        .populate("student", "name email")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: reviews.length,
        reviews,
    });

    } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
    }
};