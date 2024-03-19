import axios from "axios";
import Link from "next/link";

interface student {
    _id: string,
    name: string,
    fatherName: string,
    mobile: string,
    villege: string,
    block: string,
    district: string,
    marks10: string,
    marks12: string,
    caste: string,
    registeredBy: string,
    schoolName: string,
    status: string,
    course: string,
    branch: string,
    category: string,
    chats: string,
    __v: string,
    createdAt: string,
    updatedAt: string,
}

const Page = async (props: any) => {

    return (
        <div className="">
            {/* page heading */}
            <h1 className="font-semibold text-2xl">Dashboard</h1>
            <div></div>
        </div>
    )
}

export default Page;