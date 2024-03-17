"use client"
import Link from "next/link"
import { SearchStudents } from "@/components"

const Page = () => {
    return (
        <div className="">
            <Link
                href={'/student/add-student'}
                className="text-blue-800 underline font-semibold py-2 px-2"
            >
                Register New Student
            </Link>
            <SearchStudents autoSearch={true} />
        </div>
    )
}

export default Page;