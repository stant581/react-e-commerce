// Import React context and hooks
import React, { createContext, useContext, useEffect, useState } from "react";
// Import utility functions for local storage
import { save, load, remove } from "../utils/storage";

// User type definition
type User = { name: string; email: string };

// AuthContext interface: describes authentication API
interface AuthContextType {
  user: User | null; // Current user object or null
  signup: (name: string, email: string, password: string) => Promise<boolean>; // Register new user
  signin: (email: string, password: string) => Promise<boolean>; // Login user
  signout: () => void; // Logout user
}

// Create authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component: wraps app and provides authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for current user, loaded from local storage on mount
  const [user, setUser] = useState<User | null>(() => load<User>("auth_user"));

  // Persist user to local storage whenever it changes
  useEffect(() => {
    if (user) save("auth_user", user);
  }, [user]);

  // Register a new user (demo only, not secure)
  const signup = async (name: string, email: string, password: string) => {
    // Load users from local storage
    const users = load<Record<string, { name: string; password: string }>>("users") || {};
    // If user already exists, return false
    if (users[email]) return false;
    // Save new user
    users[email] = { name, password };
    save("users", users);
    // Set current user
    setUser({ name, email });
    return true;
  };

  // Login user by checking credentials
  const signin = async (email: string, password: string) => {
    const users = load<Record<string, { name: string; password: string }>>("users") || {};
    const record = users[email];
    // If credentials match, set user
    if (record && record.password === password) {
      setUser({ name: record.name, email });
      return true;
    }
    return false;
  };

  // Logout user and remove from local storage
  const signout = () => {
    setUser(null);
    remove("auth_user");
  };

  // Provide authentication API and state to children
  return <AuthContext.Provider value={{ user, signup, signin, signout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
