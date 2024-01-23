import Input from "../../components/Input";
import { useState } from "react";
import axios from "axios";
import api from "../../utils/api";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { login, token } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log(user);
      let res = await axios.post(`${api}/auth/login`, user);
      let data = res.data;
      if (data.error) {
        alert(data.error);
      } else {
        console.log(data);
        login(data.token, data.isAdmin, data.userId);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center m-auto">
      <div
        className="bg-primary p-4 m-auto rounded-sm "
        style={{ width: "450px" }}
      >
        <form
          action="#"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            labelColor={"text-white"}
            inputColor={"text-black"}
            label={"Email"}
            htmlFor={"email"}
            value={user.email}
            placeholder={"Email"}
            className={"bg-gray-100 p-1 rounded-sm focus:outline-none"}
            type={"email"}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <Input
            labelColor={"text-white"}
            inputColor={"text-black"}
            label={"Password"}
            htmlFor={"password"}
            value={user.password}
            placeholder={"Password"}
            className={"bg-gray-100 p-1 rounded-sm focus:outline-none"}
            type={"password"}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />

          <div
            className="flex items-center justify-center bg-secondary m-2 rounded-sm my-4 cursor-pointer"
            onClick={handleLogin}
          >
            <button className="p-1 text-white font-semibold">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
