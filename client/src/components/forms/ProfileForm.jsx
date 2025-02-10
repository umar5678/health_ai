import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Input,
  Select,
  MultiSelect,
  Divider,
  Button,
  SelectOne,
  LoadingScreen,
  ErrorMessage,
} from "../../components";
import {
  countries,
  genderOptions,
  dietaryPrefEnums,
  allergyEnums,
  weightGoalsEnums,
  activityLevelEnums,
} from "../../data/data";
import {
  createUserProfile,
  updateUserProfile,
} from "../../services/userServices";

const ProfileForm = ({ onEditComplete }) => {
  const { auth, setAuth } = useAuth();
  const isEditing = auth?.userData?.isProfileSetupDone;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileData, setProfileData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
    country: "",
    activityLevel: "",
    goal: "",
    dietaryPreferences: [],
    allergies: [],
  });

  useEffect(() => {
    if (isEditing) {
      setProfileData({
        height: auth.userData?.height || "",
        weight: auth.userData?.weight || "",
        age: auth.userData?.age || "",
        gender: auth.userData?.gender || "",
        country: auth.userData?.country || "",
        goal: auth.userData?.goal || "",
        dietaryPreferences: auth.userData?.dietaryPreferences || [],
        allergies: auth.userData?.allergies || [],
        activityLevel: auth.userData?.activityLevel || "",
      });
    }
  }, [auth, isEditing]);

  // ✅ Corrected handleChange function
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value, // Store only the value, not the whole object
    }));
  }, []);

  const handleMultiSelectChange = useCallback((name, selected) => {
    setProfileData((prev) => ({
      ...prev,
      [name]: selected,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = isEditing
        ? await updateUserProfile(profileData, auth?.userId)
        : await createUserProfile(profileData, auth?.userId);

      if (response.status === 200 || response.status === 201) {
        // Update auth state with the updated user data
        setAuth((prevAuth) => ({
          ...prevAuth,
          userData: {
            ...prevAuth.userData,
            ...response.data.data.user, // Update existing userData with the new data
          },
        }));
        // Handle success (e.g., show success message)
      } else {
        setError(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
      onEditComplete();
    }
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-2xl max-w-3xl mx-auto">
      <h1 className="text-xl md:text-3xl font-bold mb-4 text-gradient-2 ">
        {isEditing ? "Update Profile" : "Create Profile"}
      </h1>
      {error && (
        <>
          <ErrorMessage message={error} />
        </>
      )}
      {loading && (
        <>
          <LoadingScreen />
        </>
      )}

      <div className="flex justify-center items-center flex-wrap">
        <img
          src={auth.userData?.avatar?.url}
          alt="Profile"
          className="w-24 h-24 md:h-32 md:w-32 rounded-full border-4 border-indigo-500 shadow-md"
        />
        <div className="ml-4">
          <p className="text-2xl font-semibold">{auth.userData?.fullName}</p>
          <p className="text-gray-600">{auth.userData?.email}</p>
        </div>
      </div>

      <Divider />

      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Height (cm)"
            name="height"
            type="number"
            value={profileData.height}
            onChange={handleChange}
            required
          />
          <Input
            required
            label="Weight (kg)"
            name="weight"
            type="number"
            value={profileData.weight}
            onChange={handleChange}
          />
          <Input
            required
            label="Age"
            name="age"
            type="number"
            value={profileData.age}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          {/* ✅ Corrected Select handlers */}
          <Select
            required
            label="Gender"
            name="gender"
            options={genderOptions} // Options should be an array of { value, label }
            value={profileData.gender} // Ensure this is a string
            onChange={handleChange} // handleChange now correctly updates the state
          />
          <Select
            required
            label="Country"
            name="country"
            options={countries}
            value={profileData.country} // Ensure this is a string
            onChange={handleChange}
          />
        </div>

        <Divider />

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Activity Level</h2>
          <SelectOne
            options={activityLevelEnums}
            selectedValues={profileData.activityLevel}
            onChange={(selected) =>
              handleMultiSelectChange("activityLevel", selected)
            }
          />
        </div>

        <Divider />

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Your Goal</h2>
          <SelectOne
            options={weightGoalsEnums}
            selectedValues={profileData.goal}
            onChange={(selected) => handleMultiSelectChange("goal", selected)}
          />
        </div>

        <Divider />

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Dietary Preferences</h2>
          <MultiSelect
            options={dietaryPrefEnums}
            selectedValues={profileData.selectedDietaryPref}
            onChange={(selected) =>
              handleMultiSelectChange("dietaryPreferences", selected)
            }
          />
        </div>

        <Divider />

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Any Allergies?</h2>
          <MultiSelect
            options={allergyEnums}
            selectedValues={profileData.selectedAllergy}
            onChange={(selected) =>
              handleMultiSelectChange("allergies", selected)
            }
          />
        </div>

        <div className="mt-6 text-center">
          <Button type="submit">
            {isEditing ? "Update Profile" : "Save Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
