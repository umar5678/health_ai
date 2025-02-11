import React from "react";

const TodaysExerciseCard = ({ data }) => {
  return (
    <div>
      <h1 className="text-xl pb-4">Exercise Routine for Today</h1>
      <div>
        <h3 className="text-xl font-semibold mb-4 ">{data?.exercise}</h3>

        <ul className="list-disc pl-6">
          {data?.setsAndVariation?.map((set, index) => {
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

export default TodaysExerciseCard;
