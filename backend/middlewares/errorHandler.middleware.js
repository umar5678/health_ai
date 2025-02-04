import { ApiError } from "../utils/ApiError.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "internal server error";
  let errors = err.errors || [];
  let success = false;

  if (err instanceof ApiError) {
    success = false;
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else {
    console.log("unhandled error: ", err.message, err.stack);
  }

  res.status(statusCode).json({
    message,
    errors,
    success,
  });
};


export default errorHandlerMiddleware