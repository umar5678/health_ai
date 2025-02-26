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
import userServices from "../../services/userServices";
import { ApiError } from "../../api/ApiError";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const MAX_IMAGE_SIZE_KB = 100;

const ProfileForm = ({ onEditComplete }) => {
  const { user, userId, setUser } = useAuth();
  const isEditing = !!user?.isProfileSetupDone;
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState(user?.avatar?.url || null);
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

  // Update profile data when user info changes (in edit mode)
  useEffect(() => {
    if (isEditing && user) {
      setProfileData({
        height: user?.height || "",
        weight: user?.weight || "",
        age: user?.age || "",
        gender: user?.gender || "",
        country: user?.country || "",
        goal: user?.goal || "",
        dietaryPreferences: user?.dietaryPreferences || [],
        allergies: user?.allergies || [],
        activityLevel: user?.activityLevel || "",
      });
    }
  }, [user, isEditing]);

  // Generic change handler for inputs/selects
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleMultiSelectChange = useCallback((fieldName, selected) => {
    setProfileData((prev) => ({
      ...prev,
      [fieldName]: selected,
    }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeKB = file.size / 1024;
      if (fileSizeKB > MAX_IMAGE_SIZE_KB) {
        setError("Image size exceeds 100KB limit.");
        return;
      }
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setError("Invalid file type. Only JPEG, PNG, and GIF are allowed.");
        return;
      }
      setSelectedFile(file);
      setProfileImage(URL.createObjectURL(file)); // For preview
      setError("");
    } else {
      setSelectedFile(null);
      setProfileImage(null);
      setError("");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();

    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    Object.keys(profileData).forEach((key) => {
      const value = profileData[key];
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      } else {
        console.log(
          `Skipping key "${key}" as it is null, undefined, or empty.`
        );
      }
    });

    console.log("formdata: ", formData, "userID", userId);

    try {
      const response = isEditing
        ? await userServices.updateUserProfile(formData, userId)
        : await userServices.createUserProfile(formData, userId);

      if (response instanceof ApiError) {
        setError(response.errorMessage);
      } else {
        console.log(response.data);
        setUser(response.data.user);
        onEditComplete();
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-2xl max-w-3xl mx-auto">
      <h1 className="text-xl md:text-3xl font-bold mb-4 text-gradient-2">
        {isEditing ? "Update Profile" : "Create Profile"}
      </h1>
      {error && <ErrorMessage message={error} />}
      {loading && <LoadingScreen />}

      <div className="flex justify-center items-center flex-wrap">
        <div>
          <label htmlFor="file-input">
            <img
              src={
                profileImage ||
                "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png"
              }
              alt="Profile"
              className="w-24 h-24 md:h-32 md:w-32 rounded-full border-4 border-indigo-500 shadow-md cursor-pointer"
            />
          </label>
          <input
            type="file"
            name="file-input"
            id="file-input"
            className="hidden"
            accept="image/jpeg, image/png, image/gif"
            onChange={handleImageChange}
          />
        </div>
        <div className="ml-4">
          <p className="text-2xl font-semibold">{user?.fullName}</p>
          <p className="text-gray-600">{user?.email}</p>
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
            inputClasses="p-2 mt-2"
            value={profileData.height}
            onChange={handleChange}
            required
          />
          <Input
            required
            inputClasses="p-2 mt-2"
            label="Weight (kg)"
            name="weight"
            type="number"
            value={profileData.weight}
            onChange={handleChange}
          />
          <Input
            required
            inputClasses="p-2 mt-2"
            label="Age"
            name="age"
            type="number"
            value={profileData.age}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          <Select
            required
            label="Gender"
            name="gender"
            options={genderOptions}
            value={profileData.gender}
            onChange={handleChange}
          />
          <Select
            required
            label="Country"
            name="country"
            options={countries}
            value={profileData.country}
            onChange={handleChange}
          />
        </div>

        <Divider />

        <div>
          <h2 className="text-lg font-semibold">Activity Level</h2>
          <SelectOne
            initialValue={isEditing ? `${profileData.activityLevel}` : ""}
            options={activityLevelEnums}
            value={profileData.activityLevel}
            onChange={(selected) =>
              handleMultiSelectChange("activityLevel", selected)
            }
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Your Goal</h2>
          <SelectOne
            initialValue={isEditing ? `${profileData.goal}` : ""}
            options={weightGoalsEnums}
            value={profileData.goal}
            onChange={(selected) => handleMultiSelectChange("goal", selected)}
          />
        </div>

        <Divider />

        <div>
          <MultiSelect
            title="Dietary Preferences"
            options={dietaryPrefEnums}
            value={profileData.dietaryPreferences}
            onChange={(selected) =>
              handleMultiSelectChange("dietaryPreferences", selected)
            }
          />
        </div>

        <Divider />

        <div>
          <MultiSelect
            title="Any Allergies?"
            options={allergyEnums}
            value={profileData.allergies}
            onChange={(selected) =>
              handleMultiSelectChange("allergies", selected)
            }
          />
        </div>

        <Divider />

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
