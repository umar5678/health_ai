import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import Input from "../ui/Input";
import OAuth from "../OAuth";
import { loginService } from "../../services/authServices";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth(); // Get setAuth from AuthContext
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setError("");
    setLoading(true);

    try {
      const response = await loginService(data); // Call login service
      const { accessToken, user } = response.data?.data || {};

      if (accessToken) {
        // Store token in sessionStorage
        sessionStorage.setItem("accessToken", accessToken);

        // Update AuthContext
        setAuth({
          isLoggedIn: true,
          userId: user?._id,
          userData: user,
          loading: false,
          error: "",
        });

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err?.message || "Login Error");
      setAuth((prevAuth) => ({
        ...prevAuth,
        isLoggedIn: false,
        loading: false,
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold leading-tight">
        Login to your account
      </h2>
      <OAuth />

      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

      <div>
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            {/* Email Input */}
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Password Input */}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Submit Button */}
            <Button
              variant="primary"
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>

        {/* Signup Link */}
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline text-indigo-600"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
