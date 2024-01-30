/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

import api from "../../utils/api";

import Loading from "../Loading";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const removeStudent = async (id) => {
  try {
    const { token, isAdmin } = useAuthContext();

    // console.log(id);

    let response = await fetch(
      `${api}/admin/remove-student?id=${id}&token=${token}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: isAdmin, token }),
      }
    );

    if (response.ok) {
      alert("successfully removed");
    } else {
      // console.log(await response.json());
      alert("error");
    }
  } catch (error) {
    alert("something went wrong, sorry for inconvenience");
  }
};

export const DisplayStudent = ({ student, idx }) => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <tr
        className={`${idx % 2 != 0 ? "bg-gray-200" : "bg-gray-100"} text-black`}
      >
        <td className="px-6 py-3">{student.name}</td>
        <td className="px-6 py-3">{student.category}</td>
        <td className="px-6 py-3">{student.route}</td>
        <td className="px-6 py-3">{student.status}</td>
        <td className="px-6 py-3">{student.mobile}</td>
        <td>
          <button
            className="bg-red-600 ml-5 p-1 text-white rounded-sm"
            value={student._id}
            onClick={(event) => {
              let id = event.target.value;
              let userConfirm = prompt(
                "Are sure want to remove this student Yes[Y]/No[N]"
              );
              if (userConfirm && "YES".includes(userConfirm.toUpperCase())) {
                removeStudent(id);
              } else {
                alert("Action revoked");
                // console.log("action revoked");
              }
            }}
          >
            Remove
          </button>
        </td>
      </tr>
    </>
  );
};

const Student = () => {
  const { token, isAdmin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  React.useEffect(() => {
    if (!token) {
      nav("/login");
    }
  }, [token, isAdmin, nav]);

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

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="my-4 text-black">
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
      {students ? (
        <div className="mx-2 shadow-md sm:rounded-lg">
          <p>Result - {"'" + query + "'"}</p>
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
            <tbody className="odd:bg-white border-b dark:border-gray-700 ">
              {students.map((student, idx) => {
                return <DisplayStudent student={student} key={idx} idx={idx} />;
              })}
            </tbody>
            <tfoot>
              <tr>Total {students.length}</tr>
            </tfoot>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Student;
