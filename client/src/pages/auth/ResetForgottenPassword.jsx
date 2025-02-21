import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button, Input } from "../../components";
import { useForm } from "react-hook-form";
import { LuEyeClosed } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import AuthService from "../../services/AuthService";
import { ApiError } from "../../api/ApiError";
import toast, { Toaster } from "react-hot-toast";

const ResetForgottenPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleReset = async (data) => {
    setLoading(true);
    setError("");

    console.log(data.password);

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const newPassword = data.password;

    try {
      const res = await AuthService.resetForgottenPassword(token, newPassword);

      if (res instanceof ApiError) {
        // setError(res.errorResponse);
        toast.error(res.errorMessage);
        console.log(res.errorMessage);
      } else {
        console.log(res);
        if (res.success) {
          toast.success("Password reset successfully ✅");
          navigate("/login");
        }
      }
    } catch (error) {
      setError("Failed to reset Password");
      console.error("reset password Error: ", error.message);
    } finally {
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit(handleReset)} className="mt-8">
        <div className="max-w-md mx-auto  mt-14 px-4">
          <h1>Reset Your password</h1>

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
            inputClasses="p-2 mt-2"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <Input
            label="Confirm Password: "
            type={showPassword ? "text" : "password"}
            inputClasses="p-2 mt-2"
            placeholder="Enter your password"
            {...register("confirmPassword", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <Button type="submit" disabled={loading} className="mt-4">
            {loading ? "Resetting..." : "Reset Password"}
          </Button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default ResetForgottenPassword;

//
//
//
//
//
//
//

// import React, { useState } from "react";
// import { Link, useSearchParams, useNavigate } from "react-router-dom";
// import { Button, Input } from "../../components";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// const passwordSchema = yup
//   .string()
//   .required("New password is required")
//   .min(8, "Password must be at least 8 characters")
//   .matches(
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
//     "Password must contain at least one uppercase, one lowercase, one number and one special character"
//   )
//   .label("New Password");

// const confirmPasswordSchema = yup
//   .string()
//   .required("Confirm password is required")
//   .oneOf([yup.ref("newPassword")], "Passwords must match")
//   .label("Confirm Password");

// const schema = yup.object().shape({
//   newPassword: passwordSchema,
//   confirmPassword: confirmPasswordSchema,
// });

// const ResetForgottenPassword = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const token = searchParams.get("token");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const handleLogin = async (data) => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Here you would make your API call to reset the password
//       const response = await fetch("/api/reset-password", {
//         // Replace with your API endpoint
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           token: token,
//           newPassword: data.newPassword,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to reset password");
//       }

//       // If successful, redirect or show a success message
//       console.log("Password reset successfully");
//       navigate("/login"); // Example: Redirect to login
//     } catch (err) {
//       setError(err.message);
//       console.error("Password reset error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
//         <div>
//           <h1>Reset Your password</h1>

//           <Input
//             type="password"
//             label="New Password"
//             {...register("newPassword")}
//             error={errors.newPassword?.message}
//           />
//           <Input
//             type="password"
//             label="Confirm Password"
//             {...register("confirmPassword")}
//             error={errors.confirmPassword?.message}
//           />

//           <Button type="submit" disabled={loading}>
//             {loading ? "Resetting..." : "Reset Password"}
//           </Button>

//           {error && <p className="text-red-500 mt-2">{error}</p>}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ResetForgottenPassword;
