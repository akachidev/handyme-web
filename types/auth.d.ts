export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  profileImage: string | null;
  provider: "CREDENTIALS" | "GOOGLE" | "FACEBOOK";
  emailVerified: boolean;
  phoneVerified: boolean;
  role: "CUSTOMER" | "SERVICE_PROVIDER" | "ADMIN";
  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "DELETED";
  createdAt: string;
  updatedAt: string;
  birthDate: string | null;
  fullName: string | null;
  createdAgo: string;
  bio: string | null;
  userSubscriptionId: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
  lastActiveAt: string | null;
  referralCode: string;
  referredBy: string | null;
  currentLatitude: number | null;
  currentLongitude: number | null;
  currentAddress: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyLoginRequest {
  email: string;
  code: string;
}

export interface RegisterRequest {
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface SendVerificationRequest {
  type: "EMAIL_VERIFICATION" | "PHONE_VERIFICATION";
  identifier: string;
}

export interface VerifyOtpRequest {
  type: "EMAIL_VERIFICATION" | "PHONE_VERIFICATION";
  code: string;
  identifier: string;
}

export interface PasswordChangeRequest {
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface AuthResponse {
  message: string;
  jwtToken: string;
  refreshToken?: string;
  user: User;
  success?: boolean;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
  statusCode?: number;
}
