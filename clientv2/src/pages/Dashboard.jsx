/* eslint-disable react/prop-types */
import verifyToken from "../utils/VerifyToken";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, useAuthContext } from "../contexts/AuthContext";
import Loading from "../components/Loading";

import api from "../utils/api";

const StudentRow = ({ idx, student }) => {
  const { loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{student.name}</td>
      <td>{student.category}</td>
      <td>{student.route}</td>
      <td>{student.mobile}</td>
      <td>{student.status}</td>
      <td>{student.registeredBy}</td>
      <td>{student.createdAt}</td>

      <td>
        <Link to={`/view-report/student/${student._id}`}>
          <button className="btn btn-primary">View-Report</button>
        </Link>
      </td>
    </tr>
  );
};

const DisplayStudents = ({ title, students }) => {
  const { loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container my-4 position-relative" style={{ top: "60px" }}>
      {/* table heading */}

      <h3>{title}</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            {/* student table headers */}
            <th>S. No.</th>
            <th>Student Name</th>
            <th>Category</th>
            <th>Route</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Registered By</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row in table */}
          {students.map((student, idx) => {
            return <StudentRow key={idx} student={student} idx={idx} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

const CounsellorRow = ({ idx, user }) => {
  // console.log(user);
  const { loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }

  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.isAdmin ? "Admin" : "Counsellor"}</td>
      <td>{user.createdAt}</td>
      <td>
        <Link to={`/profile/${user._id}`}>
          <button className="btn btn-primary">View-Profile</button>
        </Link>
      </td>
    </tr>
  );
};

/**
 *
 * @param {*} param0
 * @returns
 * @description - display counsellors
 */
const DisplayCounsellors = ({ users }) => {
  // console.log(users);
  const { loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => {
            return <CounsellorRow key={idx} user={user} idx={idx} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

/**
 *
 * @returns
 * @description - dashboard provide summerized view of data
 * like number of student, table of student and counsellor
 * many other type of information
 *
 * - In the dashboard admin can see the report of student and profile of
 * counsellors
 */
const Dashboard = () => {
  const { isAdmin, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { loading, setLoading } = useAuthContext();

  const [students, setStudents] = React.useState({
    PENDING: [],
    INTERESTED: [],
    NOTINTERESTED: [],
  });
  const [counsellors, setCounsellors] = React.useState([]);

  useEffect(() => {
    if (token === "null") {
      navigate("/login");
    }
  }, [navigate, token]);

  const getStudents = async (status) => {
    try {
      setLoading(true);
      const response = await fetch(`${api}/admin/dashboard/get-students`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          isAdmin: isAdmin,
          status: status,
        }),
      });

      if (response.ok) {
        const result = await response.json();

        setStudents((prevStudents) => ({
          ...prevStudents,
          [status]: result.result,
        }));

        // console.log(students);
      } else {
        alert("Error while fetching data");
      }
    } catch (error) {
      // console.log(error);
    }

    setLoading(false);
  };

  const getCounsellors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${api}/admin/dashboard/get-counsellors`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          isAdmin: isAdmin,
        }),
      });

      // console.log(response);

      if (response.ok) {
        // console.log("get counsellors");
        response.json().then((result) => {
          setCounsellors(result);
          // console.log(counsellors);
        });
      }
    } catch (error) {
      // console.log(error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const isTokenValid = verifyToken(token);
    if (!isTokenValid) {
      window.location.href = "/login";
    }

    const fetchData = async () => {
      // fatch all the student by the use of status
      setLoading(true);
      try {
        await Promise.all([
          getStudents("PENDING"),
          getStudents("INTERESTED"),
          getStudents("NOTINTERESTED"),
          getCounsellors(),
        ]);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }

      setLoading(false);
    };

    setLoading(true);
    fetchData();
    setLoading(false);
    // console.log(students);
    // console.log(counsellors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isAdmin]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="container mx-auto mt-4 position-relative"
      style={{ top: "60px" }}
    >
      {/* <SearchStudent /> */}
      <h2>Student Information 2022-23</h2>

      <div className="container">
        <div className="container my-4">
          <h2>Quick Stats</h2>
          <div className="container py-2">
            <p className="paragraph">
              Number of counsellor - {counsellors ? counsellors.length : 0}
            </p>
            <p className="paragraph">
              Total Visited Students - {/* total number of students */}
              {students.PENDING.length +
                students.NOTINTERESTED.length +
                students.INTERESTED.length}
            </p>
            <p className="paragraph">
              Number of pending students -{" "}
              {students.PENDING && students.PENDING.length}
            </p>
            <p className="paragraph">
              Number of not interested students -
              {students.NOTINTERESTED && students.NOTINTERESTED.length}
            </p>
            <p className="paragraph">
              Number of interested students -{" "}
              {students.INTERESTED && students.INTERESTED.length}
            </p>
          </div>
        </div>
        {<DisplayStudents title={"Pending"} students={students.PENDING} />}
        {
          <DisplayStudents
            title={"Not Interested"}
            students={students.NOTINTERESTED}
          />
        }
        {
          <DisplayStudents
            title={"Interested"}
            students={students.INTERESTED}
          />
        }
      </div>

      {/* printing counsellors */}
      <div
        className="container position-relative"
        style={{
          marginTop: "100px",
        }}
      >
        <h3>Counsellors</h3>
        {counsellors && <DisplayCounsellors users={counsellors} />}
      </div>
    </div>
  );
};

export default Dashboard;
