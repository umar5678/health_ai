import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateAiDietPlan = async (propmtMsg = "", bio = "") => {
  console.log(bio);
  const prompt = `I am making an AI based Diet app, And you'll generate diet plan,
    THIS IS JUST FOR TEST PURPOSE ONLY.
    generate 7 days diet plan for ${bio}
    Return the response in JSON formate, no additional text:
    Example: [
{
    day: 0,
    meals: [
      {
        mealName: "Breakfast",
        foodItems: ["Oatmeal with berries and nuts", "Greek yogurt"],
      },
      {
        mealName: "String",
        foodItems: [
          "String",
          "String",
        ],
      },
      ... other meals ...
    ],
  },
  {day: 1, .. so on ...}, 
  ... so on ...
]  
    Strictly follow this formate `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const aiDietPlan = JSON.parse(cleanedText);

    return aiDietPlan;
  } catch (error) {
    console.error("Error generating diet plan:", error);
    throw new Error("Failed to generate Diet plan");
  }
};

const generateAiExerciseRoutine = async (propmtMsg = "", bio) => {
  const prompt = `I am making an AI based exercise app, And you'll generate exercise routine,
    THIS IS JUST FOR TEST PURPOSE ONLY.
    generate 7 days exercise routine for ${bio}
    Return the response in JSON formate, no additional text:
    Example: [
  {
    day: 0,
    exercise: "Chest and Triceps",
    setsAndVariation: [
      { "Bench Press": "3 sets of 8-12 reps" },
      { "String": "String" },
      ... so on ...
    ],
  },

  {day: 1,
   exercise: "String",
   setsAndVariation: [
      { "String": "String" },
      { "String": "String" },
      ... so on ...
    ],}, 
  ... so on ...
]  
    Strictly follow this formate `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const aiExerciseRoutine = JSON.parse(cleanedText);

    return aiExerciseRoutine;
  } catch (error) {
    console.error("Error generating diet plan:", error);
    throw new Error("Failed to generate Diet plan");
  }
};

export { generateAiDietPlan, generateAiExerciseRoutine };
