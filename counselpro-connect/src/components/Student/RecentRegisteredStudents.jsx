/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "@/app/globals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SearchStudents, Button, Students, Loading } from "@/components";
import { IoSearch } from "react-icons/io5";
import { useSearchContext } from "@/hooks";

const RecentRegisteredStudents = () => {
  const {
    students,
    status,
    query,
    error,
    updateSearchContext,
    setLoading,
    setSuccess,
    setError,
  } = useSearchContext();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(15);
  const [total, setTotal] = useState(0);
  // toggle for search
  const [click, setClick] = useState(false);

  const getRecentStudents = async () => {
    setLoading();
    let res = await axios.get(
      `/api/students?currentPage=${currentPage}&pageSize=${pageSize}`
    );

    setLoading();
    if (res && res.statusText === "OK") {
      let data = await res.data;
      console.log("data", data);
      setSuccess(data);
      setTotal(data.length);
    } else {
      setLoading(false);
      // router.push("/login");
    }
    setTotal(0);
  };

  useEffect(() => {
    if (!students.length) {
      getRecentStudents();
    }
  }, [currentPage]);

  return (
    <div className="">
      <div className="">
        <h1 className="font-bold text-slate-600 text-xl bg-gray-200 py-2 px-2 border border-b-slate-300">
          {/* Recent Registered Students */}
          Registered Students
        </h1>
        {/* <div className="mx-2 bg-gray-300 py-2 rounded-sm text-center px-2 cursor-pointer ">
          <IoSearch />
        </div> */}
        <SearchStudents emptySearch={false} autoSearch={false} />

        {students && (
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
        )}
        {status === "loading" ? (
          <Loading />
        ) : (
          <div className="mx-2">
            <Students students={students} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentRegisteredStudents;
