import { React, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
function Test() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);
    
  return (
    <div>
      Test
      <button
        onClick={() => {
          // console.log("got clicked");
        }}
      >
        click
      </button>
    </div>
  );
}

export default Test;
