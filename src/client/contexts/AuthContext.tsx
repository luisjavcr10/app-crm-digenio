"use client";
import { createContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION, LOGOUT_MUTATION } from "../services/auth";

interface LoginPaylaod {
  email: string;
  password: string;
}

interface User {
  email: string;
  id: string;
  name: string;
  role: string;
}

type AuthContextType = {
  user:User,
  isAuthenticated: boolean;
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
  const [logout] = useMutation(LOGOUT_MUTATION);
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<User>({
    email: "",
    id: "",
    name:"",
    role: ""
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
      setIsAuthenticated(true);
    };
    setInitialized(true);
  }, []);

  const handleLogin = async (user: LoginPaylaod): Promise<boolean> => {
    try {
      const { data } = await login({ variables: user });
  
      if (data?.login) {
        const { login } = data;

        localStorage.setItem("user", JSON.stringify(login));
        setUser(login);
        setIsAuthenticated(true);
        return true;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      console.error(message);
    }
  
    return false;
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user:user,
    isAuthenticated: isAuthenticated,
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
