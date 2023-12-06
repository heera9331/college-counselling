import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Link } from "react-router-dom";

const UpdateStudent = () => {
  const navigate = useNavigate();

  const [updateStudent, setUpdateStudent] = useState(null);
  const [tmp, setTmp] = useState(null);
  const { token, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    if (token === "null" || isAdmin === "false") {
      navigate("/home");
    }
  }, [navigate, token, isAdmin]);

  const [query, setQuery] = React.useState("");
  const [students, setStudents] = React.useState([]);

  const search = async (event) => {
    try {
      event.preventDefault();

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
  };

  const saveDetails = async () => {
    // console.log(tmp);

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
        alert(error.response.data.error.message);
        navigate("/login");
      }
    } else {
      alert("Action revoked");
      setUpdateStudent(null);
      setTmp(null);
    }
  };

  return (
    <div className="container my-4">
      <h2>Update Student</h2>

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
            // console.log(query);
          }}
        />
        <button
          className="btn btn-primary my-3"
          onClick={(event) => {
            search(event);
          }}
        >
          Search
        </button>
      </div>

      {/*student to be update  */}
      {updateStudent && (
        <>
          <div className="container my-4 py-2 border">
            <div className="mb-3 mt-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                aria-describedby="helpId"
                placeholder="Name"
                value={tmp.name}
                onChange={(e) => {
                  setTmp({
                    ...tmp,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="mobile" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                className="form-control"
                name="mobile"
                id="mobile"
                aria-describedby="helpId"
                placeholder="Name"
                defaultValue={tmp.mobile}
                readOnly
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="category" className="form-label">
                Select category:
              </label>

              <select
                className="mx-2"
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
            <div className="mb-3 mt-3">
              <label htmlFor="route" className="form-label">
                Select route:
              </label>

              <select
                className="mx-2"
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
            <div className="mb-3 mt-3">
              <label htmlFor="category" className="form-label">
                Select branch:
              </label>

              <select
                className="mx-2"
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

            <div className="mb-3 mt-3">
              <label htmlFor="status" className="form-label">
                Status:
              </label>

              <select
                className="mx-2"
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

            <div className="mb-3 mt-3">
              <label htmlFor="gender" className="form-label">
                Gender:
              </label>

              <select
                className="mx-2"
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
              className="btn btn-success m-1"
              onClick={(e) => {
                e.preventDefault();
                saveDetails();
              }}
            >
              Save
            </button>
            <button
              className="btn btn-warning m-1"
              onClick={() => {
                setTmp(updateStudent);
              }}
            >
              Default
            </button>
            <button
              className="btn btn-danger m-1"
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
              {students.length !== 0 &&
                students.map((student, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{student.name}</td>
                      <td>{student.category}</td>
                      <td>{student.route}</td>
                      <td>{student.status}</td>
                      <td>{student.mobile}</td>
                      <td>
                        <button
                          className="btn btn-warning"
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
