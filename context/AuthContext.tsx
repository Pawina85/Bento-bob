'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'bento_bop_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // Invalid stored data, clear it
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, accept any valid email/password combination
    // In production, this would call your authentication API
    if (email && password.length >= 6) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0],
        email: email,
      };
      setUser(newUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, create user directly
    // In production, this would call your registration API
    if (name && email && password.length >= 6) {
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: name,
        email: email,
      };
      setUser(newUser);
    } else {
      throw new Error('Invalid registration data');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
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
