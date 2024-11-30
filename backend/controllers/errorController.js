const AppError = require("./../utils/appError");

const HandleCastError = (err) => {
  err.message = `Invalid path (${err.path})`;
  err.statusCode = 400;
  return new AppError(err.message, err.statusCode);
};

const HandleDuplicateValues = (error) => {
  err.message = "Dupliacte values are not allowed!";
  err.statusCode = 400;
  return new AppError(err.message, err.statusCode);
};

const sendError = (err, res) => {
  console.log("Error: ", err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

// const tokenExpired = (error) => {
//     err.message = "Please login again!"
//     err.statusCode = 400;
//     return new AppError(err.message, err.statusCode)
// }

module.exports = (err, req, res, next) => {
  // Set default values in case they are not defined
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };
  if (error.name === "CastError") error = HandleCastError(error);
  if (error.code === 1100) error = HandleDuplicateValues(error);
  // if (error.name === "TokenExpiredError") error = tokenExpired(errpr);

  sendError(err, res);
};
