import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { routes } from './routes'

import Sidebar from './components/Sidebar'

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-muted text-muted-foreground">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          {routes.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </div>
  )
}

export default App
