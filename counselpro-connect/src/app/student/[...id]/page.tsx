"use client";
import Link from "next/link";
import { Loading, AwsCard } from "@/components";
import { useEffect, useState } from "react";
import { useSearchContext } from "@/hooks";
import { useStudentContext } from "@/hooks";
// interface student {
//     _id: string,
//     name: string,
//     fatherName: string,
//     mobile: string,
//     villege: string,
//     block: string,
//     district: string,
//     marks10: string,
//     marks12: string,
//     caste: string,
//     registeredBy: string,
//     schoolName: string,
//     status: string,
//     course: string,
//     branch: string,
//     category: string,
//     chats: string,
//     __v: string,
//     createdAt: string,
//     updatedAt: string,
// }

const Page = ({ params, searchParams }: object) => {
  const [student, setStudent] = useState<null | object>(null);

  const { students, status, error, getStudent } = useStudentContext();

  let id = params.id[0];

  useEffect(() => {
    let student = getStudent(id);
    setStudent(student);
  }, [id]);

  return (
    <>
      <div>
        {id !== "undefined" && (
          <Link
            href={`/student/update-student?studentId=${id}`}
            className="text-blue-800 underline"
          >
            Do you want to update this student
          </Link>
        )}
      </div>
      <div className="flex items-center justify-center min-h-[80vh] ">
        {status === "loading" ? (
          <Loading />
        ) : (
          student && (
            <AwsCard
              title={"Student Report"}
              showCardControls={false}
              className="shadow border rounded-sm p-4 flex flex-col gap-2 min-w-[580px]"
            >
              <table className="w-[100%]">
                <tbody>
                  <tr>
                    <td className="w-[30%]">Name</td>
                    <td>{student.name}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>{student.category}</td>
                  </tr>
                  <tr>
                    <td>Father Name</td>
                    <td>{student.fatherName}</td>
                  </tr>
                  <tr>
                    <td>Mobile Numbers</td>
                    <td>{student.mobile}</td>
                  </tr>
                  <tr>
                    <td>Village</td>
                    <td>{student.villege}</td>
                  </tr>
                  <tr>
                    <td>Block</td>
                    <td>{student.block}</td>
                  </tr>
                  <tr>
                    <td>District</td>
                    <td>{student.district}</td>
                  </tr>
                  <tr>
                    <td>School</td>
                    <td>{student.schoolName}</td>
                  </tr>
                  <tr>
                    <td>Class 10th %</td>
                    <td>{student.marks10}</td>
                  </tr>
                  <tr>
                    <td>Class 12th %</td>
                    <td>{student.marks12}</td>
                  </tr>
                </tbody>
              </table>

              <table className="w-[100%]">
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[30%]">Registered By</td>
                    <td>{student.registeredBy}</td>
                  </tr>
                  <tr>
                    <td>Current Status</td>
                    <td>{student.status}</td>
                  </tr>
                  <tr>
                    <td>Course</td>
                    <td>{student.course}</td>
                  </tr>
                  <tr>
                    <td>Branch</td>
                    <td>{student.branch}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex gap-2 pt-4">
                <button
                  className="shadow-sm bg-gray-800 rounded-sm text-white font-semibold px-2 py-1"
                  onClick={() => {
                    window.print();
                  }}
                >
                  Print
                </button>

                <Link
                  href={`/student/update-student?studentId=${id}`}
                  className="shadow-sm bg-green-700 rounded-sm text-white font-semibold px-2 py-1"
                >
                  Contact Again
                </Link>
              </div>
            </AwsCard>
          )
        )}
      </div>
    </>
  );
};

export default Page;
