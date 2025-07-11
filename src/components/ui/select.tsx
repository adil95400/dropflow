import React from 'react'
import clsx from 'clsx'

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={clsx('border px-3 py-2 rounded', className)}
      {...props}
    />
  )
)

Select.displayName = 'Select'

export default Select