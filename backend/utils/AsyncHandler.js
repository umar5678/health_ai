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
