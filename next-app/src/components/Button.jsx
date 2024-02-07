/* eslint-disable react/prop-types */

const Button = ({ text, onClick, className, ...props }) => {
  return (
    <button
      className={`bg-blue-700 text-white rounded-sm py-1 px-2 hover:bg-blue-900 ${className}`}
      type="button"
      {...props}
      onClick={onClick}
    >
      {text ? text : "Button"}
    </button>
  );
};

export default Button;
