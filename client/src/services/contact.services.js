import { ApiError } from "../api/ApiError";
import { ApiResponse } from "../api/ApiResponse";
import { GeneralApiRequest } from "../api/GeneralApiRequest";

class ContactService {
  constructor() {
    this.USER_BASE_URL = "/contact-us";
  }

  handleResponse(response) {
    if (response instanceof ApiResponse && response.success) {
      return response.data;
    } else if (response instanceof ApiResponse) {
      return new ApiError(response.message);
    } else {
      return response;
    }
  }

  async sendContactMessage(formData) {
    const apiRequest = new GeneralApiRequest(`${this.USER_BASE_URL}`);
    const response = await apiRequest.postRequest("/", formData);
    return this.handleResponse(response);
  }
}

export default new ContactService();
