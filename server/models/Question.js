import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    options: [
      {
        type: String,
      },
    ],

    correctAnswer: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);