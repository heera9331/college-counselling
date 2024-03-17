"use client";

import "../globals.css";

import { RecentRegisteredStudents } from "@/components";
import Link from "next/link";

const Page = () => {

    return (
        <div className="">
            <div className={`mx-2 py-2`}>
                <Link href={'/student'} className="text-blue-800 underline font-semibold py-2 px-2">Student Page</Link>
                <RecentRegisteredStudents />
            </div>
        </div>
    );
};

export default Page;