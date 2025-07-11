import React from 'react'
import clsx from 'clsx'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        'px-4 py-2 rounded bg-primary text-primary-foreground',
        className
      )}
      {...props}
    />
  )
)

Button.displayName = 'Button'

export default Button