import React from "react";

import { useAuth } from "../../context/AuthContext";
import { ProfileCard, BMIcalculator } from "../../components";
import { Navigate, useLocation } from "react-router-dom";

const Overview = () => {
  const { auth } = useAuth();

  const location = useLocation();

  if (!auth.userData?.isProfileSetupDone) {
    return (
      <Navigate to="/dashboard/profile" state={{ from: location }} replace />
    );
  }
  return (
    <div>
      <ProfileCard user={auth.userData} />

      <BMIcalculator
        height={auth.userData?.height}
        weight={auth.userData?.weight}
        age={auth.userData?.age}
        gender={auth.userData?.gender}
      />
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
