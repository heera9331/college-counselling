"use client"
import axios from 'axios';
import { apiBaseUrl } from "@/utils";
import { Students } from "@/components"
import { useEffect, useState } from 'react';

const getUser = async (id: string) => {
    let res = await axios.get(`${apiBaseUrl}/api/users/${id}`);

    if (res.statusText === "OK") {
        let user = await res.data;
        return user;
    }

    return null;
}

const getStudents = async (registeredBy: string) => {
    let res = await axios.get(`${apiBaseUrl}/api/students/search?registeredBy=${registeredBy}`);

    if (res.statusText === "OK") {
        let students = await res.data;
        return students;
    }
    return [];
}

const Page = ({ params }: { params: object }) => {
    const [students, setStudents] = useState([])
    const [user, setUser] = useState<{ name: string, email: string, isAdmin: boolean } | null>(null);
    const id = params.id[0];

    useEffect(() => {
        ; (async () => {
            const user = await getUser(id);
            const students = await getStudents(id);

            setUser(user[0]);
            setStudents(students);
        })()
    }, [id])

    return (
        <div>
            {user && <>
                <div>
                    <p>Name - {user.name}</p>
                    <p>Email - {user.email}</p>
                    <p>Position - {user.isAdmin ? "Admin" : "Counselor"}</p>
                    <p>Registered students - {students.length}</p>
                </div>
            </>}

            <Students students={students} />
            <div>
                <button className="shadow-sm bg-gray-800 rounded-sm text-white font-semibold px-2 py-1"
                    onClick={() => {
                        window.print();
                    }}
                >
                    Export
                </button>
            </div>
        </div>
    )
}

export default Page;