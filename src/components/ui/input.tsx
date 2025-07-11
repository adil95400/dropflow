import React from 'react'
import clsx from 'clsx'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={clsx('border px-3 py-2 rounded w-full', className)}
      {...props}
    />
  )
)

Input.displayName = 'Input'

export default Input