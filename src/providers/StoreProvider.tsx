'use client';

import { createContext, useContext, ReactNode } from 'react';
import { authStore } from '@/stores/authStore';

interface StoreContextValue {
  authStore: typeof authStore;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={{ authStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}; 