import axios from 'axios';
import { authStore } from '@/stores/authStore';

export interface ApiResponse<T> {
  status: number;
  message: string;
  error: string | null;
  timestamp: string;
  data: T | null;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PIGREST_API_URL,
  withCredentials: true, // 쿠키 전송을 위해 필요
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = authStore.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Access Token 만료 시
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Refresh Token으로 새로운 Access Token 발급
        const { data } = await api.post('/auth/refresh');
        authStore.setAccessToken(data.data.accessToken);
        
        // 실패했던 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh Token도 만료된 경우
        authStore.setAccessToken(null);
        window.location.href = '/auth';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api; 