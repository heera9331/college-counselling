/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "@/app/globals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {AwsCard, Button, Students, Loading } from "@/components";
import { IoSearch } from "react-icons/io5";
import { useSearchContext, useStudentContext } from "@/hooks";

const RecentRegisteredStudents = () => {
  const { students, status, error, setStatus, setError, setStudents } =
    useStudentContext();

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(15);
  const [total, setTotal] = useState(0);
  // toggle for search
  const [click, setClick] = useState(false);

  const getRecentStudents = async () => {
    setStatus("loading");
    let res = await axios.get(
      `/api/students?currentPage=${currentPage}&pageSize=${pageSize}`
    );

    setStatus("loading");

    if (res && res.statusText === "OK") {
      let data = await res.data;
      console.log("data", data);
      setStudents(data);
      setTotal(data.length);
    } else {
      setStatus("success");
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
      <AwsCard title="Registered Students" titleProps="font-semibold text-gray-600 text-2xl">
      <div className="">
         
         {/* <div className="mx-2 bg-gray-300 py-2 rounded-sm text-center px-2 cursor-pointer ">
           <IoSearch />
         </div> */}
         
 
         
         {status === "loading" ? (
           <Loading />
         ) : (
           <div className="mx-2">
             <Students students={students} />
           </div> 
         )}
         {students && (
           <div className="px-2 flex items-center justify-end my-2 gap-2 m-auto table-fixed">
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
       </div>
      </AwsCard>
      
    </div>
  );
};

export default RecentRegisteredStudents;
