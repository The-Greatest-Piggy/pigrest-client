import { makeAutoObservable } from 'mobx';

class AuthStore {
  accessToken: string | null = null;
  loading: boolean = false;
  error: string | null = null;
  user: { username: string } | null = null;
  isInitialized = false;

  constructor() {
    makeAutoObservable(this);
    this.isInitialized = true;
  }

  // computed 값
  get isAuthenticated() {
    return !!this.accessToken;
  }

  setAccessToken = (token: string | null) => {
    this.accessToken = token;
  };

  setUser = (username: string | null) => {
    this.user = username ? { username } : null;
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  setError = (error: string | null) => {
    this.error = error;
  };

  reset = () => {
    this.setAccessToken(null);
    this.setUser(null);
    this.setError(null);
  };
}

export const authStore = new AuthStore(); 