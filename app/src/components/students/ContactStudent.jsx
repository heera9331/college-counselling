/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import useAuthContext from "../../hooks/useAuthContext";
import Input from "../Input";

const ContactStudent = (props) => {
  const [id] = useState(props.id);
  const [student, setStudent] = useState({});
  const navigate = useNavigate();

  const { token } = useAuthContext();
  const [date] = useState(new Date());
  const [isInterested, setIsInterested] = useState(0);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      fetch(`${api}/user/student/update/${chat.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, chatData: chat }),
      })
        .then(async (response) => {
          if (response.ok) {
            // console.log(await response.json());
            alert("Successfully updated");

            navigate("/home");
          } else {
            alert("There is some mistake");
          }
        })
        .catch((reason) => {
          // console.log(reason);
        });
    } catch (error) {
      alert("something went wrong, sorry for inconvenience");
    }

    setLoading(false);
  };

  useEffect(() => {
    getStudent(id);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-col gap-1">
        <p>Current Date {date.toUTCString()}</p>

        {student && (
          <div className="container">
            <p className={student.status === "PENDING" ? "info" : "danger"}>
              Current Status - {student.status}
            </p>

            <div className="flex flex-col gap-2 my-2">
              <label htmlFor="studentEmail" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control rouned-sm p-1 focus:outline-none"
                name="studentEmail"
                id="studentEmail"
                placeholder={`${student.email}`}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2 my-2">
              <label htmlFor="studentMobile" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                className=" rouned-sm p-1 focus:outline-none"
                name="studentMobile"
                id="studentMobile"
                placeholder={`${student.mobile}`}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2 my-2">
              <label htmlFor="studentReply" className="form-label">
                Reply of Student
              </label>
              <input
                value={chat.reply}
                type="text"
                className=" rouned-sm p-1 focus:outline-none"
                name="studentReply"
                id="studentReply"
                placeholder="conversation"
                onChange={(event) => {
                  setChat({ ...chat, reply: event.target.value });
                }}
              />

              <div className="flex flex-col gap-2 my-2">
                <label htmlFor="status" className="p-1">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  className="rouned-sm p-1 focus:outline-none"
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
            </div>

            {isInterested === 1 ? (
              <>
                <div className="flex flex-col gap-2 my-2">
                  <label htmlFor="category" className="form-label">
                    Select Category:
                  </label>

                  <select
                    className="rouned-sm p-1 focus:outline-none"
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
                <div className="flex flex-col gap-2 my-2">
                  <label htmlFor="school" className="form-label">
                    School Name
                  </label>
                  <input
                    value={chat.school}
                    type="text"
                    className="rouned-sm p-1 focus:outline-none"
                    name="school"
                    id="school"
                    placeholder="Enter School Name"
                    onChange={(event) => {
                      setChat({ ...chat, school: event.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 my-2">
                  <label htmlFor="marks" className="form-label">
                    Marks (In %)
                  </label>
                  <input
                    value={chat.marks}
                    type="number"
                    className="rouned-sm p-1 focus:outline-none"
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
              className="bg-blue-800 py-1 px-2 text-white rounded-sm focus:bg-blue-900"
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
            {student.chats.map((chat, idx) => {
              console.log(chat);
              return (
                <div
                  key={idx}
                  className="my-4 py-4 flex flex-col gap-2 relative border-b-2"
                >
                  <p className="bg-white py-1 m-auto text-center rounded-sm">
                    {chat.timestamp}
                  </p>
                  <p className="bg-white py-1 w-fit rounded-sm px-2">
                    {chat.teacher}
                  </p>
                  <p className="bg-white py-1 w-fit rounded-sm absolute right-0 -bottom-2 px-2">
                    {chat.msg}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ContactStudent;
