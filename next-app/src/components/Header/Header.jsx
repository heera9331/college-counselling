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
  const [click, setClick] = useState(true); // Set initial state to true

  const handleBtnClick = () => {
    setClick(!click);
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [userId, isAdmin, token]);

  return (
    <>
      <header className="z-[100] bg-primary text-white border-b-1 border-white fixed top-0 p-2 w-100 m-auto w-full h-[60px]">
        <div className="relative flex items-center justify-between max-md:items-start">
          <h1
            className="text-3xl font-semibold"
            onClick={() => {
              setClick(true);
            }}
          >
            <Link href="/">CounselPro Connect</Link>
          </h1>

          <div>
            <div
              className={`transition-all ease-in delay-100 flex items-center justify-center gap-4 bg-primary 
                `}
            >
              {token && (
                <>
                  {/*  */}
                  <div
                    className={`bg-primary flex items-start justify-start flex-wrap gap-2 max-md:flex-col max-md:absolute max-md:top-12 max-md:right-0 max-md:p-4 max-md:h-[100vh] ${
                      click ? "max-sm:hidden" : ""
                    }`}
                  >
                    <Link
                      href="/home"
                      className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
                      onClick={() => {
                        setClick(true);
                      }}
                    >
                      Home
                    </Link>
                    <Link
                      href={`#`}
                      className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
                    >
                      <div
                        className="flex items-center justify-center relative "
                        onClick={() => {
                          setStdClick(!stdClick);
                          console.log(stdClick);
                        }}
                      >
                        Students
                        {stdClick ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                        {stdClick && (
                          <div className="absolute p-2 text-white bg-primary top-[40px] left-[0px] flex flex-col w-[200px] rounded-sm transition-all ease-in delay-100 border-2 shadow-sm shadow-slate-700">
                            <Link
                              href={"/home/add-student"}
                              className="hover:bg-blue-800 rounded-sm transition-all ease-in delay-100"
                            >
                              Register Student
                            </Link>
                          </div>
                        )}
                      </div>
                    </Link>
                    <Link
                      href={`/profile?profileId=${userId}`}
                      className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
                    >
                      Profile
                    </Link>

                    {isAdmin && (
                      <>
                        <Link
                          href={"/admin/dashboard"}
                          className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href={"/admin/view-reports"}
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
                  </div>
                </>
              )}

              {!token && (
                <>
                  <div
                    className={`bg-primary flex items-start justify-start flex-wrap gap-2 max-md:flex-col max-md:absolute max-md:top-12 max-md:right-0 max-md:p-4 max-md:h-[100vh] ${
                      click ? "max-sm:hidden" : ""
                    }`}
                  >
                    <Link
                      href={"/contact"}
                      className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
                      onClick={() => {
                        setClick(true);
                      }}
                    >
                      Contact us
                    </Link>
                    <Link
                      href={"/about"}
                      className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
                      onClick={() => {
                        setClick(true);
                      }}
                    >
                      About us
                    </Link>
                    <Link
                      href={"/login"}
                      className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
                      onClick={() => {
                        setClick(true);
                      }}
                    >
                      Login
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              className="ml-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none rounded-md text-sm p-2.5 inline-flex items-center justify-center w-10 h-10"
              onClick={handleBtnClick}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
