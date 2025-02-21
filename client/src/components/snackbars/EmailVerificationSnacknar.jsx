import React, { useState, useEffect } from "react";
import AuthService from "../../services/AuthService";
import { ApiError } from "../../api/ApiError";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";

const EmailVerificationSnackbar = ({ isUserEmailVerified }) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  console.log("is email verified:", isUserEmailVerified);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const [currUserId, setCurrUserId] = useState(user?._id);

  useEffect(() => {
    setCurrUserId(user?._id);
  }, [user]);

  useEffect(() => {
    if (!isUserEmailVerified) {
      setShowSnackbar(true);
    }
  }, [isUserEmailVerified]);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleResendClick = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await AuthService.resendEmailVerification(currUserId);
      if (res instanceof ApiError) {
        setError("Error resending email verification");
        console.log(res);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setError("Error resending email verification");
    } finally {
      setLoading(false);
    }

    // setShowSnackbar(false); // Optionally close after resending
  };

  return (
    <>
      {showSnackbar && (
        <div className="relative z-50 md:left-30 not-md:left-22 sm:left-28  -translate-x-1/2 bg-yellow-100/80 border-yellow-400 text-yellow-800 px-4 py-2 rounded-md shadow-md transition-opacity duration-300">
          <div className="">
            <div className="flex justify-end">
              <button
                onClick={handleCloseSnackbar}
                className="text-stone-700 hover:text-yellow-700"
              >
                <IoMdClose />
              </button>
            </div>
            <div>
              {loading ? (
                <>
                  <p>Loading...</p>
                </>
              ) : (
                <>
                  {error && (
                    <>
                      {" "}
                      <p className="text-red-500">{error}</p>{" "}
                    </>
                  )}
                  {success ? (
                    <>
                      <p>Email Sent.</p>
                    </>
                  ) : (
                    <>
                      <span>
                        Your email is not verified. Please check your inbox or{" "}
                      </span>
                      <button
                        onClick={handleResendClick}
                        className="text-yellow-700 font-semibold underline hover:text-yellow-900"
                      >
                        resend verification email
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailVerificationSnackbar;
