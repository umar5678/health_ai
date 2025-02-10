import React, { useEffect } from "react";

import { useAuth } from "../../context/AuthContext";
import { ProfileCard } from "../../components";
import { Navigate, useLocation } from "react-router-dom";

const Overview = () => {
  const { auth } = useAuth();

  const location = useLocation();

  console.log(auth.userData);

  if (!auth.userData?.isProfileSetupDone) {
    return (
      <Navigate to="/dashboard/profile" state={{ from: location }} replace />
    );
  }
  return (
    <div>
      Overview
      <h1>display here users current body weight</h1>
      <ProfileCard user={auth.userData} />
      <h1>small profile card</h1>
      <h1>BMI</h1>
      <h1>
        Today's diet plan ser can see full plan in Modal or something else
      </h1>
      <h1>
        Today's Exercise Toutine . user can see full plan in Modal or something
        else
      </h1>
      <h1>or go to the page</h1>
      <p>if uer has not set up profile , ak user to first set it up</p>
    </div>
  );
};

export default Overview;
