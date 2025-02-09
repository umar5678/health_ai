import mealPlanImage from "../../images/meal-plan.png";
import createMealImg from "../../images/create-meal.png";

export const Features = () => {
  return (
    <div id="features" className="container max-w-7xl mx-auto m-10 py-10">
      <div className="">
        <p className="text-gradient text-center">
          Defining qualities that set us apart
        </p>
        <h1 className="text-center text-3xl md:text-4xl font-semibold">
          Unique Features
        </h1>
        <div className="flex gap-20 items-center flex-wrap my-10">
          <div className="flex-none xl:mx-0 mx-auto">
            <img
              src={createMealImg}
              className="w-76 md:w-lg lg:w-xl rounded-lg shadow-lg"
              alt="Create your meal image"
            />
          </div>
          <div className="max-w-lg xl:w-2xl px-2 mx-auto">
            <p className="text-gradient">Customized MEAL PLANS</p>
            <h2 className="text-2xl font-semibold">
              Tailored to suit your individual requirements
            </h2>
            <p>
              Our AI-crafted meal plans are meticulously designed to align with
              your dietary needs, culinary preferences, and health objectives,
              guaranteeing optimal results!
            </p>
          </div>
        </div>

        <div className="flex gap-20 items-center flex-wrap wrap-reverse my-10">
          <div className="max-w-lg xl:w-2xl px-2 mx-auto">
            <p className="text-gradient">Your Personalized Nutrition Advisor</p>
            <h2 className="text-2xl font-semibold">
              Attain your physique aspirations
            </h2>
            <p>
              Experience a completely tailored meal plan, meticulously crafted
              for your daily macronutrient requirements, for every meal of the
              day.
            </p>
          </div>
          <div className="flex-none xl:mx-0 mx-auto">
            <img
              src={mealPlanImage}
              className="w-76 md:w-lg lg:w-xl rounded-lg shadow-lg"
              alt="Create your meal image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
