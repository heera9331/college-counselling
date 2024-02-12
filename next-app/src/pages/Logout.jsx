import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

const Logout = () => {
  let router = useRouter();
  useEffect(() => {
    sessionStorage.clear();
    router.push("/login");
  }, [navigate]);
  return <div>logout</div>;
};

export default Logout;
