import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import {
  LoginPage,
  SignupPage,
  NotFound,
  AdminPage,
  AuthCallbackPage,
  HomePage,
  Dashboard,
  Overview,
  Profile,
  DietPlans,
  ExerciseRoutine,
  ForgetPassword,
  ResetForgottenPassword
} from "./pages";
import Protected from "./components/Protected.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PlansProvider } from "./context/PlansContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      { path: "/forgot-password", element: <ForgetPassword /> },
      { path: "/reset-password", element: <ResetForgottenPassword /> },
      { path: "/auth/callback", element: <AuthCallbackPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <Protected>
        <PlansProvider>
          <Dashboard />
        </PlansProvider>
      </Protected>
    ),
    children: [
      { path: "/dashboard/overview", element: <Overview /> },
      { path: "/dashboard/profile", element: <Profile /> },
      { path: "/dashboard/diet-plans", element: <DietPlans /> },
      { path: "/dashboard/exercise-routine", element: <ExerciseRoutine /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
);
