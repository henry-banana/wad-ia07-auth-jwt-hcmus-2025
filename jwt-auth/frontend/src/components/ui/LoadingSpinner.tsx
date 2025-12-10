import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ size = "md", text, fullScreen = false }: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4 scale-bounce">
      <div className="relative">
        <Loader2 className={`${sizes[size]} animate-spin text-primary-600`} />
        <div className="absolute inset-0 rounded-full bg-primary-600/20 blur-xl pulse-glow"></div>
      </div>
      {text && (
        <p className="text-gray-700 font-medium animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 z-50">
        <div className="absolute inset-0 animated-gradient opacity-30"></div>
        <div className="relative">{content}</div>
      </div>
    );
  }

  return content;
}

// Skeleton Loading Component
export function SkeletonCard() {
  return (
    <div className="bg-white/90 rounded-2xl shadow-xl p-6 animate-pulse">
      <div className="shimmer h-6 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
      <div className="space-y-3">
        <div className="shimmer h-4 bg-gray-200 rounded w-full"></div>
        <div className="shimmer h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="shimmer h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  );
}