"use client";

import useAuthContext from "@/hooks/useAuthContext";
import api from "@/utils/api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import axios from "axios";
import Input from "@/components/Input";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [total, setTotal] = useState(0);
  const params = useSearchParams();
  const { token } = useAuthContext();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [tmpPageSize, setTmpPageSize] = useState(pageSize);

  const getUser = async (profileId) => {
    let res = await axios.post(
      `${api}/user/profile?profileId=${profileId}&page=${currentPage}&size=${pageSize}`,
      {
        token,
      }
    );
    console.log(res);
    if (res.statusText === "OK") {
      let data = await res.data;
      setUser(data.user);
      setStudents(data.students);
      setTotal(data.total);
    } else {
      alert("can't get profile, try again later");
      router.push("/home");
    }
  };

  const handleDownload = () => {
    window.print();
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    let profileId = params.get("profileId");
    getUser(profileId);
  }, [currentPage, pageSize]);

  return (
    <div className="min-h-[100vh] mt-[65px] mx-2 shadow-sm shadow-slate-600">
      <div className="">
        <h1 className="font-bold text-slate-600 text-xl mb-6 bg-gray-200 py-2 px-2 border border-b-slate-300">
          Profile
        </h1>
      </div>
      <div className="m-2">
        {user && (
          <div className="">
            <p>Name - {user.name}</p>
            <p>Email - {user.email}</p>
          </div>
        )}
      </div>

      <div className="mx-2 overflow-auto">
        <table
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          border={1}
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                Caste
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
          <tbody className="odd:bg-white border-b dark:border-gray-700">
            {students.length != 0 &&
              students.map((student, idx) => {
                return (
                  <tr
                    key={idx}
                    className={`${
                      idx % 2 ? "bg-gray-200" : "bg-gray-100"
                    } text-gray-900`}
                  >
                    <td className="px-1 py-2">{idx + 1}</td>
                    <td className="px-6 py-2">{student.name}</td>
                    <td className="px-6 py-2">{student.fatherName}</td>
                    <td className="px-6 py-2">{student.mobile}</td>
                    <td className="px-6 py-2">{student.caste}</td>
                    <td className="px-6 py-2">{student.category}</td>
                    <td className="px-6 py-2">{student.villege}</td>
                    <td className="px-6 py-2">{student.district}</td>
                    <td className="px-6 py-2">{student.status}</td>
                    <td className="px-6 py-2">{`${new Date(
                      student.updatedAt
                    ).toLocaleDateString()} - ${new Date(
                      student.updatedAt
                    ).toLocaleTimeString()}`}</td>
                    <td className="px-6 py-2 flex items-center gap-1">
                      <Button
                        text={"View"}
                        onClick={() => {
                          router.push(
                            `/home/view-student?studentId=${student._id}`
                          );
                        }}
                      />
                      <Button
                        text={"Contact"}
                        onClick={() => {
                          router.push(
                            `/home/update-student?studentId=${student._id}`
                          );
                        }}
                        className={"bg-green-700"}
                      />
                    </td>
                  </tr>
                );
              })}
            {students.length == 0 && "no student"}
          </tbody>
          <tfoot>
            <tr />
          </tfoot>
        </table>

        <div className="py-2 flex gap-2">
          <Button
            text={"Print"}
            onClick={() => {
              window.print();
            }}
          />
          <Button
            text={"View All"}
            onClick={() => {
              setPageSize(1000);
            }}
          />
        </div>
      </div>
    </div>
  );
}
