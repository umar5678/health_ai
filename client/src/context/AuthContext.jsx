import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { generalApi, interceptedApi } from "../api/api"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    loading: true,
    error: "",
    userId: null,
    userData: null,
  });

  console.log(auth)

  useEffect(() => {
    const initializeAuthState = async () => {
      setAuth((prevAuth) => ({ ...prevAuth, loading: true, error: "" })); // Set loading and clear error

      try {
        const token = sessionStorage.getItem("accessToken");

        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp > currentTime) {
              setAuth((prevAuth) => ({
                ...prevAuth,
                isLoggedIn: true,
                userId: decodedToken._id,
                loading: false,
              }));
              return; // Token is valid, exit early
            }
          } catch (decodeError) {
            console.error("Token decoding error:", decodeError);
            sessionStorage.removeItem("accessToken");
          }
        }

        // Refresh token or clear session
        try {
          const response = await generalApi.post("/user/auth/refresh-token");
          const newAccessToken = response.data?.data?.accessToken;

          if (newAccessToken) {
            sessionStorage.setItem("accessToken", newAccessToken); 
            const newDecodedToken = jwtDecode(newAccessToken);
            setAuth((prevAuth) => ({
              ...prevAuth,
              isLoggedIn: true,
              userId: newDecodedToken._id,
              loading: false,
            }));
          } else {
            sessionStorage.removeItem("accessToken");
            setAuth((prevAuth) => ({
              ...prevAuth,
              isLoggedIn: false,
              userId: null,
              error: "Session expired. Please log in again.",
              loading: false,
            }));
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          sessionStorage.removeItem("accessToken");
          setAuth((prevAuth) => ({
            ...prevAuth,
            isLoggedIn: false,
            userId: null,
            error: "Session expired. Please log in again.",
            loading: false,
          }));
        }
      } catch (overallError) {
        console.error("Overall auth initialization error:", overallError);
        sessionStorage.removeItem("accessToken");
        setAuth((prevAuth) => ({
          ...prevAuth,
          isLoggedIn: false,
          userId: null,
          error: "An unexpected error occurred. Please try again.",
          loading: false,
        }));
      }
    };

    initializeAuthState();
  }, []);

  useEffect(() => {
    if (!auth.userId || auth.userData) return; // Only fetch if userId exists and userData is null
    const getUserData = async () => {
      setAuth((prevAuth) => ({ ...prevAuth, loading: true })); // Set loading before fetch
      try {
        const response = await interceptedApi.get(`/user/${auth.userId}`); // Use userId from state
        const receivedUser = response.data?.data?.user;
        if (receivedUser) {
          setAuth((prevAuth) => ({
            ...prevAuth,
            userData: receivedUser,
            loading: false,
          }));
        } else {
          setAuth((prevAuth) => ({
            ...prevAuth,
            userData: null,
            loading: false,
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setAuth((prevAuth) => ({
          ...prevAuth,
          userData: null,
          loading: false,
          error: "Error fetching user data.",
        }));
      }
    };

    getUserData();
  }, [auth.userId]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
