/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AwsCard, Button, Students, Loading } from "@/components";
import { IoSearch } from "react-icons/io5";
import { useStudentContext } from "@/hooks";
import Link from "next/link";

const RecentRegisteredStudents = () => {
  const { students, setStatus, setStudents } = useStudentContext();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const [total, setTotal] = useState(0);

  const getRecentStudents = async () => {
    setStatus("loading");
    try {
      const res = await axios.get(`/api/students?currentPage=${currentPage}&pageSize=${pageSize}`);
      if (res && res.status === 200) {
        const data = res.data;
        setStudents(data);
        setTotal(data.length);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    getRecentStudents();
  }, [currentPage]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="">
      <AwsCard title="Registered Students">
        <div className="">
          {/* <div className="mx-2 bg-gray-300 py-2 rounded-sm text-center px-2 cursor-pointer ">
            <IoSearch />
          </div> */}
          
          <div className="mx-2">
            {students ? <Students students={students} /> : <Loading />}
          </div>
          {students && (
            <div className="px-2 flex items-center justify-end my-2 gap-2 m-auto table-fixed">
              <Button
                text={"<<"}
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              />
              <Button
                text={"<"}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
              <div>Total {`${currentPage}/${totalPages}`}</div>
              <Button
                text={">"}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Button
                text={">>"}
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              />
            </div>
          )}
        </div>
      </AwsCard>
      
    </div>
  );
};

export default RecentRegisteredStudents;
