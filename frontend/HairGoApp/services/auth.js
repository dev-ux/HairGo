import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuration de l'instance axios avec timeout et logging
const api = axios.create({
  baseURL: 'http://192.168.1.100:3000', // Replace with your actual IP address
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    console.log('API Request:', config.method.toUpperCase(), config.url);
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config?.url
    });
    return Promise.reject(error);
  }
);

// Update all API functions to use our configured api instance
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', {
      ...userData,
      telephone: `${userData.indicatif}${userData.telephone}`
    });
    await AsyncStorage.setItem('userToken', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error.response?.data?.message || error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api/auth/login', credentials);
    await AsyncStorage.setItem('userToken', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error.response?.data?.message || error.message;
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw error.message;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/api/users/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/api/users/profile`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};
