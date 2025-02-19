import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import Input from "../ui/Input";
import OAuth from "../OAuth";
import AuthService from "../../services/AuthService";
import { ApiError } from "../../api/ApiError";
import { useAuth } from "../../context/AuthContext";
import { LuEyeClosed } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";

const SignupForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();

  const handleSignup = async (data) => {
    setError("");
    setLoading(false);
    const res = await signup(data.fullName, data.email, data.password);

    if (res.success) {
      setLoading(false);
      navigate("/login");
    } else {
      setLoading(false);
      setError(res.message);
      return;
    }

    if (response instanceof ApiError) {
      setError(response.errorResponse?.message || response.errorMessage);
    } else {
      console.log("user recieved in component :", response.success);
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold leading-tight">
        Create an Account
      </h2>

      <OAuth />

      {error && <p className="text-red-600 mt-10 text-center">{error}</p>}

      <div>
        <form onSubmit={handleSubmit(handleSignup)} className="mt-8">
          <div className="space-y-5">
            {/* Full Name */}
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              type="text"
              {...register("fullName", {
                required: "Full Name is required",
                minLength: {
                  value: 3,
                  message: "Full Name must be at least 3 characters",
                },
              })}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}

            {/* Email */}
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Password */}
            <div>
              <div className="flex items-end justify-end w-full relative top-7 pr-2 ">
                {showPassword ? (
                  <>
                    <FaRegEye onClick={() => setShowPassword(false)} />
                  </>
                ) : (
                  <>
                    <LuEyeClosed onClick={() => setShowPassword(true)} />
                  </>
                )}
              </div>
              <Input
                label="Password: "
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Signup Button */}
            <Button
              variant="primary"
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500"
            >
              Sign Up
            </Button>
          </div>
        </form>

        {/* Login Link */}
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline text-indigo-600"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
