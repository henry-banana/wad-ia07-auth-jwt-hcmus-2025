import {
  createContext,
  useContext,
  useState,
  useEffect,
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

interface AuthContextType {
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

  // Initialize: Check if user is logged in (via refresh token cookie)
  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await authApi.getProfile();
        setUser(userData);
      } catch (error) {
        // User not authenticated
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
      // Chỉ xóa access token (refresh token cookie backend tự xóa)
      tokenStorage.clearAccessToken();
      setUser(null);
      queryClient.clear();
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}