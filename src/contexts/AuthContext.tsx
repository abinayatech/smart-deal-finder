import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "customer" | "retailer" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  signup: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);

  const login = (email: string, _password: string, loginRole: UserRole) => {
    setUser({
      id: "user-" + Date.now(),
      name: email.split("@")[0],
      email,
      role: loginRole,
    });
    setRole(loginRole);
  };

  const signup = (name: string, email: string, _password: string, signupRole: UserRole) => {
    setUser({ id: "user-" + Date.now(), name, email, role: signupRole });
    setRole(signupRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated: !!user, login, signup, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
