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
import { useRouter } from "next/navigation";

const Page = () => {
  const authState = useAuthContext();
  const router = useRouter();

  console.log("authState > ", authState);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="">
      <div className={`mx-2 py-2`}>
        <Link
          href={"/student"}
          className="text-blue-800 underline font-semibold p-4"
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
