import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    return (
      <button
        ref={ref}
        className="px-4 py-2 rounded bg-primary text-white"
        {...props}
      />
    );
  },
);

export default Button;
export { Button };
