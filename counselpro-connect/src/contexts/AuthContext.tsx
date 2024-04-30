import React, { createContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  status: string;
  data: any | null | undefined;
  error: string;
  setStatus: (status: string) => void;
  setData: (data: any | null) => void;
  setError: (error: string) => void;
  resetStatus: () => void;
}

interface initialAuthStateType {
  status: string;
  data: null;
  error: "";
}

const initialAuthState = {
  status: "unauthenticated",
  data: { user: JSON.parse(localStorage.getItem("user") || "null") },
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
    data: any;
    error: string;
  }>(initialAuthState);

  const setStatus = (status: string) => {
    setState({ ...state, status });
  };

  const setData = (data: any | null) => {
    // data = { user: data };
    localStorage.setItem("user", JSON.stringify(data));
    setState({ ...state, data });
  };

  const setError = (error: string) => {
    setState({ ...state, error });
  };

  const resetStatus = () => {
    setState(initialAuthState);
  };

  const { status, data, error } = state;

  useEffect(() => {}, [state]);

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
