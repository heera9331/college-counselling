"use client";
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import { IoMdArrowDropup } from "react-icons/io";
import Link from "next/link";
import useAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";

import "../../app/globals.css";

const Header = () => {
  const router = useRouter();
  const [stdClick, setStdClick] = useState(false);
  const { isAdmin, userId, token, logout } = useAuthContext();
  useEffect(() => {}, [userId, isAdmin, token]);

  return (
    <>
      <header className="bg-primary text-white flex items-center justify-between border-b-1 border-white fixed top-0 p-2 max-w-[1440px] m-auto w-full h-[60px]">
        <h1 className="text-3xl font-semibold">
          <Link href="/">CounselPro Connect</Link>
        </h1>
        <div className="flex items-center justify-center gap-4 sm:none">
          {token && (
            <>
              <Link
                href="/home"
                className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
              >
                Home
              </Link>

              <Link
                href={`/profile/${userId}`}
                className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
              >
                Profile
              </Link>
              <Link
                href={`#`}
                className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
              >
                <div
                  className="flex items-center justify-center"
                  onClick={() => {
                    setStdClick(!stdClick);
                    console.log(stdClick);
                  }}
                >
                  Students
                  {stdClick ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </div>
              </Link>
              {isAdmin && (
                <>
                  <Link
                    href={"/dashboard"}
                    className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={"/view-report"}
                    className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
                  >
                    View Reports
                  </Link>
                </>
              )}

              <Link
                href={"#"}
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
              >
                Logout
              </Link>
            </>
          )}
          {!token && (
            <>
              <Link
                href={"/"}
                className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
              >
                Home
              </Link>
              <Link
                href={"#contact"}
                className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
              >
                About us
              </Link>
              <Link
                href={"#contact"}
                className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
              >
                Contact us
              </Link>
              <Link
                href={"/login"}
                className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
              >
                Login
              </Link>
            </>
          )}
          {/* {!token && <Link to={"/login"}>Login</Link>} */}
        </div>
      </header>
    </>
  );
};

export default Header;
