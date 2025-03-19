import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem('token')
  );
  const [isAdmin, setIsAdmin] = useState(
    sessionStorage.getItem('role') === 'ROLE_ADMIN'
  );

  const checkAuthStatus = () => {
    const token = sessionStorage.getItem('token');
    const userRole = sessionStorage.getItem('role');

    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(userRole === 'ROLE_ADMIN');
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = (token: string, role: string) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
    setIsLoggedIn(true);
    setIsAdmin(role === 'ROLE_ADMIN');
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
