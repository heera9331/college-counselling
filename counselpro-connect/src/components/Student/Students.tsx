
"use client";

import { Button } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Students = ({ students }: { students: any[] }) => {
    const router = useRouter();


    if (!students.length) {
        return <p>no students</p>
    }

    return (
        <>


            <div className="overflow-auto">
                <table
                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    border={1}
                >
                    <thead className="text-[16px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                S.No.
                            </th>
                            <th scope="col" className="px-2 py-1">
                                Name
                            </th>
                            <th scope="col" className="px-2 py-1">
                                Father Name
                            </th>
                            <th scope="col" className="px-2 py-1">
                                Mobile
                            </th>
                            <th scope="col" className="px-2 py-1">
                                Registered By
                            </th>
                            <th scope="col" className="px-2 py-1">
                                Category
                            </th>
                            <th scope="col" className="px-2 py-1">
                                Villege
                            </th>
                            <th scope="col" className="px-2 py-1">
                                District
                            </th>
                            <th scope="col" className="px-2 py-1">
                                Status
                            </th>
                            <th scope="col" className="px-2 py-1">
                                Date
                            </th>
                            <th scope="col" className="px-2 py-1">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="odd:bg-white border-b dark:border-gray-700">
                        {
                            students.map((student, idx) => {
                                return (
                                    <tr
                                        key={idx}
                                        className={`${idx % 2 ? "bg-gray-200" : "bg-gray-100"
                                            } text-gray-900`}
                                    >
                                        <td className="px-2 py-1">{idx + 1}</td>
                                        <td className="px-2 py-1">{student.name}</td>
                                        <td className="px-2 py-1">{student.fatherName}</td>
                                        <td className="px-2 py-1">{student.mobile}</td>
                                        <td className="px-2 py-1">{student.registeredBy}</td>
                                        <td className="px-2 py-1">{student.category}</td>
                                        <td className="px-2 py-1">{student.villege}</td>
                                        <td className="px-2 py-1">{student.district}</td>
                                        <td className="px-2 py-1">{student.status}</td>
                                        <td className="px-2 py-1">{`${new Date(
                                            student.updatedAt
                                        ).toLocaleDateString()} - ${new Date(
                                            student.updatedAt
                                        ).toLocaleTimeString()}`}</td>
                                        <td className="py-1 flex items-center gap-2 justify-center">
                                            <Button
                                                className="bg-blue-700 hover:bg-blue-800"
                                                text={"View"}
                                                onClick={() => {
                                                    router.push(
                                                        `/student/${student._id}`
                                                    );
                                                }}
                                            />
                                            <Button
                                                text={"Contact"}

                                                onClick={() => {
                                                    router.push(
                                                        `/student/update-student?studentId=${student._id}`
                                                    );
                                                }}
                                                className="bg-green-700 hover:bg-green-800"
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        {students && students.length == 0 && "no student"}
                    </tbody>
                    <tfoot>
                        <tr />
                    </tfoot>
                </table>
            </div>

        </>
    )
}


export default Students;