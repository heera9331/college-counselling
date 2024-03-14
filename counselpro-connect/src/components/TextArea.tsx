/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

interface InputProps {
  label: string,
  htmlFor: string,
  value: any,
  onChange: () => void,
  type?: string,
  className: string,
}

const TextArea = ({
  label,
  htmlFor,
  value,
  onChange,
  type,
  className,
  ...props
}: InputProps) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        className={`` + className}
        {...props}
      />
    </div>
  );
};

export default TextArea;
