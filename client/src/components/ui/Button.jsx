import React, { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      variant = "default",
      size = "default",
      type = "button",
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none";

    const variantClasses = {
      default:
        "bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-300",
      primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
      "primary-outline":
        "border border-blue-500 text-blue-500 bg-blue-100 hover:bg-blue-200 focus:ring-blue-300",
      "default-outline":
        "border border-gray-500 text-gray-600 hover:bg-gray-100 focus:ring-gray-300",
      secondary:
        "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-300",
      destructive:
        "bg-red-500 text-white border border-red-600 hover:bg-red-600 focus:ring-red-300",
      "destructive-outline":
        "bg-red-500/10 text-red-500 hover:text-white border border-red-600 hover:bg-red-600 focus:ring-red-300",
      ghost:
        "bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-300",
      link: "text-blue-500 underline hover:text-blue-600 focus:ring-blue-300",
    };

    const sizeClasses = {
      default: "px-4 py-2 text-sm",
      sm: "px-3 py-1 text-xs",
      lg: "px-6 py-3 text-lg",
      icon: "p-2",
    };

    return (
      <button
        type={type}
        ref={ref}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  }
);

export default Button;
