import axios from 'axios';

const API_URL = 'http://localhost:3000'; // URL de votre serveur backend local

// Configuration de l'intercepteur pour les requêtes avec token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      ...userData,
      telephone: `${userData.indicatif}${userData.telephone}`
    });
    
    // Sauvegarder le token
    localStorage.setItem('token', response.data.token);
    
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
    
    // Sauvegarder le token
    localStorage.setItem('token', response.data.token);
    
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem('token');
  } catch (error) {
    throw error.message;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users/profile`);
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
