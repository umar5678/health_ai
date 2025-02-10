import React from "react";

const Select = ({ label, name, options, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value} // Ensures controlled component
        onChange={onChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select {label}</option> {/* Default option */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
