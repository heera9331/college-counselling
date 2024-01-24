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

  const login = (token, isAdmin, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isAdmin", isAdmin);
    localStorage.setItem("userId", userId);
    setToken(token);
    setIsAdmin(isAdmin);
    setUserID(userId);
  };

  const logout = () => {
    setToken(null);
    setIsAdmin(false);
    setUserID(null);
    setError(null);
    localStorage.clear();
  };

  useEffect(() => {}, [error, token, isAdmin, userId]);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
