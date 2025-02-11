const generateUserBio = (user) => {
  let bio = "";

  if (user?.age) {
    bio += `${user.age}-year-old `;
  }
  if (user?.gender) {
    bio += `${user.gender}, `;
  }
  bio += `living in ${user?.country} `;
  if (user?.goal) {
    bio += `with a goal to ${user?.goal}. `;
  } else {
    bio += "on their health journey. ";
  }
  if (user?.dietaryPreferences?.length > 0) {
    bio += `Following a ${user?.dietaryPreferences.join(", ")} diet. `;
  }
  if (user?.allergies?.length > 0) {
    bio += `Has allergies to ${user?.allergies.join(", ")}. `;
  }
  if (user?.activityLevel) {
    bio += `Activity Level: ${user?.activityLevel}. `;
  }
  if (user?.weight) {
    bio += `Weight: ${user?.weight} kg. `;
  }
  return bio.trim(); // Remove trailing/leading spaces
};

export { generateUserBio };
