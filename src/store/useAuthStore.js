import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  role: null,
  setUser: (userData) => set({ user: userData }),
  setToken: (authToken) => set({ token: authToken }),
  setRole: (userRole) => set({ role: userRole }),  
  logout: () => set({ user: null, token: null, role: null }),
}));

export default useAuthStore;
