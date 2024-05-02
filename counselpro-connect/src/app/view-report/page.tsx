"use client"

import { SearchStudents } from "@/components"
const Page = (props: any) => {

    return (
        <div>
            <h1 className="font-semibold text-2xl p-3">View Report</h1>
            <SearchStudents isExportOpen={false} autoSearch={true} emptySearch={true} />
        </div>
    )
}

export default Page;