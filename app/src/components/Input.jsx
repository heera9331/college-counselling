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
  placeholder,
  labelColor,
  inputColor,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 m-2">
      <label
        className={`${labelColor ? labelColor : "text-black"}`}
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <input
        type={type ? type : "text"}
        value={value}
        className={` p-1 border-2 rounded-sm focus: outline-none ${className} ${
          inputColor ? inputColor : "text-black"
        }`}
        placeholder={placeholder ? placeholder : ""}
        name={htmlFor}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
