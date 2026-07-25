import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
    },

    thumbnail: {
        type: String,
        default: "",
    },

    price: {
        type: Number,
        required: true,
        default: 0,
    },

    category: {
        type: String,
        required: true,
    },

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    lectures: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
        },
    ],

    studentsEnrolled: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
    ],

    ratings: {
        type: Number,
        default: 0,
    },
    },

    {
    timestamps: true,
    }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;