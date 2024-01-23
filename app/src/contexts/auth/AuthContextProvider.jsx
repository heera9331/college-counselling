/* eslint-disable react/prop-types */
import { useState } from "react";
import AuthContext from "./AuthContext";
import { useEffect } from "react";

const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserID] = useState(null);

  const login = (token, isAdmin, userId) => {
    setToken(token);
    setIsAdmin(isAdmin);
    setUserID(userId);
  };

  const logout = () => {
    setToken(null);
    setIsAdmin(false);
    setUserID(null);
    setError(null);
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
