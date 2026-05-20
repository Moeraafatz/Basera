import { create } from "zustand";

interface AuthState {
  user: null;
  session: null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
  updateProfile: (data: { name?: string; language?: string }) => Promise<{ error: Error | null }>;
  refreshSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: false,
  isAuthenticated: false,

  signIn: async () => {
    return { error: new Error("Authentication disabled") };
  },

  signUp: async () => {
    return { error: new Error("Authentication disabled") };
  },

  signOut: async () => {},

  resetPassword: async () => {
    return { error: new Error("Authentication disabled") };
  },

  updatePassword: async () => {
    return { error: new Error("Authentication disabled") };
  },

  updateProfile: async () => {
    return { error: new Error("Authentication disabled") };
  },

  refreshSession: async () => {},
}));

export function initAuthListener() {}