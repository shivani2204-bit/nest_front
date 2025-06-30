import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  permissions: string[];
  setToken: (token: string) => void;
  setPermissions: (permissions: string[]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      permissions: [],
      setToken: (token) => set({ token }),
      setPermissions: (permissions) => set({ permissions }),
      logout: () => set({ token: null, permissions: [] }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        permissions: state.permissions,
      }),
    }
  )
);
