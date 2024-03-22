import React, { useState } from "react";
import InputField from "../InputField";

function Form() {
  const [frmValue, setFrmValue] = useState({
    userName: "",
    password: "",
  });

  return (
    <div style={{ marginTop: "5rem" }}>
      <h3>Login Form</h3>
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <InputField
          labelProps={{
            className: "label px-3",
            text: "userName",
            htmlFor: "userName",
          }}
          inputProps={{
            name: "userName",
            placeholder: "placeholder",
            value: frmValue.userName,
            onChange: (e) => {
              setFrmValue({
                ...frmValue,
                userName: e.target.value,
              });
              // console.log(frmValue);
            },
          }}
        />
        <InputField
          labelProps={{
            className: "label px-3",
            text: "password",
            htmlFor: "password",
          }}
          inputProps={{
            name: "password",
            placeholder: "placeholder",
            value: frmValue.password,
            type: "password",
            onChange: (e) => {
              setFrmValue({
                ...frmValue,
                password: e.target.value,
              });
              // console.log(frmValue);
            },
          }}
        />
      </form>
    </div>
  );
}

export default Form;
