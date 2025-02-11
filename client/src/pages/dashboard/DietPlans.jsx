import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { usePlans } from "../../context/PlansContext";
import { createDietPlan } from "../../services/dietAndExerciseServises";
import { generateUserBio } from "../../utils/generateUserBio";
import {
  Button,
  ErrorMessage,
  LoadingScreen,
  DietCard,
  Divider,
} from "../../components";
import { generateAiDietPlan } from "../../services/aiServices";

const DietPlans = () => {
  const { auth } = useAuth();
  const { plans, setPlans } = usePlans();

  const bio = generateUserBio(auth.userData);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiDietPlan, setAiDietplan] = useState([]);
  const [promptMsg, setPromptMsg] = useState("");

  const handleSaveDietPlan = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await createDietPlan(aiDietPlan, auth.userId);
      // console.log("response atfer saving", response);
      setPlans((prev) => ({
        ...prev,
        dietPlans: aiDietPlan,
        loading: false,
      }));
      setAiDietplan([]);
      setLoading(false);
    } catch (error) {
      setError("Failed to save diet plan data");
      setLoading(false);
    }
  };

  const generateDietPlan = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await generateAiDietPlan(promptMsg, bio);
      console.log(response);
      setAiDietplan(response);
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error?.message || "Diet plan generate Error");
    }
  };

  return (
    <div className="bg-white">
      {error && (
        <>
          <ErrorMessage message={error} />
        </>
      )}

      {loading && (
        <>
          <LoadingScreen />
        </>
      )}

      <Button disabled={aiDietPlan.length > 0} onClick={generateDietPlan}>
        Get AI Generated Diet Plan
      </Button>

      {aiDietPlan.length > 0 && (
        <div className="flex flex-col justify-center items-center">
          <Button className="ml-3" onClick={handleSaveDietPlan}>
            Save Diet Plan
          </Button>
          <Divider />
          <h1 className="text-2xl font-bold">AI Generated Diet Plan</h1>
          <div className="">
            {aiDietPlan.map((diet, index) => (
              <div key={index} className=" mx-auto ">
                <DietCard dietData={diet} />
              </div>
            ))}
          </div>
        </div>
      )}

      {!aiDietPlan.length > 0 && (
        <div className="flex flex-col justify-center items-center">
          <Divider />
          <h1 className="text-2xl font-bold">Your Diet Plan</h1>
          <div className="">
            {Array.isArray(plans?.dietPlans) && plans.dietPlans.length > 0 ? (
              plans.dietPlans.map((diet) => (
                <div key={diet._id} className="mx-auto">
                  <DietCard key={diet._id} dietData={diet} />
                </div>
              ))
            ) : (
              <p>No diet plans saved yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlans;
