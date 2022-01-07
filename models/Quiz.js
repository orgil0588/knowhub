const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 50,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      max: 250,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    tags: {
      type: Array,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: "true",
    },
    createUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    updateUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    questions: {
      type: Array,
      question: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      answers: {
        type: Array,
        required: true,
      },
      correctAnswer: {
        type: Number,
        required: true,
      },
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Quiz", QuizSchema);
