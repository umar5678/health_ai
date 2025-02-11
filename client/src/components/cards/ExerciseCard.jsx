import React from "react";

const ExerciseCard = ({ exerciseData }) => {
  const { day, exercise, setsAndVariation } = exerciseData;

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="md:max-w-xl bg-white rounded-lg shadow-md p-6 m-4 flex flex-col">
      {" "}
      {/* Card container */}
      <h2 className="text-2xl font-bold mb-4 ">{dayNames[day]}</h2>
      <h3 className="text-xl font-semibold mb-4 ">
        {exercise}
      </h3>
      <div className="flex-grow">
     
        <ul className="list-disc pl-6">
          {setsAndVariation?.map((set, index) => {
            const exerciseName = Object.keys(set)[0]; // Get exercise name (key)
            const variation = set[exerciseName]; // Get sets/reps (value)

            return (
              <li key={index} className="mb-2">
                <span className="font-semibold">{exerciseName}:</span>{" "}
                {variation}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ExerciseCard;
