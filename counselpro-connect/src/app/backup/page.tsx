"use client"
import { JsonToCsvExporter } from "@/components";
import { apiBaseUrl } from "@/utils"
import axios from "axios";
import { useEffect, useState } from "react"

const getStudents = async () => {
    let res = await axios.get(`${apiBaseUrl}/api/students?pageSize=1000`);
    if (res.statusText == "OK") {
        let data = await res.data;
        return data;
    }
    return [];
}

const getUsers = async () => {
    let res = await axios.get(`${apiBaseUrl}/api/users`);
    if (res.statusText == "OK") {
        let data = await res.data;
        return data;
    }
    return [];
}

const Page = (props: any) => {
    const [students, setStudents] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        ; (async () => {
            setLoading(true);
            let students = await getStudents();
            setLoading(false);
            setStudents(students);

            setLoading(true);
            let users = await getUsers();
            setUsers(users);
            setLoading(false);
        })()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-semibold">Backup</h1>
            <div className="flex flex-col gap-2 py-2">
                {loading ? "loading..." : <>
                    <p className="">
                        <span>Take backup of all the students data</span>
                        <span className="text-blue-800 underline px-1"
                        >
                            <JsonToCsvExporter jsonData={students} />
                        </span>
                    </p>
                    <p className="">
                        <span>Take backup of all the counselors data</span>
                        <span className="text-blue-800 underline px-1">
                            <JsonToCsvExporter jsonData={users} />
                        </span>
                    </p>
                </>
                }

            </div>
        </div>
    )
}

export default Page;