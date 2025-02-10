import React, { useState, useCallback } from "react";

const SelectOne = ({ options, title = "", onChange, initialValue }) => {
  const [selectedValue, setSelectedValue] = useState(initialValue || null); // Store the single selected value

  const handleSelect = useCallback(
    (event) => {
      const value = event.target.value;
      setSelectedValue(value); // Update the single selected value
      onChange(value); // Call the onChange callback with the selected value
    },
    [onChange]
  ); // onChange in the dependency array

  return (
    <div className="mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {options.map((option) => (
          <label
            key={option}
            className={`rounded-full py-2 px-6 border-2 transition-all cursor-pointer w-fit
              ${
                selectedValue === option // Check against the single selected value
                  ? "border-purple-500 bg-purple-200/20 font-bold text-purple-600"
                  : "border-gray-300 hover:border-gray-400"
              }`}
          >
            <input
              type="radio" // Use radio buttons for single selection
              name={title} // Important: Same name for radio group
              value={option}
              checked={selectedValue === option} // Check against the single selected value
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

export default SelectOne;
