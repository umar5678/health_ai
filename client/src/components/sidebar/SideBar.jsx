import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import Button from "../ui/Button";
import EmailVerificationSnackbar from "../snackbars/EmailVerificationSnacknar";
import { useAuth } from "../../context/AuthContext";

const SideBar = ({ toggleSidebar }) => {
  const sideNavLinks = [
    { path: "/dashboard/overview", label: "Overview" },
    { path: "/dashboard/profile", label: "Profile" },
    { path: "/dashboard/diet-plans", label: "Diet Plans" },
    { path: "/dashboard/exercise-routine", label: "Exercise Routine" },
  ];

  const {user} = useAuth()

  const navigate = useNavigate();
  const { logout } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    const res = await logout();
    if (res.success) {
      setError("");
      setLoading(false);
      navigate("/");
      return;
    } else {
      setError(res.message);
      setLoading(false);
      return;
    }
  };

  return (
    <div className="h-full px-3 py-4 overflow-y-auto flex flex-col  items-center">
      {/* Close Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="absolute top-2 right-2 sm:hidden"
      ></button>

      {/* logo */}
      <div className="mt-14 ">
        <Logo />
      </div>

      {/* Navigation Links */}
      <div className="flex-1">
        <ul
          className="space-y-2 font-medium flex flex-col gap-2 items-center mt-10"
          onClick={toggleSidebar}
        >
          {sideNavLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 block rounded-md transition ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-16">
        {user?.isEmailVerified ? null : (
          <>
            <EmailVerificationSnackbar
              isUserEmailVerified={user?.isEmailVerified}
              // resendVerificationEmail={resendVerificationEmail}
            />
          </>
        )}
      </div>
      </div>

     

      <div className="pb-16">
        {error ? (
          <>
            <p>{error}</p>
          </>
        ) : (
          ""
        )}
        <Button onClick={handleLogout} variant="destructive-outline">
          {loading ? "Loaging" : "Logout"}
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
