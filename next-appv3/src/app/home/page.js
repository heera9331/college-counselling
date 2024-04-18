"use client";

import useAuthContext from "@/hooks/useAuthContext";
import "../globals.css";
import LeftSidebar from "@/components/Sidebar/LeftSidebar";
import { useEffect } from "react";
import RecentRegisteredStudents from "@/components/Student/RecentRegisteredStudents";

const Page = () => {
  useEffect(() => {}, []);

  return (
    <div className="">
      <div className={`mt-[70px] shadow-sm shadow-slate-600  mx-2`}>
        <RecentRegisteredStudents />
      </div>
    </div>
  );
};

export default Page;
