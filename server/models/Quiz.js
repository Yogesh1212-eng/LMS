import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    passPercentage: {
      type: Number,
      default: 60,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Quiz", quizSchema);