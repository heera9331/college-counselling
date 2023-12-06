import React from "react";

const Button = ({ buttonProps, divProps }) => {
  return (
    <div {...divProps}>
      <button {...buttonProps}>
        {buttonProps.text ? buttonProps.text : "Default Text"}
      </button>
    </div>
  );
};

export default Button;
