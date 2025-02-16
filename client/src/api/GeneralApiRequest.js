import { generalApi } from "./api";
import { asyncHandler } from "./asyncHandler";

class GeneralApiRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/+$/, ""); // Remove trailing slashes
  }
  async request(
    method,
    endpoint = "",
    data = null,
    headers = {},
    queryParams = {}
  ) {
    if (typeof endpoint !== "string") {
      // console.error("Invalid endpoint:", endpoint);
      throw new Error("Endpoint must be a string.");
    }

    const url = `${this.baseUrl}/${endpoint}`.replace(/\/+/g, "/"); // Ensure no double slashes

    return asyncHandler(() =>
      generalApi({
        method,
        url,
        data,
        headers,
        params: queryParams,
      })
    );
  }

  async getRequest(endpoint, queryParams = {}, headers = {}) {
    return this.request("GET", endpoint, null, headers, queryParams);
  }

  async postRequest(endpoint, body = {}, headers = {}) {
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
}

export { GeneralApiRequest };
