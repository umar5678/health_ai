import React from "react";

const DietCard = ({ dietData }) => {
  const { day, meals } = dietData;

  // console.log(dietData[0]?.day) // logs 0
  // console.log(dietData[0]?.meals) // logs array of meals

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
    <div className="flex min-h-full bg-white rounded-md shadow ">
      <div className=" p-4 max-w-full md:max-w-lg">
        <h2 className="text-lg font-bold mb-1  ">{dayNames[day]}</h2>
        <div className="flex items-center mb-2">
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {meals?.map((meal) => (
          <div key={meal._id} className="mb-2">
            <h3 className="font-medium text-stone-900 pb-0.5">
              {meal.mealName}
            </h3>

            <ul className="list-disc pl-4">
              {meal.foodItems?.map((item, index) => (
                <li
                  className="sm:w-80 font-light text-stone-800 lis"
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietCard;
