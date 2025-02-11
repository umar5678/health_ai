import React, { useState } from "react";
import {
  Button,
  Divider,
  ErrorMessage,
  ExerciseCard,
  LoadingScreen,
} from "../../components";
import { createExerciseRoutine } from "../../services/dietAndExerciseServises";
import { useAuth } from "../../context/AuthContext";
import { usePlans } from "../../context/PlansContext";
import { generateAiExerciseRoutine } from "../../services/aiServices";
import { generateUserBio } from "../../utils/generateUserBio";

const ExerciseRoutine = () => {
  const { auth } = useAuth();
  const { plans, setPlans } = usePlans();
  const bio = generateUserBio(auth.userData);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiExerciseRoutine, setAiExerciseRoutine] = useState([]);
  const [promptMsg, setPromptMsg] = useState("");

  const handleSaveExerciseRoutine = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await createExerciseRoutine(
        aiExerciseRoutine,
        auth.userId
      );
      setPlans((prev) => ({
        ...prev,
        exerciseRoutines: aiExerciseRoutine,
        loading: false,
      }));
      setAiExerciseRoutine([]);
      setLoading(false);
    } catch (error) {
      setError("Failed to save routine data");
      setLoading(false);
    }
  };

  const generateExerciseRoutine = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await generateAiExerciseRoutine(promptMsg, bio);
      console.log(response);
      setAiExerciseRoutine(response);
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error?.message || "Errro during generating Exercise Routine");
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

      <Button disabled={aiExerciseRoutine.length > 0} onClick={generateExerciseRoutine}>Get AI generaed Routine</Button>

      {aiExerciseRoutine.length > 0 && (
        <div className="flex flex-col justify-center items-center">
          <Button className="ml-3 mt-4" onClick={handleSaveExerciseRoutine}>
            Save Exercise Routine
          </Button>
          <Divider />
          <h1 className="text-2xl font-bold">Ai Generated Exercise Routine</h1>
          <div className="">
            {aiExerciseRoutine.map((exercise, index) => (
              <div key={index} className=" mx-auto ">
                <ExerciseCard exerciseData={exercise} />
              </div>
            ))}
          </div>
        </div>
      )}

      {!aiExerciseRoutine.length > 0 && (
        <div className="flex flex-col justify-center items-center">
          <Divider />
          <h1 className="text-2xl font-bold">Your Exercise Routine</h1>
          <div className="">
            {Array.isArray(plans?.exerciseRoutines) &&
            plans.exerciseRoutines.length > 0 ? (
              plans.exerciseRoutines.map((exercise) => (
                <div key={exercise._id} className="mx-auto">
                  <ExerciseCard exerciseData={exercise} />
                </div>
              ))
            ) : (
              <p>No Exercise Routine saved yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseRoutine;
