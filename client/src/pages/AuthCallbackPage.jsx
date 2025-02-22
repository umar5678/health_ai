import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { interceptedApi } from "../api/api";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser, setUserId } = useAuth();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const accessToken = searchParams.get("accessToken");

        if (accessToken) {
          sessionStorage.setItem("accessToken", accessToken);

          const decodedToken = jwtDecode(accessToken);

          setUserId(decodedToken._id);

          // Fetch user data after successful login
          const response = await interceptedApi.get(
            `/user/${decodedToken._id}`
          ); // Use sub or _id
          const receivedUser = response.data?.data?.user;
          if (receivedUser) {
            setUser(receivedUser);
          }

          navigate("/dashboard/overview");
        } else {
          setUser(null);
          setUserId(null);
          navigate("/login");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setUser(null);
        setUserId(null);
        navigate("/login");
      }
    };

    handleAuth();
  }, [searchParams, navigate, setUserId, setUser]);

  return <p>Processing login...</p>;
};

export default AuthCallbackPage;
