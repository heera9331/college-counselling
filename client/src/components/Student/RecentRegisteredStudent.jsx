import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, useAuthContext } from "../../contexts/AuthContext";
import Loading from "../Loading";
import api from "../../utils/api";
import axios from "axios";

const RecentRegisteredStudent = () => {
  const [recentStudents, setRecentStudents] = useState([]);
  const { token, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { loading, setLoading } = useAuthContext();

  const getRecentStudents = async () => {
    try {
      setLoading(true);
      let res = await axios.post(`${api}/user/recent-students`, { token });
      // console.log(res);
      if (res.statusText === "OK") {
        console.log(res);
        setRecentStudents(res.data.students);
      } else {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      }
    } catch (err) {
      dispatch({ type: "LOGOUT" });
      setLoading(false);
      navigate("/login");
      // console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    // console.log("getting recent student");
    getRecentStudents();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mt-4">
      <h1>Recent Registered Students</h1>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Student Name</th>
              <th>Date</th>
              <th>Current Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentStudents
              ? recentStudents.map((student, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.createdAt}</td>
                    <td>{student.status}</td>
                    <td>
                      <Link
                        className="btn btn-success"
                        to={`/home/contact-student/${student._id}`}
                      >
                        Contact
                      </Link>
                    </td>
                  </tr>
                ))
              : " "}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentRegisteredStudent;
