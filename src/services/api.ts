import axios, { AxiosError } from 'axios';
import { config } from '../config';
import type { ApiError } from '../types';

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,  // Return full response, not response.data
  (error: AxiosError<ApiError>) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      errors: error.response?.data?.errors,
      statusCode: error.response?.status || 500,
    };

    // Handle unauthorized errors
    if (apiError.statusCode === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }

    return Promise.reject(apiError);
  }
);

export default apiClient;

// Generic API methods
export const api = {
  get: <T>(url: string, params?: Record<string, unknown>) => 
    apiClient.get<T>(url, { params }),
  
  post: <T>(url: string, data?: unknown) => 
    apiClient.post<T>(url, data),
  
  put: <T>(url: string, data?: unknown) => 
    apiClient.put<T>(url, data),
  
  patch: <T>(url: string, data?: unknown) => 
    apiClient.patch<T>(url, data),
  
  delete: <T>(url: string) => 
    apiClient.delete<T>(url),
};

