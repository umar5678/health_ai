import { useNavigate } from "react-router-dom";
export const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <section id="hero" className="md:py-28 py-16 ">
        <div className="mx-auto max-w-screen-xl text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
          <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
            <h2 className="text-4xl text-gray-800 font-extrabold md:text-5xl">
              Smash Your Health Goals with
              <span className="text-gradient"> AI-Powered</span> Personalized
              Plans
            </h2>
            <p>
              Simplify your journey to a healthier lifestyle with our
              user-friendly app. Track your food intake, monitor your activity
              levels, and receive personalized insights to achieve your fitness
              goals. Effortless tracking, empowering results.
            </p>
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <a
                onClick={() => navigate("/login")}
                className="block py-2 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
              >
                Let's get started
              </a>
              <a
                onClick={() => navigate("/login")}
                className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
              >
                Get access
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex-none mt-14 md:mt-0 md:max-w-xl">
            <img
              src="https://images.unsplash.com/photo-1613685044678-0a9ae422cf5a?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className=" md:rounded-tl-[108px]"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};
