import React from "react";
import api from "../../utils/api";
import verifyToken from "../../utils/VerifyToken";

const RegisterNewCounsellor = () => {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const isAdmin = localStorage.getItem("isAdmin");
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    const isTokenValid = verifyToken(token);

    if (!isTokenValid) {
      window.location.href = "/login";
    }
    if (isTokenValid) {
      if (isAdmin === "false") {
        window.location.href = "/home";
      }
    }
  }, [token, isAdmin]);

  const registerNow = async (event) => {
    try {
      // console.log(user);

      if (!user.name || !user.email || !user.password) {
        alert("All values must not be empty");
      } else {
        let response = await fetch(`${api}/admin/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            user: user,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          alert("successfully added");
          window.location.href = "/home";
        } else {
          event.preventDefault();
          // console.log(
          //   "Registration failed with status code: " + response.status
          // );
          response = await response.json();
          // console.log(response);
          alert("Registration failed. Please try again later.");
        }
      }
    } catch (err) {
      console.error("An error occurred:", err);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <div className="container my-4">
      <h3>Counsellor Registration</h3>

      <div className="container">
        <div className="mb-3 my-4">
          <label htmlFor="cname" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="cname"
            id="cname"
            placeholder="Enter counsellor name"
            value={user.name}
            onChange={(event) => {
              setUser({ ...user, name: event.target.value });
            }}
          />
          {user.name ? (
            ""
          ) : (
            <span className="text-danger">* must be filled</span>
          )}
        </div>
        <div className="mb-3 my-4">
          <label htmlFor="cemail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="cemail"
            id="cemail"
            placeholder="Enter counsellor email"
            value={user.email}
            onChange={(event) => {
              setUser({ ...user, email: event.target.value });
            }}
          />
          {user.email ? (
            ""
          ) : (
            <span className="text-danger">* must be filled</span>
          )}
        </div>
        <div className="mb-3 my-4">
          <label htmlFor="cpwd" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="cpwd"
            id="cpwd"
            placeholder="Enter counsellor password"
            value={user.password}
            onChange={(event) => {
              setUser({ ...user, password: event.target.value });
            }}
          />
          {user.password ? (
            ""
          ) : (
            <span className="text-danger">* must be filled</span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary m-3"
        onClick={(event) => {
          registerNow(event);
        }}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterNewCounsellor;
