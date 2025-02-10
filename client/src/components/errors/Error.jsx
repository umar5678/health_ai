import React from "react";

const ErrorMessage = ({ message }) => {
  if (!message) return null; // Don't render if there's no error

  return (
    <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg border border-red-400 my-2">
      <p className="text-sm font-semibold">{message}</p>
    </div>
  );
};

export default ErrorMessage;
