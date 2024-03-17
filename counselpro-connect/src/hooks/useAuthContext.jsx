"use client";

import { useContext } from "react"; 
const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
