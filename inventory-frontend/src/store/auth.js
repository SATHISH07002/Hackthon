import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  profileImage: null,
  isDarkMode: false,
  login: (user, token) => set({ isAuthenticated: true, user, token }),
  logout: () => set({ isAuthenticated: false, user: null, token: null }),
  setProfileImage: (image) => set({ profileImage: image }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode }))
}))


