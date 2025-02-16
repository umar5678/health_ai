import React, { useCallback, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { UserProfile, ProfileForm } from "../../components";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing || !user?.isProfileSetupDone ? (
        <ProfileForm onEditComplete={handleEditComplete} />
      ) : (
        <>
          <UserProfile user={user} onEditClick={handleEditClick} />
        </>
      )}
    </div>
  );
};

export default Profile;
// //

// import React from "react";

// const Profile = () => {
//   return <div>Profile</div>;
// };

// export default Profile;
