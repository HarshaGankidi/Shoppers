import React, { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const login = (username, password) => {
    return authService.login(username, password).then((user) => {
      setCurrentUser(user);
      return user;
    });
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(undefined);
  };

  const register = (username, email, password, name) => {
    return authService.register(username, email, password, name);
  };

  const isAdmin = () => {
    return currentUser && currentUser.roles.includes("ROLE_ADMIN");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        logout,
        register,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
