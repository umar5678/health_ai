import React, { useCallback, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { UserProfile, ProfileForm } from "../../components";

const Profile = () => {
  const { auth } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
  };

  console.log("edit:  : ", isEditing )

  return (
    <div>
      {isEditing || !auth.userData?.isProfileSetupDone ? (
        <ProfileForm onEditComplete={handleEditComplete} />
      ) : (
        <>
          <UserProfile user={auth.userData} onEditClick={handleEditClick} />
        </>
      )}
    </div>
  );
};

export default Profile;
