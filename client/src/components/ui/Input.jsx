import React, { forwardRef, useId } from "react";

const Input = forwardRef(function input(
  {
    label,
    type = "text",
    name, // Required prop
    inputClasses = "",
    labelClasses = "",
    className = "",
    required = false, // Added required prop
    errorMessage, // For error handling
    ...props
  },
  ref
) {
  const id = useId();
  const errorId = errorMessage ? `${id}-error` : null;

  return (
    <div className={`flex flex-col ${className}`}>
      <label
        className={`text-gray-800 font-semibold text-sm py-1 mt-2 ${labelClasses} font-light`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        name={name} // Use the name prop
        type={type}
        className={`text-gray-800  border border-gray-300  p-2 rounded-md   focus:outline-1 focus:outline-gray-300 dark:focus:outline-gray-300 bg-white ${inputClasses}`}
        ref={ref}
        required={required} // Add required attribute
        aria-describedby={errorId} // For error message accessibility
        {...props}
      />
      {errorMessage && (
        <p id={errorId} className="text-red-500 text-sm mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

export default Input;
