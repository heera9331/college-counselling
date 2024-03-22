/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import verifyToken from "../../utils/VerifyToken";
import api from "../../utils/api";
import { useAuthContext } from "../../contexts/authContext";
import Loading from "../Loading";

const removeStudent = async (id) => {
  let token = localStorage.getItem("token");
  let isAdmin = localStorage.getItem("isAdmin");
  const { loading, setLoading } = useAuthContext();
  // console.log(id);

  setLoading(true);
  let response = await fetch(
    `${api}/admin/remove-student?id=${id}&token=${token}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAdmin: isAdmin, token: token }),
    }
  );

  setLoading(false);

  if (response.ok) {
    alert("successfully removed");
    window.location.href = "/home/remove-student";
  } else {
    // console.log(await response.json());
    alert("error");
  }
};

export const DisplayStudent = ({ student }) => {
  const { loading, setLoading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <tr>
        <td>{student.name}</td>
        <td>{student.category}</td>
        <td>{student.route}</td>
        <td>{student.status}</td>
        <td>{student.mobile}</td>
        <td>
          <button
            className="btn btn-danger m-1"
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
  const isAdmin = localStorage.getItem("isAdmin");
  const token = localStorage.getItem("token");
  const { loading, setLoading } = useAuthContext();
  React.useEffect(() => {
    const isTokenValid = verifyToken(token);

    if (!isTokenValid) {
      window.location.href = "/login";
    }
  }, [token, isAdmin]);

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
    <div className="container my-4">
      <h3>Remove Student</h3>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Enter name or email to remove student
        </label>
        <input
          value={query}
          type="text"
          className="form-control"
          name="name"
          id="name"
          placeholder="Enter name or email"
          onChange={(event) => {
            setQuery(event.target.value);
            // search(event);
            // console.log(query);
          }}
        />

        <div className="container my-3">
          <button
            className="btn btn-primary"
            onClick={(event) => {
              search(event);
            }}
          >
            Search
          </button>
        </div>
      </div>
      {students ? (
        <div className="mb-3">
          <p>Result - "{query}"</p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Rooute</th>
                <th>Status</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => {
                return <DisplayStudent student={student} key={idx} />;
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

export default Student;
