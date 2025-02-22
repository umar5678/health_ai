import React from "react";
import { CiEdit } from "react-icons/ci";


const ExerciseCard = ({ exerciseData, editExercise }) => {
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

  const handleEditExercise = (dayIndex) => {
    editExercise(dayIndex);
  };

  return (
    <div
      className=" min-h-full w-full max-w-lg rounded-md shadow-sm"
      style={{
        backgroundImage: `url(https://t4.ftcdn.net/jpg/01/46/91/15/360_F_146911524_hiyuWatjjoO3scF3sBOvAl8aKO3qPadw.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Optional overlay */}
      <div className="p-4 z-10 w-full">
        <div className="flex justify-between">
          <div className="w-full">
            <h2 className="text-xl font-bold mb-4 text-gradient-2">
              {dayNames[day]}
            </h2>
          </div>

          <span>
            <button
              onClick={() => handleEditExercise(day)}
              className="m-2 p-2 bg-gray-200 rounded hover:bg-gray-300 "
            >
              {<CiEdit />}
            </button>
          </span>
        </div>
        <h3 className="font-bold text-stone-900">{exercise}</h3>
        <div>
          <ul className="font-thin text-stone-800">
            {setsAndVariation?.map((set, index) => {
              const exerciseName = Object.keys(set)[0];
              const variation = set[exerciseName];

              return (
                <li key={index} className="py-2">
                  <div className="flex flex-col">
                    <span className="font-medium mb-0.5">{exerciseName}:</span>{" "}
                    <span className="flex-1">{variation}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;

// import React from "react";

// const ExerciseCard = ({ exerciseData }) => {
//   const { day, exercise, setsAndVariation } = exerciseData;

//   const dayNames = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   return (
//     <div className="rounded-lg shadow-md p-4 mb-4 flex flex-col gap-2 md:flex-row md:items-center">
//       {" "}
//       {/* Flex row on medium screens and up */}
//       <div className="md:w-1/4 mb-2 md:mb-0">
//         {" "}
//         {/* Day and exercise occupy 1/4 of the width */}
//         <h2 className="text-xl font-bold   md:mx md:text-xl lg:text-2xl ">{dayNames[day]}</h2>
//       </div>
//       <div className="">
//         <h3 className="text-lg font-semibold md:text-lg my-2">{exercise}</h3>
//         {" "}
//         {/* Sets and variations occupy 3/4 of the width */}
//         <ul className=" pl">
//           {setsAndVariation?.map((set, index) => {
//             const exerciseName = Object.keys(set)[0];
//             const variation = set[exerciseName];

//             return (
//               <li key={index} className="mb-2">
//                 <span className="font-medium">{exerciseName}:</span>{" "}
//                 {variation}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ExerciseCard;
