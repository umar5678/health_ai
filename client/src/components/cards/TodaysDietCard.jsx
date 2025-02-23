import React from "react";

const TodaysDietCard = ({ data }) => {
  return (
    <div>
      <h1 className="text-xl pb-2 font-semibold">Todays Meal Plan</h1>
      {data?.meals?.map((meal) => (
        <div key={meal._id} className="mb-1">
          <h3 className=" font-medium">{meal.mealName}</h3>

          <ul className="list-none font-light pl-2 pb-1 max-w-sm ">
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
