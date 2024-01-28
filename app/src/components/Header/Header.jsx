/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAdmin, userId, token, logout } = useAuthContext();
  const nav = useNavigate();

  useEffect(() => {}, [userId, isAdmin, token]);
  return (
    <header
      className="bg-primary text-white p-4 m-auto flex items-center justify-between border-b"
      style={{ maxWidth: "1440px" }}
    >
      <h1 className="text-3xl font-semibold">
        <Link to={"/"}>React App</Link>
      </h1>
      <div className="options flex items-center justify-center gap-4">
        {token && (
          <>
            {isAdmin && (
              <>
                <Link
                  to={"/dashboard"}
                  className="hover:bg-white hover:text-blue-800 font-semibold p-2 rounded-sm transition-all ease-in delay-10"
                >
                  Dashboard
                </Link>
                <Link
                  to={"/view-report"}
                  className="hover:bg-white hover:text-blue-800 font-semibold p-2 rounded-sm transition-all ease-in delay-10"
                >
                  View Reports
                </Link>
              </>
            )}
            <Link
              to={"/"}
              className="hover:bg-white hover:text-blue-800 font-semibold p-2 rounded-sm transition-all ease-in delay-10"
            >
              Home
            </Link>
            <Link
              to={`/profile/${userId}`}
              className="hover:bg-white hover:text-blue-800 font-semibold p-2 rounded-sm transition-all ease-in delay-10"
            >
              Profile
            </Link>

            <Link
              to={"#"}
              onClick={() => {
                nav("/login");
                logout();
              }}
              className="hover:bg-white hover:text-blue-800 font-semibold p-2 rounded-sm transition-all ease-in delay-10"
            >
              Logout
            </Link>
          </>
        )}
        {/* {!token && <Link to={"/login"}>Login</Link>} */}
      </div>
    </header>
  );
};

export default Header;
