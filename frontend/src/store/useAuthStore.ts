import { create } from "zustand";

interface User {
  _id?: string;
  username?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;

  setAuth: (token: string, user: User) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const storedUser = localStorage.getItem("user");

  return {
    token: localStorage.getItem("token"),
    user: storedUser ? JSON.parse(storedUser) : null,

    setAuth: (token, user) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({ token, user });
    },

    updateUser: (data) =>
      set((state) => {
        const updated = { ...state.user, ...data };
        localStorage.setItem("user", JSON.stringify(updated));
        return { user: updated };
      }),

    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ token: null, user: null });
    },
  };
});
