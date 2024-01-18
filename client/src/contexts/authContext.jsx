/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const INITIAL_STATE = {
  userId: localStorage.getItem("userId") || null,
  isAdmin: localStorage.getItem("isAdmin") || null,
  token: localStorage.getItem("token") || null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        userId: action.payload.userId,
        isAdmin: action.payload.isAdmin,
        token: action.payload.token,
      };
    case "LOGIN_FAILURE":
      return {
        userId: null,
        isAdmin: false,
        token: null,
      };
    case "LOGOUT":
      return {
        userId: null,
        isAdmin: false,
        token: null,
      };
    default:
      return state;
  }
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("token", state.token);
    localStorage.setItem("isAdmin", state.isAdmin);
    localStorage.setItem("userId", state.userId);
  }, [state.token, state.isAdmin, state.userId]);

  return (
    <AuthContext.Provider
      value={{
        userId: state.userId,
        isAdmin: state.isAdmin,
        token: state.token,
        dispatch,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
