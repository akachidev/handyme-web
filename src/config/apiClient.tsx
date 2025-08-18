import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

const STORAGE_KEYS = {
  AUTH_TOKEN: "handy_me_auth_token",
  REFRESH_TOKEN: "handy_me_refresh_token",
  USER_DATA: "handy_me_user_data",
};

const API_CONFIG = {
  baseURL:
    import.meta.env.VITE_APP_API_BASE_URL ||
    "https://api.handyme.online/api/v1",
  timeout: 30000, // 30 seconds
};

const storage = {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error("localStorage get error:", error);
      return null;
    }
  },

  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("localStorage set error:", error);
    }
  },

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("localStorage remove error:", error);
    }
  },
};

// Token manager
export const tokenManager = {
  getToken(): Promise<string | null> {
    return Promise.resolve(storage.getItem(STORAGE_KEYS.AUTH_TOKEN));
  },

  setToken(token: string): Promise<void> {
    storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    return Promise.resolve();
  },

  removeTokens(): Promise<void> {
    storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    return Promise.resolve();
  },
  removeRefreshToken(): Promise<void> {
    storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    return Promise.resolve();
  },
  getRefreshToken(): Promise<string | null> {
    return Promise.resolve(storage.getItem(STORAGE_KEYS.REFRESH_TOKEN));
  },
  setRefreshToken(token: string): Promise<void> {
    storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    return Promise.resolve();
  },
};

export class ApiClient {
  private instance: AxiosInstance;
  private static authErrorHandler: (() => Promise<void>) | null = null;
  private static refreshTokenHandler: (() => Promise<string | null>) | null =
    null;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (token: string | null) => void;
    reject: (error: any) => void;
  }> = [];

  static setAuthErrorHandler(handler: () => Promise<void>) {
    ApiClient.authErrorHandler = handler;
  }

  static setRefreshTokenHandler(handler: () => Promise<string | null>) {
    ApiClient.refreshTokenHandler = handler;
  }

  constructor() {
    this.instance = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      async (config) => {
        const token = await tokenManager.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle auth errors and token refresh
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 errors with token refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // If already refreshing, queue the request
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then((token) => {
              if (token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.instance(originalRequest);
              }
              return Promise.reject(error);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            let newToken: string | null = null;

            if (ApiClient.refreshTokenHandler) {
              newToken = await ApiClient.refreshTokenHandler();
            }

            if (newToken) {
              // Process the failed queue
              this.processQueue(newToken);

              // Retry the original request with new token
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.instance(originalRequest);
            } else {
              // No new token, handle auth error
              this.processQueue(null);
              if (ApiClient.authErrorHandler) {
                await ApiClient.authErrorHandler();
              }
              return Promise.reject(error);
            }
          } catch (refreshError) {
            // Refresh failed, handle auth error
            this.processQueue(null);
            if (ApiClient.authErrorHandler) {
              await ApiClient.authErrorHandler();
            }
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        // Handle 403 errors directly
        if (error.response?.status === 403 && ApiClient.authErrorHandler) {
          await ApiClient.authErrorHandler();
        }

        return Promise.reject(error);
      }
    );
  }

  private processQueue(token: string | null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (token) {
        resolve(token);
      } else {
        reject(new Error("Token refresh failed"));
      }
    });

    this.failedQueue = [];
  }

  // Generic request methods
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  // File upload method
  async uploadFile<T = any>(
    url: string,
    file: File,
    fieldName: string = "file",
    additionalData?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const formData = new FormData();
    formData.append(fieldName, file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    return this.instance.post<T>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // Get the axios instance for advanced usage
  getAxiosInstance(): AxiosInstance {
    return this.instance;
  }

  // Update base URL if needed
  updateBaseURL(newBaseURL: string) {
    this.instance.defaults.baseURL = newBaseURL;
  }

  // Add custom headers
  setDefaultHeader(key: string, value: string) {
    this.instance.defaults.headers.common[key] = value;
  }

  // Remove custom headers
  removeDefaultHeader(key: string) {
    delete this.instance.defaults.headers.common[key];
  }
}

export const apiClient = new ApiClient();

export { ApiClient as ServiceApiClient };

export const STORAGE_CONFIG = {
  keys: STORAGE_KEYS,
};
