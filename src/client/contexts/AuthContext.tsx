"use client";
import { createContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../services/auth";

interface LoginPaylaod {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    login: {
      token: string;
      user: {
        id: string;
        username: string;
        email: string;
        role: string;
      };
    };
  };
}

interface User {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

type AuthContextType = {
  user:User,
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  handleLogin: (user: LoginPaylaod) => Promise<boolean>;
  handleLogout: () => void;
  initialized: boolean;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<User>({
    email: "",
    id: "",
    firstName: "",
    lastName: "",
    role: ""
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
    };
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    };
    setInitialized(true);
  }, []);

  const handleLogin = async (user: LoginPaylaod): Promise<boolean> => {
    try {
      const { data } = await login({ variables: user });
  
      if (data?.login) {
        const { token, user } = data.login;
  
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsAuthenticated(true);
        setToken(token);
        return true;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      console.error(message);
    }
  
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setToken(null);
  };

  const value: AuthContextType = {
    user:user,
    isAuthenticated: isAuthenticated,
    token: token,
    loading: loading,
    error: error?.message || null,
    handleLogin,
    handleLogout,
    initialized:initialized
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
);
};
