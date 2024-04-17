/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Input,
  JsonToCsvExporter,
  Loading,
  Students,AwsCard, 
} from "@/components";

import axios from "axios";
import { useRouter } from "next/navigation";

// search filters

const districts = [
  "SAGAR",
  "DAMOH",
  "CHHATARPUR",
  "PANNA",
  "TIKAMGARH",
  "LALITPUR",
];

const studentStatus = ["PENDING", "NOTINTERESTED", "INTERESTED", "ADMITTED"];
const categories = ["OBC", "GEN", "ST", "SC", "OTHER"];
const counsellors = ["admin@gmail.com", "user@gmail.com"];
const orders = [
  "name",
  "fatherName",
  "mobile",
  "registeredBy",
  "category",
  "villege",
  "district",
  "status",
  "date",
];

export default function SearchStudents({
  emptySearch = false,
  autoSearch = false,
  isExportOpen = false,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState(null);
  const [registeredBy, setRegisteredBy] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("1"); // 1-> asc, -1 -> desc

  const router = useRouter();

  const getStudents = async () => {
    try {
      setLoading(true);
      setStudents(null);
      const res = await axios.get(
        `/api/students/search?query=${query}&currentPage=${currentPage}&pageSize=${pageSize}&district=${district}&status=${status}&category=${category}&registeredBy=${registeredBy}&sortBy=${sortBy}&order=${order}`
      );
      setLoading(false);

      console.log(res);
      if (res.status === 200) {
        console.log(res.data);
        let students = await res.data;
        setStudents(students);
        setTotal(students.length);
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
    if (query.length != 0 || emptySearch) {
      getStudents();
    } else {
      setStudents(null);
    }
  };

  const removeStudent = async (studentId) => {
    console.log(studentId);
    let res = await axios.post(`/api/students/${studentId}`);

    if (res.statusText == "OK") {
      alert("successfully remove");
    }
  };

  useEffect(() => {
    if (emptySearch || autoSearch) {
      getStudents();
    }

    if (query.length != 0) getStudents();
  }, [currentPage]);

  return (
    <AwsCard title="Search students" className="text-black py-4">
      <div className="my-4 text-black mx-2">
        {/* search form */}
        <div className="flex flex-col gap-2">
          <div className="md:flex w-[100%]">
            <Input
              className=""
              label={"Search text"}
              placeholder={"Search here..."}
              htmlFor={"search"}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <Input
              label={"Number of Entries"}
              htmlFor={"pageSize"}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            />
            <div className="sm:pl-[7px] md:mt-10">
              <Button
                className=""
                text={"Search"}
                onClick={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              />
            </div>
          </div>
          {/* filters */}
          <div className="my-1 gap-2 mx-2 flex overflow-x-auto">
            <div className="flex flex-col gap-2 my-1">
              <label htmlFor="district" className="form-label text-black">
                District
              </label>
              <select
                className="p-1 border-2 rounded-sm focus: outline-none text-black"
                onChange={(e) => {
                  setDistrict(e.target.value);
                }}
              >
                <option value="">SELECT</option>
                {districts &&
                  districts.map((district, idx) => {
                    return (
                      <option value={`${district}`} key={idx}>
                        {district}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex flex-col gap-2 my-1">
              <label htmlFor="status" className="form-label text-black">
                Status
              </label>
              <select
                className="p-1 border-2 rounded-sm focus: outline-none text-black"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="">SELECT</option>
                {studentStatus &&
                  studentStatus.map((status, idx) => {
                    return (
                      <option value={`${status}`} key={idx}>
                        {status}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex flex-col gap-2 my-1">
              <label htmlFor="category" className="form-label text-black">
                Category
              </label>
              <select
                className="p-1 border-2 rounded-sm focus: outline-none text-black"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="">SELECT</option>
                {categories &&
                  categories.map((category, idx) => {
                    return (
                      <option value={`${category}`} key={idx}>
                        {category}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex flex-col gap-2 my-1">
              <label htmlFor="registeredBy" className="form-label text-black">
                Registered By
              </label>
              <select
                name="registeredBy"
                className="p-1 border-2 rounded-sm focus: outline-none text-black"
                onChange={(e) => {
                  setRegisteredBy(e.target.value);
                }}
              >
                <option value="">SELECT</option>
                {counsellors &&
                  counsellors.map((counsellor, idx) => {
                    return (
                      <option value={`${counsellor}`} key={idx}>
                        {counsellor}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="flex flex-col gap-2 my-1">
              <label htmlFor="sortBy" className="form-label text-black">
                Sort By
              </label>
              <select
                name="sortBy"
                className="p-1 border-2 rounded-sm focus: outline-none text-black"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                }}
              >
                <option value="">SELECT</option>
                {orders.map((order, idx) => {
                  return <option key={idx}>{order}</option>;
                })}
              </select>
            </div>
            <div className="flex flex-col gap-2 my-1">
              <label htmlFor="order" className="form-label text-black">
                Order
              </label>
              <select
                name="order"
                className="p-1 border-2 rounded-sm focus: outline-none text-black"
                value={order}
                onChange={(e) => {
                  setOrder(e.target.value);
                }}
              >
                <option value="1">ASC</option>
                <option value="-1">DESC</option>
              </select>
            </div>
          </div>
        </div>

        {/* search result */}
        {students && (
          <>
            <div className="mx-2 overflow-auto">
              <p>Result - {query}</p>Total {total}
              <div className="m-auto">
                <div className="flex flex-col my-2 gap-3 m-auto table-fixed">
                  
                </div>
              </div>
              {loading ? <Loading /> : <Students students={students} />}
            </div>
          </>
        )}
        {query.length != 0 && students==0 && (
          <p className="text-xl">No Students</p>
        )}
      </div>
      {/* export button  */}
      <div>
        {students && (
          <div className="px-4 flex justify-between">
            <JsonToCsvExporter jsonData={students} filename={"report.csv"} />
            <div className="flex gap-2 items-center justify-center">
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
                    <div>
                      Total {`${currentPage}/${Math.ceil(total / pageSize)}`}
                    </div>
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
          </div>
        )}
      </div>
    </AwsCard>
  );
}
