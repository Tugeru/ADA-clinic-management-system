// ─────────────────────────────────────────────────────────────
// Real Auth Context — persists JWT to localStorage
// ─────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { authApi } from './api';

interface AuthUser {
  id: string;
  email: string;
  fullName: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = 'ada_token';
const USER_KEY = 'ada_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userJson = localStorage.getItem(USER_KEY);
    const user = userJson ? JSON.parse(userJson) : null;
    return { user, token, isAuthenticated: !!token && !!user };
  });

  const login = useCallback(async (email: string, password: string) => {
    const { token, user } = await authApi.login(email, password);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setState({ user, token, isAuthenticated: true });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setState({ user: null, token: null, isAuthenticated: false });
  }, []);

  const hasRole = useCallback((_roles: string[]) => state.isAuthenticated, [state.isAuthenticated]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
