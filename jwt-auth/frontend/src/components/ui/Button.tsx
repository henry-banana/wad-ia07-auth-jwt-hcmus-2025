import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  isLoading = false,
  size = "md",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group disabled:cursor-not-allowed disabled:opacity-60";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:shadow-none before:absolute before:inset-0 before:bg-white before:opacity-0 hover:before:opacity-20 before:transition-opacity",
    secondary:
      "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 disabled:hover:scale-100 border border-gray-300",
    outline:
      "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 hover:scale-105 active:scale-95 disabled:hover:scale-100 hover:border-primary-700 hover:shadow-lg transition-all",
    ghost:
      "text-gray-700 hover:bg-gray-100 active:bg-gray-200 hover:scale-105 active:scale-95",
  };

  return (
    <button
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="animate-pulse">Đang xử lý...</span>
        </>
      )}
      {!isLoading && (
        <>
          {children}
          <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]"></span>
        </>
      )}
    </button>
  );
}