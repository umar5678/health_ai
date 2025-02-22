import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import AuthService from "../services/AuthService";
import { clearToken, getToken, setToken } from "../utils/tokenUtils";
import UserService from "../services/userServices";
import { ApiError } from "../api/ApiError";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  // console.log("user",user)
  // console.log("user ID",userId)
  // console.log("error", error);
  // console.log("token", getToken())
  //  user state does not persist with page refresh, but accessToken in session storage does, is only removed when user close window, or user manually delete the token
  // when ever page refresh, token is available, so we got the userID, then based on this ID we can call get user and save the user in state
  // other option is to user localstorage for both accessToken and user Data

  const initializeAuthState = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp > currentTime) {
            setUserId(decodedToken._id);
            return;
          } else {
            clearToken();
          }
        } catch (decodeError) {
          console.error("Token decoding error:", decodeError);
          clearToken();
        }
      }

      // Try refreshing the token
      const response = await AuthService.refreshAccessToken();
      if (response instanceof ApiError) {
        console.error("Refresh token error:", response.errorMessage);
        setError(response.errorMessage);
      } else {
        setUserId(response.data.user._id);
        setUser(response.data.user);
        setToken(response.data.accessToken);
      }
    } catch (refreshError) {
      console.error("Error refreshing token:", refreshError);
      clearToken();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuthState();
  }, [initializeAuthState]);

  useEffect(() => {
    if (!userId || user !== null) return;
    const getUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await UserService.getCurrentUser(userId);
        if (response instanceof ApiError) {
          setError(response.errorMessage);
        } else {
          setUser(response.data.user);
        }
      } catch (error) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, [userId, user]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await AuthService.login(email, password);
      if (res instanceof ApiError) {
        setError(res.errorMessage);
        return { success: false, message: res.errorMessage };
      }

      setUser(res.data.user);
      setToken(res.data.accessToken);
      return { success: true };
    } catch (err) {
      setError(err.message || "Login failed");
      return { success: false, message: err.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (fullName, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await AuthService.register(fullName, email, password);
      if (res instanceof ApiError) {
        setError(res.errorMessage);
        return { success: false, message: res.errorMessage };
      }
      return { success: true };
    } catch (err) {
      setError(err.message || "Registration failed");
      return { success: false, message: err.message || "Registration failed" };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      const res = await AuthService.logout();

      if (res instanceof ApiError) {
        return { success: false, message: res.errorMessage };
      } else {
        setUser(null);
        setUserId(null);
        clearToken();
      }
    } catch (error) {
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (oldPassword, newPassword) => {
    setLoading(true);
    setError(null);

    try {
      const res = await AuthService.changePassword(oldPassword, newPassword);
      if (res instanceof ApiError) {
        setError(res.errorMessage);
        return { success: false, message: res.errorMessage };
      }
      return { success: true, message: "Password changed successfully" };
    } catch (err) {
      setError(err.message || "Failed to change password");
      return {
        success: false,
        message: err.message || "Failed to change password",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    setUser,
    setUserId,
    login,
    signup,
    logout,
    changePassword,
    loading,
    userId,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
