import React from "react";

const InputField = ({ labelProps, inputProps, divProps }) => {
  return (
    <div className="container" {...divProps}>
      <label htmlFor={labelProps?.htmlFor} {...labelProps}>
        {labelProps?.text}
      </label>

      <input
        {...inputProps}
        type={inputProps?.type ? inputProps.type : "text"}
        value={inputProps?.value}
        onChange={(e) => {
          inputProps?.onChange(e);
        }}
      />
    </div>
  );
};

export default InputField;
