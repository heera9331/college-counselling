import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import useAuthContext from "../../hooks/useAuthContext";
import Loading from "../Loading";
import api from "../../utils/api";
import axios from "axios";
import Dialog from "../../components/Dialog";
import ContactStudent from "../../components/students/ContactStudent";
import Button from "../Button";
import useAuthContext from "../../hooks/useAuthContext";

// ... (other imports)

const RecentRegisteredStudent = () => {
  const [recentStudents, setRecentStudents] = useState([]);
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getRecentStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${api}/user/recent-students`, { token });

      if (res.status === 200) {
        console.log(res.data);
        setRecentStudents(res.data.students);
      } else {
        console.error(
          "Failed to fetch recent students:",
          res.status,
          res.statusText
        );
        navigate("/login");
      }
    } catch (err) {
      console.error("Error during API request:", err);
      // Handle the error, e.g., show an error message to the user
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecentStudents();
  }, []); // Empty dependency array means the effect runs once after the initial render

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-semibold my-2 m-2">
        Recent Registered Students
      </h1>

      {isDialogOpen && (
        <Dialog title={"Contact Student"} setDialogOpen={setIsDialogOpen}>
          <ContactStudent id={studentId} />
        </Dialog>
      )}

      <div className="mx-2 shadow-md overflow-auto">
        <table
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-scroll table-fixed
        "
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No
              </th>
              <th scope="col" className="px-6 py-3">
                Student Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                RegisteredBy
              </th>
              <th scope="col" className="px-6 py-3">
                Current Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {recentStudents
              ? recentStudents.map((student, idx) => (
                  <tr
                    key={idx}
                    className={`${
                      idx % 2 != 0 ? "bg-gray-200" : "bg-gray-100"
                    } text-black`}
                  >
                    <td className="px-6 py-3">{idx + 1}</td>
                    <td className="px-6 py-3">{student.name}</td>
                    <td className="px-6 py-3">
                      {new Date(student.createdAt).toLocaleDateString()} -
                      {new Date(student.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-3">{student.registeredBy}</td>
                    <td className="px-6 py-3">{student.status}</td>
                    <td className="px-6 py-3">
                      <button
                        className="bg-green-600 py-1 px-2 text-white rounded-sm"
                        value={student._id}
                        onClick={(e) => {
                          setIsDialogOpen(!isDialogOpen);
                          setStudentId(e.target.value);
                          console.log(e.target.value);
                        }}
                      >
                        Contact
                      </button>
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
