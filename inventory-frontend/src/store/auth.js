import { create } from 'zustand'
import api from '../services/api'

export const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  profileImage: null,
  isDarkMode: false,
  loading: false,
  error: null,
  remainderSettings: {
    enabled: true,
    threshold: 0.25, // 1/4 of original quantity
    reminderTime: '09:00', // 9 AM
    reminderDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], // Weekdays
    notificationMethod: 'dashboard' // 'dashboard', 'email', 'sms'
  },
  remainderAlerts: [],
  staff: [],
  products: [],
  suppliers: [],
  sales: [],
  expenses: [],
  purchaseOrders: [],
  dashboardStats: null,

  // Auth actions
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.login(email, password);
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      set({ 
        isAuthenticated: true, 
        user, 
        token, 
        loading: false 
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false 
      });
      throw error;
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.register(userData);
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      set({ 
        isAuthenticated: true, 
        user, 
        token, 
        loading: false 
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false 
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ 
      isAuthenticated: false, 
      user: null, 
      token: null,
      staff: [],
      products: [],
      suppliers: [],
      sales: [],
      expenses: [],
      purchaseOrders: [],
      dashboardStats: null
    });
  },

  // Initialize auth state from localStorage
  initializeAuth: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await api.getProfile();
        set({ 
          isAuthenticated: true, 
          user: response.data, 
          token 
        });
      } catch (error) {
        localStorage.removeItem('token');
        set({ 
          isAuthenticated: false, 
          user: null, 
          token: null 
        });
      }
    }
  },

  // Profile actions
  setProfileImage: (image) => set({ profileImage: image }),
  updateProfile: async (userData) => {
    try {
      const response = await api.updateProfile(userData);
      set({ user: response.data });
      return response;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  // UI actions
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Remainder settings
  updateRemainderSettings: (settings) => set((state) => ({ 
    remainderSettings: { ...state.remainderSettings, ...settings } 
  })),

  // Alerts
  addRemainderAlert: (alert) => set((state) => ({ 
    remainderAlerts: [...state.remainderAlerts, alert] 
  })),
  removeRemainderAlert: (productId) => set((state) => ({ 
    remainderAlerts: state.remainderAlerts.filter(alert => alert.productId !== productId) 
  })),
  clearAllAlerts: () => set({ remainderAlerts: [] }),

  // Staff actions
  fetchStaff: async (params = {}) => {
    try {
      const response = await api.getStaff(params);
      set({ staff: response.data });
      return response;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  addStaff: async (staffData) => {
    try {
      const response = await api.createStaff(staffData);
      const newStaff = response.data;
      set((state) => ({ 
        staff: [...state.staff, newStaff] 
      }));
      return response;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  updateStaff: async (id, updates) => {
    try {
      const response = await api.updateStaff(id, updates);
      const updatedStaff = response.data;
      set((state) => ({ 
        staff: state.staff.map(staff => staff._id === id ? updatedStaff : staff) 
      }));
      return response;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  removeStaff: async (id) => {
    try {
      await api.deleteStaff(id);
      set((state) => ({ 
        staff: state.staff.filter(staff => staff._id !== id) 
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  // Products actions
  fetchProducts: async (params = {}) => {
    try {
      const response = await api.getProducts(params);
      set({ products: response.data });
      return response;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  // Dashboard actions
  fetchDashboardStats: async () => {
    try {
      const response = await api.getDashboardStats();
      set({ dashboardStats: response.data });
      return response;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  fetchLowStockAlerts: async () => {
    try {
      const response = await api.getLowStockAlerts();
      set({ remainderAlerts: response.data });
      return response;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  }
}))


