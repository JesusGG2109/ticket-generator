import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const AUTH_STORAGE_KEY = "auth-storage";

const readTokenFromStorage = (): string | null => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.token ?? null;
  } catch {
    return null;
  }
};

api.interceptors.request.use((config) => {
  const token = readTokenFromStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }
    return Promise.reject(error);
  }
);
