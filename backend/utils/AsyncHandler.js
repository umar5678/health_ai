export const AsyncHandler = (requestHandler, logErrors = true) => {
  return async (req, res, next) => {
    try {
      const result = await requestHandler(req, res, next);
      return result;
    } catch (error) {
      if (logErrors) console.error("Error:", error.message, error.stack);
      next(error);
    }
  };
};

// Purpose: Wraps route handlers to catch errors and pass them to the error handling middleware.
// Good: Centralized error catching. Logging errors (with stack trace) is excellent for debugging.

// Production Considerations:
// Logging: While console.error is okay for development, in production, use a more robust logging library like Winston or Bunyan. These libraries allow you to control log levels, format logs, and send logs to different destinations (files, cloud services, etc.).
// Error Details in Production: In production, you generally don't want to send the full stack trace to the client. It could expose sensitive information. You can log the stack trace on the server but send a more generic error message to the client. Your current code logs the error and stack trace to the console, which is good, and then passes the error to the middleware.
