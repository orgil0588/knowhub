const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/customError");
const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new CustomError("Эхлээд нэвтэрч орно уу", 401);
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    throw new CustomError("Token байхгүй байна", 400);
  }

  const tokenObj = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = tokenObj.id;
  req.userRole = tokenObj.role;

  next();
});
