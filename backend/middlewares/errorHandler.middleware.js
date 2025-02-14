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

export default errorHandlerMiddleware;

// // errorHandlerMiddleware.js
// import { ApiError } from "../utils/ApiError.js";

// const errorHandlerMiddleware = (err, req, res, next) => {
//   let statusCode = err.statusCode || 500;
//   let message = err.message || "Something went wrong"; // Default generic message
//   let errors = err.errors || [];
//   let success = false;
//   let logMessage = err.message; // Store the original message for logging
//   let logStack = err.stack;     // Store the stack trace for logging

//   if (err instanceof ApiError) {
//     success = false;
//     statusCode = err.statusCode;
//     message = err.message;
//     errors = err.errors;
//   } else {
//     console.error("Unhandled Error:", logMessage, logStack); // Log full details
//     message = "Something went wrong"; // Generic message for client
//   }

//   res.status(statusCode).json({
//     message,
//     errors,
//     success,
//   });
// };

// export default errorHandlerMiddleware;
