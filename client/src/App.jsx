import React from "react";
import { Footer, Header } from "./components";
import {
  Navigate,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

const App = () => {
  const { auth } = useAuth();
  const location = useLocation();
  if (auth.isLoggedIn) {
    return <Navigate to="/dashboard/overview" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <Outlet />
        <ScrollRestoration />
      </div>
      <Footer />
    </div>
  );
};

export default App;
