import React, { createContext, useEffect, useState, useContext } from "react";
import plansServices from "../services/dietAndExerciseServises";
import { useAuth } from "./AuthContext";

const PlansContext = createContext();

export const PlansProvider = ({ children }) => {
  const { userId } = useAuth();

  const [plans, setPlans] = useState({
    exerciseRoutines: [],
    dietPlans: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const exerciseData = await plansServices.GetExercisePlan(userId);
        const dietData = await plansServices.GetDietPlan(userId);
        console.log("diet :", dietData)
        console.log("exercise:", exerciseData)
        if (exerciseData instanceof Error || dietData instanceof Error) {
          throw new Error(
            exerciseData.errorMessage ||
              dietData.errorMessage ||
              "Error fetching plans"
          );
        }

        setPlans({
          exerciseRoutines: exerciseData?.data?.days || [],
          dietPlans: dietData?.data?.data?.days || [],
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching plans:", error);
        setPlans({ ...plans, loading: false, error: error.message });
      }
    };

    if (userId) {
      fetchPlans();
    } else {
      setPlans({ ...plans, loading: false, error: null });
    }
  }, [userId]);

  const createDietPlan = async (dietPlanData) => {
    setPlans({ ...plans, loading: true, error: null }); // Set loading while creating
    try {
      const response = await plansServices.CreateDietPlan(dietPlanData, userId);
      console.log(response);
      if (response instanceof Error) {
        throw new Error(response.errorMessage || "Error creating diet plan");
      }
      const newDietPlan = response.data.days;
      setPlans({
        ...plans,
        dietPlans: [...plans.dietPlans, newDietPlan], // Add the new plan
        loading: false,
        error: null,
      });
      return newDietPlan; // Return the created diet plan data
    } catch (error) {
      console.error("Error creating diet plan:", error);
      setPlans({ ...plans, loading: false, error: error.message });
      return null; // or throw the error if you want to handle it in the component
    }
  };

  const updateDietPlan = async (dietPlanData) => {
    setPlans({ ...plans, loading: true, error: null });
    try {
      const response = await plansServices.UpdateDietPlan(
        dietPlanData,
        userId
      );
      console.log("getting res from BE: ", response.data.days)
      if (response instanceof Error) {
        throw new Error(response.errorMessage || "Error updating diet plan");
      }
      const updatedDietPlans = response.data.days
    

      setPlans({
        ...plans,
        dietPlans: updatedDietPlans,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error updating diet plan:", error);
      setPlans({ ...plans, loading: false, error: error.message });
      return null;
    }
  };

  // const updateDietPlan = async (dietPlanData) => {
  //   setPlans({ ...plans, loading: true, error: null });
  //   try {
  //     const response = await plansServices.UpdateDietPlan(dietPlanData, userId);
  //     if (response instanceof Error) {
  //       throw new Error(response.message || "Error updating diet plan");
  //     }

  //     const updatedDietPlans = response.data.days;

  //     setPlans({
  //       ...plans,
  //       dietPlans: updatedDietPlans,
  //       loading: false,
  //       error: null,
  //     });
  //     return updatedDietPlans;
  //   } catch (error) {
  //     console.error("Error updating diet plan:", error);
  //     setPlans({ ...plans, loading: false, error: error.message });
  //     return null;
  //   }
  // };

  const createExercisePlan = async (exerciseData) => {
    setPlans({ ...plans, loading: true, error: null });
    try {
      const response = await plansServices.CreateExercisePlan(
        exerciseData,
        userId
      );
      if (response instanceof Error) {
        throw new Error(
          newExercisePlan.message || "Error creating exercise plan"
        );
      }
      const newExercisePlan = response.data.days;
      setPlans({
        ...plans,
        exerciseRoutines: [...plans.exerciseRoutines, newExercisePlan],
        loading: false,
        error: null,
      });
      return newExercisePlan;
    } catch (error) {
      console.error("Error creating exercise plan:", error);
      setPlans({ ...plans, loading: false, error: error.message });
      return null;
    }
  };

  const updateExercisePlan = async (exerciseData) => {
    setPlans({ ...plans, loading: true, error: null });
    try {
      const response = await plansServices.UpdateExercisePlan(
        exerciseData,
        userId
      );
      if (response instanceof Error) {
        throw new Error(
          updatedExercisePlan.message || "Error updating exercise plan"
        );
      }
      const updatedExercisePlan = response.data.days;

      setPlans({
        ...plans,
        exerciseRoutines: updatedExercisePlan,
        loading: false,
        error: null,
      });
      return updatedExercisePlan;
    } catch (error) {
      console.error("Error updating exercise plan:", error);
      setPlans({ ...plans, loading: false, error: error.message });
      return null;
    }
  };

  const value = {
    plans,
    setPlans,
    createDietPlan,
    updateDietPlan,
    createExercisePlan,
    updateExercisePlan,
  };

  return (
    <PlansContext.Provider value={value}>{children}</PlansContext.Provider>
  );
};

export const usePlans = () => {
  const context = useContext(PlansContext);
  if (context === undefined) {
    throw new Error("usePlans must be used within a PlansProvider");
  }
  return context;
};
