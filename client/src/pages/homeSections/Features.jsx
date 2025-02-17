import { motion } from "framer-motion";
import mealPlanImage from "../../images/meal-plan.png";
import createMealImg from "../../images/create-meal.png";
import mealsImg from "../../images/meals.webp";
import fitness from "../../images/fitness.webp"

export const Features = () => {
  return (
    <div>
      <div
        id="features"
        className="text-center bg-black/90  flex justify-center items-center"
      >
        <h1 className="text-white md:text-5xl text-4xl mx-2 md:mx-0  font-semibold bold   md:max-w-lg py-24 ">
          MILLIONS OF USERS HIT THEIR GOALS. YOU'RE NEXT. 
        </h1>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div>
          {/* First Feature Block */}
          <div className="flex flex-wrap sm:flex-row gap-12 lg:gap-0 items-center my-10">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex-none mx-auto max-w-full sm:max-w-auto md:w-xl lg:w-2xl"
            >
              <img
                src={fitness}
                className="w-full"
                alt="Create your meal image"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-sm xl:w-2xl px-2 md:mr-auto mx-auto text-center sm:text-left"
            >
              <p className="text-gradient text-base sm:text-lg md:text-xl">
                Peak Personalization
              </p>
              <h2 className="text-3xl sm:text-5xl max-w-sm my-4 text-stone-900 anton-font">
                Fitness on your terms
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                Goodbye cookie-cutter workouts and generic coaching. Every Centr
                training session is tailored to your goals.
              </p>
            </motion.div>
          </div>

          {/* Second Feature Block (Reversed Layout) */}
          <div className="flex flex-wrap-reverse gap-12 lg:gap-0 items-center my-32 md:my-10">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              viewport={{ once: true }}
              className="max-w-sm xl:w-2xl px-2 mx-auto text-center sm:text-left"
            >
              <p className="text-gradient text-base sm:text-lg md:text-xl">
                Your Personalized Nutrition Advisor
              </p>
              <h2 className="text-3xl sm:text-5xl max-w-sm my-4 text-stone-900 anton-font">
                MEALS & MINDSET COACHIN
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                Elevate your performance with meals to fuel you and mindset
                exercises to recharge you.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex-none mx-auto max-w-full sm:max-w-auto md:w-xl lg:w-2xl"
            >
              <img
                src={mealsImg}
                className="w-full"
                alt="Meal plan image"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
