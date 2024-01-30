/* eslint-disable react/prop-types */
import verifyToken from "../../utils/VerifyToken";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import Loading from "../../components/Loading";

import api from "../../utils/api";

const StudentRow = ({ idx, student }) => {
  return (
    <tr
      className={`${idx % 2 != 0 ? "bg-gray-200" : "bg-gray-100"} text-black`}
    >
      <td className="px-6 py-3">{idx + 1}</td>
      <td className="px-6 py-3">{student.name}</td>
      <td className="px-6 py-3">{student.category}</td>
      <td className="px-6 py-3">{student.route}</td>
      <td className="px-6 py-3">{student.mobile}</td>
      <td className="px-6 py-3">{student.status}</td>
      <td className="px-6 py-3">{student.registeredBy}</td>
      <td className="px-6 py-3">
        {new Date(student.createdAt).toDateString() +
          " " +
          new Date(student.createdAt).toLocaleTimeString()}
      </td>

      <td className="px-6 py-3">
        <Link to={`/view-report/student/${student._id}`}>
          <button className="bg-blue-800 py-1 px-2 text-white rounded-sm">
            View-Report
          </button>
        </Link>
      </td>
    </tr>
  );
};

const DisplayStudents = ({ title, students }) => {
  return (
    <div className="container my-4 position-relative" style={{ top: "60px" }}>
      {/* table heading */}

      <h3 className="text-xl font-semibold underline">{title}</h3>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* student table headers */}
            <th scope="col" className="px-6 py-3">
              S. No.
            </th>
            <th scope="col" className="px-6 py-3">
              Student Name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Route
            </th>
            <th scope="col" className="px-6 py-3">
              Mobile
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Registered By
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
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
  const [loading] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <tr
      className={`${idx % 2 != 0 ? "bg-gray-200" : "bg-gray-100"} text-black`}
    >
      <td className="px-6 py-3">{idx + 1}</td>
      <td className="px-6 py-3">{user.name}</td>
      <td className="px-6 py-3">{user.email}</td>
      <td className="px-6 py-3">{user.isAdmin ? "Admin" : "Counsellor"}</td>
      <td className="px-6 py-3">
      {new Date(user.createdAt).toDateString() +
          " " +
          new Date(user.createdAt).toLocaleTimeString()}
      </td>
      <td className="px-6 py-3">
        <Link to={`/profile/${user._id}`}>
          <button className="bg-blue-800 py-2 px-2 text-white rounded-sm">
            View-Profile
          </button>
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
  const { token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (token === "token" || !token) {
      navigate("/login");
    }
    verifyToken(token);
  });
  return (
    <div className="container">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              S.No.
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
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
  const { isAdmin, token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [counsellors, setCounsellors] = React.useState([]);
  const [students, setStudents] = useState({
    PENDING: [],
    INTERESTED: [],
    NOTINTERESTED: [],
  });

  useEffect(() => {
    if (!token) {
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
      console.log(error);
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
  const nav = useNavigate();

  React.useEffect(() => {
    if (!token) {
      nav("/login");
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
    <div className="mx-auto p-4 position-relative" style={{ top: "60px" }}>
      {/* <SearchStudent /> */}
      <h2 className="text-2xl font-semibold">Student Information 2022-23</h2>

      <div className="container">
        <div className="container my-4">
          <h3 className="text-xl font-semibold underline">Quick Stats</h3>
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
        <h3 className="underline text-xl font-semibold">Counsellors</h3>
        {counsellors && <DisplayCounsellors users={counsellors} />}
      </div>
    </div>
  );
};

export default Dashboard;
