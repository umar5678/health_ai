import React from "react";
import dietCardBg from "../../images/diet-card-bg.jpg";
import { CiEdit } from "react-icons/ci";
import Button from "../ui/Button";

// dont touch these styles anymore

const DietCard = ({ dietData, editMeal }) => {
  const { day, meals } = dietData;

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleEditPlan = (dayIndex) => {
    editMeal(dayIndex);
  };

  return (
    <div
      className="flex justify-center  min-h-full bg-gray-100 rounded-md shadow-sm w-full max-w-full"
      style={{
        // backgroundImage: `url(${dietCardBg})`, // Template literal to create URL string
        backgroundImage: `url(https://t4.ftcdn.net/jpg/01/46/91/15/360_F_146911524_hiyuWatjjoO3scF3sBOvAl8aKO3qPadw.jpg)`,
        backgroundSize: "cover", // Or contain, depending on your preference
        backgroundPosition: "center", // Optional: Control image position
      }}
    >
      <div className=" py-4 w-full  md:max-w-lg px-4">
        <div className="flex justify-between">
          <div className="w-full">
            <h2 className="text-lg font-bold mb-1 text-gradient-2 ">
              {dayNames[day]}
            </h2>
          </div>
          <span>
            <button
              onClick={() => handleEditPlan(day)}
              
              className="m-2 p-2 bg-gray-200 rounded hover:bg-gray-300 "
            >
              {<CiEdit />}
            </button>
          </span>
        </div>
        <div className="flex items-center  mb-2">
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        {meals?.map((meal) => (
          <div
            key={meal._id}
            className="mb-2 md:flex md:justify-between  md:flex-nowrap md:items-center"
          >
            <h3 className="font-medium text-stone-900 pb-1">
              {meal.mealName}:
            </h3>

            <ul className="list-none marker:text-gray-500 pl-3">
              {meal.foodItems?.map((item, index) => (
                <li
                  className="sm:w-sm font-light text-stone-800 lis" // make this
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
