import api, { ApiResponse } from '../api/axios';

// Request Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

// Response Types
export interface LoginResponse {
  accessToken: string;
  username: string;
}

export interface RegisterResponse {
  username: string;
}

export interface CheckUsernameResponse {
  isAvailable: boolean;
}

export const authService = {
  login: async (request: LoginRequest) => {
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