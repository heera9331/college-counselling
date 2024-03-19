"use client"

import { SearchStudents } from "@/components"
const Page = (props: any) => {

    return (
        <div>
            <h1 className="font-semibold text-2xl">View Report</h1>
            <SearchStudents isExportOpen={true} autoSearch={true} emptySearch={true} />
        </div>
    )
}

export default Page;