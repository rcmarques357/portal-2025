import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, User } from '@/services/authService';

type UserRole = 'regular' | 'editor' | 'admin';

interface AuthContextType {
  user: User | null;
  userRole: UserRole | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  canEdit: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated on mount
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
          // Extract role from user object (Django should include this)
          setUserRole((currentUser as any).role || 'regular');
        } catch (error) {
          // Token might be expired, clear it
          await authService.logout();
        }
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      setUserRole((response.user as any).role || 'regular');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      setUserRole('regular'); // Default role for new users
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  const canEdit = userRole === 'editor' || userRole === 'admin';
  const isAdmin = userRole === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      userRole,
      loading,
      login,
      register,
      logout,
      canEdit,
      isAdmin
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
