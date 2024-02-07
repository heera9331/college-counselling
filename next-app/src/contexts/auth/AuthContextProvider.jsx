"use client";
/* eslint-disable react/prop-types */
import { useState } from "react";
import AuthContext from "./AuthContext";
import { useEffect } from "react";

const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("isAdmin")) || false
  );

  const [userId, setUserID] = useState(localStorage.getItem("userId") || null);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);

  const login = (token, isAdmin, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isAdmin", isAdmin);
    localStorage.setItem("userId", userId);
    setToken(token);
    setIsAdmin(isAdmin);
    setUserID(userId);
  };

  const closeLeftSidebar = () => {
    console.log("left sidebar opened");
    setIsLeftSidebarOpen(false);
  };
  const openLeftSidebar = () => {
    console.log("left sidebar open");
    setIsLeftSidebarOpen(true);
  };

  const logout = () => {
    setToken(null);
    setIsAdmin(false);
    setUserID(null);
    setError(null);
    localStorage.clear();
    closeLeftSidebar();
  };

  useEffect(() => {}, [error, token, isAdmin, userId, isLeftSidebarOpen]);

  return (
    <AuthContext.Provider
      value={{
        error,
        setError,
        token,
        login,
        isAdmin,
        userId,
        logout,
        isLeftSidebarOpen,
        closeLeftSidebar,
        openLeftSidebar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
