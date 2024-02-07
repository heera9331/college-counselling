"use client";
import "@/app/globals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthContext from "@/hooks/useAuthContext";
import api from "@/utils/api";
import Button from "../Button";

const RecentRegisteredStudents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(15);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const { token } = useAuthContext();

  const getRecentStudents = async () => {
    setTotal(true);
    const res = await axios.post(
      `${api}/user/recent-students?page=${currentPage}&size=${pageSize}`,
      { token }
    );
    setTotal(false);
    if (res.statusText === "OK") {
      let data = await res.data;
      setStudents(data.students);
      setTotal(data.total);
    }
    setTotal(false);
  };

  useEffect(() => {
    getRecentStudents();
  }, [currentPage]);
  return (
    <div className="min-h-[100vh]">
      <div className="">
        <h1 className="font-bold text-slate-600 text-xl mb-6 bg-gray-200 py-2 px-2 border border-b-slate-300">
          Recent Registered Students
        </h1>
        <div className="flex items-center justify-center my-2 gap-2 m-auto table-fixed">
          <Button
            text={"<<"}
            onClick={() => {
              setCurrentPage(1);
            }}
          />
          <Button
            text={"<"}
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          />
          <div>Total {`${currentPage}/${Math.ceil(total / pageSize)}`}</div>
          <Button
            text={">"}
            onClick={() => {
              if (Math.ceil(total / pageSize) > currentPage) {
                setCurrentPage(currentPage + 1);
              }
            }}
          />
          <Button
            text={">>"}
            onClick={() => {
              setCurrentPage(Math.ceil(total / pageSize));
            }}
          />
        </div>
        <div className="mx-2 shadow-md overflow-auto">
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
                      <td className="px-6 py-2 flex items-center gap-1">
                        <Button text={"View"} onClick={() => {}} />
                        <Button
                          text={"Contact"}
                          onClick={() => {}}
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
        </div>
        No Students
      </div>
    </div>
  );
};

export default RecentRegisteredStudents;
