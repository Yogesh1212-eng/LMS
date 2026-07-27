import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
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

    videoUrl: {
        type: String,
        required: true,
    },

    publicId: {
        type: String,
        required: true,
},
    duration: {
        type: Number,
        default: 0,
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
},
{
    timestamps: true,
    }
);

export default mongoose.model("Lecture", lectureSchema);