const User = require("../models/User");
const CustomError = require("../utils/customError.js");
const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const Category = require("../models/Category");
const paginate = require("../utils/paginate");

// register
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = user.getJsonWebToken();

  res.status(200).json({
    success: true,
    token,
    data: user,
  });
});
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Email болон нууц үгээ оруулна уу !!!", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomError("Email болон нууц үгээ зөв оруулна уу !!!", 401);
  }

  const ok = await user.checkPassword(password);

  if (!ok) {
    throw new CustomError("Email болон нууц үгээ зөв оруулна уу !!!", 401);
  }
  const token = user.getJsonWebToken();

  res.status(200).json({
    success: true,
    token,
    data: user,
  });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort;
  const select = req.query.select;

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Category);

  const users = await User.find(req.query, select)
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: users,
    pagination,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new CustomError("Хэрэглэгч олдсонгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
});
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new CustomError("Хэрэглэгч олдсонгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new CustomError("Хэрэглэгч олдсонгүй", 400);
  }
  user.remove();

  res.status(200).json({
    success: true,
    data: user,
  });
});
exports.uploadUserPhoto = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("+password");

  if (!user) {
    throw new CustomError("Ийм ID-тай Quiz байхгүй");
  }

  console.log(User.methods);

  const file = req.files.file;
  console.log(file);
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
    user.image = imageToBase64;
    user.save();
    res.status(200).json({
      success: true,
      data: user.image,
    });
  });
});
