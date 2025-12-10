import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { tokenStorage } from "../utils/tokenStorage";
import { AuthContext } from "../context/AuthContext";

// Main auth hook - used throughout the app
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// Hook to get user profile (alternative using React Query directly)
export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: authApi.getProfile,
    enabled: tokenStorage.hasAccessToken(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}