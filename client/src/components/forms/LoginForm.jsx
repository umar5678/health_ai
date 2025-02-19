import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import Input from "../ui/Input";
import OAuth from "../OAuth";
import { useAuth } from "../../context/AuthContext";
import { LuEyeClosed } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  useEffect(() => {
    if (!login) {
      navigate("/login");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    setError("");
    setLoading(true);

    const res = await login(data.email, data.password);

    if (!res.success) {
      setError(res.message);
    } else {
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold leading-tight">
        Login to your account
      </h2>
      <OAuth />

      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

      <div>
        <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
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
                })}
              />
            </div>
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:underline text-right"
              >
                Forgot password?
              </Link>
            </div>
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
