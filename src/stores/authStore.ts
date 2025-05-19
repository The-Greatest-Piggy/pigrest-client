import { makeAutoObservable } from 'mobx';

class AuthStore {
  accessToken: string | null = null;
  user: { username: string } | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuthenticated() {
    return !!this.accessToken;
  }

  setAccessToken = (token: string | null) => {
    this.accessToken = token;
  };

  setUser = (username: string | null) => {
    this.user = username ? { username } : null;
  };

  reset = () => {
    this.setAccessToken(null);
    this.setUser(null);
  };
}

export const authStore = new AuthStore(); 