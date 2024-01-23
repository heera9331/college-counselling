/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import useAuthContext from "../../hooks/useAuthContext";

const ContactStudent = (props) => {
  const [id] = useState(props.id);
  const [student, setStudent] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const { loading, setLoading } = useAuthContext();
  const [date] = useState(new Date());
  const [isInterested, setIsInterested] = useState(0);

  const [chat, setChat] = useState({
    id: id,
    reply: "",
    field: "",
    status: "PENDING",
    marks: Number(""),
    school: "",
  });

  const getStudent = async () => {
    // setLoading(true);
    const response = await fetch(`${api}/user/student/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, id: id }),
    });

    if (response.ok) {
      let result = await response.json();
      // console.log(result);
      setStudent(result.student);
    }

    // setLoading(false);
  };

  const updateChat = () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    fetch(`${api}/user/student/update/${chat.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, chatData: chat }),
    })
      .then(async (response) => {
        if (response.ok) {
          // console.log(await response.json());
          alert("Successfully updated");
          // window.location.href = "/home";
          navigate("/home");
        } else {
          alert("There is some mistake");
        }
      })
      .catch((reason) => {
        // console.log(reason);
      });

    setLoading(false);
  };

  useEffect(() => {
    getStudent(id);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="container border mt-4 p-4 position-relative"
      style={{ top: "60px" }}
    >
      <h2>Student</h2>
      <div className="container">
        <p>Current Date {date.toUTCString()}</p>

        {student && (
          <div className="container">
            <p className={student.status === "PENDING" ? "info" : "danger"}>
              Current Status - {student.status}
            </p>
            <div className="mb-3 mt-3">
              <label htmlFor="studentName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="studentName"
                id="studentName"
                placeholder={student.name}
                readOnly
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="studentEmail" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                name="studentEmail"
                id="studentEmail"
                placeholder={student.email}
                readOnly
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="studentMobile" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                className="form-control"
                name="studentMobile"
                id="studentMobile"
                placeholder={student.mobile}
                readOnly
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="studentReply" className="form-label">
                Reply of Student
              </label>
              <input
                value={chat.reply}
                type="text"
                className="form-control"
                name="studentReply"
                id="studentReply"
                placeholder="conversation"
                onChange={(event) => {
                  setChat({ ...chat, reply: event.target.value });
                }}
              />

              <select
                name="status"
                id="status"
                className="mt-4"
                value={chat.status}
                onChange={(event) => {
                  if (event.target.value === "INTERESTED") {
                    setIsInterested(1);
                  } else {
                    setIsInterested(0);
                  }
                  setChat({ ...chat, status: event.target.value });
                }}
              >
                <option value="PENDING">PENDING</option>
                <option value="NOTINTERESTED">NOTINTERESTED</option>
                <option value="INTERESTED">INTERESTED</option>
              </select>
            </div>

            {isInterested === 1 ? (
              <>
                <div className="mb-3 mt-3">
                  <label htmlFor="category" className="form-label">
                    Select Branch:
                  </label>

                  <select
                    className="mx-2"
                    value={student.category}
                    onChange={(e) => {
                      // console.log(e.target.value);
                      setStudent({
                        ...student,
                        category: e.target.value,
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
                  <label htmlFor="school" className="form-label">
                    School Name
                  </label>
                  <input
                    value={chat.school}
                    type="text"
                    className="form-control"
                    name="school"
                    id="school"
                    placeholder="Enter School Name"
                    onChange={(event) => {
                      setChat({ ...chat, school: event.target.value });
                    }}
                  />
                </div>
                <div className="mb-3 mt-3">
                  <label htmlFor="marks" className="form-label">
                    Marks (In %)
                  </label>
                  <input
                    value={chat.marks}
                    type="number"
                    className="form-control"
                    name="marks"
                    id="marks"
                    placeholder="Without % sign - i.e. 83"
                    max={100}
                    min={0}
                    onChange={(event) => {
                      setChat({ ...chat, marks: Number(event.target.value) });
                    }}
                  />
                </div>
              </>
            ) : null}

            <button
              className="btn btn-primary"
              onClick={() => {
                // console.log(chat);
                updateChat();
              }}
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {student && student.chats && student.chats.length !== 0 ? (
        <div className="container mt-4">
          <h2>Previous Conversation</h2>

          <div className="container" style={{ backgroundColor: "#e9ecef" }}>
            {/* {student.chats.map((chat, idx) => {
              return <DisplayMessage chat={chat} key={idx} />;
            })} */}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ContactStudent;
