import react, { createContext, useEffect, useState, useContext } from "react";
import {
  getUserExerciseRoutine,
  getUserDietPlan,
} from "../services/dietAndExerciseServises";
import { useAuth } from "./AuthContext";

const PlansContext = createContext();

export const PlansProvider = ({ children }) => {
  const { auth } = useAuth();

  const [plans, setPlans] = useState({
    exerciseRoutines: [],
    dietPlans: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const exerciseResponse = await getUserExerciseRoutine(auth.userId);
        const exerciseData = exerciseResponse.data?.data.days;

        const dietResponse = await getUserDietPlan(auth.userId); // Fetch diet plans
        const dietData = dietResponse.data?.data.days; // Adjust based on your API response
        console.log(dietData)
        setPlans((prev) => ({
          ...prev,
          exerciseRoutines: exerciseData,
          dietPlans: dietData,
          loading: false,
        }));
      } catch (error) {
        console.error("Error fetching plans:", error);
        setPlans((prev) => ({ ...prev, loading: false, error: error.message }));
      }
    };

    if (auth.userId) {
      if (plans.exerciseRoutines.length !== 7 || plans?.dietPlans?.length !== 7) {
        fetchPlans();
      } else {
        setPlans((prev) => ({ ...prev, loading: false }));
      }
    } else {
      setPlans((prev) => ({ ...prev, loading: false }));
    }
  }, [auth.userId, plans.exerciseRoutines, plans.dietPlans]);

  return (
    <PlansContext.Provider value={{ plans, setPlans }}>
      {" "}
      {/* Provide the plans data and loading/error states */}
      {children}
    </PlansContext.Provider>
  );
};

export const usePlans = () => {
  const context = useContext(PlansContext);
  if (context === undefined) {
    throw new Error("usePlans must be used within a PlansProvider");
  }
  return context;
};
