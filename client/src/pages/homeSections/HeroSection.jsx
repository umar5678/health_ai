import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative h-screen md:h-[calc(100vh-80px)] bg-cover bg-center" // Key change: h-screen and conditional height
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 dark:bg-black/80"></div>
      <div className="relative mx-auto max-w-screen-xl text-gray-100 gap-x-12 items-center  overflow-hidden flex  lg:flex-row md:px-8 h-full">
        {" "}
        {/* Key change: h-full */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl"
        >
          <h2 className="text-3xl sm:text-4xl  text-white font-extrabold md:text-5xl leading-tight ">
            Smash Your Health Goals with
            <span className="text-gradient-3"> AI-Powered</span> Personalized
            Plans
          </h2>
          <p className="text-base md:text-lg">
            Simplify your journey to a healthier lifestyle with our
            user-friendly app. Track your food intake, monitor your activity
            levels, and receive personalized insights to achieve your fitness
            goals.
          </p>
          <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="block py-2 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none cursor-pointer"
            >
              Let's get started
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="flex items-center justify-center gap-x-2 py-2 px-4 text-white hover:text-gray-300 font-medium duration-150 active:bg-gray-100 border border-white rounded-lg md:inline-flex cursor-pointer"
            >
              Get access
              <IoIosArrowForward />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
