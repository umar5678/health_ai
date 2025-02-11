import { interceptedApi } from "../api/api";

const ExerciseBaseEndpoint = "/user/exercise";
const DietBaseEndPoint = "/user/diet";

// {http://localhost:8000/api/v1}{/user/exercise}{/:userId} example for both create and update

export const getUserExerciseRoutine = async (userId) => {
  try {
    const response = await interceptedApi.get(
      `${ExerciseBaseEndpoint}/${userId}`
    );
    return response;
  } catch (error) {
    console.error(error.message || "get exercise errror");
    throw error;
  }
};

export const createExerciseRoutine = async (exerciseData, userId) => {
  try {
    const response = await interceptedApi.post(
      `${ExerciseBaseEndpoint}/${userId}`,
      { days: exerciseData }
    );
    return response;
  } catch (error) {
    console.error(error.message || "Create exercise routine Failed");
    throw error;
  }
};

export const createDietPlan = async (dietPlanData, userId) => {
  try {
    const response = await interceptedApi.post(
      `${DietBaseEndPoint}/${userId}`,
      { days: dietPlanData }
    );
    return response;
  } catch (error) {
    console.error(error.message || "Create diet plan Failed");
    throw error;
  }
};

export const getUserDietPlan = async (userId) => {
  try {
    const response = await interceptedApi.get(`${DietBaseEndPoint}/${userId}`);
    return response;
  } catch (error) {
    console.error(error.message || "get diet plan errror");
    throw error;
  }
};

