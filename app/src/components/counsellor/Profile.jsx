/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import verifyToken from "../../utils/VerifyToken";
import axios from "axios";
import useAuthContext from "../../hooks/useAuthContext";
import Loading from "../Loading";
import { MdAccountCircle } from "react-icons/md";
import api from "../../utils/api";

const Student = ({ title, students }) => {
  const { loading } = useAuthContext();
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {title && (
        <div className="" style={{ top: "60px" }}>
          <h3>{title}</h3>
        </div>
      )}
      {students && students.length !== 0 ? (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
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
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {students &&
              students.length !== 0 &&
              students.map((student, idx) => {
                return (
                  <tr
                    key={idx}
                    className={`${
                      idx % 2 != 0 ? "bg-gray-200" : "bg-gray-100"
                    } text-black`}
                  >
                    <td className="px-6 py-3">{idx + 1}</td>
                    <td className="px-6 py-3">{student.name}</td>
                    <td className="px-6 py-3">{student.category}</td>
                    <td className="px-6 py-3">{student.route}</td>
                    <td className="px-6 py-3">{student.mobile}</td>
                    <td className="px-6 py-3">{student.status}</td>
                    <td className="px-6 py-3">
                      {new Date(student.createdAt).toLocaleDateString() +
                        new Date(student.createdAt).toLocaleTimeString()}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </>
  );
};

const Profile = () => {
  const { token } = useAuthContext();

  const { loading, setLoading } = useState(false);
  const [user, setUser] = useState({});
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    interested: 0,
    pending: 0,
    notinterested: 0,
  });

  const params = useParams();
  let userId = params.userId;

  const getUser = async () => {
    try {
      let response = await axios.post(`${api}/user/profile`, { token, userId });
      console.log(response);
      if (response.statusText === "OK") {
        setUser(await response.data.user);
        setStudents(await response.data.students);

        // Call filter after setting the students state
        // filter();
      } else {
        // console.log(response.response);
        console.log("response.response");
      }
    } catch (error) {
      console.log("catch block");
      let msg = error.response.data.error.message;
      alert(msg);

      navigate("/login");
    }
  };

  const filter = useCallback(() => {
    console.log("filter applied");

    if (students.length !== 0) {
      let pending = students.filter((student) => student.status === "pending");
      let interested = students.filter(
        (student) => student.status === "interested"
      );
      let notinterested = students.filter(
        (student) => student.status === "notinterested"
      );
      setStats((prevStats) => ({
        ...prevStats,
        pending: pending.length,
        interested: interested.length,
        notinterested: notinterested.length,
      }));
    } else {
      console.log("no students");
    }
  }, [students]);

  useEffect(() => {
    // if (!token) {
    //   window.location.href = "/login";
    // }

    // if (!verifyToken(token)) {
    //   window.location.href = "/login";
    // }

    // console.log(token);

    getUser();
  }, []);

  useEffect(() => {
    filter();
  }, [filter]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="m-4">
        <div className="flex items-center justify-center">
          <MdAccountCircle size={"100px"} />
        </div>
        <div className="container">
          <h2>Counseller Name - {user.name}</h2>
        </div>

        <div className="container my-3">
          <div className="p-2">
            Position - {user.isAdmin ? "Admin" : "Counseller"}
          </div>
          <div className="p-2">Email - {user.email}</div>
          <div className="p-2">
            Number pending students - {stats && <span>{stats.pending}</span>}
          </div>

          <div className="p-2">
            Number not interested students -{" "}
            {stats && <span>{stats.notinterested}</span>}
          </div>
          <div className="container border p-2">
            Number of interested students -{" "}
            {stats && <span>{stats.interested}</span>}
          </div>

          {students && (
            <div className="container my-4">
              <Student title={""} students={students} />
            </div>
          )}
        </div>

        <div className="container">
          <button
            className="bg-blue-800 text-white py-1 px-2 rounded-sm"
            onClick={() => {
              window.print();
            }}
          >
            Print Report
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
