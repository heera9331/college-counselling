import { useContext } from "react";
import AuthContext from "../contexts/auth/AuthContext";

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
