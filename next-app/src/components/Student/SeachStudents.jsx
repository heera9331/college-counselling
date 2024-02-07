"use client";
import { useState, useEffect } from "react";
import Button from "../Button";
import useAuthContext from "@/hooks/useAuthContext";
import axios from "axios";
import api from "@/utils/api";

export default function SearchStudents() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(15);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const { token } = useAuthContext();

  const getStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${api}/user/search?query=${query}&page=${currentPage}&size=${pageSize}`,
        { token }
      );

      console.log(res);
      if (res.status === 200) {
        console.log(res.data);
        setStudents(res.data.students);
        setTotal(res.data.total);
      } else {
        console.error(
          "Failed to fetch recent students:",
          res.status,
          res.statusText
        );
      }
    } catch (err) {
      console.error("Error during API request:", err);
      // Handle the error, e.g., show an error message to the user
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (query.length != 0) {
      getStudents();
    } else {
      setStudents([]);
    }
  };

  useEffect(() => {
    // getStudents();
    if (query.length != 0) getStudents();
  }, [currentPage]);

  return (
    <div className="text-black">
      <div className="my-4 text-black">
        <div className="flex flex-col gap-2 m-2">
          <label htmlFor="search">Search here...</label>
          <input
            type="search"
            className="p-1 border-2 rounded-sm focus: outline-none"
            name="search"
            id="search"
            placeholder="Search here ..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value.toUpperCase());
            }}
          />
          <div className="my-1">
            <button
              className="bg-blue-700 text-white rounded-sm py-1 px-2 hover:bg-blue-900 "
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              Search
            </button>
          </div>
        </div>
        {query.length != 0 && (
          <>
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

            <div className="mx-2">
              <p>Result - {query}</p>Total {total}
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
                          <td className="px-6 py-2 flex items-center">
                            <Button text={"View"} onClick={() => {}} />
                            <Button text={"Update"} onClick={() => {}} />
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
          </>
        )}
      </div>
    </div>
  );
}
