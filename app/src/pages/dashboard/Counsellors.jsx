import React, { useEffect, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import api from "../../utils/api";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import { CounsellorRow } from "./Dashboard";

const Counsellors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // total students present in student collection
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(10);

  const [counsellors, setCounsellors] = useState([]);
  const { isAdmin, token } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const getCounsellors = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${api}/admin/dashboard/get-counsellors?page=${currentPage}&size=${pageSize}`,
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            isAdmin: isAdmin,
          }),
        }
      );

      if (response.ok) {
        // console.log("get counsellors");
        let data = await response.json();

        setCounsellors(data.users);
        setTotal(data.total);
      }
    } catch (error) {
      // console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCounsellors();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h3 className="underline text-xl font-semibold">Counsellors</h3>
      {counsellors.length != 0 && (
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

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              S.No.
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {counsellors.map((user, idx) => {
            return <CounsellorRow key={idx} user={user} idx={idx} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Counsellors;
