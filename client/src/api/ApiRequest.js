import { interceptedApi } from "./api";
import { asyncHandler } from "./asyncHandler";

class ApiRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(method, endpoint, data = null, headers = {}, queryParams = {}) {
    return asyncHandler(() =>
      interceptedApi({
        method,
        url: `${this.baseUrl}${endpoint}`,
        data,
        headers,
        params: queryParams,
      })
    );
  }

  async getRequest(endpoint, queryParams = {}, headers = {}) {
    return this.request("GET", endpoint, null, headers, queryParams);
  }

  async postRequest(endpoint, body, headers = {}) {
    return this.request("POST", endpoint, body, headers);
  }

  async putRequest(endpoint, body, headers = {}) {
    return this.request("PUT", endpoint, body, headers);
  }

  async deleteRequest(endpoint, headers = {}) {
    return this.request("DELETE", endpoint, null, headers);
  }

  async patchRequest(endpoint, body, headers = {}) {
    return this.request("PATCH", endpoint, body, headers);
  }

  async postFormDataRequest(endpoint, formData, headers = {}) {
    return asyncHandler(() =>
      interceptedApi({
        method: "POST",
        url: `${this.baseUrl}${endpoint}`,
        data: formData,
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      })
    );
  }
}

export { ApiRequest };
