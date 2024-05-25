import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

const optionsStyle = {
  width: "100px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#192f59",
  color: "white",
  textDecoration: "none",
  right: -40,
  top: 10,
};

function Account({ userId }) {
  const [isClicked, setIsClicked] = React.useState(false);
  const navigate = useNavigate();

  const { token, dispatch } = useContext(AuthContext);

  return (
    <>
      {token !== "null" && (
        <div
          className="container border-1"
          onClick={() => {
            setIsClicked(!isClicked);
            // console.log(isClicked);
          }}
        >
          <span className="material-symbols-outlined">account_circle</span>

          {isClicked ? (
            <div className="container position-relative">
              <div
                className="container position-absolute mx-3 py-3"
                style={optionsStyle}
              >
                <Link className="text-white" to={`profile/${userId}`}>
                  Profile
                </Link>
                <Link
                  to={"/login"}
                  onClick={() => {
                    dispatch({ type: "LOGOUT" });
                  }}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default Account;
