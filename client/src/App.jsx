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
  const { user } = useAuth();
  const location = useLocation();
  if (user) {
    return <Navigate to="/dashboard/overview" />;
  }

  console.log(user)

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
