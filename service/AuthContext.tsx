'use client';
import { toast, useToast } from "@/hooks/use-toast";
import React, { createContext, useState, useContext } from "react";

interface AuthContextType {
  isAuthorized: boolean;
  login: (password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {toast} = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const login = (password: string) => {
    if (password === process.env.NEXT_PUBLIC_AUTH_PASSWORD) {
      setIsAuthorized(true);
    } else {
      toast({
        title: "Incorrect password",
        variant: 'destructive',
      });
    }
  };

  const logout = () => {
    setIsAuthorized(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
