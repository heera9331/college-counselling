import React, { useEffect, useState } from "react";
import axios from "axios";

import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Loading from "../Loading";
import Button from "../Button";
import Input from "../Input";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const { token, isAdmin } = useAuthContext();
  const [updateStudent, setUpdateStudent] = useState(null);
  const [tmp, setTmp] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token === "null" || isAdmin === "false") {
      navigate("/home");
    }

    console.log(token);
  }, [navigate, token, isAdmin]);

  const [query, setQuery] = React.useState("");
  const [students, setStudents] = React.useState([]);

  const search = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      let result = await fetch(
        `${api}/admin/student/search?query=${query}&token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token, query }),
        }
      );

      result = await result.json();
      // console.log(result.result);
      setStudents(result.result);
    } catch (err) {
      // console.log("problem in search");
    }

    setLoading(false);
  };

  const saveDetails = async () => {
    // console.log(tmp);
    setLoading(true);
    let res = confirm("Are you sure want to update details");

    if (res) {
      try {
        let res = await axios.post(`${api}/admin/update-student`, {
          token,
          student: tmp,
        });
        if (res.statusText === "OK") {
          alert("updated");
          setUpdateStudent(null);
          setTmp(null);
        }
      } catch (error) {
        // console.log("error", error);
        setLoading(false);
        alert(error.response.data.error.message);
        navigate("/login");
      }
    } else {
      alert("Action revoked");
      setUpdateStudent(null);
      setTmp(null);
    }

    setLoading(false);
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="">
      <div className="flex flex-col gap-2 m-2">
        <label htmlFor="name" className="form-label">
          Enter name or email to remove student
        </label>
        <input
          value={query}
          type="text"
          className="p-1 border-2 rounded-sm focus: outline-none"
          name="name"
          id="name"
          placeholder="Enter name or email"
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />

        <div className="my-1">
          <Button
            text={"Search"}
            onClick={(e) => {
              e.preventDefault();
              search(e);
            }}
          />
        </div>
      </div>

      {/*student to be update  */}
      {updateStudent && (
        <>
          <div className="">
            <Input
              htmlFor={"name"}
              label={"Name"}
              placeholder={"Name"}
              onChange={(e) => {
                setTmp({ ...tmp, name: e.target.value.toUpperCase() });
              }}
              name={tmp.name}
              value={tmp.name}
            />
            <Input
              htmlFor={"mobile"}
              label={"Mobile"}
              placeholder={"Mobile"}
              onChange={(e) => {
                setTmp({ ...tmp, mobile: e.target.value.toUpperCase() });
              }}
              name={"mobile"}
              value={tmp.mobile}
            />

            <div className="flex flex-col gap-2 m-2">
              <label htmlFor="category" className="form-label">
                Select category:
              </label>

              <select
                className="p-1 border-2 rounded-sm focus: outline-none text-black"
                name="category"
                value={tmp.category}
                onChange={(e) => {
                  setTmp({
                    ...tmp,
                    category: e.target.value,
                  });
                }}
              >
                <option value="">==SELECT CATEGORY==</option>
                <option value="OTHER">OTHER</option>
                <option value="GEN">GEN</option>
                <option value="OBC">OBC</option>
                <option value="ST">ST</option>
                <option value="SC">SC</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 m-2">
              <label htmlFor="route" className="form-label">
                Select route:
              </label>

              <select
                className="p-1 border-2 rounded-sm focus: outline-none text-black"
                name="route"
                value={tmp.route}
                onChange={(e) => {
                  setTmp({
                    ...tmp,
                    route: e.target.value,
                  });
                }}
              >
                <option value="">==SELECT ROUTE==</option>
                <option value="OTHER">OTHER</option>
                <option value="BANDA">BANDA</option>
                <option value="RAHLI">RAHLI</option>
                <option value="SAGAR">SAGAR</option>
                <option value="BUXWAHA">BUXWAHA</option>
                <option value="GARHAKOTA">GARHAKOTA</option>
                <option value="DAMOH">DAMOH</option>
                <option value="CHATTARPUR">CHATTARPUR</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 m-2">
              <label htmlFor="stream" className="form-label text-black">
                Select branch:
              </label>

              <select
                className="p-1 border-2 rounded-sm focus: outline-none text-black"
                value={tmp.stream}
                name="stream"
                onChange={(e) => {
                  setTmp({
                    ...tmp,
                    stream: e.target.value,
                  });
                }}
              >
                <option value="">==SELECT BRANCH==</option>
                <option value="OTHER">OTHER</option>
                <option value="CSE">CSE</option>
                <option value="CE">CE</option>
                <option value="EC">EC</option>
                <option value="ME">ME</option>
                <option value="AL/ML">AL/ML</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 m-2">
              <label htmlFor="status" className="form-label">
                Status:
              </label>

              <select
                className="p-1 border-2 rounded-sm focus: outline-none text-black"
                name="status"
                value={tmp.status}
                onChange={(e) => {
                  setTmp({
                    ...tmp,
                    status: e.target.value,
                  });
                }}
              >
                <option value="">==Change Status==</option>
                <option value="OTHER">OTHER</option>
                <option value="INTERESTED">INTERESTED</option>
                <option value="NOTINTERESTED">NOTINTERESTED</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 m-2">
              <label htmlFor="gender" className="form-label">
                Gender:
              </label>

              <select
                className="p-1 border-2 rounded-sm focus: outline-none text-black"
                id="gender"
                name="gender"
                value={tmp.gender}
                onChange={(e) => {
                  setTmp({
                    ...tmp,
                    gender: e.target.value,
                  });
                }}
              >
                <option value="">==SELECT GENDER==</option>
                <option value="OTHER">OTHER</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </select>
            </div>

            <button
              className="bg-blue-800 m-2 p-1 text-white rounded-sm px-4"
              onClick={(e) => {
                e.preventDefault();
                saveDetails();
              }}
            >
              Save
            </button>
            <button
              className="bg-green-800 m-2 p-1 text-white rounded-sm px-4"
              onClick={() => {
                setTmp(updateStudent);
              }}
            >
              Default
            </button>
            <button
              className="bg-red-800 m-2 p-1 text-white rounded-sm px-4"
              onClick={() => {
                setUpdateStudent(null);
              }}
            >
              Cancal
            </button>
          </div>
        </>
      )}
      {students ? (
        <div className="mb-3">
          <p>Result - `{query}`</p>
          <table
            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            border={1}
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Rooute
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Mobile
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {students.length !== 0 &&
                students.map((student, idx) => {
                  return (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 != 0 ? "bg-gray-200" : "bg-gray-100"
                      } text-black`}
                    >
                      <td className="px-6 py-3">{student.name}</td>
                      <td className="px-6 py-3">{student.category}</td>
                      <td className="px-6 py-3">{student.route}</td>
                      <td className="px-6 py-3">{student.status}</td>
                      <td className="px-6 py-3">{student.mobile}</td>
                      <td>
                        <button
                          className="bg-yellow ml-5 p-1 text-white rounded-sm px-4"
                          value={student._id}
                          onClick={(e) => {
                            // console.log(e.target.value);
                            students.forEach((student) => {
                              if (student._id === e.target.value) {
                                setUpdateStudent(student);
                                setTmp(student);
                              }
                            });
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>Total</tr>
            </tfoot>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UpdateStudent;
