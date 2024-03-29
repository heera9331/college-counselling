import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, useAuthContext } from "../../contexts/AuthContext";
import Loading from "../Loading";
import api from "../../utils/api";

import Button from "../../components/Button";
import InputField from "../../components/InputField";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch, token } = useContext(AuthContext);
  const { loading, setLoading } = useAuthContext();

  useEffect(() => {
    console.log(token);
    if (token !== "null") navigate("/home");
  }, [token, navigate]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${api}/auth/login`, user);
      console.log("response from server=>", res);
      if (res.statusText === "OK") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            token: res.data.token,
            userId: res.data.userId,
            isAdmin: res.data.isAdmin,
          },
        });
        setLoading(false);
        navigate("/home");
      }
    } catch (error) {
      console.log("error captured");
      alert(error.response.data.msg);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className="container mt-5 border text-light p-4 rounded position-relative i-bg-primary"
        style={{ top: "60px", maxWidth: "480px" }}
      >
        <form action="#" className="form">
          <InputField
            divProps={{
              className: "my-2",
            }}
            labelProps={{
              htmlFor: "email",
              className: "form-label",
              text: "Email",
            }}
            inputProps={{
              value: user.email,
              type: "text",
              id: "email",
              className: "form-control",
              placeholder: "Enter email",
              name: "email",
              onChange: (e) => {
                setUser({
                  ...user,
                  email: e.target.value,
                });
              },
            }}
          />
          <InputField
            divProps={{
              className: "my-2",
            }}
            labelProps={{
              htmlFor: "password",
              className: "form-label",
              text: "Password",
            }}
            inputProps={{
              value: user.password,
              type: "password",
              id: "password",
              placeholder: "Enter password",
              name: "password",
              className: "form-control",
              onChange: (e) => {
                setUser({
                  ...user,
                  password: e.target.value,
                });
              },
            }}
          />

          <Button
            divProps={{
              className: "d-flex text-center justify-content-center my-4",
            }}
            buttonProps={{
              text: "Login",
              className: "btn btn-primary text",
              onClick: (e) => {
                e.preventDefault();

                handleLogin();
              },
            }}
          />
        </form>
      </div>
    </>
  );
};

export default Login;
