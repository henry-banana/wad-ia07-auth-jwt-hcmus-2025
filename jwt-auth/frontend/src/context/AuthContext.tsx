import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { tokenStorage } from "../utils/tokenStorage";
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth.types";
import toast from "react-hot-toast";

// Storage key for multi-tab sync
const AUTH_STORAGE_KEY = "auth_logout_event";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isLoggingIn: boolean;
  isRegistering: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const queryClient = useQueryClient();

  // Handle logout (shared function for multi-tab sync)
  const handleLogout = useCallback(() => {
    tokenStorage.clearAccessToken();
    setUser(null);
    queryClient.clear();
  }, [queryClient]);

  // Multi-tab synchronization: Listen for logout events from other tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === AUTH_STORAGE_KEY && event.newValue === "logout") {
        // Another tab triggered logout
        handleLogout();
        toast.success("Đã đăng xuất từ tab khác");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [handleLogout]);

  // Silent token refresh before expiration
  useEffect(() => {
    if (!user) return;

    const scheduleRefresh = () => {
      const timeUntilExpiry = tokenStorage.getTimeUntilExpiry();
      // Refresh 1 minute before expiration
      const refreshTime = Math.max((timeUntilExpiry - 60) * 1000, 0);

      if (refreshTime <= 0) {
        // Token already expired or expiring very soon, refresh now
        performRefresh();
        return;
      }

      return setTimeout(() => {
        performRefresh();
      }, refreshTime);
    };

    const performRefresh = async () => {
      try {
        const refreshResult = await authApi.refresh();
        tokenStorage.setAccessToken(refreshResult.accessToken);
        console.log("🔄 Token refreshed silently");
      } catch (error) {
        console.error("Silent refresh failed:", error);
        handleLogout();
      }
    };

    const timeoutId = scheduleRefresh();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [user, handleLogout]);

  // Initialize: Check if user is logged in (via refresh token cookie)
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Nếu không có access token trong memory, thử refresh từ cookie trước
        if (!tokenStorage.hasAccessToken()) {
          try {
            const refreshResult = await authApi.refresh();
            tokenStorage.setAccessToken(refreshResult.accessToken);
          } catch {
            // Không có refresh token hợp lệ, user chưa đăng nhập
            setUser(null);
            setIsInitializing(false);
            return;
          }
        }

        // Sau khi có access token, lấy profile
        const userData = await authApi.getProfile();
        setUser(userData);
      } catch (error) {
        // User not authenticated
        tokenStorage.clearAccessToken();
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    initAuth();
  }, []);

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Chỉ lưu access token (refresh token đã trong cookie)
      tokenStorage.setAccessToken(data.accessToken);
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Đăng nhập thành công!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại");
    },
  });

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      // Chỉ lưu access token (refresh token đã trong cookie)
      tokenStorage.setAccessToken(data.accessToken);
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Đăng ký thành công!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Đăng ký thất bại");
    },
  });

  // Logout Mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Broadcast logout event to other tabs
      localStorage.setItem(AUTH_STORAGE_KEY, "logout");
      localStorage.removeItem(AUTH_STORAGE_KEY); // Clear immediately after broadcast
      
      handleLogout();
      toast.success("Đã đăng xuất");
    },
  });

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading: isInitializing,
    login: async (credentials) => {
      await loginMutation.mutateAsync(credentials);
    },
    register: async (credentials) => {
      await registerMutation.mutateAsync(credentials);
    },
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Export context for useAuth hook
export { AuthContext };