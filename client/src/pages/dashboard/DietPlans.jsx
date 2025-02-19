import React, { useState, useRef } from "react";
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
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import html2pdf from "html2pdf.js"

const DietPlans = () => {
  const { user } = useAuth();
  const { plans, setPlans } = usePlans();

  const bio = generateUserBio(user);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiDietPlan, setAiDietplan] = useState([]);
  const [promptMsg, setPromptMsg] = useState("");

  const contentRef = useRef(null);

  const downloadPDF = async () => {
    const element = document.getElementById("content-to-download");

    try {
      const dataUrl = await domtoimage.toPng(element);

      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const pdf = html2pdf().from(img).save("download.pdf");
      };
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleSaveDietPlan = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await createDietPlan(aiDietPlan, user?._id);
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

      {!aiDietPlan.length > 0 && (
        <div className=" max-w-full">
          <Divider />
          <div
            ref={contentRef}
            id="content-to-download"
            className="max-w-7xl mx-auto"
          >
            <Button onClick={downloadPDF}>Download PDF</Button>
            <h1 className="text-2xl font-bold">Your Diet Plan</h1>
            <div className="flex flex-wrap gap-6 md:justify-start justify-center mt-4 ">
              {Array.isArray(plans?.dietPlans) && plans.dietPlans.length > 0 ? (
                plans.dietPlans.map((diet) => (
                  <div key={diet._id}>
                    <DietCard key={diet._id} dietData={diet} />
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
