import { useEffect, useState } from "react";

export default () => {
  const [state, setState] = useState(false);

  const navigation = [
    { title: "Home", path: "#home" },
    { title: "Features", path: "#features" },
    { title: "Reviews", path: "#reviews" },
    { title: "Contact Us", path: "#contact" },
  ];

  useEffect(() => {
    if (state) {
      document.body.classList.add("overflow-hidden");
    }
    if (!state) {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [state]);

  return (
    <nav className="bg-white w-full py-3 md:text-md my-2 ">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <a href="/" className="font-bold text-2xl text-gradient">
          Health Ai
        </a>

        {/* Mobile Menu Button */}
        <button
          className="menu-btn md:hidden text-gray-500 hover:text-gray-800"
          onClick={() => setState(!state)}
        >
          {state ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>

        {/* Navigation Menu */}
        <div
          className={`absolute left-0 top-16 w-screen bg-white shadow-md transition-all duration-300 ease-in-out  ${
            state ? "block" : "hidden"
          } md:relative md:top-0 md:flex md:shadow-none md:w-auto`}
        >
          <div className="md:flex md:items-center md:gap-8">
            <ul className="flex  flex-col space-y-4 px-6 py-4 md:flex-row md:space-y-0 md:space-x-6 md:p-0">
              {navigation.map((item, idx) => (
                <li
                  onClick={() => setState(!state)}
                  key={idx}
                  className="text-gray-700 hover:text-gray-900"
                >
                  <a href={item.path}>{item.title}</a>
                </li>
              ))}
            </ul>

            {/* Auth Buttons */}
            <div className="px-6  md:p-0 md:flex md:items-center md:space-x-6">
              <a
                href="/"
                className="block text-gray-700 hover:text-gray-900 mb-4 md:mb-0"
              >
                Log in
              </a>
              <a
                href="/"
                className="md:mb-0 mb-4 flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 rounded-full"
              >
                Sign in
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
