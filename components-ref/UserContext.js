import React, { createContext, useContext, useState } from 'react';
import { API_URL, DEBUG } from '@env';

const UserContext = createContext();

export const getEnv = () => {
  // Access environment variables
  const env = {
    apiUrl: API_URL,
    debugMode: DEBUG
  }
  return env
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // You can also initialize environment variables here if needed
  const env = getEnv();
  return (
    <UserContext.Provider value={{ user, setUser, env }}>
      {children}
    </UserContext.Provider>
  );
};
