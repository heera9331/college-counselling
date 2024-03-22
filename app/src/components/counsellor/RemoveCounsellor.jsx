/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import api from "../../utils/api";
import useAuthContext from "../../hooks/useAuthContext";
import Loading from "../Loading";
import Button from "../Button";
// eslint-disable-next-line no-unused-vars
import Input from "../Input";
import { useNavigate } from "react-router-dom";

const RemoveCounsellor = () => {
  const { token, isAdmin } = useAuthContext();
  const DisplayUser = ({ user, idx }) => {
    const deleteUser = async (id) => {
      let response = await fetch(
        `${api}/admin/remove-user?id=${id}&token=${token}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isAdmin, token }),
        }
      );

      console.log(response);
      if (response.status !== 200) {
        alert("something went wrong");
      } else {
        alert("successfully removed");
      }
    };
    return (
      <>
        <tr
          className={`${
            idx % 2 != 0 ? "bg-gray-200" : "bg-gray-100"
          } text-black`}
        >
          <td className="px-6 py-3">{user.name}</td>
          <td className="px-6 py-3">{user.email}</td>
          <td>
            <button
              className="bg-red-600 ml-5 p-1 text-white rounded-sm"
              value={user._id}
              onClick={(event) => {
                let id = event.target.value;
                let userConfirm = prompt(
                  "Are sure want to remove this counsellor Yes[Y]/No[N]"
                );
                if (userConfirm && "YES".includes(userConfirm.toUpperCase())) {
                  deleteUser(id);
                } else {
                  console.log("action revoked");
                }
              }}
            >
              Remove
            </button>
          </td>
        </tr>
      </>
    );
  };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, isAdmin]);

  const [query, setQuery] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const search = async (event) => {
    setLoading(true);
    try {
      event.preventDefault();
      let result = await fetch(
        `${api}/admin/user/search?query=${query}&token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, query }),
        }
      );

      result = await result.json();
      // console.log(result.result);
      setUsers(result.result);
      setLoading(false);
    } catch (err) {
      console.log("problem in search");
    }

    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="text-black">
      <div className="flex flex-col gap-2 m-2">
        <label htmlFor="name" className="form-label">
          Enter name or email to remove counsellor
        </label>
        <input
          value={query}
          type="text"
          className="p-1 border-2 rounded-sm focus: outline-none"
          name="name"
          id="name"
          placeholder="Enter name or email"
          onChange={(event) => {
            setQuery(event.target.value);
            // console.log(query);
          }}
        />

        <div className="my-1">
          <Button
            text={"Search"}
            onClick={(event) => {
              search(event);
            }}
          />
        </div>
      </div>
      {users ? (
        <div className="mx-2 shadow-md sm:rounded-lg">
          <p>Result - {`'${query}'`}</p>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="odd:bg-white border-b dark:border-gray-700">
              {users.map((user, idx) => {
                return <DisplayUser user={user} idx={idx} key={idx} />;
              })}
              <tr className="p-4">Total - {users.length}</tr>
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default RemoveCounsellor;
