import { api } from "./api";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const register = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", payload);
  return response.data;
};

export const login = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", payload);
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/auth/me");
  return response.data;
};
