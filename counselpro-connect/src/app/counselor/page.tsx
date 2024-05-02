"use client";

import Link from "next/link";
import axios from "axios";
import { Button, AwsCard } from "@/components";
import { useState, useEffect } from "react";

/**
 * users => counselors
 */

const CounsellorRow = ({ idx, user }: { idx: number; user: any }) => {
  return (
    <tr
      key={idx}
      className={`${idx % 2 ? "bg-gray-200" : "bg-gray-100"} text-gray-900`}
    >
      <td className="p-2">{idx + 1}</td>
      <td className="p-2">{user.name}</td>
      <td className="p-2">{user.email}</td>
      <td className="p-2">{user.isAdmin ? "Admin" : "Counsellor"}</td>
      <td className="p-2">{user.createdAt}</td>
      <td className="p-2 flex gap-2">
        <Link href={`/counselor/${user.email}`}>
          <Button
            text="View-Profile"
            onClick={(e: any) => {}}
            className="bg-blue-700 hover:bg-blue-800 text-white"
          />
        </Link>
         
      </td>
    </tr>
  );
};

const getCounselors = async () => {
  let res = await axios.get("/api/users");

  if (res.statusText === "OK") {
    let users = await res.data;
    return users;
  }

  return [];
};

const Page = (props: any) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let users = await getCounselors();
      setUsers(users);
    })();
  }, []);

  return (
    <div>
      <Link
        href={"/counselor/register-counselor"}
        className="text-blue-800 underline font-semibold p-3"
      >
        Appoint New Counselor
      </Link>
      <AwsCard title="All Counselors">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-2">
                S.No.
              </th>
              <th scope="col" className="p-2">
                Name
              </th>
              <th scope="col" className="p-2">
                Email
              </th>
              <th scope="col" className="p-2">
                Position
              </th>
              <th scope="col" className="p-2">
                Date
              </th>
              <th scope="col" className="p-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user: any, idx: number) => {
                return <CounsellorRow key={idx} user={user} idx={idx} />;
              })}
          </tbody>
        </table>
      </AwsCard>
    </div>
  );
};

export default Page;
