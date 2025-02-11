import React, { useEffect, useState } from "react";
import { Button, Divider, BMIcalculator } from "../components";
import { generateUserBio } from "../utils/generateUserBio.js";

const UserProfile = ({ user, onEditClick }) => {
  const [bio, setBio] = useState("");
  useEffect(() => {
    setBio(generateUserBio(user));
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4 flex-wrap ">
        <div className="flex items-center">
          <img
            src={user.avatar?.url || "/default-avatar.png"}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold">{user.fullName}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <Button className="mt-4 sm:mt-0" onClick={onEditClick}>
          Update Profile
        </Button>
      </div>

      <Divider />
      {bio && (
        <>
          <h1 className="text-2xl font-semibold">Your In-App Bio</h1>
          <p>{bio}</p>
        </>
      )}

      <Divider />

      <BMIcalculator
        height={user?.height}
        weight={user?.weight}
        age={user?.age}
        gender={user?.gender}
      />

      <Divider />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <ul className="list-disc list-inside">
            <li>Height: {user.height} cm</li>
            <li>Weight: {user.weight} kg</li>
            <li>Age: {user.age}</li>
            <li>Gender: {user.gender}</li>
            <li>Country: {user.country}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1">Activity Level</h3>
          <ul className="list-disc list-inside mb-2">
            <li> {user.activityLevel}</li>
          </ul>

          <h3 className="text-lg font-semibold mb-1">Health Goals</h3>
          <ul className="list-disc list-inside mb-2">
            <li> {user.goal}</li>
          </ul>

          <h3 className="text-lg font-semibold mb-1">Dietary Preferences</h3>
          <ul className="list-disc list-inside mb-2">
            {user.dietaryPreferences.map((pref) => (
              <li key={pref}>{pref}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mb-1">Allergies</h3>
          <ul className="list-disc list-inside mb-2">
            {user.allergies.map((allergy) => (
              <li key={allergy}>{allergy}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
