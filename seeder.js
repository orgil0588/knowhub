const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const Category = require("./models/Category");
const Quiz = require("./models/Quiz");
const User = require("./models/User");

dotenv.config({ path: "./config/config.env" });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = JSON.parse(
  fs.readFileSync(__dirname + "/data/categories.json", "utf-8")
);
const quizs = JSON.parse(
  fs.readFileSync(__dirname + "/data/quiz.json", "utf-8")
);
const users = JSON.parse(
  fs.readFileSync(__dirname + "/data/users.json", "utf-8")
);

const importData = async () => {
  try {
    await Category.create(categories);
    await Quiz.create(quizs);
    await User.create(users);

    console.log("Import success".green.inverse);
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Category.deleteMany();
    await Quiz.deleteMany();
    await User.deleteMany();

    console.log("Delete success".red.inverse);
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
