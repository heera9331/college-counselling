"use client";

import "../globals.css";
import { useAuthContext } from "@/hooks";

import {
  RecentRegisteredStudents,
  AwsCard,
  SearchStudents,
} from "@/components";
import Link from "next/link";
import { useEffect } from "react";

const Page = () => {
  const auth = useAuthContext();
  console.log("auth", auth);

  useEffect(() => {
     
  }, [auth]);

  return (
    <div className="">
      <div className={`mx-2 py-2`}>
        <Link
          href={"/student"}
          className="text-blue-800 underline font-semibold py-2"
        >
          Student Page
        </Link>
        <SearchStudents emptySearch={false} autoSearch={false} />
        <RecentRegisteredStudents />
      </div>
    </div>
  );
};

export default Page;
