import { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import verifyToken from "../../utils/VerifyToken";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

import api from "../../utils/api";

const Student = ({ title, students }) => {
  return (
    <>
      {title && (
        <div className="container position-relative" style={{ top: "60px" }}>
          <h3>{title}</h3>
        </div>
      )}
      {students && students.length !== 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Category</th>
              <th>Route</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {students &&
              students.length !== 0 &&
              students.map((student, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.category}</td>
                    <td>{student.route}</td>
                    <td>{student.mobile}</td>
                    <td>{student.status}</td>
                    <td>{student.createdAt}</td>
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
  const { token } = useContext(AuthContext);

  const [user, setUser] = useState({});
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
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
      dispatch({ type: "LOGOUT" });
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

  return (
    <>
      <div className="container my-4 border">
        <div className="text-center m-4">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "80px" }}
          >
            account_circle
          </span>
        </div>
        <div className="container">
          <h2>Counseller Name - {user.name}</h2>
        </div>

        <div className="container my-3">
          <div className="container border p-2">
            Position - {user.isAdmin ? "Admin" : "Counseller"}
          </div>
          <div className="container border p-2">Email - {user.email}</div>
          <div className="container border p-2">
            Number pending students - {stats && <span>{stats.pending}</span>}
          </div>

          <div className="container border p-2">
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

export default Profile;
