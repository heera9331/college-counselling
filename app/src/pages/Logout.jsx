import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  let navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate("/login");
  }, [navigate]);
  return <div>logout</div>;
};

export default Logout;
