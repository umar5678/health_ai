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
      <div className="flex items-center justify-between my-4 flex-wrap ">
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
        <Button className="mt-4 sm:mt-6" onClick={onEditClick}>
          Update Profile
        </Button>
      </div>

      <Divider />
      {bio && (
        <div className="max-w-sm mx-auto">
          <h1 className="text-2xl font-semibold">Your In-App Bio</h1>
          <p className="py-2">{bio}</p>
        </div>
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
          <h3 className="sm:text-xl text-lg font-semibold mb-2">
            Personal Information
          </h3>
          <ul className="list-none list-inside pt-1">
            <li>
              {" "}
              <strong className="pr-3">Height:</strong> {user.height} cm
            </li>
            <li>
              {" "}
              <strong className="pr-3">Weight:</strong> {user.weight} kg
            </li>
            <li>
              {" "}
              <strong className="pr-9">Age: </strong>
              {user.age}
            </li>
            <li>
              <strong className="pr-3">Gender: </strong> {user.gender}
            </li>
            <li>
              <strong className="pr-2">Country: </strong> {user.country}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1">Activity Level</h3>
          <ul className="list-disc list-inside mb-2">
            <span> {user.activityLevel}</span>
          </ul>

          <h3 className="text-lg font-semibold mb-1">Health Goals</h3>
          <ul className="list-disc list-inside mb-2">
            <span> {user.goal}</span>
          </ul>

          <h3 className="text-lg font-semibold mb-1">Dietary Preferences</h3>
          <ul className="list-disc list-inside mb-2">
            {user.dietaryPreferences.map((pref) => (
              <span className="pr-2" key={pref}>
                {pref},
              </span>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mb-1">Allergies</h3>
          <ul className="list-disc list-inside mb-2 ">
            {user.allergies.map((allergy) => (
              <span className="pr-2" key={allergy}>
                {allergy},
              </span>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
