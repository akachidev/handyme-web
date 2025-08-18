import {
  ServiceApiClient,
  STORAGE_CONFIG,
  tokenManager,
} from "@/config/apiClient";
import { authAPI } from "@/lib/api/auth";
import type { AuthState, RegisterRequest } from "types/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";

export const USER_PROFILE_QUERY_KEY = ["user", "profile"];

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<any>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
  clearError: () => void;
  handleAuthError: () => Promise<void>;
  needsVerification: boolean;
  verificationEmail: string | null;
  refetchProfile: () => Promise<any>;
  invalidateProfile: () => Promise<void>;
  isProfileLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

// Token refresh configuration
const TOKEN_REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes
const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // Refresh 5 minutes before expiry

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRefreshingRef = useRef(false);

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
    token: null,
  });

  const [needsVerification, setNeedsVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState<string | null>(
    null
  );

  const {
    data: profileData,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
    error: profileError,
  } = useQuery({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: async () => {
      if (!authState.isAuthenticated) {
        throw new Error("Not authenticated");
      }
      const response = await authAPI.getUserProfile();

      const profile = response.user || response;
      return profile;
    },
    enabled: authState.isAuthenticated,
    retry: (failureCount, error: any) => {
      console.log(`⚠️ Profile fetch retry ${failureCount}:`, error?.message);
      // Don't retry on auth errors
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnMount: !authState.user,
    refetchOnWindowFocus: true,
  });

  // Utility functions for localStorage
  const setLocalStorage = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to set localStorage key ${key}:`, error);
    }
  };

  const getLocalStorage = (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Failed to get localStorage key ${key}:`, error);
      return null;
    }
  };

  const removeLocalStorage = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove localStorage key ${key}:`, error);
    }
  };

  // Token expiry check
  const isTokenExpiringSoon = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiryTime = payload.exp * 1000;
      const currentTime = Date.now();
      return expiryTime - currentTime <= TOKEN_REFRESH_THRESHOLD;
    } catch (error) {
      console.error("Failed to parse token:", error);
      return true; // Assume expired if we can't parse
    }
  };

  // Background token refresh function
  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    if (isRefreshingRef.current) {
      console.log("Token refresh already in progress, skipping...");
      return null;
    }

    try {
      isRefreshingRef.current = true;
      console.log("🔄 Refreshing access token...");

      const refreshToken = await tokenManager.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await authAPI.refreshToken(refreshToken);

      await tokenManager.setToken(response.accessToken);
      if (response.refreshToken) {
        await tokenManager.setRefreshToken(response.refreshToken);
      }

      setAuthState((prev) => ({
        ...prev,
        token: response.accessToken,
        error: null,
      }));

      console.log("✅ Token refreshed successfully");
      return response.accessToken;
    } catch (error: any) {
      console.error("❌ Token refresh failed:", error);

      // If refresh fails, logout user
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        await handleAuthError();
      } else {
        setAuthState((prev) => ({
          ...prev,
          error: "Session refresh failed",
        }));
      }
      return null;
    } finally {
      isRefreshingRef.current = false;
    }
  }, []);

  // Setup automatic token refresh
  const setupTokenRefresh = useCallback(() => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }

    refreshIntervalRef.current = setInterval(async () => {
      const currentToken = await tokenManager.getToken();
      if (
        currentToken &&
        authState.isAuthenticated &&
        isTokenExpiringSoon(currentToken)
      ) {
        await refreshAccessToken();
      }
    }, TOKEN_REFRESH_INTERVAL);
  }, [authState.isAuthenticated, refreshAccessToken]);

  // Clear token refresh interval
  const clearTokenRefresh = useCallback(() => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (profileData && authState.isAuthenticated) {
      setAuthState((prev) => ({
        ...prev,
        user: profileData,
      }));

      setLocalStorage("key", profileData);
    }
  }, [profileData, authState.isAuthenticated]);

  useEffect(() => {
    if (profileError && authState.isAuthenticated) {
      const error = profileError as any;
      console.error("Profile query error:", error);
      // Let ApiClient handle 401/403 errors automatically
      if (error?.response?.status !== 401 && error?.response?.status !== 403) {
        setAuthState((prev) => ({
          ...prev,
          error: error?.response?.data?.message || "Failed to load profile",
        }));
      }
    }
  }, [profileError, authState.isAuthenticated]);

  const handleAuthError = useCallback(async () => {
    console.log("🚨 Auth error - logging out user");
    clearTokenRefresh();
    await clearAuthData();
    queryClient.clear();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
      error: "Session expired. Please login again.",
    });
    setNeedsVerification(false);
    setVerificationEmail(null);
  }, [queryClient, clearTokenRefresh]);

  useEffect(() => {
    ServiceApiClient.setAuthErrorHandler(handleAuthError);
    initializeAuth();

    // Cleanup on unmount
    return () => {
      clearTokenRefresh();
    };
  }, [handleAuthError, clearTokenRefresh]);

  // Setup token refresh when authenticated
  useEffect(() => {
    if (authState.isAuthenticated && authState.token) {
      setupTokenRefresh();
    } else {
      clearTokenRefresh();
    }
  }, [
    authState.isAuthenticated,
    authState.token,
    setupTokenRefresh,
    clearTokenRefresh,
  ]);

  const initializeAuth = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      const token = await tokenManager.getToken();
      if (!token) {
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        return;
      }

      // Check if token is expired or expiring soon
      if (isTokenExpiringSoon(token)) {
        console.log("Token is expiring soon, attempting refresh...");
        const newToken = await refreshAccessToken();
        if (!newToken) {
          // Refresh failed, clear auth
          await clearAuthData();
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          return;
        }
      }

      const cachedUserData = getLocalStorage(STORAGE_CONFIG.keys.USER_DATA);

      if (cachedUserData) {
        const user = cachedUserData;
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          token: token,
        });
        // Set cached data in React Query
        queryClient.setQueryData(USER_PROFILE_QUERY_KEY, user);
      } else {
        setAuthState({
          user: null,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          token: token,
        });
      }
    } catch (error) {
      await clearAuthData();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        token: null,
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      setNeedsVerification(false);
      setVerificationEmail(null);

      await authAPI.login({ email, password });

      setNeedsVerification(true);
      setVerificationEmail(email);

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.response?.data?.message || "Login failed",
      }));
      setNeedsVerification(false);
      setVerificationEmail(null);
      throw error;
    }
  };

  const register = async (payload: RegisterRequest) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await authAPI.register(payload);

      await tokenManager.setToken(response.jwtToken);
      await tokenManager.setRefreshToken(
        response.refreshToken || response.jwtToken
      );

      setLocalStorage(STORAGE_CONFIG.keys.USER_DATA, response.user);

      setAuthState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        token: response.jwtToken,
      });

      queryClient.setQueryData(USER_PROFILE_QUERY_KEY, response.user);
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.response?.data?.message || "Registration failed",
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      clearTokenRefresh();
      await authAPI.logout();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      await clearAuthData();
      queryClient.clear();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        token: null,
      });
      setNeedsVerification(false);
      setVerificationEmail(null);
    }
  };

  const refreshUser = async () => {
    try {
      if (!authState.isAuthenticated) return;

      const response = await authAPI.getUserProfile();
      const userData = response.user || response;

      setLocalStorage(STORAGE_CONFIG.keys.USER_DATA, userData);

      setAuthState((prev) => ({
        ...prev,
        user: userData,
        error: null,
      }));

      queryClient.setQueryData(USER_PROFILE_QUERY_KEY, userData);
    } catch (error: any) {
      if (error.response?.status !== 401 && error.response?.status !== 403) {
        setAuthState((prev) => ({
          ...prev,
          error: error.response?.data?.message || "Failed to refresh user data",
        }));
      }
    }
  };

  const invalidateProfile = async () => {
    await queryClient.invalidateQueries({
      queryKey: USER_PROFILE_QUERY_KEY,
    });
  };

  const clearError = () => {
    setAuthState((prev) => ({ ...prev, error: null }));
  };

  const clearAuthData = async () => {
    await tokenManager.removeTokens();
    removeLocalStorage(STORAGE_CONFIG.keys.USER_DATA);
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    refreshUser,
    refreshAccessToken,
    clearError,
    handleAuthError,
    needsVerification,
    verificationEmail,
    refetchProfile,
    invalidateProfile,
    isProfileLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
