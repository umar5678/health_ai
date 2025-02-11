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
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 m-4 w-full md:max-w-3xl">
        {" "}
        {/* Card container */}
        <h2 className="text-2xl font-bold mb-4 ">
          {dayNames[day]}
        </h2>{" "}
        {/* Day name */}
        {meals?.map((meal) => (
          <div key={meal._id} className="mb-2">
            <h3 className="text-xl font-semibold">{meal.mealName}</h3>

            <ul className="list-disc pl-6 pb-6">
              {meal.foodItems?.map((item, index) => (
                <li className="" key={index}>
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
