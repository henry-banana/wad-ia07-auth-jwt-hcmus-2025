import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ children, className = "", hover = true, glass = false }: CardProps) {
  return (
    <div
      className={`
        ${glass 
          ? "glass border-white/30" 
          : "bg-white/90 backdrop-blur-sm border border-gray-200/50"
        }
        rounded-2xl shadow-xl p-6
        transition-all duration-500
        ${hover ? "hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: CardProps) {
  return <div className={`mb-6 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: CardProps) {
  return (
    <h2 className={`text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent ${className}`}>
      {children}
    </h2>
  );
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={className}>{children}</div>;
}

export function CardDescription({ children, className = "" }: CardProps) {
  return <p className={`text-gray-600 mt-2 ${className}`}>{children}</p>;
}