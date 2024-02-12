"use client";
/* eslint-disable react/prop-types */
import { useState } from "react";
import AuthContext from "./AuthContext";
import { useEffect } from "react";

const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(sessionStorage.getItem("isAdmin")) || false
  );

  const [userId, setUserID] = useState(
    sessionStorage.getItem("userId") || null
  );
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);

  const login = (token, isAdmin, userId) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("isAdmin", isAdmin);
    sessionStorage.setItem("userId", userId);
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
    sessionStorage.clear();
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
