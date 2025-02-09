import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-800/10 backdrop-blur-[1px] z-50">
      <div className="bg-gray-900/80 animate-bounce  text-white px-6 py-3 rounded-lg shadow-lg">
        <p className="text-lg font-medium animate-pulse ">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
