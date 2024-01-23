import React, { useState } from "react";
import verifyToken from "../../utils/VerifyToken";
import api from "../../utils/api";

import Loading from "../Loading";
import Input from "../Input";
import Button from "../Button";
import useAuthContext from "../../hooks/useAuthContext";

// const DisplayUser = ({ user }) => {
//   console.log(user);
//   return <></>;
// };

const UpdateCounsellor = () => {
  const { token, isAdmin } = useAuthContext();

  const updateUser = async (user) => {
    try {
      let response = await fetch(
        `${api}/admin/update-user?id=${user._id}&token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user,
            token: localStorage.getItem("token"),
          }),
        }
      );

      if (response.ok) {
        alert("successfully updated");
      }
    } catch (error) {
      console.log("error in updating", error);
    }
  };

  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }

    // console.log(isAdmin);
    // console.log(token);
  }, [token, isAdmin]);

  const [query, setQuery] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState(null);

  const search = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      let result = await fetch(
        `${api}/admin/user/search?query=${query}&token=${token}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        }
      );

      result = await result.json();
      // console.log(result.result);
      setUsers(result.result);
      setLoading(false);
    } catch (err) {
      console.log("problem in search", err);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="text-black">
      <Input
        htmlFor={"query"}
        label={"Enter name of email to update counsellor"}
        placeholder={"Enter name or email"}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />

      <Button
        text={"Search"}
        onClick={(event) => {
          search(event);
        }}
        className={"mx-2"}
      />

      {user && (
        <div className="my-4">
          <Input
            htmlFor={"name"}
            label={"Name"}
            type={"text"}
            placeholder={"Enter name"}
            value={user.name}
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          />
          <Input
            htmlFor={"email"}
            label={"Email"}
            type={"email"}
            placeholder={"Enter email"}
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <Input
            htmlFor={"password"}
            label={"Password"}
            type={"password"}
            placeholder={"Enter password"}
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />

          <Button
            value={user._id}
            text={"Save"}
            className={"bg-green-600 mx-2 m-1"}
            onClick={(event) => {
              event.preventDefault();
              updateUser(user);
            }}
          />

          <Button
            value={user._id}
            text={"Cancel "}
            className={"bg-red-600 mx-2 m-1"}
            onClick={() => {
              setUser(null);
            }}
          />
        </div>
      )}

      {users.length != 0 && (
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
                return (
                  <tr
                    key={idx}
                    className={`${
                      idx % 2 != 0 ? "bg-gray-200" : "bg-gray-100"
                    } text-black`}
                  >
                    <td className="px-6 py-3">{user.name}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td>
                      <button
                        className="bg-yellow ml-5 px-4 py-1 text-white rounded-sm"
                        value={user._id}
                        onClick={(event) => {
                          let id = event.target.value;
                          for (let i = 0; i < users.length; i++) {
                            if (users[i]._id === id) {
                              // console.log(users[i].name);
                              setUser(users[i]);
                              break;
                            }
                          }
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>Total - {users.length}</tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default UpdateCounsellor;
