import React from "react";

const Button = (props) => {
  // console.log(props);

  return (
    <button
      className={props.className}
      onClick={() => {
        props.onClick.handleClick();
      }}
      {...props}
    >
      {props.text ? props.text : "Default Text"}
    </button>
  );
};

export default Button;
