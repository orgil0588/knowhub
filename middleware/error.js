const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red.underline);

  const error = { ...err };

  // if (error.name === "CastError") {
  //   error.message = "Буруу ID оруулсан байна";
  //   error.statusCode = 400;
  // }

  if (error.code === 11000) {
    error.message = "Талбарын утга давхардсан байна.";
    error.statusCode = 400;
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error,
  });
};

module.exports = errorHandler;
