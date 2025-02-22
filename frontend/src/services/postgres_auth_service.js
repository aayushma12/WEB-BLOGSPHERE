import api from './api';

export class AuthService {
  async createAccount(data) {
    try {
      const response = await api.post('/auth/signup', data);
      if (response.data.token) {
        localStorage.setItem('blogData', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('Account creation error:', error.response?.data?.error || error.message);
      throw new Error(error.response?.data?.error || 'Failed to create account');
    }
  }

  async login(data) {
    try {
      const response = await api.post('/auth/login', data);
      if (response.data && response.data.token) {
        localStorage.setItem('blogData', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.error || error.message);
      throw new Error(error.response?.data?.error || 'Failed to login');
    }
  }

  async logout() {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      await api.post('/auth/logout', { id: userData.id });
      localStorage.removeItem('blogData');
      localStorage.removeItem('userData');
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      // Still remove local storage items even if the API call fails
      localStorage.removeItem('blogData');
      localStorage.removeItem('userData');
    }
  }

  async getCurrentUser() {
    const token = localStorage.getItem('blogData');
    if (!token) return null;

    const response = await api.get('/auth/current', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }

  async updateProfile(data) {
    const response = await api.put('/auth/update', data);
    return response.data;
  }

  async deleteAccount(data) {
    const response = await api.delete('/auth/delete', { data });
    localStorage.removeItem('blogData');
    return response.data;
  }
}

const authService = new AuthService();
export default authService;
