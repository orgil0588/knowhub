const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");
const cors = require("cors");
const fileupload = require("express-fileupload");
const connectDB = require("./config/db");
const categoriesRoutes = require("./routes/categories");
const quizsRoutes = require("./routes/quizs");
const usersRoutes = require("./routes/users");
const colors = require("colors");
const errorHandler = require("./middleware/error");

const app = express();

// Config setup process.env
dotenv.config({ path: "./config/config.env" });

connectDB();

let accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // log daily
  path: path.join(__dirname, "log"),
});

// var whitelist = ["http://localhost:3000"];

// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by cors"));
//     }
//   },
// };

// Body parser
app.use(express.json());
app.use(cors());
app.use(fileupload());
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/quizs", quizsRoutes);
app.use("/api/v1/users", usersRoutes);


app.use(errorHandler);

const server = app.listen(
  process.env.PORT,
  console.log(`Express server: ${process.env.PORT}`.underline.green.bold)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error module : ${err.message}`.underline.red.bold);
  server.close(() => {
    process.exit(1);
  });
});
