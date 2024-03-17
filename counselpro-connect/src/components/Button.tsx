/* eslint-disable react/prop-types */
interface InputProps {
  text: string,
  onClick: (e:any) => void,
  className?: string,
}
const Button = ({ text, onClick, className, ...props }: InputProps) => {
  return (
    <button
      className={`m-2 bg-secondary text-white rounded-sm py-1 px-2 hover:bg-blue-900 ${className}`}
      type="button"
      {...props}
      onClick={onClick}
    >
      {text ? text : "Button"}
    </button>
  );
};

export default Button;
