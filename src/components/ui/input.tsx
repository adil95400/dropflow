import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    return <input ref={ref} className="border px-3 py-2 rounded" {...props} />;
  },
);

export default Input;
export { Input };
