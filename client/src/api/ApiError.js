export class ApiErrorResponse {
  constructor(statusCode, message, errors = [], stack) {
    this.statusCode = statusCode;
    this.message = message; // string
    this.errors = errors; // Ensure this is typed correctly, thsi is array []
    this.stack = stack; // Make stack optional
  }
}

class ApiError {
  constructor(errorMessage, errorData, errorResponse) {
    this.error = true;
    this.errorMessage = errorMessage;
    this.errorData = errorData;
    this.errorResponse = errorResponse;
  }
}

export { ApiError };
