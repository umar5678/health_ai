import React from "react";

const providers = [
  {
    name: "Google",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-5 h-5"
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          className="fill-[#4285F4]"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          className="fill-[#34A853]"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          className="fill-[#FBBC05]"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          className="fill-[#EA4335]"
        />
      </svg>
    ),
  },
  {
    name: "GitHub",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-5 h-5 fill-current"
      >
        {" "}
        {/* fill-current for theming */}
        <path
          d="M12 .297c-6.63 0-12 5.37-12 12 0 5.38 3.44 9.98 8.22 11.48.6.11.82-.26.82-.58v-2.07c-3.36.73-4.06-1.58-4.06-1.58-.55-1.41-1.33-1.8-1.33-1.8-.92-.62-.15-.65.7-.65.2 0 .4.03.6.08.91.62 1.44 1.48 1.44 1.48.85 1.47 2.29 1.09 2.87.82.04-.02.2-.1.2-.2v-1.42c-2.82.62-5.46-1.51-5.46-6.35 0-1.4.49-2.53 1.3-3.44-.13-.3-.56-1.72.1-3.59 0 0 .54-.17 1.78.61.55-.17 1.14-.26 1.74-.26.6 0 1.2.09 1.74.26 1.24-.78 1.78-.61 1.78-.61.66 1.87.22 3.29.1 3.59.81.91 1.3 2.04 1.3 3.44 0 4.85-2.64 6.13-5.46 6.35v1.9c0 .32.22.59.82.58C20.56 22.28 24 17.68 24 12.297c0-6.63-5.37-12-12-12z"
          className="fill-current"
        />
      </svg>
    ),
  },
  {
    name: "Facebook",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-5 h-5 fill-current"
      >
        {" "}
        {/* fill-current for theming */}
        <path
          d="M9 8h-3v4h3v12h5v-12h3.6l.4-4h-4v-3c0-1.032.253-2.01.688-2.81C10.397 2.215 11.09 2 12 2c2.091 0 3.782 1.691 3.782 3.782v3.434H17l-.6 4h-3.085V22h-5V12H4.4l-.4-4H9V8z"
          className="fill-current"
        />
      </svg>
    ),
  },
];

const AuthButton = ({ provider }) => {
  return (
    <button
      aria-label={`Sign in with ${provider.name}`}
      className="flex items-center rounded-full p-0.5 pr-4 transition-colors duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 mr-2" // Added margin for spacing
    >
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white">
        {provider.icon}
      </div>
      <span className="text-sm tracking-wider text-gray-700 dark:text-gray-300">
        Sign in with {provider.name}
      </span>
    </button>
  );
};

const AuthButtons = () => {
  return (
    <div>
      {providers.map((provider) => (
        <AuthButton key={provider.name} provider={provider} />
      ))}
    </div>
  );
};

export default AuthButtons;
