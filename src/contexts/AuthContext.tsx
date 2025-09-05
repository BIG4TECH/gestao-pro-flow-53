import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, UserRole } from '@/types';

const AuthContext = createContext<AuthState | undefined>(undefined);

// Mock users for demonstration
const mockUsers = {
  "office@demo.com": {
    id: "1",
    email: "office@demo.com",
    name: "Admin Contabilidade",
    role: "office" as UserRole,
  },
  "client@demo.com": {
    id: "2", 
    email: "client@demo.com",
    name: "Empresa Cliente Ltda",
    role: "client" as UserRole,
    companyId: "company-1",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('accounting-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const mockUser = mockUsers[email as keyof typeof mockUsers];
    
    if (mockUser && password === "demo123") {
      setUser(mockUser);
      localStorage.setItem('accounting-user', JSON.stringify(mockUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accounting-user');
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('accounting-user', JSON.stringify(updatedUser));
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('accounting-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value: AuthState = {
    user,
    isAuthenticated,
    login,
    logout,
    switchRole,
  };

  return (
    <AuthContext.Provider value={value}>
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