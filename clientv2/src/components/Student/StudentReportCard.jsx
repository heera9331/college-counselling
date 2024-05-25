import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import { useAuthContext } from "../../contexts/AuthContext";
import Loading from "../Loading";

const StudentReportCard = () => {
  const params = useParams();
  // console.log(params);

  const [student, setStudent] = useState({});
  const { loading, setLoading } = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/";

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${api}/admin/view-report/get-student`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            id: params.id,
          }),
        });

        let res = await response.json();
        // console.log(res);
        setStudent(res.student);
        setLoading(false);
      } catch (error) {
        // console.log(error);
        return null;
      }
      // return null;
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container my-4 border" style={{ top: "60px" }}>
        <div className="text-center m-4">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "80px" }}
          >
            account_circle
          </span>
        </div>
        <div className="container">
          <h2>Student Name - {student.name}</h2>
        </div>
        <div className="container my-3">
          <div className="container border p-2">Status - {student.status}</div>

          <div className="container border p-2">
            Category - {student.category}
          </div>
          <div className="container border p-2">Route - {student.route}</div>
          <div className="container border p-2">
            Registered by - {student.registeredBy}
          </div>

          <div className="container border p-2">City - {student.city}</div>
          <div className="container border p-2">Mobile - {student.mobile}</div>
          {/* <div className="container border p-2">email - {student.email}</div> */}
          {student && student.status === "interested" ? (
            <>
              <div className="container border p-2">
                school - {student.school}
              </div>
              <div className="container border p-2">
                marks - {student.marks}
              </div>
              <div className="container border p-2">
                stream - {student.stream}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="container">
        <button
          className="btn btn-success"
          onClick={() => {
            window.print();
          }}
        >
          Print Report
        </button>
      </div>
    </>
  );
};

export default StudentReportCard;
