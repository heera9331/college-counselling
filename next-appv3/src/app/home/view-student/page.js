"use client";
import useAuthContext from "@/hooks/useAuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import axios from "axios";
import Button from "@/components/Button";

export default function Page() {
  const params = useSearchParams();
  const [student, setStudent] = useState(null);
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getStudent = async (studentId) => {
    try {
      let res = await axios.post(
        `${api}/user/searchById?studentId=${studentId}`,
        {
          token,
        }
      );
      console.log(res);
      if (res.statusText === "OK") {
        let data = await res.data;
        const { _id, chats, updatedAt, createdAt, __v, ...rest } = data.student;

        setStudent(rest);
      }
    } catch (error) {
      alert("can't get student, try again later");
      console.log(error);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  useEffect(() => {
    getStudent(params.get("studentId"));
  }, []);

  return (
    <div className="min-h-[100vh] mt-[70px] mx-2 shadow-sm shadow-slate-600">
      <div className="">
        <h1 className="font-bold text-slate-600 text-xl mb-6 bg-gray-200 py-2 px-2 border border-b-slate-300">
          View Details of A Student
        </h1>
      </div>

      <div className="m-auto px-6">
        <div className=" bg-slate-100 p-6 h-fit min-w-[512px] w-fit m-auto">
          {student && (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs font-semibold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
              <tbody className="odd:bg-white border-b dark:border-gray-700">
                {student &&
                  Object.keys(student).map((key, idx) => {
                    return (
                      <tr key={idx} className={`{}`}>
                        <th className="text-gray-800">{key.toUpperCase()}</th>
                        <td className="text-gray-800">{student[`${key}`]}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}

          <div>
            <Button
              className={"m-1"}
              text={"Export"}
              onClick={() => {
                handleDownload();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
