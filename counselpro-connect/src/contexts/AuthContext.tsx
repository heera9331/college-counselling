import React, { createContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  status: string;
  data: any | null;
  error: string;
  setStatus: (status: string) => void;
  setData: (data: any | null) => void;
  setError: (error: string) => void;
  resetStatus: () => void;
}

const initialAuthState = {
  status: "unauthenticated",
  data: null,
  error: "",
};

const AuthContext = createContext<AuthContextType>({
  ...initialAuthState,
  setStatus: () => {},
  setError: () => {},
  setData: () => {},
  resetStatus: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<{
    status: string;
    data: any | null;
    error: string;
  }>(initialAuthState);

  const setStatus = (status: string) => {
    setState({ ...state, status });
  };

  const setData = (data: any | null) => {
    data = { user: data };
    setState({ ...state, data });
  };

  const setError = (error: string) => {
    setState({ ...state, error });
  };

  const resetStatus = () => {
    setState(initialAuthState);
  };

  const { status, data, error } = state;

  useEffect(()=>{
    
  },[state]);

  return (
    <AuthContext.Provider
      value={{ status, data, error, setStatus, setData, setError, resetStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
export type { AuthContextType };
