const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(userData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Dashboard endpoints
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  async getChartData(months = 12) {
    return this.request(`/dashboard/chart-data?months=${months}`);
  }

  async getInventoryStatus() {
    return this.request('/dashboard/inventory-status');
  }

  async getLowStockAlerts() {
    return this.request('/dashboard/low-stock-alerts');
  }

  async getRecentActivities() {
    return this.request('/dashboard/recent-activities');
  }

  // Products endpoints
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products${queryString ? `?${queryString}` : ''}`);
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  async updateStock(id, quantity, operation) {
    return this.request(`/products/${id}/stock`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity, operation }),
    });
  }

  async getLowStockProducts() {
    return this.request('/products/low-stock');
  }

  async getCategories() {
    return this.request('/products/categories');
  }

  // Staff endpoints
  async getStaff(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/staff${queryString ? `?${queryString}` : ''}`);
  }

  async getStaffMember(id) {
    return this.request(`/staff/${id}`);
  }

  async createStaff(staffData) {
    return this.request('/staff', {
      method: 'POST',
      body: JSON.stringify(staffData),
    });
  }

  async updateStaff(id, staffData) {
    return this.request(`/staff/${id}`, {
      method: 'PUT',
      body: JSON.stringify(staffData),
    });
  }

  async deleteStaff(id) {
    return this.request(`/staff/${id}`, {
      method: 'DELETE',
    });
  }

  async getDepartments() {
    return this.request('/staff/departments');
  }

  async getStaffStats() {
    return this.request('/staff/stats');
  }

  // Suppliers endpoints
  async getSuppliers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/suppliers${queryString ? `?${queryString}` : ''}`);
  }

  async getSupplier(id) {
    return this.request(`/suppliers/${id}`);
  }

  async createSupplier(supplierData) {
    return this.request('/suppliers', {
      method: 'POST',
      body: JSON.stringify(supplierData),
    });
  }

  async updateSupplier(id, supplierData) {
    return this.request(`/suppliers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(supplierData),
    });
  }

  async deleteSupplier(id) {
    return this.request(`/suppliers/${id}`, {
      method: 'DELETE',
    });
  }

  async getSupplierStats() {
    return this.request('/suppliers/stats');
  }

  // Sales endpoints
  async getSales(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/sales${queryString ? `?${queryString}` : ''}`);
  }

  async getSale(id) {
    return this.request(`/sales/${id}`);
  }

  async createSale(saleData) {
    return this.request('/sales', {
      method: 'POST',
      body: JSON.stringify(saleData),
    });
  }

  async updateSale(id, saleData) {
    return this.request(`/sales/${id}`, {
      method: 'PUT',
      body: JSON.stringify(saleData),
    });
  }

  async deleteSale(id) {
    return this.request(`/sales/${id}`, {
      method: 'DELETE',
    });
  }

  async getSalesStats(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/sales/stats${queryString ? `?${queryString}` : ''}`);
  }

  // Expenses endpoints
  async getExpenses(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/expenses${queryString ? `?${queryString}` : ''}`);
  }

  async getExpense(id) {
    return this.request(`/expenses/${id}`);
  }

  async createExpense(expenseData) {
    return this.request('/expenses', {
      method: 'POST',
      body: JSON.stringify(expenseData),
    });
  }

  async updateExpense(id, expenseData) {
    return this.request(`/expenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(expenseData),
    });
  }

  async deleteExpense(id) {
    return this.request(`/expenses/${id}`, {
      method: 'DELETE',
    });
  }

  async approveExpense(id) {
    return this.request(`/expenses/${id}/approve`, {
      method: 'PATCH',
    });
  }

  async getExpenseStats(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/expenses/stats${queryString ? `?${queryString}` : ''}`);
  }

  // Purchase Orders endpoints
  async getPurchaseOrders(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/purchase-orders${queryString ? `?${queryString}` : ''}`);
  }

  async getPurchaseOrder(id) {
    return this.request(`/purchase-orders/${id}`);
  }

  async createPurchaseOrder(poData) {
    return this.request('/purchase-orders', {
      method: 'POST',
      body: JSON.stringify(poData),
    });
  }

  async updatePurchaseOrder(id, poData) {
    return this.request(`/purchase-orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(poData),
    });
  }

  async deletePurchaseOrder(id) {
    return this.request(`/purchase-orders/${id}`, {
      method: 'DELETE',
    });
  }

  async approvePurchaseOrder(id) {
    return this.request(`/purchase-orders/${id}/approve`, {
      method: 'PATCH',
    });
  }

  async receivePurchaseOrder(id) {
    return this.request(`/purchase-orders/${id}/receive`, {
      method: 'PATCH',
    });
  }
}

export default new ApiService();
