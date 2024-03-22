/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import api from "../../utils/api";
import verifyToken from "../../utils/VerifyToken";
import useAuthContext from "../../hooks/useAuthContext";

import Loading from "../Loading";

const RegisterNewCounsellor = () => {
  const [loading, setLoading] = useState(false);
  const { token, isAdmin } = useAuthContext();
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const isTokenValid = verifyToken(token);

    if (!isTokenValid) {
      window.location.href = "/login";
    }
    if (isTokenValid) {
      if (isAdmin === "false") {
        window.location.href = "/";
      }
    }
  }, [token, isAdmin]);

  const registerNow = async (event) => {
    try {
      // console.log(user);

      if (!user.name || !user.email || !user.password) {
        alert("All values must not be empty");
      } else {
        setLoading(true);
        let response = await fetch(`${api}/admin/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            user,
          }),
        });

        setLoading(true);

        if (response.ok) {
          const data = await response.json();
          alert("successfully added");
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

    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="container">
        <Input
          label={"Name"}
          htmlFor={"cname"}
          type={"text"}
          placeholder={"Enter counsellor name"}
          value={user.name}
          onChange={(e) => {
            setUser({ ...user, name: e.target.value.toUpperCase() });
          }}
        />
        <Input
          label={"Email"}
          htmlFor={"email"}
          type={"email"}
          placeholder={"Enter counsellor email"}
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />

        <Input
          label={"Password"}
          htmlFor={"password"}
          type={"password"}
          placeholder={"Enter counsellor password"}
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
      </div>

      <Button
        text={"Submit"}
        className={"bg-green-600 ml-2"}
        onClick={(event) => {
          registerNow(event);
        }}
      />
    </div>
  );
};

export default RegisterNewCounsellor;
