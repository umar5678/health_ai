import React, { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { usePlans } from "../../context/PlansContext";
import { generateUserBio } from "../../utils/generateUserBio";
import {
  Button,
  ErrorMessage,
  LoadingScreen,
  DietCard,
  Divider,
  DietModal,
} from "../../components";
import { generateAiDietPlan } from "../../services/aiServices";
import domtoimage from "dom-to-image";
import html2pdf from "html2pdf.js";

const DietPlans = () => {
  const { user } = useAuth();
  const { plans, createDietPlan, updateDietPlan } = usePlans(); // Import updateDietPlan

  const bio = generateUserBio(user);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiDietPlan, setAiDietplan] = useState([]);
  const [promptMsg, setPromptMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null); // Track which plan is being edited
  const [editedPlanData, setEditedPlanData] = useState([]); // Store edited data
  const contentRef = useRef(null);
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

  const handleSaveDietPlan = async () => {
    try {
      setError("");
      setLoading(true);

      // Check if it's an update or a create operation
      if (editMode) {
        const updatedPlan = await updateDietPlan(editedPlanData); //editedPlanData, updateDietPlan, user?._id
        if (updatedPlan) {
          setEditMode(null); // Reset edit mode after successful update
          setEditedPlanData([]); // Clear edited data
          setAiDietplan([]);
        }
      } else {
        const newPlan = await createDietPlan(aiDietPlan); //aiDietPlan, user?._id
        if (newPlan) {
          setAiDietplan([]);
        }
      }

      setLoading(false);
    } catch (error) {
      setError("Failed to save/update diet plan data");
      setLoading(false);
    } finally {
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

  const handleEditMealPlan = (index) => {
    setToBeEdited({ ...plans.dietPlans.filter((meal) => meal.day === index) });

    setIsModalOpen(true);
  };

  const handleUpdateSumbit = async (data) => {
    setLoading(true);
    try {
      await updateDietPlan(data);
    } catch (error) {
      console.error("update Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
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
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold">AI Generated Diet Plan</h1>
            <div className="flex flex-wrap gap-6 md:justify-start justify-center mt-4 ">
              {aiDietPlan.map((diet, index) => (
                <div key={index}>
                  <DietCard dietData={diet} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <DietModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={toBeEdited}
        onSubmit={handleUpdateSumbit}
      />

      {!aiDietPlan.length > 0 && (
        <div id="content-to-download" className=" max-w-full">
          <Divider />
          <div ref={contentRef} className="max-w-7xl mx-auto">
            <Button onClick={downloadPDF}>Download PDF</Button>
            <h1 className="text-2xl font-bold">Your Diet Plan</h1>
            <div className="flex flex-wrap gap-5 md:justify-start justify-center mt-4 ">
              {Array.isArray(plans?.dietPlans) &&
              plans?.dietPlans?.length > 0 ? (
                plans?.dietPlans?.map((diet) => (
                  <div key={diet?._id} className="not-md:flex-grow ">
                    <DietCard
                      key={diet?._id}
                      dietData={diet}
                      editMeal={handleEditMealPlan}
                    />
                  </div>
                ))
              ) : (
                <p>No diet plans saved yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlans;

// import React from "react";

// const DietPlans = () => {
//   return <div>DietPlans</div>;
// };

// export default DietPlans;
