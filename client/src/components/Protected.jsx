import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "./loaders/LoadingScreen";

const Protected = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth.loading) return <LoadingScreen />;

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // if (auth.isLoggedIn && window.location.pathname === "/") {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return children;
};

export default Protected;
