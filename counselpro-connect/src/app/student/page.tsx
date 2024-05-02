"use client"
import Link from "next/link"
import { SearchStudents } from "@/components"
import "../globals.css";

const Page = (props: any) => {
    return (
        <div className="">
            <Link
                href={'/student/add-student'}
                className="text-blue-800 underline font-semibold p-3"
            >
                Register New Student
            </Link>
            <SearchStudents autoSearch={true} />
        </div>
    )
}

export default Page;