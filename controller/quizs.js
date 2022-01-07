const Quiz = require("../models/Quiz");
const Category = require("../models/Category");
const CustomError = require("../utils/customError.js");
const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
// api/v1/quizs
// api/v1/categories/:catId/quizs
exports.getQuizs = asyncHandler(async (req, res, next) => {
  const quizs = await Quiz.find().populate({
    path: "category",
    select: "name",
  });
  res.status(200).json({
    success: true,
    count: quizs.length,
    data: quizs,
  });
});

// api/v1/categories/:catId/quizs

exports.getCategoryQuizs = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.categoryId) {
    query = Quiz.find({ category: req.params.categoryId });
  } else {
    query = Quiz.find().populate({
      path: "category",
    });
  }

  const quizs = await query;

  res.status(200).json({
    success: true,
    count: quizs.length,
    data: quizs,
  });
});

exports.getQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    throw new CustomError("Ийм ID-тай Quiz байхгүй", 404);
  }

  res.status(200).json({
    success: true,
    data: quiz,
  });
});

exports.createQuiz = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.body.category);

  if (!category) {
    throw new CustomError("Ийм ID-тай Category байхгүй", 404);
  }

  req.body.createUser = req.userId;

  console.log(req.body.createUser);

  const quiz = await Quiz.create(req.body);

  res.status(200).json({
    success: true,
    data: quiz,
  });
});

exports.deleteQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findByIdAndDelete(req.params.id);

  if (!quiz) {
    throw new CustomError("Ийм ID-тай Quiz байхгүй", 404);
  }

  if (quiz.createUser.toString() !== req.userId) {
    throw new CustomError("Зөвхөн өөрийнхөө Quiz-г утсгах эрхтэй !!!", 403);
  }

  quiz.remove();

  res.status(200).json({
    success: true,
    data: quiz,
  });
});

exports.updateQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    throw new CustomError("Ийм ID-тай категори байхгүй", 400);
  }

  if (quiz.createUser.toString() !== req.userId) {
    throw new CustomError("Зөвхөн өөрийнхөө Quiz-г засварлах эрхтэй !!!", 403);
  }
  // || req.userRole !== "admin"
  // quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true,
  // });

  req.body.updateUser = req.userId;

  for (let attr in req.body) {
    quiz[attr] = req.body[attr];
  }
  quiz.save();

  res.status(200).json({
    success: true,
    data: quiz,
  });
});

// api/v1/quiz/:id/photo

exports.uploadQuizPhoto = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    throw new CustomError("Ийм ID-тай Quiz байхгүй");
  }

  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    throw new CustomError("Зөвхөн зураг хүлээж авна !!!");
  }

  if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
    throw new CustomError("Зураг хэтэрхий том байна!!!");
  }

  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new CustomError("Хуулахад алдаа гарлаа", 400);
    }
    let imagePath = `public/images/${file.name}`;
    console.log(imagePath);
    let imageToBase64 = fs.readFileSync(imagePath, "base64");
    quiz.image = imageToBase64;
    quiz.save();
    res.status(200).json({
      success: true,
      data: quiz.image,
    });
  });
});
