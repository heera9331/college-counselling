"use client";

import "../globals.css";

import { RecentRegisteredStudents } from "@/components";
import Link from "next/link";

const Page = () => {

    return (
        <div className="">
            <div className={`shadow-sm shadow-slate-600  mx-2 rounded-sm py-2`}>
                <Link
                    href={'/home/add-student'}
                    className="text-blue-800 underline font-semibold py-2 px-2"
                >
                    Register New Student
                </Link>
                <RecentRegisteredStudents />
            </div>
        </div>
    );
};

export default Page;