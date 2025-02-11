import React from "react";

const TodaysDietCard = ({ data }) => {
  return (
    <div>
      <h1 className="text-xl pb-6">Todays Meal Plan</h1>
      {data?.meals?.map((meal) => (
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
  );
};

export default TodaysDietCard;
