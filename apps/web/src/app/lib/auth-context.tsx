// ─────────────────────────────────────────────────────────────
// Auth Context with mock JWT + RBAC (simulates custom middleware)
// ─────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, AuthState, UserRole } from './types';
import { mockUser } from './mock-data';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Auto-login for demo purposes
  const [state, setState] = useState<AuthState>({
    user: mockUser,
    token: 'mock-jwt-token',
    isAuthenticated: true,
  });

  const login = useCallback(async (email: string, password: string) => {
    // In production: POST /api/auth/login → returns JWT
    setState({
      user: { ...mockUser, email },
      token: 'mock-jwt-token',
      isAuthenticated: true,
    });
  }, []);

  const logout = useCallback(() => {
    setState({ user: null, token: null, isAuthenticated: false });
  }, []);

  const hasRole = useCallback((roles: UserRole[]) => {
    return state.user ? roles.includes(state.user.role) : false;
  }, [state.user]);

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
