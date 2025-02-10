import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-800/20 backdrop-blur-[3px] z-50">
      <div className="bg-white text-gray-900 animate-bounce  px-6 py-3 rounded-lg shadow-xl">
        <p className="text-lg font-medium ">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
