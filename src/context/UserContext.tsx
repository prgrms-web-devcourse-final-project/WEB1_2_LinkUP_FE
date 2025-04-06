// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserInfo {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  address: string;
  nickname: string;
}

interface UserContextType {
  user: UserInfo;
  setUser: (user: Partial<UserInfo>) => void;
}

const defaultUser: UserInfo = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phone: '',
  address: '',
  nickname: '',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<UserInfo>(defaultUser);

  const setUser = (updatedFields: Partial<UserInfo>) => {
    setUserState((prev) => ({ ...prev, ...updatedFields }));
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
