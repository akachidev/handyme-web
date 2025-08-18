import { useMemo } from "react";
import { useAuth } from "./useAuth";

export const useAuthState = () => {
  const auth = useAuth();

  return useMemo(
    () => ({
      user: auth.user,
      isLoggedIn: auth.isAuthenticated,
      isAuthenticated: auth.isAuthenticated,
      isLoading: auth.isLoading,
      error: auth.error,
      token: auth.token,

      needsVerification: auth.needsVerification,
      verificationEmail: auth.verificationEmail,

      isProfileLoading: auth.isProfileLoading,

      login: auth.login,
      register: auth.register,
      logout: auth.logout,

      refreshUser: auth.refreshUser,
      refreshAccessToken: auth.refreshAccessToken,
      refetchProfile: auth.refetchProfile,
      invalidateProfile: auth.invalidateProfile,

      clearError: auth.clearError,
      handleAuthError: auth.handleAuthError,

      isCustomer: auth.user?.role === "CUSTOMER",
      isServiceProvider: auth.user?.role === "SERVICE_PROVIDER",
      fullName:
        auth.user?.fullName || `${auth.user?.firstName} ${auth.user?.lastName}`,
    }),
    [auth]
  );
};
