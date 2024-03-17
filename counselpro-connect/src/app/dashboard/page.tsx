import axios from "axios";
import Link from "next/link";
import { ReactElement } from "react"

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

const getStudents = async () => {
    let res = await axios.get(`http://localhost:3000/api/students`);

    if (res.statusText === "OK") {
        let students = await res.data;
        return students;
    }
    return [];
}

function StudentRow({ idx, student }: { idx: number, student: student }) {
    return (
        <tr key={idx}
            className={`${idx % 2 ? "bg-gray-200" : "bg-gray-100"
                } text-gray-900`}>
            <td className="px-1 py-2">{idx + 1}</td>
            <td className="px-1 py-2">{student.name}</td>
            <td className="px-1 py-2">{student.fatherName}</td>
            <td className="px-1 py-2">{student.mobile}</td>
            <td className="px-1 py-2">{student.registeredBy}</td>
            <td className="px-1 py-2">{student.category}</td>
            <td className="px-1 py-2">{student.villege}</td>
            <td className="px-1 py-2">{student.district}</td>
            <td className="px-6 py-2">{`${new Date(
                student.updatedAt
            ).toLocaleDateString()} - ${new Date(
                student.updatedAt
            ).toLocaleTimeString()}`}</td>
            <td className="px-1 py-2">{student.status}</td>

            <td className="px-1 py-2 flex gap-2">
                <Link href={`/view-report/student/${student._id}`}>
                    <button className="bg-white py-1 px-2 border border-black border-opacity-25 rounded-sm font-semibold hover:bg-gray-100">View-Report</button>
                </Link>

            </td>
        </tr>
    )
}

const DisplayStudents = ({ title, students }: { title: string, students: student[] }) => {

    return (
        <div className="my-4 overflow-x-scroll m-auto" >
            {/* table heading */}
            <h3 className="text-2xl font-semibold">{title}</h3>
            <table className="table table-striped">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-1 py-2">
                            S.No.
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Father Name
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Mobile
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Registered By
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Villege
                        </th>
                        <th scope="col" className="px-6 py-2">
                            District
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* row in table */}
                    {students.map((student: any, idx: number) => {
                        return <StudentRow key={idx} student={student} idx={idx} />;
                    })}
                </tbody>
            </table>
        </div>
    )
}



const Page = async (props: any) => {

    const students = await getStudents();

    return (
        <div className="px-2">
            <DisplayStudents title="Registered Students" students={students} />
        </div>
    )
}

export default Page;