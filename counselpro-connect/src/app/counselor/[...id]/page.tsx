"use client";
import axios from "axios";
import { apiBaseUrl } from "@/utils";
import { Students, Loading, AwsCard } from "@/components";
import { useEffect, useState } from "react";

const getUser = async (id: string) => {
  let res = await axios.get(`${apiBaseUrl}/api/users/${id}`);

  if (res.statusText === "OK") {
    let user = await res.data;
    return user;
  }

  return null;
};

const removeCounselor = async (id: string) => {
  let res = await axios.delete(`/api/users/${id}`);
  console.log("delete res", res);
};

const handleRemove = (id: string) => {
  let userInput = confirm("are you sure want to remove this counselor?");
  if (userInput) {
  }
};

const getStudents = async (registeredBy: string) => {
  let res = await axios.get(
    `${apiBaseUrl}/api/students/search?registeredBy=${registeredBy}`
  );

  if (res.statusText === "OK") {
    let students = await res.data;
    return students;
  }
  return [];
};

const Page = ({ params }: { params: any }) => {
  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    isAdmin: boolean;
  } | null>(null);
  const id = params.id[0];

  useEffect(() => {
    (async () => {
      setLoading(true);
      const user = await getUser(id);
      const students = await getStudents(id);
      setUser(user[0]);
      setStudents(students);
      setLoading(false);
    })();
  }, [id]);

  return (
    <div> 
      <AwsCard>
        {user && (
          <>
            <div>
              <p>Name - {user.name}</p>
              <p>Email - {user.email}</p>
              <p>Position - {user.isAdmin ? "Admin" : "Counselor"}</p>
              <p>Registered students - {students.length}</p>
            </div>
          </>
        )}

        <div className="my-2">
          {loading ? <Loading /> : <Students students={students} />}
        </div>
        {students && (
          <div className="py-2 flex gap-2">
            <button
              className="shadow-sm bg-green-600 hover:bg-gray-700 rounded-sm text-white font-semibold px-2 py-1"
              onClick={() => {
                window.print();
              }}
            >
              Print
            </button>
            <button
              className="shadow-sm bg-red-600 hover:bg-red-700 rounded-sm text-white font-semibold px-2 py-1"
              onClick={() => {
                handleRemove(id);
              }}
            >
              Remove Counselor
            </button>
          </div>
        )}
      </AwsCard>
    </div>
  );
};

export default Page;
