import React, { useState, useCallback, useEffect } from "react";

const SelectOne = ({ options, title = "", onChange, initialValue = "" }) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  // Update selectedValue when initialValue changes
  useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);


  const handleSelect = useCallback(
    (event) => {
      const value = event.target.value;
      setSelectedValue(value);
      onChange(value);
    },
    [onChange]
  );

  return (
    <div className="mx-auto p-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {options.map((option) => (
          <label
            key={option}
            className={`rounded-full py-1 px-4 border-1 transition-all cursor-pointer w-fit
              ${
                selectedValue === option
                  ? "border-purple-500 bg-purple-200/20 font-semibold text-purple-600"
                  : "border-gray-300 hover:border-gray-400"
              }`}
          >
            <input
              type="radio"
              name={title}
              value={option}
              checked={selectedValue === option}
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
