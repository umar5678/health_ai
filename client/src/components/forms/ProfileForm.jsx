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

  useEffect(() => {
    if (isEditing) {
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

  // ✅ Corrected handleChange function
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value, // Store only the value, not the whole object
    }));
  }, []);

  const handleMultiSelectChange = useCallback((name, selected) => {
    // Correctly receive selected values
    setProfileData((prev) => ({
      ...prev,
      [name]: selected, // Update the state correctly
    }));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the file

    if (file) {
      const fileSizeKBs = file.size / 1024;
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

      if (fileSizeKBs > 100) {
        setError("Image size exceeds 100KB limit.");
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        setError("Invalid file type. Only JPEG, PNG, and GIF are allowed.");
        return;
      }

      setSelectedFile(file); // Store the actual file object
      setProfileImage(URL.createObjectURL(file)); // For preview
      setError(""); // Clear any previous errors
    } else {
      // Handle the case where no file is selected (e.g., user clears selection)
      setSelectedFile(null);
      setProfileImage(null);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();

    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    for (const key in profileData) {
      if (Array.isArray(profileData[key])) {
        formData.append(key, JSON.stringify(profileData[key]));
      } else if (
        profileData[key] !== null &&
        profileData[key] !== undefined &&
        profileData[key] !== ""
      ) {
        formData.append(key, profileData[key]);
      } else {
        console.log(
          `Value for key ${key} is null, undefined, or empty. Not appending.`
        );
      }
    }

    try {
      const response = isEditing
        ? await userServices.updateUserProfile(formData, userId)
        : await userServices.createUserProfile(formData, userId);

      if (response instanceof ApiError) {
        setError(response.errorMessage); // Set the error in state for display
      } else {
        console.log(response.data);
        setUser(response.data.user);
        onEditComplete(); // Call onEditComplete on success
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
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
        <div>
          <label htmlFor="file-input">
            {" "}
            {/* Make the image a label for the input */}
            <img
              src={
                profileImage ||
                "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png"
              }
              alt="Profile"
              className="w-24 h-24 md:h-32 md:w-32 rounded-full border-4 border-indigo-500 shadow-md cursor-pointer" // Add cursor pointer
            />
          </label>
          <input
            type="file"
            name="file-input"
            id="file-input"
            className="hidden" // Hide the input element
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
            value={profileData.height}
            onChange={handleChange}
            required
            inputClasses="py-1"
          />
          <Input
            required
            label="Weight (kg)"
            name="weight"
            type="number"
            value={profileData.weight}
            onChange={handleChange}
            inputClasses="py-1"
          />
          <Input
            required
            label="Age"
            name="age"
            type="number"
            value={profileData.age}
            onChange={handleChange}
            inputClasses="py-1"
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

        <div className="">
          <h2 className="text-lg font-semibold">Activity Level</h2>
          <SelectOne
            initialValue={isEditing ? `${profileData.activityLevel}` : ""}
            options={activityLevelEnums}
            value={profileData.activityLevel} // Use value prop for SelectOne
            onChange={(selected) =>
              handleMultiSelectChange("activityLevel", selected)
            } // Correctly pass selected value
          />
        </div>

        <div className="">
          <h2 className="text-lg font-semibold">Your Goal</h2>
          <SelectOne
            initialValue={isEditing ? `${profileData.goal}` : ""}
            options={weightGoalsEnums}
            value={profileData.goal} // Use value prop for SelectOne
            onChange={(selected) => handleMultiSelectChange("goal", selected)} // Correctly pass selected value
          />
        </div>
        <Divider />
        <div className="">
          <h2 className="text-lg font-semibold">Dietary Preferences</h2>
          <MultiSelect
            initailValues={isEditing ? profileData.dietaryPreferences : []}
            options={dietaryPrefEnums}
            value={profileData.dietaryPreferences} // Use value prop for MultiSelect
            onChange={(selected) =>
              handleMultiSelectChange("dietaryPreferences", selected)
            } // Correctly pass selected values
          />
        </div>
        <Divider />
        <div className="">
          <h2 className="text-lg font-semibold">Any Allergies?</h2>
          <MultiSelect
            initailValues={isEditing ? profileData.allergies : []}
            options={allergyEnums}
            value={profileData.allergies} // Use value prop for MultiSelect
            onChange={(selected) =>
              handleMultiSelectChange("allergies", selected)
            } // Correctly pass selected values
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
