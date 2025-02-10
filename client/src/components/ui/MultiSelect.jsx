import React, { useState, useCallback } from "react";

const MultiSelect = ({ options, title = "", onChange }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelect = useCallback(
    (event) => {
      const value = event.target.value;
      let updatedValues = [];

      if (event.target.checked) {
        updatedValues = [...selectedValues, value];
      } else {
        updatedValues = selectedValues.filter((v) => v !== value);
      }

      setSelectedValues(updatedValues);
      onChange(updatedValues);
    },
    [selectedValues, onChange]
  );

  return (
    <div className="mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {options.map((option) => (
          <label
            key={option}
            className={`rounded-full py-2 px-6 border-2 transition-all cursor-pointer w-fit 
              ${
                selectedValues.includes(option)
                  ? "border-purple-500 bg-purple-200/20 font-bold text-purple-600 "
                  : "border-gray-300 hover:border-gray-400"
              }`}
          >
            <input
              type="checkbox"
              value={option}
              checked={selectedValues.includes(option)}
              onChange={handleSelect}
              className="hidden"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
