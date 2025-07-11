import React from 'react'

export interface ToastProps {
  message: string
  className?: string
}

export default function Toast({ message, className }: ToastProps) {
  return (
    <div className={`rounded bg-black text-white px-4 py-2 ${className ?? ''}`}>{message}</div>
  )
}