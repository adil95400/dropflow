import React from "react";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options?: { value: string; label: string }[];
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className = "", options, children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={`border px-3 py-2 rounded ${className}`}
      {...props}
    >
      {options
        ? options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))
        : children}
    </select>
  );
});

export default Select;
export { Select };
