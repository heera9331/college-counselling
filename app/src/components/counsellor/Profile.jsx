/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Button from "../Button";
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
  const [currentPage, setCurrentPage] = useState(1);
  // total students present in student collection
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(15);

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
      let response = await axios.post(
        `${api}/user/profile?page=${currentPage}&size=${pageSize}`,
        { token, userId }
      );
      console.log(response);
      if (response.statusText === "OK") {
        let data = await response.data;

        setUser(data.user);
        setStudents(data.students);
        setTotal(data.total);

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

  useEffect(() => {
    getUser();
  }, [currentPage]);

  function getPending(status) {
    let tmp = students.filter((student) => student.status === status);
    return tmp.length;
  }

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
          <h2>
            <b>Counseller Name</b> - {user.name}
          </h2>
        </div>

        <div className="container my-3">
          <div className="border p-2">
            Position - {user.isAdmin ? "Admin" : "Counseller"}
          </div>
          <div className="border p-2">Email - {user.email}</div>
          <div className="border p-2">
            Number of students - {stats && <span>{students.length}</span>}
          </div>
          <div className="border p-2">
            Number pending students - {getPending("PENDING")}
          </div>

          <div className="border p-2">
            Number not interested students -{" "}
            {stats && <span>{getPending("NOTINTERESTED")}</span>}
          </div>
          <div className="container border p-2">
            Number of interested students -{" "}
            {stats && <span>{getPending("INTERESTED")}</span>}
          </div>

          {students && (
            <div className="container my-4">
              {students.length != 0 && (
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
                  <div>
                    Total {`${currentPage}/${Math.ceil(total / pageSize)}`}
                  </div>
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
