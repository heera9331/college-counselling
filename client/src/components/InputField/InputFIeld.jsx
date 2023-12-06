import { useRef } from "react";


const InputField = ({labelProps, inputProps}) => {
  <div className="mb-3 mt-3">
    <label {...labelProps}>
      Name
    </label>
    <input {...inputProps} />
  </div>;
};

export default InputField;
