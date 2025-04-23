import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { verifyUser } from "../UserAuth/user_auth";

// Define types for the AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuth: boolean) => void;
  userId: string;
  username: string;
  loading: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyUser();
        const { user_id, username } = response.data;

        setIsAuthenticated(true);
        setUserId(user_id);
        setUsername(username);
      } catch {
        setIsAuthenticated(false);
        setUserId("");
        setUsername("");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userId, username, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
