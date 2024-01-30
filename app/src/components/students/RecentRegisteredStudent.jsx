import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import useAuthContext from "../../hooks/useAuthContext";
import Loading from "../Loading";
import api from "../../utils/api";
import axios from "axios";
import Dialog from "../../components/Dialog";
import ContactStudent from "../../components/students/ContactStudent";
import useAuthContext from "../../hooks/useAuthContext";
import Button from "../Button";
// ... (other imports)

const RecentRegisteredStudent = () => {
  const [recentStudents, setRecentStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // total students present in student collection
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(15);

  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getRecentStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${api}/user/recent-students?page=${currentPage}&size=${pageSize}`,
        { token }
      );

      if (res.status === 200) {
        console.log(res.data);
        setRecentStudents(res.data.students);
        setTotal(res.data.total);
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
    setLoading(false);
  };

  useEffect(() => {
    getRecentStudents();
  }, [currentPage]); // Empty dependency array means the effect runs once after the initial render

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

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
      {recentStudents.length != 0 && (
        <div className="flex items-center justify-center my-2 gap-2 m-auto">
          <Button
            text={"<<"}
            onClick={() => {
              setCurrentPage(1);
            }}
          />
          <Button
            text={"<"}
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          />
          <div>Total {`${currentPage}/${Math.ceil(total / pageSize)}`}</div>
          <Button
            text={">"}
            onClick={() => {
              if (Math.ceil(total / pageSize) > currentPage) {
                setCurrentPage(currentPage + 1);
              }
            }}
          />
          <Button
            text={">>"}
            onClick={() => {
              setCurrentPage(Math.ceil(total / pageSize));
            }}
          />
        </div>
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
                      {new Date(student.createdAt).toDateString() +
                        " " +
                        new Date(student.createdAt).toLocaleTimeString()}
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

      {recentStudents.length == 0 && "No Students"}
    </div>
  );
};

export default RecentRegisteredStudent;
