import React from "react";

const ProfileCard = ({ user }) => {
  console.log(user);
  if (!user) return <h1>No data available</h1>;
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
      <div className="flex flex-col items-center p-6">
        {/* Profile Image */}
        <img
          src={user?.avatar?.url || "https://via.placeholder.com/96"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md"
        />

        {/* User ID */}
        <p className="mt-4 text-lg font-semibold text-gray-900">
          {user?.fullName}
        </p>

        {/* Action Buttons */}
        <div className="mt-5 flex space-x-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-500 transition">
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
