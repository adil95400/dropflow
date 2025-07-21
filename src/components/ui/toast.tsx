import React from "react";

export type ToastProps = React.HTMLAttributes<HTMLDivElement>;

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { className = "", children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`px-4 py-2 rounded bg-gray-800 text-white ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

export default Toast;
export { Toast };
