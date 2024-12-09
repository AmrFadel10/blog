module.exports = globalError = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    status: error.status,
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : null,
    isOperational: error.isOperational ? error.isOperational : false,
  });
};
