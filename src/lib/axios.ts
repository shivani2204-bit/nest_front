import axios from 'axios';
import { useAuthStore } from '@/stores/useAuthStore';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

// ✅ Interceptor for adding token from Zustand
instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
