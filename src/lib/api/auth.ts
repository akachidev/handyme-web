import { apiClient } from "@/config/apiClient";
import type {
  LoginRequest,
  ApiResponse,
  AuthResponse,
  RegisterRequest,
  RefreshTokenResponse,
  VerifyOtpRequest,
  SendVerificationRequest,
  User,
  PasswordChangeRequest,
} from "types/auth";
export const authAPI = {
  // Authentication endpoints
  login: async (data: LoginRequest): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/signup", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  logoutAllDevices: async (): Promise<void> => {
    await apiClient.post("/auth/logout-all");
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post<RefreshTokenResponse>(
      "/auth/refresh",
      {
        refreshToken,
      }
    );
    return response.data;
  },

  sendVerificationCode: async (
    data: SendVerificationRequest
  ): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>("/auth/send-otp", data);
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>(
      "/auth/verify-otp",
      data
    );
    return response.data;
  },

  forgotPassword: async (data: { email: string }): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>(
      "/auth/forgot-password",
      data
    );
    return response.data;
  },

  resetPassword: async (data: PasswordChangeRequest): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>(
      "/auth/reset-password",
      data
    );
    return response.data;
  },

  // User profile endpoints
  getUserProfile: async (): Promise<{ user: User }> => {
    const response = await apiClient.get<{ user: User }>("/user/me");
    return response.data;
  },

  updatePhone: async (data: { phoneNumber: string }): Promise<ApiResponse> => {
    const response = await apiClient.patch<ApiResponse>("/auth/phone", data);
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await apiClient.patch<ApiResponse<User>>(
      "/user/profile",
      data
    );
    return response.data;
  },
};
