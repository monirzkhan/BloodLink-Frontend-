import apiClient from "@/lib/apiClient";

export const userLogin = (payload: { email: string; password: string }) => {
  return apiClient("/auth/login", { method: "POST", body: payload });
};

export const userLogout = () => {
  return apiClient("/auth/logout", { method: "POST" });
};

export const userGetMe = () => {
  return apiClient("/auth/me");
};

export const userGoogleLogin = (payload: { idToken: string }) => {
  return apiClient("/auth/google-login", { method: "POST", body: payload });
};
