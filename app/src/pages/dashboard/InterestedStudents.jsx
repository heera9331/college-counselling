import { useEffect, useState } from "react";
import { StudentRow } from "./Dashboard";
import useAuthContext from "../../hooks/useAuthContext";
import Button from "../../components/Button";

import api from "../../utils/api";
import Loading from "../../components/Loading";

const InterestedStudents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // total students present in student collection
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(10);

  const { isAdmin, token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [title] = useState("Interested");
  const [students, setStudents] = useState([]);

  const getStudents = async (status) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${api}/admin/dashboard/get-students?page=${currentPage}&size=${pageSize}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            isAdmin: isAdmin,
            status: status,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setStudents(result.result);
        setTotal(result.total);
        // console.log(students);
      } else {
        alert("Error while fetching data");
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getStudents("INTERESTED");
    // getStudents("PENDING");
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container my-4 position-relative" style={{ top: "60px" }}>
      {/* table heading */}
      <h3 className="text-xl font-semibold underline">{title}</h3>

      {students.length != 0 && (
        <div className="flex items-center justify-center my-2 gap-2 m-auto">
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

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* student table headers */}
            <th scope="col" className="px-6 py-3">
              S. No.
            </th>
            <th scope="col" className="px-6 py-3">
              Student Name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Route
            </th>
            <th scope="col" className="px-6 py-3">
              Mobile
            </th>

            <th scope="col" className="px-6 py-3">
              Registered By
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {/* row in table */}
          {students.map((student, idx) => {
            return <StudentRow key={idx} student={student} idx={idx} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InterestedStudents;
