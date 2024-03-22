import React from "react";
import verifyToken from "../../utils/VerifyToken";
import api from "../../utils/api";
import { useAuthContext } from "../../contexts/authContext";
import Loading from "../Loading";
const deleteUser = async (id) => {
  let token = localStorage.getItem("token");
  let isAdmin = localStorage.getItem("isAdmin");
  const { loading, setLoading } = useAuthContext();

  setLoading(true);
  let response = await fetch(
    `${api}/admin/remove-user?id=${id}&token=${token}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAdmin: isAdmin, token: token }),
    }
  );

  setLoading(false);

  // console.log(await response.json());
};

const DisplayUser = ({ user }) => {
  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <button
            className="btn btn-danger"
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

const RemoveCounsellor = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  const token = localStorage.getItem("token");
  const { loading, setLoading } = useAuthContext();

  React.useEffect(() => {
    const isTokenValid = verifyToken(token);

    if (!isTokenValid) {
      window.location.href = "/login";
    }

    // console.log(isAdmin);
    // console.log(token);
  }, [token, isAdmin]);

  const [query, setQuery] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const search = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      let result = await fetch(
        `${api}/admin/user/search?query=${query}&token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token, query }),
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
    <div className="container my-4">
      <h3>Remove Counsellor</h3>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Enter name or email to remove counsellor
        </label>
        <input
          value={query}
          type="text"
          className="form-control"
          name="name"
          id="name"
          placeholder="Enter name or email"
          onChange={(event) => {
            setQuery(event.target.value);
            // console.log(query);
          }}
        />

        <div className="container my-3">
          <button
            className="btn btn-primary"
            onClick={(event) => {
              search(event);
            }}
          >
            Search
          </button>
        </div>
      </div>
      {users ? (
        <div className="mb-3">
          <p>Result - "{query}"</p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => {
                return <DisplayUser user={user} key={idx} />;
              })}
            </tbody>
            <tfoot>
              <tr>Total</tr>
            </tfoot>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default RemoveCounsellor;
