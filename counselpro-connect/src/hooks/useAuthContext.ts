"use client"
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
