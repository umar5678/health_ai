import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { interceptedApi } from "../api/api";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuth } = useAuth();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const accessToken = searchParams.get("accessToken");

        if (accessToken) {
          sessionStorage.setItem("accessToken", accessToken);
          const decodedToken = jwtDecode(accessToken);

          setAuth((prevAuth) => ({
            ...prevAuth,
            isLoggedIn: true,
            userId: decodedToken.sub || decodedToken._id, // Use sub or _id based on your token structure
            loading: false,
          }));

          // Fetch user data after successful login
          const response = await interceptedApi.get(
            `/user/${decodedToken._id}`
          ); // Use sub or _id
          const receivedUser = response.data?.data?.user;
          if (receivedUser) {
            setAuth((prevAuth) => ({
              ...prevAuth,
              userData: receivedUser,
            }));
          }

          navigate("/dashboard/overview");
        } else {
          setAuth((prevAuth) => ({
            ...prevAuth,
            loading: false,
            isLoggedIn: false,
            error: "No token provided.",
          }));
          navigate("/login");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setAuth((prevAuth) => ({
          ...prevAuth,
          loading: false,
          isLoggedIn: false,
          error: "Authentication failed. Please try again.",
        }));
        navigate("/login");
      }
    };

    handleAuth();
  }, [searchParams, navigate, setAuth]);

  return <p>Processing login...</p>;
};

export default AuthCallbackPage;
