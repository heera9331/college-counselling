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
      className="bg-primary text-white p-4 m-auto flex items-center justify-between border-b fixed top-0 w-full mb-10"
      style={{ maxWidth: "1440px" }}
    >
      <h1 className="text-3xl font-semibold">
        <Link to={"/"}>CounselPro Connect</Link>
      </h1>
      <div className="flex items-center justify-center gap-4 sm:none">
        {token && (
          <>
            <Link
              to={"/home"}
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

        {!token && (
          <>
            <Link
              to={"/"}
              className="hover:bg-white hover:text-blue-800 font-semibold p-2 rounded-sm transition-all ease-in delay-10"
            >
              Home
            </Link>
            <Link
              to={"#contact"}
              className="hover:bg-white hover:text-blue-800 font-semibold p-2 rounded-sm transition-all ease-in delay-10"
            >
              About us
            </Link>
            <Link
              to={"#contact"}
              className="hover:bg-white hover:text-blue-800 font-semibold p-2 rounded-sm transition-all ease-in delay-10"
            >
              Contact us
            </Link>
            <Link
              to={"/login"}
              className="hover:bg-white hover:text-blue-800 font-semibold p-2 rounded-sm transition-all ease-in delay-10"
            >
              Login
            </Link>
          </>
        )}

        {/* {!token && <Link to={"/login"}>Login</Link>} */}
      </div>
    </header>
  );
};

export default Header;
