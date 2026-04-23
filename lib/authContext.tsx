'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User, AuthState } from './auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => { success: boolean; message: string };
  signup: (name: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check auth status on mount
    const user = authService.getCurrentUser();
    setAuthState({
      isAuthenticated: user !== null,
      user
    });
    setIsLoading(false);

    // Listen for storage changes (logout in other tabs)
    const handleStorage = () => {
      const user = authService.getCurrentUser();
      setAuthState({
        isAuthenticated: user !== null,
        user
      });
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = (email: string, password: string) => {
    const result = authService.login(email, password);
    if (result.success && result.user) {
      setAuthState({
        isAuthenticated: true,
        user: result.user
      });
    }
    return result;
  };

  const signup = (name: string, email: string, password: string) => {
    const result = authService.signup(name, email, password);
    if (result.success && result.user) {
      setAuthState({
        isAuthenticated: true,
        user: result.user
      });
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setAuthState({
      isAuthenticated: false,
      user: null
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      signup,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}