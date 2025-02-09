import React from "react";
import Button from "./ui/Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
const URI = import.meta.env.VITE_SERVER_URI;

const OAuth = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${URI}/user/auth/google`;
  };

  return (
    <div>
      {" "}
      <div className="relative mt-4"></div>
      <div className="space-y-4 text-sm font-medium">
        <button
          onClick={handleGoogleLogin}
          variant="primary-outline"
          className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>

        <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
          <FaGithub className="text-2xl" />
          Continue with Github
        </button>
        <span className="block w-full h-px bg-gray-300"></span>
        <p className="inline-block w-fit text-sm bg-white px-2 absolute  inset-x-0 mx-auto">
          Or
        </p>
      </div>
    </div>
  );
};

export default OAuth;
