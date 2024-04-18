/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import Loading from "../Loading";

const AddStudent = () => {
  const { loading, setLoading } = useAuthContext();
  const [newStudent, setNewStudent] = React.useState({
    name: "",
    mobile: "",
    category: "",
    villege: "",
    route: "",
    city: "",
  });

  const clear = () => {
    setNewStudent({
      name: "",
      mobile: "",
      category: "",
      villege: "",
      route: "",
      city: "",
    });
  };

  const registerNow = async () => {
    const API = `${api}/user/register`;
    // console.log(newStudent);
    setLoading(true);
    let res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student: newStudent,
        token: localStorage.getItem("token"),
      }),
    });
    if (res.ok) {
      let result = await res.json();
      // console.log(result);
      alert("Successfully registered");
      clear();
    } else {
      res = await res.json();
      alert(res.msg);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container my-4">
      {/* The Modal */}
      <div className="container">
        <div className="container">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">Enter Student Details Here</h4>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form action="#" method="post">
                <div className="mb-3 mt-3">
                  <label htmlFor="name" className="form-label">
                    Student Name:
                  </label>
                  <input
                    value={newStudent.name}
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Student Name"
                    name="name"
                    onChange={(event) => {
                      // console.log(newStudent);
                      setNewStudent({
                        ...newStudent,
                        name: event.target.value.toUpperCase(),
                      });
                    }}
                    required={true}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile:
                  </label>
                  <input
                    value={newStudent.mobile}
                    type="text"
                    className="form-control"
                    id="mobile"
                    placeholder="Enter mobile number"
                    name="mobile"
                    onChange={(event) => {
                      // console.log(newStudent);
                      setNewStudent({
                        ...newStudent,
                        mobile: event.target.value.toUpperCase(),
                      });
                    }}
                    required={true}
                  />
                </div>
                <div className="mb-3 mt-3">
                  <label htmlFor="villege" className="form-label">
                    Student Villege:
                  </label>
                  <input
                    value={newStudent.villege}
                    type="text"
                    className="form-control"
                    id="villege"
                    placeholder="Enter Student Villege"
                    name="villege"
                    onChange={(event) => {
                      // console.log(newStudent);
                      setNewStudent({
                        ...newStudent,
                        villege: event.target.value.toUpperCase(),
                      });
                    }}
                    required
                  />
                </div>
                <div className="mb-3 mt-3">
                  <label htmlFor="city" className="form-label">
                    Student City:
                  </label>
                  <input
                    value={newStudent.city}
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="Enter Student City"
                    name="city"
                    onChange={(event) => {
                      // console.log(newStudent);
                      setNewStudent({
                        ...newStudent,
                        city: event.target.value.toUpperCase(),
                      });
                    }}
                    required
                  />
                </div>
                {/* 
                <div className="mb-3 mt-3">
                  <label htmlFor="gender" className="form-label">
                    Gender:
                  </label>

                  <select
                    className="mx-2"
                    id="gender"
                    name="gender"
                    value={newStudent.gender}
                    onChange={(e) => {
                      setNewStudent({
                        ...newStudent,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <option value="">==SELECT GENDER==</option>
                    <option value="OTHER">OTHER</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                  </select>
                </div> */}

                <div className="mb-3 mt-3">
                  <label htmlFor="category" className="form-label">
                    Select category:
                  </label>

                  <select
                    className="mx-2"
                    value={newStudent.category}
                    onChange={(e) => {
                      // console.log(e.target.value);
                      setNewStudent({
                        ...newStudent,
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
                    value={newStudent.route}
                    onChange={(e) => {
                      // console.log(e.target.value);
                      setNewStudent({
                        ...newStudent,
                        route: e.target.value,
                      });
                    }}
                  >
                    <option value="">==SELECT ROUTE==</option>

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
              </form>
            </div>
            {/* Modal footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={(event) => {
                  event.preventDefault();
                  registerNow();
                }}
              >
                Register
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  clear();
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
