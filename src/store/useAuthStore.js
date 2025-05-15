import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  role: null,
  chapter: [],
  setUser: (userData) => set({ user: userData }),
  setToken: (authToken) => set({ token: authToken }),
  setRole: (userRole) => set({ role: userRole }),  
  setChapter: (allChapter) => set({ chapter: allChapter }),
  logout: () => set({ user: null, token: null, role: null })
}));

export default useAuthStore;
