import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import type { User, Session, AuthError } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: AuthError | null }>;
  updateProfile: (data: { name?: string; language?: string }) => Promise<{ error: Error | null }>;
  refreshSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,

  signIn: async (email: string, password: string) => {
    const supabase = createClient();
    if (!supabase) return { error: new Error("Supabase not configured") as AuthError };

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error };

    const { data } = await supabase.auth.getSession();
    set({
      user: data.session?.user ?? null,
      session: data.session,
      isAuthenticated: !!data.session,
    });
    return { error: null };
  },

  signUp: async (email: string, password: string, name?: string) => {
    const supabase = createClient();
    if (!supabase) return { error: new Error("Supabase not configured") as AuthError };

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    return { error };
  },

  signOut: async () => {
    const supabase = createClient();
    if (!supabase) return;

    await supabase.auth.signOut();
    set({ user: null, session: null, isAuthenticated: false });
  },

  resetPassword: async (email: string) => {
    const supabase = createClient();
    if (!supabase) return { error: new Error("Supabase not configured") as AuthError };

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/profile`,
    });
    return { error };
  },

  updatePassword: async (newPassword: string) => {
    const supabase = createClient();
    if (!supabase) return { error: new Error("Supabase not configured") as AuthError };

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    return { error };
  },

  updateProfile: async (data: { name?: string; language?: string }) => {
    const supabase = createClient();
    if (!supabase) return { error: new Error("Supabase not configured") };

    const { error: authError } = await supabase.auth.updateUser({ data });
    if (authError) return { error: authError };

    const { error: dbError } = await supabase
      .from("users")
      .update(data)
      .eq("id", get().user?.id);

    return { error: dbError };
  },

  refreshSession: async () => {
    const supabase = createClient();
    if (!supabase) {
      set({ isLoading: false });
      return;
    }

    const { data } = await supabase.auth.getSession();
    set({
      user: data.session?.user ?? null,
      session: data.session,
      isAuthenticated: !!data.session,
      isLoading: false,
    });
  },
}));

export function initAuthListener() {
  const supabase = createClient();
  if (!supabase) {
    useAuthStore.setState({ isLoading: false });
    return;
  }

  supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.setState({
      user: session?.user ?? null,
      session,
      isAuthenticated: !!session,
      isLoading: false,
    });
  });

  useAuthStore.getState().refreshSession();
}
