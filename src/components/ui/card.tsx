import React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export default function Card({ children, ...props }: CardProps) {
  return (
    <div className="border rounded bg-white shadow" {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, ...props }: CardProps) {
  return (
    <div className="p-4" {...props}>
      {children}
    </div>
  );
}
