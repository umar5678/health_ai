import React, { useCallback } from "react";

const MultiSelect = ({ options, title = "", value = [], onChange }) => {
  // value is now fully controlled by the parent

  const handleSelect = useCallback(
    (event) => {
      const { value: optionValue, checked } = event.target;
      let updatedValues;

      if (checked) {
        updatedValues = [...value, optionValue];
      } else {
        updatedValues = value.filter((v) => v !== optionValue);
      }

      onChange(updatedValues);
    },
    [value, onChange]
  );

  return (
    <div className="mx-auto p-4">
      {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = value.includes(option);
          return (
            <label
              key={option}
              className={`rounded-full py-1 px-4 border transition-all cursor-pointer w-fit 
                ${
                  isSelected
                    ? "border-purple-500 bg-purple-200/20 font-semibold text-purple-600"
                    : "border-gray-300 hover:border-gray-400"
                }`}
            >
              <input
                type="checkbox"
                value={option}
                checked={isSelected}
                onChange={handleSelect}
                className="hidden"
              />
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelect;
