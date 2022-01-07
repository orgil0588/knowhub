const express = require("express");
const {
  register,
  login,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserPhoto,
} = require("../controller/users");
const router = express.Router();

router.route("/:id/photo").put(uploadUserPhoto);

router.route("/").get(getUsers).post(createUser);

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
