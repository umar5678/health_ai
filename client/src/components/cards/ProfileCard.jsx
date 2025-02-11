import React from "react";

const ProfileCard = ({ user }) => {
  if (!user) return <h1>No data available</h1>;
  return (
    <div className="max-w-sm mx-auto   overflow-hidden ">
      <div className="flex flex-col items-center p-6">
        {/* Profile Image */}
        <img
          src={user?.avatar?.url || "https://via.placeholder.com/96"}
          alt="User Avatar"
          className="max-w-32 max-h-32 rounded-full border-4 border-indigo-500 shadow-md"
        />

        {/* User ID */}
        <p className="mt-4 text-lg font-semibold text-gray-900">
          {user?.fullName}
        </p>
        <p>{user?.email}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
