const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categories");
const { protect } = require("../middleware/protect");

const { getCategoryQuizs } = require("../controller/quizs");
// api/v1/categories/:id/quizs
router.route("/:categoryId/quizs").get(protect, getCategoryQuizs);

// api/v1/categories

router.route("/").get(protect, getCategories).post(protect, createCategory);
router
  .route("/:id")
  .get(protect, getCategory)
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

module.exports = router;
