/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Input = ({
  label,
  htmlFor,
  value,
  onChange,
  type,
  className,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{}</label>
      <textarea
        type={type ? type : "text"}
        value={value}
        onChange={onchange}
        className={`` + className}
        {...props}
      />
    </div>
  );
};

export default Input;
