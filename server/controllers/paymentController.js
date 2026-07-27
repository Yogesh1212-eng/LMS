import Razorpay from "razorpay";
import Course from "../models/Course.js";
import crypto from "crypto";


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
        return res.status(404).json({
        success: false,
        message: "Course not found",
    });
    }

    const options = {
        amount: course.price * 100, // paise
        currency: "INR",
        receipt: `receipt_${course._id}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
        success: true,
        order,
    });

} catch (error) {
    res.status(500).json({
    success: false,
    message: error.message,
    });
    }
};

export const verifyPayment = async (req, res) => {
    try {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        courseId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({
        success: false,
        message: "Payment Verification Failed",
        });
    }

    // Enroll student
    const course = await Course.findById(courseId);

    if (!course.studentsEnrolled.includes(req.user.id)) {
        course.studentsEnrolled.push(req.user.id);
        await course.save();
    }

    res.status(200).json({
        success: true,
        message: "Payment Verified Successfully",
        });

    } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
}
};



