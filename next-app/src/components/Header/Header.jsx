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
        <div className="relative flex items-center justify-between">
          <h1 className="text-3xl font-semibold">
            <Link href="/">CounselPro Connect</Link>
          </h1>

          {click && (
            <div>
              <div
                className={`transition-all ease-in delay-100 flex items-center justify-center gap-4 bg-primary max-md:p-4 max-md:absolute max-md:right-[-8px] max-md:top-[50px] max-md:h-[100vh] max-md:justify-start max-md:flex-col max-md:items-start
                `}
              >
                {token && (
                  <>
                    <Link
                      href="/home"
                      className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
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
                  </>
                )}
                {!token && (
                  <>
                    <Link
                      href={"/contact"}
                      className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
                    >
                      Contact us
                    </Link>
                    <Link
                      href={"/about"}
                      className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
                    >
                      About us
                    </Link>
                    <Link
                      href={"/login"}
                      className="hover:bg-white hover:text-blue-800 font-semibold p-1 rounded-sm transition-all ease-in delay-10"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
          <div class="md:hidden">
            <button
              class="text-white focus:outline-none mt-3"
              onClick={handleBtnClick}
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
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
