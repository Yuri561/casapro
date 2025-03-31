import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the types for AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuth: boolean) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider to wrap the app
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const user = localStorage.getItem("user");
    return !!user; // Returns true if user exists, otherwise false
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
