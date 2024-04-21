"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loading, AwsCard } from "@/components";
import { useStudentContext } from "@/hooks";

interface Student {
  _id: string;
  name: string;
  fatherName: string;
  mobile: string;
  villege: string;
  block: string;
  district: string;
  marks10: string;
  marks12: string;
  caste: string;
  registeredBy: string;
  schoolName: string;
  status: string;
  course: string;
  branch: string;
  category: string;
  chats: string;
  __v: string;
  createdAt: string;
  updatedAt: string;
}

interface StudentContext {
  students: Student[];
  status: string;
  error: any;
  getStudent: (id: string) => Student | null;
}

const Page = ({ params, searchParams }: any) => {
  const [student, setStudent] = useState<Student | null>(null);

  const { students, error, getStudent }: any = useStudentContext();

  let id = params.id[0];

  useEffect(() => {
    let student = getStudent(id);
    setStudent(student);
  }, [getStudent, id]);

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
        {  student && (
            <AwsCard
              title={"Student Report"}
              showCardControls={false}
              cardProps="shadow border rounded-sm p-4 flex flex-col gap-2 min-w-[580px]"
            >
              <table className="w-[100%]">
                <tbody>
                  <tr>
                    <td className="w-[30%]">Name</td>
                    <td>{student.name}</td>
                  </tr>
                  {/* Other rows */}
                </tbody>
              </table>

              <table className="w-[100%]">
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <hr />
                    </td>
                  </tr>
                  {/* Other rows */}
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
        }
      </div>
    </>
  );
};

export default Page;
