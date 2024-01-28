/* eslint-disable no-unused-vars */
import React from "react";
import Input from "../Input";
import Button from "../Button";
import axios from "axios";
import api from "../../utils/api";
import { useState } from "react";
import Loading from "../Loading";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

const RegisterStudent = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    mobile: "",
    village: "",
    city: "",
    category: "",
    route: "",
  });

  const [initial] = useState({
    name: "",
    mobile: "",
    village: "",
    city: "",
    category: "",
    route: "",
  });

  const register = async () => {
    const API = `${api}/user/register`;
    // console.log(newStudent);
    setLoading(true);
    let res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student,
        token,
      }),
    });
    if (res.ok) {
      let result = await res.json();
      console.log(result);
      alert("Successfully registered");
      // toast.success("Successfully registered");
      clear();
      navigate("/");
    } else {
      res = await res.json();
      toast.error(res.msg);
      // alert(res.msg);
    }
    setLoading(false);
  };

  const clear = () => {
    setStudent(initial);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 1000 }} />
      <Input
        labelColor={"text-black"}
        inputColor={"text-black"}
        label={"Name"}
        placeholder={"Enter name"}
        htmlFor={"name"}
        value={student.name}
        onChange={(e) => {
          setStudent({ ...student, name: e.target.value.toUpperCase() });
        }}
      />
      <Input
        labelColor={"text-black"}
        inputColor={"text-black"}
        label={"Mobile"}
        placeholder={"Enter mobile"}
        htmlFor={"name"}
        value={student.mobile}
        onChange={(e) => {
          setStudent({ ...student, mobile: e.target.value.toUpperCase() });
        }}
      />
      <Input
        labelColor={"text-black"}
        inputColor={"text-black"}
        label={"Village"}
        placeholder={"Enter village"}
        htmlFor={"name"}
        value={student.village}
        onChange={(e) => {
          setStudent({ ...student, village: e.target.value.toUpperCase() });
        }}
      />
      <Input
        labelColor={"text-black"}
        inputColor={"text-black"}
        label={"City"}
        placeholder={"Enter city"}
        htmlFor={"name"}
        value={student.city}
        onChange={(e) => {
          setStudent({ ...student, city: e.target.value.toUpperCase() });
        }}
      />
      <div className="flex flex-col gap-2 m-2">
        <label htmlFor="category" className="form-label text-black">
          Select category:
        </label>

        <select
          className="p-1 border-2 rounded-sm focus: outline-none text-black"
          value={student.category}
          onChange={(e) => {
            // console.log(e.target.value);
            setStudent({
              ...student,
              category: e.target.value,
            });
          }}
        >
          <option value="">==SELECT CATEGORY==</option>
          <option value="OTHER">OTHER</option>
          <option value="GEN">GEN</option>
          <option value="OBC">OBC</option>
          <option value="ST">ST</option>
          <option value="SC">SC</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 m-2">
        <label htmlFor="route" className="form-label text-black">
          Select Route:
        </label>

        <select
          className=" p-1 border-2 rounded-sm focus: outline-none text-black"
          value={student.route}
          onChange={(e) => {
            // console.log(e.target.value);
            setStudent({
              ...student,
              route: e.target.value,
            });
          }}
        >
          <option value="">==SELECT ROUTE==</option>
          <option value="OTHER">OTHER</option>
          <option value="BANDA">BANDA</option>
          <option value="RAHLI">RAHLI</option>
          <option value="SAGAR">SAGAR</option>
          <option value="BUXWAHA">BUXWAHA</option>
          <option value="GARHAKOTA">GARHAKOTA</option>
          <option value="DAMOH">DAMOH</option>
          <option value="CHATTARPUR">CHATTARPUR</option>
        </select>
      </div>
      <div className="mx-2 mt-3 flex gap-2">
        <Button
          text={"clear"}
          className={"bg-red-800"}
          onClick={() => {
            setStudent(initial);
          }}
        />
        <Button
          text={"Save"}
          className={"bg-green-600"}
          onClick={(e) => {
            e.preventDefault();
            register();
          }}
        />
      </div>
    </div>
  );
};

export default RegisterStudent;
