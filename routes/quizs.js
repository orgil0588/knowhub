const express = require("express");
const { protect } = require("../middleware/protect");
const {
  getQuizs,
  getQuiz,
  createQuiz,
  deleteQuiz,
  updateQuiz,
  uploadQuizPhoto,
} = require("../controller/quizs");

const router = express.Router();

router.route("/:id/photo").put(protect, uploadQuizPhoto);

router
  .route("/:id")
  .get(protect, getQuiz)
  .delete(protect, deleteQuiz)
  .put(protect, updateQuiz);

router.route("/").get(protect, getQuizs).post(protect, createQuiz);



module.exports = router;
