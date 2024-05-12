// "use client";
// import React, { createContext, useState, ReactNode, useEffect } from "react";

// interface AuthContextType {
//   status: string;
//   user: any;
//   error: string;
//   setStatus: (status: string) => void;
//   setUser: (user: any) => void;
//   setError: (error: string) => void;
//   resetStatus: () => void;
// }

// interface initialAuthStateType {
//   status: string;
//   data: null;
//   error: "";
// }

// const initialAuthState = {
//   status: "unauthenticated",
//   user: null,
//   error: "",
// };

// const AuthContext = createContext<AuthContextType>({
//   ...initialAuthState,
//   setStatus: () => {},
//   setError: () => {},
//   setUser: () => {},
//   resetStatus: () => {},
// });

// const AuthContextProvider = ({ children }: { children: ReactNode }) => {
//   const [state, setState] = useState<{
//     status: string;
//     user: any;
//     error: string;
//   }>(initialAuthState);

//   const setUser = (user: any) => {
//     console.log("got user", user);
//     let newState = { ...state, user };
//     setState(newState);
//   };
//   const setStatus = (status: string) => {
//     setState({ ...state, status });
//   };

//   const setError = (error: string) => {
//     setState({ ...state, error });
//   };

//   const resetStatus = () => {
//     setState(initialAuthState);
//   };

//   // useEffect(() => {}, [state]);

//   return (
//     <AuthContext.Provider value={{ setStatus, setUser, setError, resetStatus }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthContextProvider };
// export type { AuthContextType };
"use client"
import React, { createContext, useState, ReactNode, useReducer } from "react";
import {useRouter} from "next/navigation";

interface AuthContextType {
  status: string;
  user: any;
  error: string;
  setStatus: (status: string) => void;
  setUser: (user: any) => void;
  setError: (error: string) => void;
  resetState: () => void;
}

interface initialAuthStateType {
  status: string;
  user: null | any; // Corrected interface
  error: string;
}

const initialAuthState: initialAuthStateType = {
  status: "unauthenticated",
  user: null,
  error: "",
};

const AuthContext = createContext<AuthContextType>({
  ...initialAuthState,
  setStatus: () => {},
  setError: () => {},
  setUser: () => {},
  resetState: () => {},
});

const authReducer = (
  state: initialAuthStateType,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET_STATE":
      return initialAuthState;
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const router = useRouter();

  const setUser = (user: any) => {
    console.log("got user", user);
    dispatch({ type: "SET_USER", payload: user });
  };
  const setStatus = (status: string) => {
    dispatch({ type: "SET_STATUS", payload: status });
  };

  const setError = (error: string) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const resetState = () => {
    router.push('/');
    dispatch({ type: "RESET_STATE" });
  };

  return (
    <AuthContext.Provider
      value={{
        status: state.status,
        user: state.user,
        error: state.error,
        setStatus,
        setUser,
        setError,
        resetState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
export type { AuthContextType };
