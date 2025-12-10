import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { tokenStorage } from "../utils/tokenStorage";

// Hook to get user profile
export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: authApi.getProfile,
    enabled: tokenStorage.hasAccessToken(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}