import { useEffect, useState } from "react";
import Modal from "./Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { FaXmark } from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";

const DietModal = ({ isOpen, onClose, initialData = {}, onSubmit }) => {
  const [dietData, setDietData] = useState({});

  useEffect(() => {
    if (initialData) {
      setDietData(initialData[0]);
    }
  }, [initialData[0]]);

  const handleDeleteFoodItem = (mealIndex, foodItemIndex) => {
    setDietData((prevData) => {
      const updatedMeals = [...prevData.meals];
      updatedMeals[mealIndex].foodItems.splice(foodItemIndex, 1);
      return { ...prevData, meals: updatedMeals };
    });
  };

  const handleAddFoodItem = (mealIndex) => {
    setDietData((prevData) => {
      const updatedMeals = [...prevData.meals];
      updatedMeals[mealIndex].foodItems.push("");
      return { ...prevData, meals: updatedMeals };
    });
  };

  const handleChangeFoodItem = (mealIndex, foodItemIndex, value) => {
    setDietData((prevData) => {
      const updatedMeals = [...prevData.meals];
      updatedMeals[mealIndex].foodItems[foodItemIndex] = value;
      return { ...prevData, meals: updatedMeals };
    });
  };

  const handleMealChange = (mealIndex, value) => {
    setDietData((prevData) => {
      const updatedMeals = [...prevData.meals];
      updatedMeals[mealIndex].mealName = value;
      return { ...prevData, meals: updatedMeals };
    });
  };

  const handleAddMeal = () => {
    setDietData((prevData) => ({
      ...prevData,
      meals: [...prevData.meals, { foodItems: ["", ""], mealName: "" }],
    }));
  };

  const handleDeleteMeal = (mealIndex) => {
    setDietData((prevData) => {
      const updatedMeals = [...prevData.meals];
      updatedMeals.splice(mealIndex, 1);
      return { ...prevData, meals: updatedMeals };
    });
  };

  const handleSaveDietPlan = (e) => {
    e.preventDefault();
    onSubmit(dietData);
    onClose();
  };

  const handleCancelAddDietPlan = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={"Update Diet plan"}
      width="max-w-2xl  sm:mt-0"
    >
      <div>
        <form onSubmit={handleSaveDietPlan}>
          <div>
            {dietData?.meals?.map((meal, mealIndex) => (
              <div key={mealIndex} className="mb-0">
                <div className="flex justify-between items-center mt-1 mb-[0px] ">
                  <Input
                    required
                    label=""
                    placeholder="e.g., Breakfast, Lunch"
                    value={meal.mealName}
                    onChange={(e) =>
                      handleMealChange(mealIndex, e.target.value)
                    }
                    className="flex-grow"
                    labelClasses=" pt-0"
                    inputClasses="font-semibold py-0 border-none focus:border-none focus:outline-none focus:bg-stone-100 p-0.5"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteMeal(mealIndex)}
                    className="text-stone-700 p-2 rounded bg-gray-100 hover:bg-gray-200  ml-2"
                  >
                    {<AiOutlineDelete />}
                  </button>
                </div>
                {meal.foodItems.map((foodItem, foodItemIndex) => (
                  <div key={foodItemIndex} className="flex items-center">
                    <Input
                      required
                      placeholder="Food Item"
                      value={foodItem}
                      inputClasses=" py-0 border-none font-light focus:border-none rounded-sm focus:outline-none focus:bg-stone-100 p-0.5 mb-0.5"
                      labelClasses="my-0 py-0"
                      onChange={(e) =>
                        handleChangeFoodItem(
                          mealIndex,
                          foodItemIndex,
                          e.target.value
                        )
                      }
                      className="ml-2 flex-grow"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteFoodItem(mealIndex, foodItemIndex)
                      }
                      className="text-stone-700 px-2 py-1 rounded bg-g hover:bg-gray-100 ml-1"
                    >
                      <HiMiniXMark />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddFoodItem(mealIndex)}
                  className="text-stone-600 font-bold ml-3 px-3 py-1 my-0.5  bg-gray-100 hover:bg-gray-200 rounded"
                >
                  <AiOutlinePlus />
                </button>
              </div>
            ))}
            <div className="flex mx-auto max-w-[200px] ">
              <button
                type="button"
                onClick={handleAddMeal}
                className="text-stone-600 hover:text-stone-700 hover:bg-gray-200 font-bold  py-1 rounded-md bg-gray-100 mx-auto flex-1"
              >
                <div className="flex justify-center items-center gap-3 ">
                  <span>
                    <FaPlus />
                  </span>
                  <span className="mt-1"> Add Meal</span>
                </div>
              </button>
            </div>
          </div>

          <div className="flex justify-between mt-3">
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button variant="default-outline" onClick={handleCancelAddDietPlan}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DietModal;
