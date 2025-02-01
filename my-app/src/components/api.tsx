// src/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/', // Update the base URL based on your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers if needed
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
});

export default api;
