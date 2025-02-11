import React from "react";

import { useAuth } from "../../context/AuthContext";
import {
  ProfileCard,
  BMIcalculator,
  Divider,
  TodaysExerciseCard,
  TodaysDietCard
} from "../../components";
import { Navigate, useLocation } from "react-router-dom";
import { usePlans } from "../../context/PlansContext";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Overview = () => {
  const { auth } = useAuth();
  const { plans, setPlans } = usePlans();

  const dayIndex = new Date(Date.now()).getDay();

  const dayToday = days[dayIndex];

  const TodaysExrciseRoutine = plans?.exerciseRoutines?.filter(
    (routine) => routine.day === dayIndex
  );

  const TodaysDietPlan = plans?.dietPlans?.filter(
    (plan) => plan.day === dayIndex
  );
  console.log(TodaysDietPlan[0]);

  const location = useLocation();

  if (!auth.userData?.isProfileSetupDone) {
    return (
      <Navigate to="/dashboard/profile" state={{ from: location }} replace />
    );
  }
  return (
    <div className="max-w-6xl mx-auto"> 
      <div className="w-fit mx-auto">
        <h1 className="md:text-3xl text-2xl font-bold text-gradient">
          Welcome
        </h1>
      </div>
      <p>Today is {dayToday}</p>
      <ProfileCard user={auth.userData} />

      <div className="mx-auto w-fit">
        <BMIcalculator
          height={auth.userData?.height}
          weight={auth.userData?.weight}
          age={auth.userData?.age}
          gender={auth.userData?.gender}
        />
      </div>
      <Divider />
      <div className="flex flex-wrap gap-6 justify-between ">
        <div>
          {TodaysDietPlan[0] ? (
            <>
              <TodaysDietCard data={TodaysDietPlan[0]} />
            </>
          ) : (
            <>
              <p className="text-lg">No Diet Plan Available</p>
            </>
          )}
        </div>
        <div>
          {TodaysExrciseRoutine[0] ? (
            <>
              <TodaysExerciseCard
                dayToday={dayToday}
                data={TodaysExrciseRoutine[0]}
              />
            </>
          ) : (
            <>
              <p className="text-lg">No Exercise Available</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
