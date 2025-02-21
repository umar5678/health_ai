import { ApiError } from "../api/ApiError";
import { ApiRequest } from "../api/ApiRequest";
import { ApiResponse } from "../api/ApiResponse";

class PlansServices {
  constructor() {
    this.USER_DIET_URL = "/user/diet";
    this.USER_EXERCISE_URL = "/user/exercise";
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

  async GetDietPlan(userId) {
    const apiRequest = new ApiRequest(`${this.USER_DIET_URL}`);
    const response = apiRequest.getRequest(`/${userId}`);

    return this.handleResponse(response);
  }

  async CreateDietPlan(dietPlanData, userId) {
    // Add dietPlanData and userId as parameters
    const apiRequest = new ApiRequest(`${this.USER_DIET_URL}`);
    const response = await apiRequest.postRequest(`/${userId}`, {
      days: dietPlanData,
    }); // Include data in the request body

    return this.handleResponse(response);
  }

  async UpdateDietPlan(dietPlanData, userId) {
    // Add dietPlanData and userId as parameters
    const apiRequest = new ApiRequest(`${this.USER_DIET_URL}`);
    const response = await apiRequest.putRequest(`/${userId}`, {
      days: dietPlanData,
    }); // Use PUT for updates

    return this.handleResponse(response);
  }

  async GetExercisePlan(userId) {
    const apiRequest = new ApiRequest(`${this.USER_EXERCISE_URL}`);
    const response = await apiRequest.getRequest(`/${userId}`);

    return this.handleResponse(response);
  }

  async CreateExercisePlan(exerciseData, userId) {
    // Add exerciseData and userId as parameters
    const apiRequest = new ApiRequest(`${this.USER_EXERCISE_URL}`);
    const response = await apiRequest.postRequest(`/${userId}`, {
      days: exerciseData,
    }); // Include data in the request body

    return this.handleResponse(response);
  }

  async UpdateExercisePlan(exerciseData, userId) {
    // Add exerciseData and userId as parameters
    const apiRequest = new ApiRequest(`${this.USER_EXERCISE_URL}`);
    const response = await apiRequest.putRequest(`/${userId}`, {
      days: exerciseData,
    }); // Use PUT for updates

    return this.handleResponse(response);
  }
}

export default new PlansServices(); // Export an instance of the class

//
//

// import { interceptedApi } from "../api/api";

// const ExerciseBaseEndpoint = "/user/exercise";
// const DietBaseEndPoint = "/user/diet";

// // {http://localhost:8000/api/v1}{/user/exercise}{/:userId} example for both create and update

// export const getUserExerciseRoutine = async (userId) => {
//   try {
//     const response = await interceptedApi.get(
//       `${ExerciseBaseEndpoint}/${userId}`
//     );
//     return response;
//   } catch (error) {
//     console.error(error.message || "get exercise errror");
//     throw error;
//   }
// };

// export const createExerciseRoutine = async (exerciseData, userId) => {
//   try {
//     const response = await interceptedApi.post(
//       `${ExerciseBaseEndpoint}/${userId}`,
//       { days: exerciseData }
//     );
//     return response;
//   } catch (error) {
//     console.error(error.message || "Create exercise routine Failed");
//     throw error;
//   }
// };

// export const createDietPlan = async (dietPlanData, userId) => {
//   try {
//     const response = await interceptedApi.post(
//       `${DietBaseEndPoint}/${userId}`,
//       { days: dietPlanData }
//     );
//     return response;
//   } catch (error) {
//     console.error(error.message || "Create diet plan Failed");
//     throw error;
//   }
// };

// export const getUserDietPlan = async (userId) => {
//   try {
//     const response = await interceptedApi.get(`${DietBaseEndPoint}/${userId}`);
//     return response;
//   } catch (error) {
//     console.error(error.message || "get diet plan errror");
//     throw error;
//   }
// };
