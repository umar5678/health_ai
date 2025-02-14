class ApiResponse {
  constructor(statusCode, data, message = "", success = true) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = success;
  }
}

export default ApiResponse;

// Example usage:
const minimalResponse = new ApiResponse(200, { id: 1, name: "Alice" });
console.log(minimalResponse);
