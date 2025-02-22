import api from './api';

export class AuthService {
  async createAccount(data) {
    try {
      const response = await api.post('/auth/signup', data);
      console.log('Account creation response:', response.data);
      
      if (response.data) {
        // Store the token if it exists in the response
        if (response.data.token) {
          localStorage.setItem('blogData', response.data.token);
        }
        // Store user data
        localStorage.setItem('userData', JSON.stringify(response.data));
        return response.data;
      }
      throw new Error('Failed to create account');
    } catch (error) {
      console.error('Account creation error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to create account');
    }
  }

  async login(data) {
    try {
      console.log('Logging in with data:', data);
      const response = await api.post('/auth/login', data);
      console.log('Login response:', response.data);
      if (response.data.token) {
        localStorage.setItem('blogData', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to login');
    }
  }

  async logout() {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('blogData');
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      localStorage.removeItem('blogData');
    }
  }

  async getCurrentUser() {
    try {
      const userData = localStorage.getItem('userData');
      if (!userData) return null;
      
      return JSON.parse(userData);
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async updateProfile(data) {
    try {
      const response = await api.put('/auth/update', data);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to update profile');
    }
  }

  async deleteAccount(data) {
    try {
      console.log('Sending delete account request with data:', data); // Debugging
      const response = await api.delete('/auth/delete', { data });
      localStorage.removeItem('blogData');
      return response.data;
    } catch (error) {
      console.error('Delete account error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to delete account');
    }
  }
}

const authService = new AuthService();
export default authService;
