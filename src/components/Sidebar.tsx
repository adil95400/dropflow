import React from 'react'
import { NavLink } from 'react-router-dom'
import routes from '@/routes'

export default function Sidebar() {
  return (
    <aside className="w-56 border-r p-4 space-y-2 bg-white">
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) =>
            isActive ? 'font-semibold block' : 'text-gray-600 block'
          }
        >
          {route.label}
        </NavLink>
      ))}
    </aside>
  )
}