/* eslint-disable react-hooks/exhaustive-deps */

"use client";
 
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

import axios from "axios";

export default function Page({ params }) {
     
    const searchParams = useSearchParams();
    const [student, setStudent] = useState<object | null>(null); //  
 
    const [loading, setLoading] = useState(false);
    const router = useRouter();
     

    const handleDownload = () => {
        window.print();
    }

    const getStudent = async (studentId: string) => {
        try {
            setLoading(true);
            const res = await axios.get(
                `/api/students/${studentId}`
            );
            
            setLoading(false);
            console.log(res);
            if (res.statusText === "OK") {
                const data = await res.data;
                const { _id, chats, updatedAt, createdAt, __v, ...rest } = data.student;
                setStudent(rest);
            }
            
        } catch (error) {
            setLoading(false);
            alert("Can't get student, try again later");
            console.error(error); // Using console.error for logging errors
        }
    };


    useEffect(() => {
        const studentId = searchParams.get('studentId');
        if (studentId) {
            getStudent(studentId);
        }
    }, [])

    return (
        <div className="min-h-[100vh] mt-[70px] mx-2 shadow-sm shadow-slate-600">
            <div className="">
                <h1 className="font-bold text-slate-600 text-xl mb-6 bg-gray-200 py-2 px-2 border border-b-slate-300">
                    View Details of A Student
                </h1>
            </div>

            <div className="m-auto px-6">
                <div className="bg-slate-100 p-6 h-fit min-w-[512px] w-fit m-auto">
                    {student && (
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody className="odd:bg-white border-b dark:border-gray-700">
                                {Object.entries(student).map(([key, value], idx) => (
                                    <tr key={idx}>
                                        <th className="text-gray-800">{key.toUpperCase()}</th>
                                        <td className="text-gray-800">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <div>
                        <button
                            className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleDownload}
                        >
                            Export
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}