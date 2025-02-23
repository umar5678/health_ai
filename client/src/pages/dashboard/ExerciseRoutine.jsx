import React, { useState } from "react";
import {
  Button,
  Divider,
  ErrorMessage,
  ExerciseCard,
  LoadingScreen,
  ExerciseModal,
} from "../../components";
import { useAuth } from "../../context/AuthContext";
import { usePlans } from "../../context/PlansContext";
import { generateAiExerciseRoutine } from "../../services/aiServices";
import { generateUserBio } from "../../utils/generateUserBio";
import domtoimage from "dom-to-image";
import html2pdf from "html2pdf.js";

const ExerciseRoutine = () => {
  const { user } = useAuth(); // Use user from AuthContext
  const { plans, createExercisePlan, updateExercisePlan } = usePlans();
  const bio = generateUserBio(user); // Pass user to generateUserBio

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiExerciseRoutine, setAiExerciseRoutine] = useState([]);
  const [promptMsg, setPromptMsg] = useState("");
  const [editMode, setEditMode] = useState(null); // Track which plan is being edited
  const [editedExerciseData, setEditedExerciseData] = useState([]); // Store edited data
  const [toBeEdited, setToBeEdited] = useState({});

  const downloadPDF = async () => {
    const element = document.getElementById("content-to-download");
    try {
      // Capture the element as a PNG image using dom-to-image
      const dataUrl = await domtoimage.toPng(element);

      // Create an Image element and set its source to the captured data URL
      const img = new Image();
      img.src = dataUrl;

      // When the image is loaded, configure html2pdf settings and save the PDF
      img.onload = () => {
        // Define options for html2pdf
        const options = {
          margin: [14, 14, 14, 14], // [top, right, bottom, left] margins in mm
          filename: "download.pdf",
          image: { type: "png", quality: 1 },
          html2canvas: { scale: 2 }, // Increase scale for better quality
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        // Use html2pdf with the image as the source
        html2pdf().set(options).from(img).save();
      };
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleSaveExerciseRoutine = async () => {
    try {
      setError("");
      setLoading(true);

      if (editMode) {
        const updatedPlan = await createExercisePlan(aiExerciseRoutine);
        if (updateExercisePlan) {
          setEditMode(null);
          setAiExerciseRoutine([]);
          setEditedExerciseData([]);
          setLoading(false);
        }
      } else {
        await createExercisePlan(aiExerciseRoutine);
        setAiExerciseRoutine([]);
      }
    } catch (error) {
      setError("Failed to save routine data");
    } finally {
      setLoading(false);
    }
  };

  const generateExerciseRoutine = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await generateAiExerciseRoutine(promptMsg, bio);
      setAiExerciseRoutine(response);
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error?.message || "Error during generating Exercise Routine");
    }
  };

  const handleEditExercisePlan = (index) => {
    setToBeEdited({
      ...plans.exerciseRoutines.filter((exercise) => exercise.day === index),
    });
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async (data) => {
    setLoading(true);
    try {
      await updateExercisePlan(data);
    } catch (error) {
      console.error("update Error: ", error);
      setError("Update error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen">
      {/* Background and min-height */}
      <div className="container mx-auto p-2">
        {/* Centering content */}
        {error && <ErrorMessage message={error} />}
        {loading && <LoadingScreen />}
        <div className="mb-4">
          {/* Margin bottom */}
          <Button
            disabled={aiExerciseRoutine.length > 0}
            onClick={generateExerciseRoutine}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get AI Generated Routine
          </Button>
        </div>
        {aiExerciseRoutine.length > 0 && (
          <div className="flex flex-col items-center">
            {/* Centered content */}
            <Button
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSaveExerciseRoutine}
            >
              Save Exercise Routine
            </Button>
            <Divider className="my-4" />
            <h1 className="text-2xl font-bold mb-4">
              AI Generated Exercise Routine
            </h1>
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Flex layout with wrapping and centered items */}
              {aiExerciseRoutine.map((exercise, index) => (
                <div key={index} className="flex-grow md:w-sm">
                  <ExerciseCard exerciseData={exercise} />
                </div>
              ))}
            </div>
          </div>
        )}

        <ExerciseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={toBeEdited}
          onSubmit={handleUpdateSubmit}
        />

        {!aiExerciseRoutine?.length && (
          <div id="content-to-download" className="max-w-7xl mx-auto ">
            {/* Centered content */}
            <Divider className="my-4" />
            <div className="flex max-w-7xl justify-end">
              <Button variant="default-outline" onClick={downloadPDF}>
                Download PDF
              </Button>
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Exercise Routine</h1>
            <div className="flex flex-wrap gap-5 md:justify-start justify-center">
              {Array.isArray(plans?.exerciseRoutines) &&
              plans?.exerciseRoutines?.length > 0 ? (
                plans?.exerciseRoutines?.map((exercise) => (
                  <div key={exercise?._id} className="flex-grow md:w-sm">
                    <ExerciseCard
                      exerciseData={exercise}
                      editExercise={handleEditExercisePlan}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-700">No Exercise Routine saved yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseRoutine;

// import React from "react";

// function ExerciseRoutine() {
//   return <div>ExerciseRoutine</div>;
// }

// export default ExerciseRoutine;
