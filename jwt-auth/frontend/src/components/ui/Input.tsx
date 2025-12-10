import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success, className = "", type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [, setIsFocused] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-red-600 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`
              w-full px-4 py-3 border-2 rounded-xl
              bg-blue-50/50
              transition-all duration-200
              focus:outline-none focus:ring-2
              ${error 
                ? "border-red-400 focus:border-red-500 focus:ring-red-100" 
                : success
                ? "border-green-400 focus:border-green-500 focus:ring-green-100"
                : "border-gray-300 focus:border-primary-500 focus:ring-primary-100"
              }
              ${isPassword || success || error ? "pr-12" : ""}
              ${className}
            `}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-600 transition-colors p-1 hover:scale-110 active:scale-95 duration-200"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
          {success && !isPassword && (
            <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 slide-in-right" />
          )}
          {error && !isPassword && (
            <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500 slide-in-right" />
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5 slide-in-left">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";