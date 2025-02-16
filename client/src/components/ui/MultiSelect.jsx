import React, { useState, useCallback, useEffect } from "react";

const MultiSelect = ({ options, title = "", onChange, initailValues = [] }) => {
  const [selectedValues, setSelectedValues] = useState(initailValues);

  // Update selectedValues when initailValues prop changes
  useEffect(() => {
    setSelectedValues(initailValues);
  }, [initailValues]);

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
      <h2 className="text-xl font-semibold mb-2 ">{title}</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {options.map((option) => (
          <label
            key={option}
            className={`rounded-full py-1 px-4 border-1 transition-all cursor-pointer w-fit 
              ${
                selectedValues.includes(option)
                  ? "border-purple-500 bg-purple-200/20 font-semibold text-purple-600"
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
