import React, { useState, useMemo, useEffect } from "react";

const BMIcalculator = ({ height, weight, gender, age }) => {
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState(null);

  

  const calculateBMI = useMemo(() => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const calculatedBmi = weight / (heightInMeters * heightInMeters);
      return calculatedBmi.toFixed(2);
    }
    return null;
  }, [height, weight]);

  const determineCategory = useMemo(() => {
    if (calculateBMI) {
      let category;
      if (calculateBMI < 18.5) {
        category = "Underweight";
      } else if (calculateBMI < 25) {
        category = "Normal weight";
      } else if (calculateBMI < 30) {
        category = "Overweight";
      } else {
        category = "Obese";
      }
      return category;
    }
    return null;
  }, [calculateBMI]);

  useEffect(() => {
    setBmi(calculateBMI);
    setCategory(determineCategory);
  }, [calculateBMI, determineCategory]);

  const progressPercentage = useMemo(() => {
    if (bmi) {
      return Math.min((bmi / 40) * 100, 100);
    }
    return 0;
  }, [bmi]);

  const getProgressBarStyle = useMemo(() => {
    if (bmi) {
      if (bmi < 18.5) {
        return "bg-orange-600"; // Underweight color
      } else if (bmi < 25) {
        return "bg-green-500"; // Normal weight color
      } else if (bmi < 30) {
        return "bg-orange-600"; // Overweight color
      } else {
        return "bg-red-500"; // Obese color
      }
    }
    return "bg-gray-500"; // Default (before calculation)
  }, [bmi]);
  const getCategoryLabelStyle = useMemo(() => {
    if (bmi) {
      if (bmi < 18.5) {
        return "text-orange-600"; // Underweight color
      } else if (bmi < 25) {
        return "text-green-600"; // Normal weight color
      } else if (bmi < 30) {
        return "text-orange-600"; // Overweight color
      } else {
        return "text-red-600"; // Obese color
      }
    }
    return "text-gray-700"; // Default color
  }, [bmi]);

  return (
    <div className="bg-white p-4 pb-6 my-4 rounded-lg shadow-md max-w-sm">
      {bmi !== null && (
        <div>
          <h1 className={`sm:text-xl  font-semibold`}>
            Your BMI: {bmi}{" "}
            <span className={`sm:ml-8 ${getCategoryLabelStyle}`}>{category}</span>{" "}
            {/* Category next to BMI */}
          </h1>

          <div className="bg-gray-200 rounded-full h-4 relative">
            <div
              className={`rounded-full h-4 transition-all duration-500 mt-4 ${getProgressBarStyle}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>

            <div className="absolute inset-0 flex justify-between text-xs text-gray-600 mt-4">
              {". ."}
              <span className={``}>Underweight</span> <span>Normal</span>
              <span>Overweight</span>
              <span className="-mr-2">Obese</span>
            </div>
          </div>
        </div>
      )}
      {bmi === null && (
        <p className="text-gray-700">
          Please enter your height and weight to calculate your BMI.
        </p>
      )}
    </div>
  );
};

export default BMIcalculator;
