import axiosClient from "./axiosClient";
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  RefreshResponse,
  User,
} from "../types/auth.types";

export const authApi = {
  // Register new user
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>(
      "/auth/register",
      credentials
    );
    // Backend tự động set refresh token vào HTTP-only cookie
    return response.data;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    // Backend tự động set refresh token vào HTTP-only cookie
    return response.data;
  },

  // Refresh access token
  // Refresh token TỰ ĐỘNG gửi qua HTTP-only cookie
  refresh: async (): Promise<RefreshResponse> => {
    const response = await axiosClient.post<RefreshResponse>(
      "/auth/refresh",
      {} // Empty body - cookie gửi tự động
    );
    return response.data;
  },

  // Logout user
  // Backend sẽ xóa HTTP-only cookie
  logout: async (): Promise<void> => {
    await axiosClient.post("/auth/logout");
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await axiosClient.get<User>("/auth/me");
    return response.data;
  },
};
