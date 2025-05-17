import api, { ApiResponse } from '../libs/axios';

// Request Types
interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

// Response Types
interface LoginResponse {
  accessToken: string;
  username: string;
}

interface RegisterResponse {
  username: string;
}

interface CheckUsernameResponse {
  isAvailable: boolean;
}

export const authService = {
  login: async (username: string, password: string) => {
    const request: LoginRequest = { username, password };
    const { data } = await api.post<ApiResponse<LoginResponse>>('/auth/login', request);
    return data;
  },
  
  register: async (request: RegisterRequest) => {
    const { data } = await api.post<ApiResponse<RegisterResponse>>('/auth/register', request);
    return data;
  },
  
  refresh: async () => {
    const { data } = await api.post<ApiResponse<LoginResponse>>('/auth/refresh');
    return data;
  },
  
  logout: async () => {
    const { data } = await api.post<ApiResponse<null>>('/auth/logout');
    return data;
  },
  
  checkUsername: async (username: string) => {
    const { data } = await api.get<ApiResponse<CheckUsernameResponse>>(`/auth/check-username/${username}`);
    return data;
  },
}; 