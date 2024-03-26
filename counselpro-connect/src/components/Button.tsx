/* eslint-disable react/prop-types */
interface InputProps {
  text: string,
  onClick: (e: any) => void,
  className?: string,
}
const Button = ({ text, onClick, className, ...props }: InputProps) => {
  return (
    <button
      className={`bg-gray-700  hover:bg-gray-800 text-white font-semibold rounded-sm py-1 px-2 ${className} titlecase`}
      type="button"
      {...props}
      onClick={onClick}
    >
      {text ? text : "Button"}
    </button>
  );
};

export default Button;
