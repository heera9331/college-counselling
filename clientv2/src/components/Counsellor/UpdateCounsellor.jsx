import React from "react";
import verifyToken from "../../utils/VerifyToken";
import api from "../../utils/api";
import { useAuthContext } from "../../contexts/authContext";
import Loading from "../Loading";

const updateUser = async (user) => {
  try {
    let token = localStorage.getItem("token");

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
      window.location.href = "/home/update-counsellor";
    }
  } catch (error) {
    console.log("error in updating", error);
  }
};

// const DisplayUser = ({ user }) => {
//   console.log(user);
//   return <></>;
// };

const UpdateCounsellor = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  const token = localStorage.getItem("token");
  const { loading, setLoading } = useAuthContext();

  React.useEffect(() => {
    setLoading(true);
    const isTokenValid = verifyToken(token);
    setLoading(false);

    if (!isTokenValid) {
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
    <div className="container my-4">
      <h3>Update Counsellor Details</h3>
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
              // console.log(query);
              search(event);
            }}
          >
            Search
          </button>
        </div>
      </div>

      {user ? (
        <div className="container my-4 py-2 border">
          <div className="mb-3 mt-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              aria-describedby="helpId"
              placeholder="Name"
              value={user.name}
              onChange={(event) => {
                setUser({ ...user, name: event.target.value });
              }}
            />
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              aria-describedby="helpId"
              placeholder="Email"
              value={user.email}
              onChange={(event) => {
                setUser({ ...user, email: event.target.value });
              }}
            />
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              aria-describedby="helpId"
              placeholder="Password"
              value={user.password}
              onChange={(event) => {
                setUser({ ...user, password: event.target.value });
              }}
            />
          </div>

          <button
            className="btn btn-success m-1"
            value={user._id}
            onClick={(event) => {
              event.preventDefault();
              updateUser(user);
            }}
          >
            Save
          </button>

          <button
            className="btn btn-danger m-1"
            onClick={() => {
              setUser(null);
            }}
          >
            Cancal
          </button>
        </div>
      ) : (
        ""
      )}

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
                return (
                  <tr key={idx}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-warning"
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
      ) : (
        ""
      )}
    </div>
  );
};

export default UpdateCounsellor;
