import { api } from "./api";
import type { User, LoginCredentials, SignupData } from "../types";

export const authService = {
  /**
   * Login user
   */
  async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; token: string }> {
    const response = await api.post<{
      success: boolean;
      data: { user: User; token: string };
    }>("/auth/login", credentials);
    return response.data.data;
  },

  /**
   * Signup new user
   */
  async signup(data: SignupData): Promise<{ user: User; token: string }> {
    const response = await api.post<{
      success: boolean;
      data: { user: User; token: string };
    }>("/auth/signup", data);
    return response.data.data;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await api.post("/auth/logout");
    localStorage.removeItem("auth_token");
  },

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<{ success: boolean; data: User }>(
      "/auth/me"
    );
    return response.data.data;
  },

  /**
   * Login with Google OAuth
   */
  async loginWithGoogle(): Promise<{ user: User; token: string }> {
    const response = await api.post<{
      success: boolean;
      data: { user: User; token: string };
    }>("/auth/google/login");
    return response.data.data;
  },

  /**
   * Signup with Google OAuth
   */
  async signupWithGoogle(): Promise<{ user: User; token: string }> {
    const response = await api.post<{
      success: boolean;
      data: { user: User; token: string };
    }>("/auth/google/signup");
    return response.data.data;
  },
};
