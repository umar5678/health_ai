import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuth } = useAuth(); // Use setAuth to update the whole auth object

  const accessToken = searchParams.get("accessToken");

  useEffect(() => {
    const handleAuth = async () => {
      // Make it an async function
      setAuth((prevAuth) => ({ ...prevAuth, loading: true, error: "" })); // Set loading

      if (accessToken) {
        sessionStorage.setItem("accessToken", accessToken);

        try {
          const decodedToken = jwtDecode(accessToken);
          console.log(decodedToken);
          setAuth((prevAuth) => ({
            ...prevAuth,
            isLoggedIn: true,
            userId: decodedToken._id, // Set userId
            userData: decodedToken, // If you have user data directly in the token
            loading: false,
          }));

          navigate("/dashboard"); // Redirect after successful login
        } catch (error) {
          console.error("Failed to decode token:", error);
          setAuth((prevAuth) => ({
            ...prevAuth,
            loading: false,
            error: "Invalid token.", // Set an error message
          }));
          navigate("/login"); // Or redirect back to login with error
        }
      } else {
        setAuth((prevAuth) => ({
          ...prevAuth,
          loading: false,
          isLoggedIn: false,
          userId: null,
          userData: null,
          error: "No token provided.", // Set an error message
        }));
        navigate("/login"); // Redirect to login if no token
      }
    };

    handleAuth(); // Call the async function
  }, [searchParams, navigate, setAuth, accessToken]); // Add accessToken to the dependency array

  return <p>Processing login...</p>;
};

export default AuthCallbackPage;
