import { useEffect, useState } from "react";
import Modal from "./Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { HiMiniXMark } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";

const ExerciseModal = ({ isOpen, onClose, initialData = {}, onSubmit }) => {
  const [exerciseData, setExerciseData] = useState({});

  useEffect(() => {
    if (initialData) {
      setExerciseData(initialData[0]);
    }
  }, [initialData[0]]);

  const handleExerciseChange = (value) => {
    setExerciseData((prev) => ({ ...prev, exercise: value }));
  };

  const handleChangeSetVariation = (index, key, value) => {
    setExerciseData((prev) => {
      const updatedSets = [...prev.setsAndVariation];
      updatedSets[index] = { [key]: value };
      return { ...prev, setsAndVariation: updatedSets };
    });
  };

  const handleAddSetVariation = () => {
    setExerciseData((prev) => ({
      ...prev,
      setsAndVariation: [...prev.setsAndVariation, { "": "" }],
    }));
  };

  const handleDeleteSetVariation = (index) => {
    setExerciseData((prev) => {
      const updatedSets = [...prev.setsAndVariation];
      updatedSets.splice(index, 1);
      return { ...prev, setsAndVariation: updatedSets };
    });
  };

  const handleSaveExercisePlan = (e) => {
    e.preventDefault();
    onSubmit(exerciseData);
    onClose();
  };
  const handleCancelAddDietPlan = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Exercise Plan"
      width="max-w-2xl sm:mt-0"
    >
      <form onSubmit={handleSaveExercisePlan}>
        <Input
          required
          inputClasses="font-bold py-0 border-none focus:border-none focus:outline-none focus:bg-stone-100 p-0.5 text-lg"
          placeholder="e.g., Light Cardio and Stretching"
          value={exerciseData?.exercise || ""}
          onChange={(e) => handleExerciseChange(e.target.value)}
          className="mb-3"
        />

        {exerciseData?.setsAndVariation?.map((set, index) => {
          const [exerciseName, details] = Object.entries(set)[0];
          return (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-center">
                <Input
                  required
                  inputClasses=" font-medium py-0 border-none font-light focus:border-none rounded-sm focus:outline-none focus:bg-stone-100 p-0.5 mb-0.5"
                  placeholder="Exercise Name"
                  value={exerciseName}
                  onChange={(e) =>
                    handleChangeSetVariation(index, e.target.value, details)
                  }
                  className="flex-grow"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteSetVariation(index)}
                  className="text-stone-700 p-2 rounded bg-gray-100 hover:bg-gray-200  ml-2"
                >
                  <AiOutlineDelete />
                </button>
              </div>
              <Input
                required
                placeholder="e.g., 3 sets of 10 reps"
                inputClasses=" py-0 border-none font-light focus:border-none rounded-sm focus:outline-none focus:bg-stone-100 p-0.5 mb-0.5"
                value={details}
                onChange={(e) =>
                  handleChangeSetVariation(index, exerciseName, e.target.value)
                }
                className="w-full mt-1"
              />
            </div>
          );
        })}

        <div className="flex mx-auto max-w-[200px] ">
          <button
            type="button"
            onClick={handleAddSetVariation}
            className="text-stone-600 hover:text-stone-700 hover:bg-gray-200 font-bold  py-1 rounded-md bg-gray-100 mx-auto flex-1"
          >
            <div className="flex justify-center items-center gap-3 ">
              <span>
                <FaPlus />
              </span>
              <span className="mt-1"> Add Exercise</span>
            </div>
          </button>
        </div>

        <div className="flex justify-between mt-2">
          <Button variant="primary" type="submit">
            Update
          </Button>
          <Button variant="default-outline" onClick={handleCancelAddDietPlan}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ExerciseModal;
